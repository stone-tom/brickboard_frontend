import styled from "styled-components";

export const RightButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const BBButton = styled.a`
  background-color: ${(props) => props.theme.brickred};
  color: ${(props) => props.theme.white};
  display: inline-flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.brickred};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: transparent;
    color: ${(props) => props.theme.brickred};
  }
`;
export const BBButtonIcon = styled.span`
  margin-right: 10px;
  font-size: 1.5rem;
`;
