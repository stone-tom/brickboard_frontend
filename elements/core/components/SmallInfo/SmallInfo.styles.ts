import styled from 'styled-components';

export const SmallInfo = styled.div`
    display: inline-flex;
    align-items: center;
    p{
        margin-left: 0.5rem;
    }
    span{
        max-width: 20px;
        color: ${(props) => props.theme.darkgray}
    }
`;
