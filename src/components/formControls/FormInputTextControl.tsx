"use client";

import React from 'react';

import { IFormInputTextControl } from '@/interfaces/uiInterfaces/formControls';

import SecureInputField from '../secureInputField/SecureInputField';

const FormInputTextControl: React.FC<IFormInputTextControl> = (props) => {

  const { label, name, type, disabled, secure, placeholder, className, value, error, onChange, onBlur } = props;

  function renderLabel() {

    if (typeof label === 'undefined') {
      return;
    }

    return <label className='form-control-label'>{label}</label>;
  }

  function renderInputControl() {

    if (secure === true) {

      const secureInputFieldProps = {
        name,
        value,
        placeholder,
        error: error ? true : false,
        onChange,
        onBlur
      };

      return <SecureInputField {...secureInputFieldProps} />;
    }

    let inputClassName = typeof className === 'undefined' ? '' : className;

    if (error) {
      inputClassName += ` error`;
    }

    const inputControlAttributes = {
      type,
      name,
      autoComplete: 'off',
      className: inputClassName,
      placeholder: placeholder ? placeholder : '',
      value,
      disabled: disabled ? disabled : false,
      onChange,
      onBlur
    };

    return <input {...inputControlAttributes} />;
  }

  function renderErrorMessage() {

    if (!error) {
      return;
    }

    return <label className='form-error-message'>{error}</label>;

  }

  return (
    <div className='form-control-group'>
      {renderLabel()}
      {renderInputControl()}
      {renderErrorMessage()}
    </div>
  );

};

export default FormInputTextControl;