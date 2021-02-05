import React from 'react';
import { useForm } from 'react-hook-form';
import { useStoreDispatch } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import {
  ErrorHint, LoginButton, SignInForm, SignInInput, SignInLabel,
} from '../SignInForm/SignInForm.styles';

interface ForgotPW {
  onSuccess?: any;
}

interface ForgotInputs {
  email: string;
}
const ForgotPasswortComponent = ({ onSuccess }: ForgotPW) => {
  const {
    register, handleSubmit, errors, setError,
  } = useForm<ForgotInputs>();
  const { performPasswordResetStart, setMessage } = useStoreDispatch();

  const onSubmit = async ({ email }) => {
    try {
      await performPasswordResetStart(email);
      setMessage({
        content: 'Eine E-Mail wurde verschickt',
        type: MessageType.success,
      });
      onSuccess();
    } catch (e) {
      setError('email', {
        type: 'manual',
        message: e.message,
      });
    }
  };
  return (
    <SignInForm onSubmit={handleSubmit(onSubmit)}>
      <h2>Passwort vergessen?</h2>
      <p>
        Bitte teile uns deine E-Mail Adresse mit.
      </p>
      <p>
        Du bekommst einen Link per Mail um es neu zu setzen!
      </p>
      <SignInLabel>E-Mail Adresse</SignInLabel>
      {errors.email && <ErrorHint><span>{errors.email.message}</span></ErrorHint>}
      <SignInInput
        type="email"
        name="email"
        ref={register({
          required: 'Bitte gib deine E-Mail Adresse ein!',
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'Dies ist keine valide Email!',
          },
        })}
      />
      <LoginButton type="submit">
        Absenden
      </LoginButton>
    </SignInForm>
  );
};

export default ForgotPasswortComponent;
