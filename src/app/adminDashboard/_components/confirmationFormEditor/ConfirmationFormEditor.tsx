'use client';

import React, { useEffect } from 'react';

import moment from 'moment';
import { Offcanvas } from 'react-bootstrap';
import { useFormik } from 'formik';

import { useUpdateConfirmationForm } from '@/hooks/queriesMutations/admin';

import { IConfirmationFormEditorProps } from '@/interfaces/uiInterfaces/common';
import { IConfirmationFormModel } from '@/interfaces/models/admin';

import FormInputTextControl from '@/components/formControls/FormInputTextControl';
import FormDateInputControl from '@/components/formControls/FormDateInputControl';
import Spinner from '@/components/spinner/Spinner';

import { validateConfirmationForm } from './utilities';

import styles from './ConfirmationFormEditor.module.scss';

const ConfirmationFormEditor: React.FC<IConfirmationFormEditorProps> = (props) => {

  const { open, onClose } = props;

  const { mutate: updateConfirmationForm, isPending, isSuccess } = useUpdateConfirmationForm();

  const formik = useFormik({
    initialValues: {
      _id: 0,
      title: '',
      date: ''
    } as IConfirmationFormModel,
    validate: validateConfirmationForm,
    onSubmit: handleSubmitConfirmationForm
  });
  const formikValues = formik.values;
  const formikErrors = formik.errors;

  useEffect(() => {

    if (isSuccess === false) {
      return;
    }

    formik.resetForm();
    onClose();

  }, [isSuccess]);

  function handleSubmitConfirmationForm() {
    updateConfirmationForm(formikValues);
  }

  function renderEditorBody() {

    if (isPending === true) {
      return <Spinner />;
    }

    const minimumDate = moment().format('YYYY-MM-DD');

    let titleError: string | undefined = '';
    let dateError: string | undefined = '';

    if (formikErrors.title !== '' && formik.touched.title === true) {
      titleError = formikErrors.title;
    }

    if (formikErrors.date !== '' && formik.touched.date === true) {
      dateError = formikErrors.date;
    }

    const titleControlAttributes = {
      label: 'Title',
      placeholder: 'Enter title',
      type: 'text',
      name: 'title',
      error: titleError,
      value: formikValues.title,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    const dateControlAttributes = {
      label: 'Date',
      name: 'date',
      error: dateError,
      minDate: minimumDate,
      value: formikValues.date,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    const saveControlAttributes = {
      className: 'application-solid-button',
      onClick() {
        formik.handleSubmit();
      }
    };

    return (
      <Offcanvas.Body className={styles.confirmationEditorMain}>
        <div className={styles.formControls}>
          <FormInputTextControl {...titleControlAttributes} />
          <FormDateInputControl {...dateControlAttributes} />
        </div>
        <button {...saveControlAttributes} type='button'>Save</button>
      </Offcanvas.Body>
    );

  }

  const offcanvasAttributes = {
    show: open,
    onHide: onClose,
  };

  return (
    <Offcanvas {...offcanvasAttributes} placement='end'>

      <Offcanvas.Header closeButton className='border-bottom'>
        <Offcanvas.Title>Confirmation Form</Offcanvas.Title>
      </Offcanvas.Header>

      {renderEditorBody()}

    </Offcanvas>
  );

};

export default ConfirmationFormEditor;