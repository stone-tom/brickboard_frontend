import styled, { keyframes } from 'styled-components';

const FoldCubeAngle = keyframes`

  0%,
  10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  }

  25%,
  75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  }

  90%,
  100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  }
`;

export const Loader = styled.div<{
  width?: string,
  height?: string,
}>`
  margin: 20px auto;
  width: ${(props) => props.width || '40px'};
  height: ${(props) => props.height || '40px'};
  position: relative;
  transform: rotateZ(45deg);
`;

export const LoaderElement = styled.div`
  width: 50%;
  height: 50%;
  float: left;
  position: relative;
  transform: scale(1.1);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.brickred};
    animation: ${FoldCubeAngle} 2.4s infinite linear both;
    transform-origin: 100% 100%;
  }

  &:nth-child(2) {
    transform: scale(1.1) rotateZ(90deg);

    &:before {
      animation-delay: .3s;
    }
  }

  &:nth-child(3) {
    transform: scale(1.1) rotateZ(270deg);
  
    &:before {
      animation-delay: .9s;
    }
  }

  &:nth-child(4) {
    transform: scale(1.1) rotateZ(180deg);

    &:before {
      animation-delay: .6s;
    }
  }
`;
