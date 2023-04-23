import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { FC } from "react";

export const SELECT_ALL = "selectAll";

interface Props {
  id: string,
  onSelect: any,
  items: string[],
  selections: Set<string>,
}

export const FilterAccordion: FC<Props> = (props: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={props.id}
        id={props.id}
      >
        <Typography>{props.id}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <FormGroup>
          <FormControlLabel
            key={SELECT_ALL}
            id={SELECT_ALL}
            value={SELECT_ALL}
            control={
              <Checkbox
                checked={props.selections.size === props.items.length}
                indeterminate={
                  (props.selections.size !== props.items.length) &&
                  (props.selections.size !== 0)
                }
              />}
            label={"Select All"}
            onChange={props.onSelect}
          />
          <Box sx={{ ml: 3 }}>
            {props.items.map(condition => {
              return (
                <FormControlLabel
                  key={condition}
                  id={condition}
                  value={condition}
                  control={<Checkbox />}
                  checked={props.selections.has(condition)}
                  label={condition}
                  onChange={props.onSelect} />
              );
            })}
          </Box>
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}