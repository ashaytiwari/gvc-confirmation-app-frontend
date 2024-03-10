"use client";

import React from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';

import { useAdminLogin } from '@/hooks/queriesMutations/authentication';

import { ILoginParamsModel } from '@/interfaces/models/authentication';

import FormInputTextControl from '@/components/formControls/FormInputTextControl';
import Spinner from '@/components/spinner/Spinner';

import appLogo from '@/assets/images/app-logo.png';

import { validateLoginForm } from './utilities';

import styles from "./page.module.scss";

function Login() {

  const { mutate: adminLogin, isPending } = useAdminLogin();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    } as ILoginParamsModel,
    validate: validateLoginForm,
    onSubmit() {
      adminLogin(formikValues);
    }
  });
  const formikValues = formik.values;
  const formikErrors = formik.errors;

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

    if (isPending === true) {
      return <Spinner />;
    }

    let usernameError: string | undefined = '';
    let passwordError: string | undefined = '';

    if (formikErrors.username !== '' && formik.touched.username === true) {
      usernameError = formikErrors.username;
    }

    if (formikErrors.password !== '' && formik.touched.password === true) {
      passwordError = formikErrors.password;
    }

    const usernameControlAttributes = {
      label: 'Username',
      type: 'email',
      name: 'username',
      placeholder: 'Enter username',
      error: usernameError,
      value: formikValues.username,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    const passwordControlAttributes = {
      label: 'Password',
      type: 'text',
      name: 'password',
      placeholder: 'Enter password',
      error: passwordError,
      secure: true,
      value: formikValues.password,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur
    };

    const loginControlAttributes = {
      className: 'application-solid-button',
      onClick() {
        formik.handleSubmit();
      }
    };

    return (
      <div className={styles.loginForm}>
        <div className={styles.formStaticContent}>
          <label className={styles.heading}>Welcome Back, Admin 👋</label>
          <label className={styles.subHeading}>Manage Your Event/Confirmation Forms</label>
        </div>
        <FormInputTextControl {...usernameControlAttributes} />
        <FormInputTextControl {...passwordControlAttributes} />
        <button {...loginControlAttributes} type='button'>Login</button>
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