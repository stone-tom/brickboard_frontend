import styled, { css } from 'styled-components';
import LogoSVG from '../../../../assets/icons/brick.svg';
import ArrowSVG from '../../../../assets/icons/arrow_right_alt.svg';

export const NavigationWrapper = styled.nav<{
  small?: boolean,
}>`
  position: fixed;
  width: 280px;
  height: 100vh;
  display: block;
  top: 0;
  left: 0;
  transition: all .4s ease 0s;
  background: red;
  z-index: 9000;

  ${(props) => props.small && css`
    width: 80px;
  `};
`;

export const OpenArrowButton = styled.button<{
  small?: boolean
}>`
  position: absolute;
  bottom: 20px;
  left: 15px;
  border: 0;
  outline: 0;
  background: transparent;
  transition: all .4s ease 0s;
`;

export const OpenArrowIcon = styled(ArrowSVG) <{
  small?: boolean
}>`
  transition: all .4s ease 0s;
  color: #fff;
  ${(props) => !props.small && css`
    transform: rotate(-180deg);
  `}

    width: 34px;
    height: 34px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
`;

export const Logo = styled(LogoSVG)<{
  small?: boolean,
}>`
  display: block;
  color: #fff;
  margin: 20px auto;
  transition: all .4s ease 0s;

  ${(props) => props.small && css`
    margin: 0 auto 80px auto;
    width: 80px;
    height: 70px;i
  `}
`;
