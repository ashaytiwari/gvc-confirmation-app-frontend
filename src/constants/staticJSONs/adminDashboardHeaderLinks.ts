import { IAdminDashboardLinkControl } from "@/interfaces/uiInterfaces/common";

import routesPath from "../routesPath";

const adminDashboardHeaderLinks: Array<IAdminDashboardLinkControl> = [
  {
    href: routesPath.adminDashboardRoute,
    label: 'Dashboard'
  },
  {
    href: routesPath.changePasswordRoute,
    label: 'Change Password'
  },
];

export default adminDashboardHeaderLinks;