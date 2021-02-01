import styled from 'styled-components';

export const Post = styled.section`

    display: grid;
    grid-template-columns: auto 200px;
    margin: 1rem 0;
`;

export const PostHeader = styled.header`
    display: flex;
    justify-content: space-between;
`;
export const PostHeading = styled.h2`

`;
export const PostDate = styled.p`
    margin-bottom: 1rem;
    position: relative;
    &::after{
        content:'';
        position: absolute;
        width: 40%;
        height: 5px;
        border-radius: 2px;
        display: block;
        background-color: ${(props) => props.theme.grayfont};
    }
`;

export const PostDetails = styled.div`
    background-color: ${(props) => props.theme.lightgray};
    padding: 1rem;

`;

export const PostContent = styled.div`
    padding: 1rem;
`;

export const PostSettings = styled.ul`
    display: flex;
`;
