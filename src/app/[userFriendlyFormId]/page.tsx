'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import moment from 'moment';
import { useFormik } from 'formik';

import { useGetConfirmationFormDetails } from '@/hooks/queriesMutations/user';

import { IConfirmationFormModel } from '@/interfaces/models/admin';
import { IUserConfirmationModel } from '@/interfaces/models/user';

import errorImage from '@/assets/images/error-image.svg';

import Spinner from '@/components/spinner/Spinner';
import FormInputTextControl from '@/components/formControls/FormInputTextControl';

import { getFormIdFromUserFriendlyFormId } from './utilities';

import styles from './page.module.scss';

function UserConfirmationFormEditor() {

  const { userFriendlyFormId } = useParams<{ userFriendlyFormId: string }>();
  const formId = getFormIdFromUserFriendlyFormId(userFriendlyFormId);

  const { data: responseData, isPending, isError, error, isSuccess } = useGetConfirmationFormDetails(formId);
  const formDetails: IConfirmationFormModel = responseData?.data?.data;

  const formik = useFormik({
    initialValues: {
      _id: 0,
      fullName: '',
      personCount: '',
      remark: ''
    } as IUserConfirmationModel,
    validate: () => { },
    onSubmit: () => { }
  });
  const formikValues = formik.values;
  const formikErrors = formik.errors;

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
        <h4 className={styles.errorMessage}>{error?.message}...</h4>
      </div>
    );

  }

  function renderFormDetailsHeader() {

    const eventDate = moment(formDetails.date).format('Do MMM YYYY');

    return (
      <div className={styles.formDetailsHeader}>

        <div className={styles.colorRibbon}></div>

        <div className={styles.headerContent}>
          <h3>{formDetails.title}</h3>
          <label className={styles.eventDate}>{eventDate}</label>
          <label className={styles.guideMessage}>Let us know if you'll be joining us! Fill out the form to confirm. You can also enter 0 in "Number of People" if you can't make it.</label>

          <div className={styles.divider}></div>

          <label className={styles.alreadySubmittedFormLabel}>Already submitted your form? <span>Edit Here</span></label>

          <div className={styles.divider}></div>

          <label className={styles.requiredLabel}>* Indicates required details</label>

        </div>

      </div>
    );

  }

  function renderFullNameControl() {

    const fullNameControlAttributes = {
      placeholder: 'Enter full name',
      type: 'text',
      name: 'fullName',
      className: styles.formInput,
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

    const numberOfPeopleControlAttributes = {
      placeholder: 'Enter number of people',
      type: 'number',
      name: 'personCount',
      className: styles.formInput,
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
      onClick() { }
    };

    const clearFormControlAttributes = {
      className: 'application-text-button',
      onClick() {
        formik.resetForm();
      }
    };

    return (
      <div className={styles.footerControls}>
        <button {...submitControlAttributes}>Submit</button>
        <button {...clearFormControlAttributes}>Clear Form</button>
      </div>
    );

  }

  function renderContent() {

    if (isPending === true) {
      return <Spinner fullScreen={true} />;
    }

    if (isError === true) {
      return renderErrorContent();
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

  return (
    <div id={styles.userConfirmationFormEditorMain}>
      {renderContent()}
    </div>
  );

}

export default UserConfirmationFormEditor;