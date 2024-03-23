import React, { useState } from 'react';

import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShareNodes } from '@fortawesome/free-solid-svg-icons';

import { IConfirmationFormCardProps } from '@/interfaces/uiInterfaces/admin';

import { extractAvatarCharacters } from '@/utilities';

import ShareFormModal from '../shareFormModal/ShareFormModal';

import styles from './ConfirmationFormCard.module.scss';

const ConfirmationFormCard: React.FC<IConfirmationFormCardProps> = (props) => {

  const { data } = props;

  const [displayShareFormModal, setDisplayShareFormModal] = useState(false);

  function renderCardControls() {

    const viewControlAttributes = {
      title: 'View Confirmations',
      className: `application-border-button ${styles.cardControl}`,
      onClick() { }
    };

    const shareControlAttributes = {
      title: 'Share Confirmation Form',
      className: `application-border-button ${styles.cardControl}`,
      onClick() {
        setDisplayShareFormModal(true);
      }
    };

    return (
      <div className={styles.cardControls}>
        <button {...viewControlAttributes}>
          <FontAwesomeIcon icon={faEye} className={styles.cardControlIcon} /> View
        </button>
        <button {...shareControlAttributes}>
          <FontAwesomeIcon icon={faShareNodes} className={styles.cardControlIcon} /> Share
        </button>
      </div>
    );

  }

  function renderShareFormModal() {

    if (displayShareFormModal === false) {
      return;
    }

    const shareFormModalAttributes = {
      data,
      open: displayShareFormModal,
      onClose() {
        setDisplayShareFormModal(false);
      }
    };

    return <ShareFormModal {...shareFormModalAttributes} />;

  }

  const avatarCharacters = extractAvatarCharacters(data.title);
  const formDate = moment(data.date).format('Do MMM YYYY');

  return (
    <div className={styles.confirmationFormCard}>

      <div className={styles.avatar}>
        <label>{avatarCharacters}</label>
      </div>

      <div className={styles.cardBody}>
        <label className={styles.formTitle}>{data.title}</label>
        <label className={styles.formDate}>{formDate}</label>
      </div>

      {renderCardControls()}
      {renderShareFormModal()}

    </div>
  );

};

export default ConfirmationFormCard;