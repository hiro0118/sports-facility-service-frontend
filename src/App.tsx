import { FC } from "react";
import { MenuBar } from "./components/menu-bar/MenuBar";
import { PageRouter } from "./components/menu-bar/PageRouter";
import { PageThemeProvider } from "./components/providers/PageThemeProvider";
import { pages } from "./pages/Pages";

export const App: FC = () => {
  return (
    <PageThemeProvider>
        <MenuBar pages={pages}>
          <PageRouter pageInfos={pages} />
        </MenuBar>
    </PageThemeProvider>
  );
};

export default App;
