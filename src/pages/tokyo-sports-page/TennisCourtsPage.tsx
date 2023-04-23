import Typography from '@mui/material/Typography';
import { Box, Button, Container, Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FilterAccordion, SELECT_ALL } from './FilterAccordion';
import React, { useCallback, useEffect, useState } from 'react';
import { MAX_DISPLAY_NUM, SortableTable } from './SortableTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface CourtData {
  date: string;
  park: string;
  time: string;
  courts: number;
  applications: number;
  ratio: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const tabProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const removeDuplicate = (value: string, index: number, array: string[]) => {
  return array.indexOf(value) === index;
}

const sortTimes = (a: string, b: string) => {
  return (a.length - b.length) || a.localeCompare(b);
}

export const TennisCourtsPage = () => {

  const [allItems, setAllItems] = useState<CourtData[]>([]);
  const [allDates, setAllDates] = useState<string[]>([]);
  const [allTimes, setAllTimes] = useState<string[]>([]);
  const [allParks, setAllParks] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState<CourtData[]>([]);

  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());
  const [selectedParks, setSelectedParks] = useState<Set<string>>(new Set());
  const [favedItems, setFavedItems] = useState<Set<string>>(new Set());

  const [tabId, setTabId] = useState(0);

  // Initialization
  useEffect(() => {
    // Fetch court data from public folder.
    fetch("application_data.json")
      .then((res) => res.json())
      .then((res) => {
        const dataList = res as CourtData[];
        setAllItems(dataList);
        setVisibleItems(dataList);
        const dates = dataList.map(i => i.date).filter(removeDuplicate).sort();
        const times = dataList.map(i => i.time).filter(removeDuplicate).sort(sortTimes);
        const parks = dataList.map(i => i.park).filter(removeDuplicate).sort();
        setAllDates(dates);
        setAllTimes(times);
        setAllParks(parks);
        setSelectedDates(new Set(dates));
        setSelectedTimes(new Set(times));
        setSelectedParks(new Set(parks));
      });
  }, []);

  const onDateChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedList = getUpdatedSelections(allDates, selectedDates, event);
    setSelectedDates(updatedList);
  }

  const onTimeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedList = getUpdatedSelections(allTimes, selectedTimes, event);
    setSelectedTimes(updatedList);
  }

  const onParkChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedList = getUpdatedSelections(allParks, selectedParks, event);
    setSelectedParks(updatedList);
  }

  const onFaved = useCallback((key: string) => {
    const newFavedItemSet: Set<string> = new Set(favedItems);
    if (newFavedItemSet.has(key)) {
      newFavedItemSet.delete(key);
    } else {
      newFavedItemSet.add(key);
    }
    setFavedItems(newFavedItemSet);
  }, [favedItems]);

  const onApply = () => {
    const newVisbleItems = allItems
      .filter(i => selectedDates.has(i.date))
      .filter(i => selectedTimes.has(i.time))
      .filter(i => selectedParks.has(i.park));
    setVisibleItems(newVisbleItems);
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabId(newValue);
  };

  return (
    <>
      <Typography variant="h3" padding={3} align="center">Tennis Court Application Status</Typography>
      <Container sx={{ mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabId} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Search" {...tabProps(0)} />
            <Tab label="Favorites" {...tabProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabId} index={0}>
          <Typography padding={3} align="right">*Showing the first {MAX_DISPLAY_NUM} records.</Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid xs={12} md={2.8}>
              <FilterAccordion
                id='Dates'
                onSelect={onDateChecked}
                items={allDates}
                selections={selectedDates}
              />
              <FilterAccordion
                id='Times'
                onSelect={onTimeChecked}
                items={allTimes}
                selections={selectedTimes}
              />
              <FilterAccordion
                id='Parks'
                onSelect={onParkChecked}
                items={allParks}
                selections={selectedParks}
              />
              <Button
                variant="contained"
                fullWidth={true}
                onClick={onApply}
                sx={{ mt: 0.8 }}
              >
                Apply
              </Button>
            </Grid>

            <Grid xs={12} md={9.2}>
              <SortableTable
                dataList={visibleItems}
                favedItemSet={favedItems}
                favedItemOnly={false}
                onFaved={onFaved} />
            </Grid>

          </Grid>
        </TabPanel>
        <TabPanel value={tabId} index={1}>
          <Grid xs={12} md={9.2}>
            <SortableTable
              dataList={allItems}
              favedItemSet={favedItems}
              favedItemOnly={true}
              onFaved={onFaved} />
          </Grid>
        </TabPanel>
      </Container>
    </>
  );
}

const getUpdatedSelections = (
  allItems: string[],
  selections: Set<string>,
  event: React.ChangeEvent<HTMLInputElement>
): Set<string> => {

  const value = event.target.defaultValue;
  const checked = event.target.checked;

  if (value === SELECT_ALL) {
    return (allItems.length === selections.size) ?
      new Set<string>() : new Set<string>(allItems);
  } else {
    const newSelections = new Set<string>(selections);
    checked ? newSelections.add(value) : newSelections.delete(value);
    return newSelections;
  }
}