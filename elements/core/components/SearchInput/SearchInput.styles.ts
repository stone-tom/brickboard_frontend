import styled, { css } from 'styled-components';
import { FormInput } from '../FormInput/FormInput.styles';

export const SearchWrapper = styled.div`
  position: relative;
  margin: 10px 0 0 0;
  padding: 0;
`;

export const SuggestionList = styled.ul<{
  noLabel?: boolean
}>`
  width: auto;
  max-height: 500px;
  overflow-y: auto;
  position: absolute;
  top: 70px;
  ${(props) => props.noLabel && css`
    top: 52px;
  `}
  margin: 0;
  padding: 0;
  z-index: 2000;
  background: #fff;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

export const SuggestionItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid ${(props) => props.theme.gray};
  list-style: none;
  width: 100%;
  transition: .3s;
  background: #fff;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: ${(props) => props.theme.gray};
    cursor: pointer;
    transition: .3s;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled(FormInput)`
  width: 100%;
  padding-right: 35px;
`;
