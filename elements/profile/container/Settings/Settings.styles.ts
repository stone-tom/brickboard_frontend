import styled from 'styled-components';

export const SettingsWrapper = styled.div`
  margin: 0 15px 15px 15px;
  border: 1px solid ${(props) => props.theme.gray};
  background: ${(props) => props.theme.white};
  border-top: 0;
  padding: 50px;
  width: 100%;
`;
