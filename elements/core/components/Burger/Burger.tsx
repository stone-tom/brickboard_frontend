import React, { ButtonHTMLAttributes } from 'react';
import { StyledBurger } from './Burger.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean,
}

const Burger = ({ open, ...rest }: ButtonProps) => (
  <StyledBurger open={open} {...rest}>
    <div />
    <div />
    <div />
  </StyledBurger>
);

export default Burger;
