import styled from 'styled-components';

export const ForumItem = styled.div`
  min-height: 50px;
  padding: .5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${(props) => props.theme.darkgray};
  border: lightgray 1px solid;
  border-radius: 2px;
  margin: 1rem 0;
  background-color: white;
  box-shadow: 0px 10px 10px ${(props) => props.theme.lightgray};
  transition: transform .4s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;
export const ForumItemImageContainer = styled.div`
  width: 10%;
  padding: .5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ForumItemContent = styled.div`
  width: 45%;
  padding: .5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: .5rem;
  border-left: lightgray 1px solid;
`;

export const ForumHeading = styled.h3`
  margin: 0;

  &:hover {
    color: ${(props) => props.theme.brickred};
  }
`;

export const ForumInfoWrapper = styled.div`
  width: 45%;
  display: flex;
  flex-wrap: wrap;
  padding: .5rem;
  border-left: ${(props) => props.theme.gray} 2px solid;
`;

export const ForumItemDetails = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(props) => props.theme.gray} 2px solid;
  padding-bottom: .5rem;
`;

export const ForumInfo = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding-top: .5rem;

  p {
    margin-top: 5px;
  }
`;

export const LastPostHeading = styled.p`
  color: ${(props) => props.theme.grayfont};
  font-weight: 400;
`;
