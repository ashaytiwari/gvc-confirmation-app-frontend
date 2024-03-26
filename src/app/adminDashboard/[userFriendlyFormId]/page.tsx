'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Table } from 'react-bootstrap';

import { useGetUserConfirmations } from '@/hooks/queriesMutations/user';

import { IUserConfirmationModel } from '@/interfaces/models/user';

import Spinner from '@/components/spinner/Spinner';

import { getFormIdFromUserFriendlyFormId } from '@/utilities';

import ConfirmationFormEditor from '../_components/confirmationFormEditor/ConfirmationFormEditor';

import styles from './page.module.scss';

function UserConfirmationsReport() {

  const { userFriendlyFormId } = useParams<{ userFriendlyFormId: string }>();
  const formId = getFormIdFromUserFriendlyFormId(userFriendlyFormId);

  const getUserConfirmationsState = useGetUserConfirmations(formId);
  const confirmationFormDetails = getUserConfirmationsState.data?.data?.data;
  const confirmations = confirmationFormDetails?.confirmations;

  const [displayConfirmationFormEditor, setDisplayConfirmationFormEditor] = useState(false);

  useEffect(() => {
    getUserConfirmationsState.refetch();
  }, []);

  const calculateTotalConfirmationsCount = useCallback(() => {

    if (confirmations.length === 0) {
      return 0;
    }

    const totalConfirmationCount = confirmations.reduce((total: number, currentItem: any) => {
      return total + currentItem.personCount;
    }, 0);

    return totalConfirmationCount;

  }, [confirmations]);

  function renderConfirmationsRow(confirmation: IUserConfirmationModel, index: number) {

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{confirmation.fullName}</td>
        <td>{confirmation.personCount}</td>
        <td>{confirmation.remark || 'NA'}</td>
      </tr>
    );

  }

  function renderUserConfirmationTable() {

    if (confirmations.length === 0) {
      return <label className={styles.noConfirmationsLabel}>No Confirmations Yet...</label>;
    }

    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Person Count</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {
              confirmations.map((confirmation: IUserConfirmationModel, index: number) => (
                renderConfirmationsRow(confirmation, index)
              ))
            }
          </tbody>
        </Table>
        <label>Note: NA indicates Not available</label>
      </>
    );

  }

  function renderContent() {

    if (getUserConfirmationsState.isPending === true) {
      return <Spinner />;
    }

    const editControlAttributes = {
      className: 'application-solid-button',
      onClick() {
        setDisplayConfirmationFormEditor(true);
      }
    };

    const totalConfirmationCount = calculateTotalConfirmationsCount();

    return (
      <>

        <div className={styles.header}>
          <h3>{confirmationFormDetails.title}</h3>
          <button {...editControlAttributes}>Edit</button>
        </div>

        <label className={styles.totalConfirmationLabel}>Total Confirmations = {totalConfirmationCount}</label>

        {renderUserConfirmationTable()}
      </>
    );
  }

  function renderConfirmationFormEditor() {

    if (displayConfirmationFormEditor === false) {
      return;
    }

    const confirmationFormEditorAttributes = {
      data: confirmationFormDetails,
      open: displayConfirmationFormEditor,
      onClose() {
        setDisplayConfirmationFormEditor(false);
        getUserConfirmationsState.refetch();
      }
    };

    return <ConfirmationFormEditor {...confirmationFormEditorAttributes} />;
  }

  return (
    <div id={styles.userConfirmationsReportMain}>
      {renderContent()}
      {renderConfirmationFormEditor()}
    </div>
  );

}

export default UserConfirmationsReport;