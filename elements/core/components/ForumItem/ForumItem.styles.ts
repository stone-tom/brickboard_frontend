import styled from 'styled-components';

export const ForumItem=styled.div`
    min-height: 50px;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: ${(props)=>props.theme.darkgray};
    border: lightgray 1px solid;
    border-radius: 2px;
    margin: 1rem 0;
    background-color: white;
    box-shadow: 0px 10px 10px ${(props)=>props.theme.lightgray};
    transition: transform 0.4s ease-in-out;
    &:hover{
        transform: scale(1.01);
    }
`;
export const ForumItemImageContainer=styled.div`
    width: 10%;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
export const ForumItemDetails=styled.div`
    display: inline-flex;
    min-width: 100px;
    margin-left: 1rem;
`;

export const ForumItemContent=styled.div`
    width: 70%;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.5rem;
      border-left: lightgray 1px solid;
      
`;

export const ForumHeading=styled.h3`
    margin: 0;
    &:hover{
        color: ${(props)=>props.theme.brickred};
    }
`;

export const ForumInfo=styled.div`
    width: 20%;
    display: flex;
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content:center;
    padding-left: 0.5rem;
      border-left: lightgray 1px solid;
`;