import styled from 'styled-components';

export const ProfileBarWrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.gray};
`;

export const Username = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

export const Statistics = styled.div`
  display: flex;
  flex-direction: row;
`;
