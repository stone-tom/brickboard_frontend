import styled from 'styled-components';

export const PersonalInformationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${(props) => props.theme.lightgray};
`;

export const Wrapper = styled.div`
  background: ${(props) => props.theme.white};
  display: flex;
  flex-wrap: wrap;
  margin: 0 15px 15px 15px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.gray};
  border-top: 0;
`;
