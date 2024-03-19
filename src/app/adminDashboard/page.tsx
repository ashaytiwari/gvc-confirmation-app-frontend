'use client';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { IAdminDashboardRootStateModel } from '@/interfaces/uiInterfaces/admin';

import ConfirmationFormEditor from './_confirmationFormEditor/ConfirmationFormEditor';

import styles from './page.module.scss';

function AdminDashboard() {

  const [rootState, setRootState] = useState<IAdminDashboardRootStateModel>({
    displayConfirmationForm: false,
    title: '',
    page: 0
  });

  function handlePreviousControlClick() { }

  function handleNextControlClick() { }

  function renderConfirmationForm() {

    if (rootState.displayConfirmationForm === false) {
      return;
    }

    const confirmationFormEditorAttributes = {
      open: rootState.displayConfirmationForm,
      onClose() {
        setRootState({
          ...rootState,
          displayConfirmationForm: false
        });
      }
    };

    return <ConfirmationFormEditor {...confirmationFormEditorAttributes} />;

  }

  function renderPaginationFooter() {

    const previousControlAttributes = {
      className: styles.paginationControl,
      onClick: handlePreviousControlClick
    };

    const nextControlAttributes = {
      className: styles.paginationControl,
      onClick: handleNextControlClick
    };

    return (
      <div className={styles.paginationFooter}>
        <button {...previousControlAttributes}><FontAwesomeIcon icon={faChevronLeft} /></button>
        <label className={styles.paginationLabel}>
          Page <span className={styles.pageCount}>{rootState.page}</span> of <span className={styles.pageCount}>10</span>
        </label>
        <button {...nextControlAttributes}><FontAwesomeIcon icon={faChevronRight} /></button>
      </div>
    );

  }

  const createNewControlAttributes = {
    className: `application-solid-button ${styles.createNewControl}`,
    onClick() {
      setRootState({
        ...rootState,
        displayConfirmationForm: true
      });
    }
  };

  return (
    <div id={styles.adminDashboardMain}>

      <div className={styles.header}>
        <label>Confirmation Forms</label>
        <button {...createNewControlAttributes}>Create New</button>
      </div>

      {renderConfirmationForm()}

      {renderPaginationFooter()}

    </div>
  );

}

export default AdminDashboard;