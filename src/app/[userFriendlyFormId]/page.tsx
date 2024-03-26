'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import moment from 'moment';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { useGetConfirmationFormDetails, useUpdateUserConfirmation } from '@/hooks/queriesMutations/user';

import { IConfirmationFormModel } from '@/interfaces/models/admin';
import { IUserConfirmationModel } from '@/interfaces/models/user';

import errorImage from '@/assets/images/error-image.svg';
import formExpiredContentImage from '@/assets/images/form-expired-image.svg';

import Spinner from '@/components/spinner/Spinner';
import FormInputTextControl from '@/components/formControls/FormInputTextControl';

import { isPastDate } from '@/utilities/formValidations';
import { getFormIdFromUserFriendlyFormId } from '@/utilities';

import { validateUserConfirmationForm } from './utilities';

import SearchUserModal from './_components/searchUserModal/SearchUserModal';

import styles from './page.module.scss';

function UserConfirmationFormEditor() {

  const { userFriendlyFormId } = useParams<{ userFriendlyFormId: string }>();
  const formId = getFormIdFromUserFriendlyFormId(userFriendlyFormId);

  const getConfirmationFormDetailsState = useGetConfirmationFormDetails(formId);
  const formDetails: IConfirmationFormModel = getConfirmationFormDetailsState.data?.data?.data;

  const { mutate: updateUserConfirmation, isPending: updateUserConfirmationPending, isSuccess, data } = useUpdateUserConfirmation();

  const [formSuccessfullySubmitted, setFormSuccessfullySubmitted] = useState(false);
  const [displaySearchUserModal, setDisplaySearchUserModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      _id: 0,
      fullName: '',
      personCount: '',
      remark: ''
    } as IUserConfirmationModel,
    validate: validateUserConfirmationForm,
    onSubmit: handleUserConfirmationFormSubmit
  });
  const formikValues = formik.values;
  const formikErrors = formik.errors;

  useEffect(() => {

    if (isSuccess === true && data.data.statusCode === 200) {
      setFormSuccessfullySubmitted(true);
    }

  }, [isSuccess, data]);

  function handleUserConfirmationFormSubmit() {

    const params = {
      confirmationFormId: formId,
      ...formikValues
    };

    updateUserConfirmation(params);
  }

  function renderErrorContent() {

    const errorImageAttributes = {
      src: errorImage,
      alt: 'security',
      style: {
        height: 'auto'
      }
    };

    return (
      <div className={styles.errorContent}>
        <Image {...errorImageAttributes} />
        <h4 className={styles.errorMessage}>{getConfirmationFormDetailsState.error?.message}...</h4>
      </div>
    );

  }

  function renderSuccessContent() {

    return (
      <div className={styles.successContent}>
        <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />
        <h4 className={styles.successMessage}>Form successfully submitted...</h4>
      </div>
    );

  }

  function renderFormExpiredContent() {

    const formExpiredContentImageAttributes = {
      src: formExpiredContentImage,
      alt: 'form-expired',
      style: {
        height: 'auto'
      }
    };

    return (
      <div className={styles.formExpiredContent}>
        <Image {...formExpiredContentImageAttributes} />
        <h4 className={styles.formExpiredMessage}>Attention: The confirmation form is officially closed for submissions.</h4>
      </div>
    );

  }

  function renderFormDetailsHeader() {

    const eventDate = moment(formDetails.date).format('Do MMM YYYY');

    const editHereControlAttributes = {
      onClick() {
        setDisplaySearchUserModal(true);
      }
    };

    return (
      <div className={styles.formDetailsHeader}>

        <div className={styles.colorRibbon}></div>

        <div className={styles.headerContent}>
          <h3>{formDetails.title}</h3>
          <label className={styles.eventDate}>{eventDate}</label>
          <label className={styles.guideMessage}>Let us know if you'll be joining us! Fill out the form to confirm. You can also enter 0 in "Number of People" if you can't make it.</label>

          <div className={styles.divider}></div>

          <label className={styles.alreadySubmittedFormLabel}>
            Already submitted your form? <span {...editHereControlAttributes}>Edit Here</span>
          </label>

          <div className={styles.divider}></div>

          <label className={styles.requiredLabel}>* Indicates required details</label>

        </div>

      </div>
    );

  }

  function renderFullNameControl() {

    let fullNameError: string | undefined = '';

    if (formikErrors.fullName !== '' && formik.touched.fullName === true) {
      fullNameError = formikErrors.fullName;
    }

    const fullNameControlAttributes = {
      placeholder: 'Enter full name',
      type: 'text',
      name: 'fullName',
      className: styles.formInput,
      error: fullNameError,
      value: formikValues.fullName,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    return (
      <div className={styles.formCard}>
        <label className={styles.formLabel}>Full Name <span>*</span></label>
        <FormInputTextControl {...fullNameControlAttributes} />
      </div>
    );

  }

  function renderNumberOfPeopleControl() {

    let noOfPeopleError: string | undefined = '';

    if (formikErrors.personCount !== '' && formik.touched.personCount === true) {
      noOfPeopleError = formikErrors.personCount;
    }

    const numberOfPeopleControlAttributes = {
      placeholder: 'Enter number of people',
      type: 'number',
      name: 'personCount',
      className: styles.formInput,
      error: noOfPeopleError,
      value: formikValues.personCount,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    return (
      <div className={styles.formCard}>
        <label className={styles.formLabel}>Number of people <span>*</span></label>
        <FormInputTextControl {...numberOfPeopleControlAttributes} />
      </div>
    );

  }

  function renderRemarkControl() {

    const remarkControlAttributes = {
      placeholder: 'Enter remark',
      type: 'text',
      name: 'remark',
      className: styles.formInput,
      value: formikValues.remark,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    return (
      <div className={styles.formCard}>
        <label className={styles.formLabel}>Remark (Additional Information or details)</label>
        <FormInputTextControl {...remarkControlAttributes} />
      </div>
    );

  }

  function renderFooterControls() {

    const submitControlAttributes = {
      className: 'application-solid-button',
      onClick() {
        formik.handleSubmit();
      }
    };

    const clearFormControlAttributes = {
      className: 'application-text-button',
      onClick() {
        formik.resetForm();
      }
    };

    return (
      <div className={styles.footerControls}>
        <button {...submitControlAttributes} type='button'>Submit</button>
        <button {...clearFormControlAttributes}>Clear Form</button>
      </div>
    );

  }

  function renderContent() {

    if (getConfirmationFormDetailsState.isPending === true || updateUserConfirmationPending === true) {
      return <Spinner fullScreen={true} />;
    }

    if (getConfirmationFormDetailsState.isError === true) {
      return renderErrorContent();
    }

    if (formSuccessfullySubmitted === true) {
      return renderSuccessContent();
    }

    if (isPastDate(formDetails.date) === true) {
      return renderFormExpiredContent();
    }

    return (
      <div className={styles.formContent}>
        {renderFormDetailsHeader()}
        {renderFullNameControl()}
        {renderNumberOfPeopleControl()}
        {renderRemarkControl()}
        {renderFooterControls()}
      </div>
    );
  }

  function renderSearchUserModal() {

    if (displaySearchUserModal === false) {
      return;
    }

    const searchUserModalAttributes = {
      formId,
      open: displaySearchUserModal,
      onClose() {
        setDisplaySearchUserModal(false);
      },
      onSelect(confirmation: IUserConfirmationModel) {
        formik.setFieldValue('_id', confirmation._id);
        formik.setFieldValue('fullName', confirmation.fullName);
        formik.setFieldValue('personCount', confirmation.personCount);
        formik.setFieldValue('remark', confirmation.remark);
      }
    };

    return <SearchUserModal {...searchUserModalAttributes} />;
  }

  return (
    <div id={styles.userConfirmationFormEditorMain}>
      {renderContent()}
      {renderSearchUserModal()}
    </div>
  );

}

export default UserConfirmationFormEditor;