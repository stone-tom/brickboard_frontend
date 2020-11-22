import styled from "styled-components";

export const Post = styled.section`

    display: grid;
    grid-template-columns: auto 200px;
`;

export const PostDetails=styled.div`
    background-color: ${(props)=>props.theme.lightgray};
`;

export const PostContent=styled.div`
    padding: 1rem;
`;