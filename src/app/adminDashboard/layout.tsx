import AdminDashboardHeader from '@/components/adminDashboardHeader/AdminDashboardHeader';

import styles from './page.module.scss';

const AdminDashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  return (
    <div id={styles.adminDashboardLayoutMain}>
      <AdminDashboardHeader />
      {children}
    </div>
  );

}

export default AdminDashboardLayout;