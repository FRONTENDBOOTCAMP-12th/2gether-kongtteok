import React, { ChangeEvent } from 'react';
import InputText from '@/components/InputText';
import InputButtonSet from '@/components/InputButtonSet';

interface FormFieldProps {
  fieldType: 'text' | 'password' | 'withButton';
  labelText: string;
  name: string;
  placeholder: string;
  value: string;
  error: string;
  isSuccess?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
  buttonText?: string;
}

const FormField = ({
  fieldType,
  labelText,
  name,
  placeholder,
  value,
  error,
  isSuccess = false,
  onChange,
  onButtonClick,
  buttonText,
}: FormFieldProps) => {
  const renderError = () => {
    return error ? (
      <p className={`absolute top-full left-0 mt-1.5 text-xs ${isSuccess ? 'text-positive' : 'text-warning'}`}>
        {error}
      </p>
    ) : null;
  };

  return (
    <fieldset className="relative">
      <legend className="sr-only">{labelText} 입력</legend>

      {fieldType === 'withButton' ? (
        <InputButtonSet
          inputType="text"
          labelText={labelText}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onClick={onButtonClick}>
          {buttonText}
        </InputButtonSet>
      ) : (
        <InputText
          labelText={labelText}
          type={fieldType}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}

      {renderError()}
    </fieldset>
  );
};

export default FormField;
