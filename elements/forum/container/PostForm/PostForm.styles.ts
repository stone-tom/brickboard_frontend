import styled from 'styled-components';

export const EditorContainer = styled.div`
  transition: all 1s;
`;

export const TitleInput = styled.input`
  padding: 1rem;
  display: block;
  width: 100%;
`;

export const EditorWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const CharacterCount = styled.p`
  color: ${(props) => props.theme.grayfont};
`;

export const TopicTypeSelect = styled.select`
  padding: 1rem;
  display: block;
  width: 100%;
`;

export const PostFormHeader = styled.div`
  display: flex;
`;

export const PostTitleWrapper = styled.div`
  width: 80%;
  display: block;
  margin-bottom: 2rem;
  margin-right: 1rem;
`;

export const TopicTypeWrapper = styled.div`
  width: 20%;
  display: block;
  margin-bottom: 2rem;
`;
