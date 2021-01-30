import React, { useState } from 'react';
import {
  InputBorder, InputEffectWrapper, InputLabel, InputWrapper, StyledInput,
} from './FormInput.styles';

interface FormInputProps{
    label: string;
    type: string;
    name: string;
    ref: any;
}

const FormInput = ({
  label, type, name, ref,
}:FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const toggleFocus = (content) => {
    if (content === '' || content === undefined) {
      setFocused(false);
    } else {
      setFocused(true);
    }
  };
  return (
    <InputEffectWrapper>
      <InputWrapper className={focused ? 'has-content' : ''}>
        <StyledInput autoComplete="new-password" onChange={(e) => toggleFocus(e.target.value)} type={type} name={name} ref={ref} placeholder="" />
        <InputLabel>{label}</InputLabel>
        <InputBorder><i /></InputBorder>
      </InputWrapper>
    </InputEffectWrapper>
  );
};

export default FormInput;
