"use client";

import React from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';

import { ILoginParamsModel } from '@/interfaces/models/authentication';

import FormInputTextControl from '@/components/formControls/FormInputTextControl';

import appLogo from '@/assets/images/app-logo.png';

import styles from "./page.module.scss";

function Login() {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    } as ILoginParamsModel,
    validate: () => { },
    onSubmit: () => { }
  });
  const formikValues = formik.values;
  const formErrors = formik.errors;

  function renderHeader() {

    const appLogoAttributes = {
      src: appLogo,
      alt: 'app-logo',
      style: {
        width: '100%',
        height: 'auto'
      }
    };

    return (
      <div className={styles.header}>
        <Image {...appLogoAttributes} />
        <label className={styles.applicationName}>GVC RSVP</label>
      </div>
    );

  }

  function renderLoginForm() {

    const usernameControlAttributes = {
      label: 'Username',
      type: 'email',
      name: 'username',
      placeholder: 'Enter username',
      value: formikValues.username,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    const passwordControlAttributes = {
      label: 'Password',
      type: 'text',
      name: 'password',
      placeholder: 'Enter password',
      secure: true,
      value: formikValues.password,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    const loginControlAttributes = {
      className: 'application-solid-button',
      onClick() { }
    };

    return (
      <div className={styles.loginForm}>
        <div className={styles.formStaticContent}>
          <label className={styles.heading}>Welcome Back, Admin 👋</label>
          <label className={styles.subHeading}>Manage Your Event/Confirmation Forms</label>
        </div>
        <FormInputTextControl {...usernameControlAttributes} />
        <FormInputTextControl {...passwordControlAttributes} />
        <button {...loginControlAttributes}>Login</button>
      </div>
    );

  }

  return (
    <div id={styles.loginMain}>
      {renderHeader()}
      <div className={styles.loginFormContainer}>
        {renderLoginForm()}
      </div>
    </div>
  );
}

export default Login;