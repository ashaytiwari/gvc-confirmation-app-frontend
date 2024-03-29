'use client';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useGetConfirmationForms } from '@/hooks/queriesMutations/admin';

import { IAdminDashboardRootStateModel } from '@/interfaces/uiInterfaces/admin';
import { IConfirmationFormModel, IConfirmationFormsStateModel } from '@/interfaces/models/admin';

import Spinner from '@/components/spinner/Spinner';
import NoDataFoundSection from '@/components/noDataFoundSection/NoDataFoundSection';

import ConfirmationFormCard from './_components/confirmationFormCard/ConfirmationFormCard';
import ConfirmationFormEditor from './_components/confirmationFormEditor/ConfirmationFormEditor';

import styles from './page.module.scss';

function AdminDashboard() {

  const [rootState, setRootState] = useState<IAdminDashboardRootStateModel>({
    title: '',
    page: 1,
    displayConfirmationFormEditor: false
  });

  const { data: responseData, isPending, isFetching, refetch } = useGetConfirmationForms(rootState.page, rootState.title);
  const confirmationFormsState: IConfirmationFormsStateModel = responseData?.data?.data;

  function handlePreviousControlClick() {
    setRootState((_rootState) => {
      return {
        ..._rootState,
        page: _rootState.page - 1
      };
    });
  }

  function handleNextControlClick() {
    setRootState((_rootState) => {
      return {
        ..._rootState,
        page: _rootState.page + 1
      };
    });
  }

  function renderConfirmationFormEditor() {

    if (rootState.displayConfirmationFormEditor === false) {
      return;
    }

    const confirmationFormEditorAttributes = {
      open: rootState.displayConfirmationFormEditor,
      onClose() {
        setRootState({
          ...rootState,
          displayConfirmationFormEditor: false
        });
      }
    };

    return <ConfirmationFormEditor {...confirmationFormEditorAttributes} />;

  }

  function renderPaginationFooter() {

    if (isPending === true) {
      return;
    }

    const previousControlAttributes = {
      className: styles.paginationControl,
      disabled: rootState.page === 1,
      onClick: handlePreviousControlClick
    };

    const nextControlAttributes = {
      className: styles.paginationControl,
      disabled: rootState.page === confirmationFormsState?.totalPages,
      onClick: handleNextControlClick
    };

    return (
      <div className={styles.paginationFooter}>
        <button {...previousControlAttributes}><FontAwesomeIcon icon={faChevronLeft} /></button>
        <label className={styles.paginationLabel}>
          Page <span className={styles.pageCount}>{rootState.page}</span> of <span className={styles.pageCount}>{confirmationFormsState?.totalPages}</span>
        </label>
        <button {...nextControlAttributes}><FontAwesomeIcon icon={faChevronRight} /></button>
      </div>
    );

  }

  function renderSearchBar() {

    const searchInputControlAttributes = {
      className: styles.searchBarInput,
      type: 'text',
      placeholder: 'Search by title',
      value: rootState.title,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setRootState((_rootState) => {
          return {
            ..._rootState,
            title: event.target.value
          };
        })
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') {
          return;
        }
        refetch();
      }
    };

    const searchControlAttributes = {
      className: styles.searchControl,
      onClick() {
        refetch();
      }
    };

    return (
      <div className={styles.searchBarContainer}>
        <input {...searchInputControlAttributes} />
        <button {...searchControlAttributes}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    );

  }

  function renderConfirmationFormCard(confirmationForm: IConfirmationFormModel) {

    const confirmationCardAttributes = {
      data: confirmationForm,
      key: confirmationForm._id
    };

    return <ConfirmationFormCard {...confirmationCardAttributes} key={confirmationForm._id} />;
  }

  function renderConfirmationForms() {

    if (isPending || isFetching) {
      return <Spinner />;
    }

    const _confirmationForms = confirmationFormsState.confirmationForms;

    if (_confirmationForms.length === 0) {
      return <NoDataFoundSection />;
    }

    return (
      <div className={styles.confirmationFormsContainer}>
        {
          _confirmationForms.map((confirmationForm) => (
            renderConfirmationFormCard(confirmationForm)
          ))
        }
      </div>
    );
  }

  const createNewControlAttributes = {
    className: `application-solid-button ${styles.createNewControl}`,
    onClick() {
      setRootState({
        ...rootState,
        displayConfirmationFormEditor: true
      });
    }
  };

  return (
    <div id={styles.adminDashboardMain}>

      <div className={styles.header}>
        <label>Confirmation Forms</label>
        <button {...createNewControlAttributes}>Create New</button>
      </div>

      {renderConfirmationFormEditor()}
      {renderSearchBar()}
      {renderConfirmationForms()}
      {renderPaginationFooter()}

    </div>
  );

}

export default AdminDashboard;