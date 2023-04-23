import { FC } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { PageInfo } from "./PageInfo";

interface Props {
  pageInfos: PageInfo[],
}

export const PageRouter: FC<Props> = (props: Props) => {
  return (
    <>
      <HashRouter>
        <Routes>
          {props.pageInfos.map((page) => {
            return (
              <Route key={page.title} path={page.path} element={<page.element />} />
            );
          })}
        </Routes>
      </HashRouter>
    </>
  );
};