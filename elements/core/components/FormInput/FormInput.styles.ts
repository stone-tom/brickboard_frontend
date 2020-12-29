import styled from "styled-components";

export const InputLabel = styled.label`
  display: block;
`;

export const InputBorder = styled.span``;
export const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 1rem;
  transition: 0.4s;
  background: transparent;
  width: 100%;
  height: 100%;
  & ~ ${InputBorder} {
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: ${(props)=>props.theme.black};
      transition: 0.3s;
    }
    &::after {
      top: auto;
      bottom: 0;
      left: auto;
      right: 0;
    }
    & i::before,
    & i::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 0;
      background-color: ${(props)=>props.theme.black};
      transition: 0.4s;
    }
    & i::after {
      left: auto;
      right: 0;
      top: auto;
      bottom: 0;
    }
  }
  & ~ ${InputLabel} {
    position: absolute;
    left: 1rem;
    width: 100%;
    top: 0.8rem;
    color: #aaa;
    transition: 0.3s;
    z-index: -1;
    letter-spacing: 0.5px;
  }

  &:focus {
    outline: none;
    & ~ ${InputBorder} {
      &::before,
      &::after {
        width: 100%;
        transition: 0.3s;
      }
      & i::before,
      & i::after {
        height: 100%;
        transition: 0.4s;
      }
    }
    & ~ ${InputLabel} {
      top: -18px;
      left: 0;
      font-size: 12px;
      color: ${(props)=>props.theme.black};
      transition: 0.3s;
    }
  }
`;

export const InputWrapper = styled.div`
  
`;


export const InputEffectWrapper = styled.div`
  position: relative;
  margin: 2rem 0;
  .has-content {
    & ${StyledInput} {
      & ~ ${InputBorder} {
        &::before,
        &::after {
          width: 100%;
          transition: 0.3s;
        }
        & i::before,
        & i::after {
          height: 100%;
          transition: 0.4s;
        }
      }
      & ~ ${InputLabel} {
        top: -18px;
        left: 0;
        font-size: 12px;
        color: ${(props)=>props.theme.brickred};
        transition: 0.3s;
      }
    }
  }
`;