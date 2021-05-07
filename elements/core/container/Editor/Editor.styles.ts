import styled from 'styled-components';

export const EditorContainer = styled.div`
  z-index: 0;
  transition: all 1s;
  margin-bottom: 2rem;

  @media ${(props) => props.theme.breakpoints.sm} {
    .sun-editor {
      width: 300px !important;
    }
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    .sun-editor {
      width: 300px;
    }
  }
`;
