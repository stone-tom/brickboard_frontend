import React from 'react';
import { useForm } from 'react-hook-form';
import { useStoreDispatch } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import {
  ErrorHint, LoginButton, SignInForm, SignInInput, SignInLabel,
} from '../SignInForm/SignInForm.styles';

interface ResetPW {
  onSuccess?: any;
  code: string;
}

interface PasswortResetInputs {
  code: string;
  password: string;
  passwordRepeat: string;
}
const ResetPasswortComponent = ({ onSuccess, code }: ResetPW) => {
  const {
    register, handleSubmit, errors, setError,
  } = useForm<PasswortResetInputs>();
  const { performPasswordReset, setMessage } = useStoreDispatch();

  const onSubmit = async ({ password, passwordRepeat }) => {
    if (password !== passwordRepeat) {
      setError('passwordRepeat', {
        type: 'manual',
        message: 'Die Passwörter stimmen nicht überein!',
      });
      return;
    }
    try {
      await performPasswordReset(code, password, passwordRepeat);
      setMessage({
        content: 'Passwort erfolgreich zurückgesetzt!',
        type: MessageType.success,
      });
      onSuccess();
    } catch (e) {
      setMessage({
        content: `Fehler: ${e.message}`,
        type: MessageType.error,
      });
    }
  };
  return (
    <SignInForm onSubmit={handleSubmit(onSubmit)}>
      <h2>Passwort wiederherstellen.</h2>
      <p>
        Gib dein neues Passwort ein!
      </p>
      <SignInLabel>Passwort (mind. 8 Zeichen)</SignInLabel>
      {errors.password && <ErrorHint><span>{errors.password.message}</span></ErrorHint>}
      <SignInInput
        type="password"
        name="password"
        ref={register({
          required: 'Bitte gib dein Passwort ein!',
          minLength: {
            value: 8,
            message: 'Das Passwort muss mindestens 8 Zeichen haben.',
          },
        })}
      />
      <SignInLabel>Passwort wiederholen</SignInLabel>
      {errors.passwordRepeat && <ErrorHint><span>{errors.passwordRepeat.message}</span></ErrorHint>}
      <SignInInput
        type="password"
        name="passwordRepeat"
        ref={register({
          required: 'Bitte gib dein Passwort erneut ein!',
        })}
      />
      <LoginButton type="submit" value="Absenden" />
    </SignInForm>
  );
};

export default ResetPasswortComponent;
