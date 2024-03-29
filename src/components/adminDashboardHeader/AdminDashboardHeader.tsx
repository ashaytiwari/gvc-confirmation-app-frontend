'use client';

import { useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAdminLogout } from '@/hooks/queriesMutations/authentication';

import adminDashboardHeaderLinks from '@/constants/staticJSONs/adminDashboardHeaderLinks';

import { IAdminDashboardLinkControl } from '@/interfaces/uiInterfaces/common';

import appLogo from '@/assets/images/app-logo.png';

import Spinner from '../spinner/Spinner';

import styles from './AdminDashboardHeader.module.scss';

const AdminDashboardHeader = () => {

  const { mutate: adminLogout, isPending } = useAdminLogout();

  const pathName = usePathname();

  function renderLogo() {

    const appLogoAttributes = {
      src: appLogo,
      alt: 'app-logo',
      style: {
        width: '100%',
        height: 'auto'
      }
    };

    return (
      <div className={styles.logoSection}>
        <Image {...appLogoAttributes} />
        <label className={styles.applicationName}>GVC RSVP</label>
      </div>
    );

  }

  function renderLogoutControl() {

    const logoutControlAttributes = {
      className: 'application-solid-button',
      onClick() {
        adminLogout();
      }
    };

    return <button {...logoutControlAttributes}>Logout</button>;

  }

  function renderDashboardLink(link: IAdminDashboardLinkControl, index: number) {

    let linkClassName = styles.headerLinkControl;

    if (pathName === link.href) {
      linkClassName += ` ${styles.active}`;
    }

    const linkAttributes = {
      href: link.href,
      className: linkClassName
    };

    return <Link {...linkAttributes} key={index}>{link.label}</Link>;

  }

  function renderSpinner() {

    if (isPending === false) {
      return;
    }

    return <Spinner fullScreen={true} />;
  }

  function renderLinkControlsContainer() {

    return (
      <div className={styles.linkControlsContainer}>
        <div className={styles.linkControls}>
          {
            adminDashboardHeaderLinks.map((link, index) => (
              renderDashboardLink(link, index)
            ))
          }
        </div>
        {renderLogoutControl()}
      </div>
    );

  }

  return (
    <div className={styles.adminDashboardHeaderMain}>
      {renderLogo()}
      {renderLinkControlsContainer()}
      {renderSpinner()}
    </div>
  );

};

export default AdminDashboardHeader;