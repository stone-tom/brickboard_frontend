import React from 'react';
import { useForm } from 'react-hook-form';
import { useStoreDispatch } from '../../../../context/custom_store';
import { FlexCenter } from '../../../../styles/global.styles';
import ColoredLink from '../../../core/components/ColoredNextLink/ColoredNextLink';
import {
  ErrorHint, LoginButton, SignInForm, SignInHeading, SignInInput, SignInLabel,
} from '../SignInForm/SignInForm.styles';

interface SignUpProps {
  onFailedRegistering?: any;
  onSuccess?: any;
}
interface LoginInputs {
  email: string;
  password: string;
  passwordRepeat: string;
  displayName: string;
  termsAndConditions: string;
  request: string;
}
const SignUp = ({ onFailedRegistering, onSuccess }: SignUpProps) => {
  const {
    register, handleSubmit, errors, setError,
  } = useForm<LoginInputs>();
  const { performSignup } = useStoreDispatch();

  const onSubmit = async ({
    email, displayName, password, passwordRepeat,
  }) => {
    if (password !== passwordRepeat) {
      setError('passwordRepeat', {
        type: 'manual',
        message: 'Die Passwörter stimmen nicht überein!',
      });
      return;
    }

    try {
      await performSignup(email, displayName, password, passwordRepeat);
      onSuccess({ email });
    } catch ({ message }) {
      onFailedRegistering();
      setError('request', {
        type: 'manual',
        message,
      });
    }
  };
  return (
    <SignInForm onSubmit={handleSubmit(onSubmit)}>
      <SignInHeading>Werde Teil des Brickboards!</SignInHeading>
      {errors.request && <ErrorHint><span>{errors.request.message}</span></ErrorHint>}

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
      <SignInLabel>Dein Nutzername</SignInLabel>
      {errors.displayName && <ErrorHint><span>{errors.displayName.message}</span></ErrorHint>}
      <SignInInput
        type="text"
        name="displayName"
        ref={register({
          required: 'Bitte wähle einen Nutzernamen!',
          minLength: {
            value: 3,
            message: 'Der Nutzername muss aus mindestens 3 Zeichen bestehen.',
          },
          maxLength: {
            value: 20,
            message: 'Der Nutzername darf maximal aus 20 Zeichen bestehen.',
          },
        })}
      />

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

      <SignInLabel>Ich akzeptiere die AGB (Link einfügen)</SignInLabel>
      {errors.termsAndConditions
        && <ErrorHint><span>{errors.termsAndConditions.message}</span></ErrorHint>}
      <SignInInput
        type="checkbox"
        name="termsAndConditions"
        ref={register({
          required: 'Bitte stimme der AGB zu!',
        })}
      />

      <LoginButton type="submit">
        Registrieren
      </LoginButton>
      <br />
      <FlexCenter>
        <ColoredLink href="/login" text="Du hast bereits ein Konto?" />
      </FlexCenter>
    </SignInForm>
  );
};

export default SignUp;
