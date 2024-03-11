'use client';

import { useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import adminDashboardHeaderLinks from '@/constants/staticJSONs/adminDashboardHeaderLinks';

import { IAdminDashboardLinkControl } from '@/interfaces/uiInterfaces/common';

import appLogo from '@/assets/images/app-logo.png';

import styles from './AdminDashboardHeader.module.scss';

const AdminDashboardHeader = () => {

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
      onClick() { }
    };

    return <button {...logoutControlAttributes}>Logout</button>;

  }

  function renderDashboardLink(link: IAdminDashboardLinkControl) {

    const id = useId();

    let linkClassName = styles.headerLinkControl;

    if (pathName === link.href) {
      linkClassName += ` ${styles.active}`;
    }

    const linkAttributes = {
      href: link.href,
      className: linkClassName
    };

    return <Link {...linkAttributes} key={id}>{link.label}</Link>;

  }

  function renderLinkControlsContainer() {

    return (
      <div className={styles.linkControlsContainer}>
        <div className={styles.linkControls}>
          {
            adminDashboardHeaderLinks.map((link) => (
              renderDashboardLink(link)
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
    </div>
  );

};

export default AdminDashboardHeader;