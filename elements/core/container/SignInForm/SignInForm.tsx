import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthDispatch } from '../../../../context/auth';
import FormInput from '../../components/FormInput/FormInput';
import {ErrorHint, LoginButton, SignInForm, SignInInput, SignInLabel} from './SignInForm.styles';


// cool hovers: https://codepen.io/Takumari85/pen/RaYwpJ

interface LoginInputs {
    email: string;
    password: string;
  }
const SignIn=()=>{
    const { register, handleSubmit, errors, setError } = useForm<LoginInputs>();
    const {login}=useAuthDispatch();
    const [hint, setHint] = useState();
    const router = useRouter();
    const [focused,setFocused]=useState(false);
    const toggleFocus=()=>setFocused(!focused);
  
    const onSubmit = async ({ email, password }) => {
      try {
        await login(email,password);
  
        router.push("/");
      } catch ({message}) {
        setError("email", {
          type: "manual",
          message,
        });
      }
    };
    return(
    <SignInForm onSubmit={handleSubmit(onSubmit)}>
    <h2>Betrete das Brickboard</h2>
    <SignInLabel>E-Mail Adresse</SignInLabel>
    {errors.email && <ErrorHint><span>{errors.email.message}</span></ErrorHint>}
    <SignInInput
      type="email"
      name="email"
      ref={register({
        required: "Bitte gib deine E-Mail Adresse ein!",
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: "Dies ist keine valide Email!",
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
        required: "Bitte gib dein Passwort ein!",
      })}
    />
    
    <LoginButton type="submit" value="Einloggen" placeholder="Passwort" />
  
  </SignInForm>
    );
}

export default SignIn;