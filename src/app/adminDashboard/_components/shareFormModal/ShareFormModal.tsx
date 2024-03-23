import React from 'react';

import { EmailShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import toast from 'react-hot-toast';
import { Modal } from 'react-bootstrap';

import { IShareFormModalProps } from '@/interfaces/uiInterfaces/admin';

import styles from './ShareFormModal.module.scss';

const ShareFormModal: React.FC<IShareFormModalProps> = (props) => {

  const { data, open, onClose } = props;

  const shareLink = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${data._id}-${extractTitleString()}`;

  function extractTitleString() {
    const titleArray = data.title.split(' ');
    return titleArray.join('-');
  }

  async function copyFormLink() {
    await navigator.clipboard.writeText(shareLink);
    toast.success('Link copied!');
  }

  function renderShareLinkContainer() {

    const copyLinkControlAttributes = {
      className: 'application-solid-button',
      onClick: copyFormLink
    };

    return (
      <div className={styles.shareLinkContainer}>
        <label className={styles.shareLink}>{shareLink}</label>
        <button {...copyLinkControlAttributes}>Copy Link</button>
      </div>
    );

  }

  function renderSocialMediaControls() {

    const title = `Invitation for ${data.title}`;

    const emailShareButtonAttributes = {
      url: shareLink,
      subject: title
    };

    const telegramShareButtonAttributes = {
      url: shareLink,
      title
    };

    const whatsappShareButtonAttributes = {
      url: shareLink,
      title
    };

    const emailShareIconAttributes = {
      icon: faEnvelope,
      className: styles.socialMediaIcons,
      title: 'Share via email'
    };

    const telegramShareIconAttributes = {
      icon: faTelegram,
      className: styles.socialMediaIcons,
      title: 'Share via telegram'
    };

    const whatsappShareIconAttributes = {
      icon: faWhatsapp,
      className: styles.socialMediaIcons,
      title: 'Share via whatsapp'
    };

    return (
      <div className={styles.socialMediaControls}>

        <EmailShareButton  {...emailShareButtonAttributes}>
          <FontAwesomeIcon {...emailShareIconAttributes} />
        </EmailShareButton>

        <TelegramShareButton {...telegramShareButtonAttributes}>
          <FontAwesomeIcon {...telegramShareIconAttributes} />
        </TelegramShareButton>

        <WhatsappShareButton {...whatsappShareButtonAttributes}>
          <FontAwesomeIcon {...whatsappShareIconAttributes} />
        </WhatsappShareButton>

      </div>
    );

  }

  function renderShareFormModalBody() {

    return (
      <Modal.Body className={styles.shareFormModalMain}>
        <label className={styles.shareLinkTitle}>Share Link</label>
        {renderShareLinkContainer()}
        {renderSocialMediaControls()}
      </Modal.Body>
    );

  }

  const modalAttributes = {
    show: open,
    onHide: onClose
  };

  return (
    <Modal {...modalAttributes}>
      <Modal.Header closeButton>
        <Modal.Title>Share Confirmation Form</Modal.Title>
      </Modal.Header>
      {renderShareFormModalBody()}
    </Modal>
  );
};

export default ShareFormModal;