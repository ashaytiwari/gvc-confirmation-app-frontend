import React from 'react';

import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShareNodes } from '@fortawesome/free-solid-svg-icons';

import { IConfirmationFormCardProps } from '@/interfaces/uiInterfaces/admin';

import { extractAvatarCharacters } from '@/utilities';

import styles from './ConfirmationFormCard.module.scss';

const ConfirmationFormCard: React.FC<IConfirmationFormCardProps> = (props) => {

  const { data } = props;

  function renderCardControls() {

    const viewControlAttributes = {
      title: 'View Confirmations',
      className: `application-border-button ${styles.cardControl}`,
      onClick() { }
    };

    const shareControlAttributes = {
      title: 'Share Confirmation Form',
      className: `application-border-button ${styles.cardControl}`,
      onClick() { }
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

    </div>
  );

};

export default ConfirmationFormCard;