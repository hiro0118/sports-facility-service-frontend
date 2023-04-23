import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { createContext, FC, useState } from "react";

interface Props {
  children: JSX.Element,
}

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
  }
})

const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

export const PageThemeContext = createContext<{
  pageTheme: Theme,
  switchPageTheme: () => void
}>({
  pageTheme: lightTheme,
  switchPageTheme: () => { },
});

export const PageThemeProvider: FC<Props> = (props: Props) => {
  const [pageTheme, setPageTheme] = useState<Theme>(lightTheme);

  const switchPageTheme = () => {
    if (pageTheme === lightTheme) {
      setPageTheme(darkTheme);
    } else {
      setPageTheme(lightTheme);
    }
  }

  return (
    <PageThemeContext.Provider value={{ pageTheme, switchPageTheme }}>
      <ThemeProvider theme={pageTheme}>
        {props.children}
      </ThemeProvider>
    </PageThemeContext.Provider>
  )
}