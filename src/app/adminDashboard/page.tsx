'use client';

import { useState } from 'react';

import ConfirmationFormEditor from './_confirmationFormEditor/ConfirmationFormEditor';

import styles from './page.module.scss';

function AdminDashboard() {

  const [displayConfirmationForm, setDisplayConfirmationForm] = useState(false);

  function renderConfirmationForm() {

    if (displayConfirmationForm === false) {
      return;
    }

    const confirmationFormEditorAttributes = {
      open: displayConfirmationForm,
      onClose() {
        setDisplayConfirmationForm(false);
      }
    };

    return <ConfirmationFormEditor {...confirmationFormEditorAttributes} />;

  }

  const createNewControlAttributes = {
    className: `application-solid-button ${styles.createNewControl}`,
    onClick() {
      setDisplayConfirmationForm(true);
    }
  };

  return (
    <div id={styles.adminDashboardMain}>

      <div className={styles.header}>
        <label>Confirmation Forms</label>
        <button {...createNewControlAttributes}>Create New</button>
      </div>

      {renderConfirmationForm()}

    </div>
  );

}

export default AdminDashboard;