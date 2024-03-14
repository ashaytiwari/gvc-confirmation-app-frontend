"use client";

import React from 'react';

import { IFormDateInputControl } from '@/interfaces/uiInterfaces/formControls';

const FormDateInputControl: React.FC<IFormDateInputControl> = (props) => {

  const { label, name, disabled, value, error, maxDate, minDate, onChange, onBlur } = props;

  function renderLabel() {

    if (typeof label === 'undefined') {
      return;
    }

    return <label className='form-control-label'>{label}</label>;
  }

  function renderInputControl() {

    const inputControlAttributes = {
      type: 'date',
      name,
      className: error ? 'error' : '',
      value,
      max: maxDate,
      min: minDate,
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

export default FormDateInputControl;