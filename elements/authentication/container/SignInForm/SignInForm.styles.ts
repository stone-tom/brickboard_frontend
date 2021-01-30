import styled from 'styled-components';

export const SignInForm = styled.form`
    padding: 2rem;
    box-shadow: 0 0 10px ${(props) => props.theme.darkgray}; 
    max-width: 500px;
    border-radius: 5px;
    margin: 4rem 0;
    position: relative;
`;

export const SignInInput = styled.input`
    display: block;
    padding: 1rem;
    border: 2px solid ${(props) => props.theme.darkgray}; 
    width: 100%;
    border-radius: 2px;
    margin: 0 0 1rem 0;
    transition: 0.4s;
    position: relative;

`;

export const LoginButton = styled.input`
    display: block;
    width: 100%;
    padding: 1rem;
    cursor: pointer;
    background-color: ${(props) => props.theme.brickred}; 
    color: ${(props) => props.theme.white}; 
`;
export const SignInLabel = styled.label`
    display: block;
    margin: 1rem 0 0.5rem 0;
    width: 100%;
`;

export const ErrorHint = styled.p`
    transition: all 0.4s;
    background-color: ${((props) => props.theme.warning)};
    padding: 0.5rem;
    margin: 0.5rem 0;
`;
