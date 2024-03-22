'use client';

import Image from 'next/image';
import { useFormik } from 'formik';

import { useChangePassword } from '@/hooks/queriesMutations/authentication';

import { IChangePasswordModel } from '@/interfaces/models/admin';

import FormInputTextControl from '@/components/formControls/FormInputTextControl';
import Spinner from '@/components/spinner/Spinner';

import securityImage from '@/assets/images/security-image.svg';

import { validateChangePasswordForm } from './utilities';

import styles from './page.module.scss';

function ChangePassword() {

  const { mutate: changePassword, isPending } = useChangePassword();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: ''
    } as IChangePasswordModel,
    validate: validateChangePasswordForm,
    onSubmit: () => {
      changePassword(formikValues);
    }
  });
  const formikValues = formik.values;
  const formikErrors = formik.errors;

  function renderImageSection() {

    const securityImageAttributes = {
      src: securityImage,
      alt: 'security',
      style: {
        width: '100%',
        height: 'auto'
      }
    };

    return (
      <div className={styles.imageSection}>
        <Image {...securityImageAttributes} />
      </div>
    );
  }

  function renderFormSection() {

    if (isPending === true) {
      return <Spinner />;
    }

    let oldPasswordError: string | undefined = '';
    let newPasswordError: string | undefined = '';

    if (formikErrors.oldPassword !== '' && formik.touched.oldPassword === true) {
      oldPasswordError = formikErrors.oldPassword;
    }

    if (formikErrors.newPassword !== '' && formik.touched.newPassword === true) {
      newPasswordError = formikErrors.newPassword;
    }

    const secureInputTextAttributes = {
      type: 'text',
      secure: true,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    const oldPasswordControlAttributes = {
      ...secureInputTextAttributes,
      label: 'Enter old password',
      placeholder: 'Enter old password',
      name: 'oldPassword',
      error: oldPasswordError,
      value: formikValues.oldPassword
    };

    const newPasswordControlAttributes = {
      ...secureInputTextAttributes,
      label: 'Enter new password',
      placeholder: 'Enter new password',
      name: 'newPassword',
      error: newPasswordError,
      value: formikValues.newPassword
    };

    const changePasswordControlAttributes = {
      className: 'application-solid-button',
      onClick() {
        formik.handleSubmit();
      }
    };

    return (
      <div className={styles.formSection}>
        <label className={styles.changePasswordLabel}>Change Password</label>
        <FormInputTextControl {...oldPasswordControlAttributes} />
        <FormInputTextControl {...newPasswordControlAttributes} />
        <button {...changePasswordControlAttributes} type='button'>Change password</button>
      </div>
    );

  }

  return (
    <div id={styles.changePasswordMain}>
      {renderImageSection()}
      {renderFormSection()}
    </div>
  );

}

export default ChangePassword;