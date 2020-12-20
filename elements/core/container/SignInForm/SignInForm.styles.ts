import styled from "styled-components";

export const SignInForm=styled.form`
    padding: 2rem;
    box-shadow: 0 0 10px ${(props)=>props.theme.darkgray}; 
    max-width: 500px;
    border-radius: 5px;
    margin: 4rem 0;
    position: relative;
`;


export const SignInInput= styled.input`
    display: block;
    padding: 1rem;
    border: 2px solid ${(props)=>props.theme.darkgray}; 
    width: 100%;
    border-radius: 5px;
    margin: 1rem 0;
    transition: 0.4s;
    position: relative;

`;

export const LoginButton=styled.input`
    display: block;
    width: 100%;
    padding: 1rem;
`;