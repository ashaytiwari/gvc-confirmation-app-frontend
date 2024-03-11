import { IAdminDashboardLinkControl } from "@/interfaces/uiInterfaces/common";

const adminDashboardHeaderLinks: Array<IAdminDashboardLinkControl> = [
  {
    href: '/adminDashboard',
    label: 'Dashboard'
  },
  {
    href: '/adminDashboard/changePassword',
    label: 'Change Password'
  },
];

export default adminDashboardHeaderLinks;