import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStoreDispatch } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import { FlexCenter } from '../../../../styles/global.styles';
import ColoredLink from '../../../core/components/ColoredNextLink/ColoredNextLink';
import {
  ErrorHint, LoginButton, SignInForm, SignInHeading, SignInInput, SignInLabel,
} from './SignInForm.styles';

interface LoginInputs {
  email: string;
  password: string;
}
const SignIn = () => {
  const {
    register, handleSubmit, errors, setError,
  } = useForm<LoginInputs>();
  const { performLogin, setMessage } = useStoreDispatch();
  const router = useRouter();

  const onSubmit = async ({ email, password }) => {
    try {
      await performLogin(email, password);
      setMessage({
        content: 'Erfolgreich eingeloggt',
        type: MessageType.success,
      });
      router.push('/');
    } catch (e) {
      setError('email', {
        type: 'manual',
        message: e.message,
      });
    }
  };
  return (
    <SignInForm onSubmit={handleSubmit(onSubmit)}>
      <SignInHeading>Betrete das Brickboard</SignInHeading>
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
      <SignInLabel>Passwort</SignInLabel>
      {errors.password && <ErrorHint><span>{errors.password.message}</span></ErrorHint>}
      <SignInInput
        type="password"
        name="password"
        placeholder="Password"
        ref={register({
          required: 'Bitte gib dein Passwort ein!',
        })}
      />

      <LoginButton type="submit">
        Einloggen
      </LoginButton>
      <br />
      <FlexCenter>
        <ColoredLink href="/registrieren" text="Du hast noch kein Konto?" />
      </FlexCenter>
      <br />
      <FlexCenter>
        <ColoredLink href="/account/passwort-vergessen" text="Passwort vergessen?" />
      </FlexCenter>

    </SignInForm>
  );
};

export default SignIn;
