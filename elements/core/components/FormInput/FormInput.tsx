import React, {
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import {
  FormInput,
  InputLabel,
} from './FormInput.styles';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  error?: boolean,
  chlidren?: ReactNode,
  onChange?: (event: string) => void,
  disabled?: boolean,
}

const FormInputComponent = ({
  children,
  name,
  type = 'text',
  required = false,
  error = false,
  value,
  onChange,
  disabled,
  ...rest
}: TextInputProps) => (
  <InputLabel htmlFor={name}>
    {children ? `${children}:` : null}
    {required ? ' *' : null}
    <FormInput
      disabled={disabled}
      error={error}
      type={type}
      id={name}
      name={name}
      required={required}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      {...rest}
    />
  </InputLabel>
);

export default FormInputComponent;
