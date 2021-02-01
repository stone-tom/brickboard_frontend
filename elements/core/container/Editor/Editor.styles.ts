import styled from 'styled-components';

export const EditorContainer = styled.div`
    transition: all 1s;
`;

export const TitleInput = styled.input`
    padding: 1rem;
    display: block;
    width: 100%;
    margin-bottom: 2rem;
`;

export const EditorWrapper = styled.div`
    margin-bottom: 2rem;
`;

export const CharacterCount = styled.p`
    color: ${(props) => props.theme.grayfont}
`;
