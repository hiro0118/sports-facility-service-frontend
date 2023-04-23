import { TennisCourtsPage } from "./tokyo-sports-page/TennisCourtsPage";
import { WorkInProgressPage } from "./wip-page/WorkInProgressPage";
import { PageInfo } from "../components/menu-bar/PageInfo";
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export const pages: PageInfo[] = [
  {
    title: "Tennis Courts",
    path: "tennis-courts",
    icon: SportsTennisIcon,
    element: TennisCourtsPage,
  },
  {
    title: "WIP",
    path: "wip",
    icon: ContactSupportIcon,
    element: WorkInProgressPage,
  }
]