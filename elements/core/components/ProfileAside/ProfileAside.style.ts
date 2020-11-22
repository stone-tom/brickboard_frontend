import styled from 'styled-components';

export const ProfileAside=styled.aside`

    background-color: ${(props)=>props.theme.gray};
`;

export const ImageWrapper=styled.div`

    
`;

export const ProfileAsideHeading=styled.h3`
    background-color: ${(props)=>props.theme.brickred};
    color: white;
    padding: 0.5rem;
    text-align: center;

`;
export const ProfileCondensedInfo=styled.div`
    display: grid;
    /* grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr; */
    height: 200px
`;