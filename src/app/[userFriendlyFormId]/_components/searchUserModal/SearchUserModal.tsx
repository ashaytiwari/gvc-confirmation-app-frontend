'user client';

import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useGetUserConfirmations } from '@/hooks/queriesMutations/user';

import { ISearchUserModalProps } from '@/interfaces/uiInterfaces/common';
import { IUserConfirmationModel } from '@/interfaces/models/user';

import Spinner from '@/components/spinner/Spinner';

import styles from './SearchUserModal.module.scss';

const SearchUserModal: React.FC<ISearchUserModalProps> = (props) => {

  const { formId, open, onClose, onSelect } = props;

  const getUserConfirmationsState = useGetUserConfirmations(formId);
  const userConfirmations = getUserConfirmationsState.data?.data?.data.confirmations;

  const [searchQuery, setSearchQuery] = useState('');

  function filterUserConfirmations() {

    if (searchQuery === '') {
      return userConfirmations;
    }

    const filteredUserConfirmations = userConfirmations.filter((confirmation: any) => {
      return confirmation.fullName.trim().toLowerCase().includes(searchQuery.toLowerCase());
    });

    return filteredUserConfirmations;
  }

  function renderSearchResultLabel(confirmation: IUserConfirmationModel, index: number) {

    const searchResultLabelAttributes = {
      className: styles.searchResultLabel,
      onClick() {
        onSelect(confirmation);
        onClose();
      }
    };

    return <label {...searchResultLabelAttributes} key={index}>{index + 1}. {confirmation.fullName}</label>;

  }

  function renderSearchResults() {

    if (searchQuery === '') {
      return <label className={styles.searchMessage}>No user searched and selected yet...</label>;
    }

    const filteredUserConfirmations = filterUserConfirmations();

    if (filteredUserConfirmations.length === 0) {
      return <label className={styles.searchMessage}>Search results not found...</label>;
    }

    return (
      <div className={styles.searchResults}>
        <label className={styles.searchMessage}>Click on your name to select and start editing</label>
        {
          filteredUserConfirmations.map((confirmation: IUserConfirmationModel, index: number) => (
            renderSearchResultLabel(confirmation, index)
          ))
        }
      </div>
    );

  }

  function renderModalContent() {

    if (getUserConfirmationsState.isPending === true) {
      return <Spinner />;
    }

    if (userConfirmations.length === 0) {
      return <label className={styles.searchMessage}>User Confirmations not available. Contact admin.</label>
    }

    const inputControlAttributes = {
      type: 'text',
      placeholder: 'Search for details by full name',
      value: searchQuery,
      onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value);
      }
    };

    return (
      <>
        <div className={styles.searchInputContainer}>
          <input {...inputControlAttributes} />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className={styles.searchResultsContainer}>
          {renderSearchResults()}
        </div>
      </>
    );

  }

  const modalAttributes = {
    show: open,
    onHide: onClose
  };

  return (
    <Modal {...modalAttributes}>
      <Modal.Header closeButton>
        <Modal.Title>Find & Edit Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.searchUserModalMain}>
        {renderModalContent()}
      </Modal.Body>
    </Modal>
  );

};

export default SearchUserModal;