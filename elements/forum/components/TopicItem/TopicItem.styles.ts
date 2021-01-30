import styled from 'styled-components';

export const TopicItem = styled.div<{
    updated: boolean
}>`

    min-height: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: ${(props) => props.theme.darkgray};
    border: lightgray 1px solid;
    border-radius: 2px;
    padding: 0.2rem;
    margin: 0.5rem 0;
    box-shadow: 0px 10px 10px ${(props) => props.theme.lightgray};

    transition: background-color 0.4s;
    &:hover{
        background-color: ${(props) => props.theme.lightgray};
    }
`;

export const TopicHeading = styled.h3<{
    updated: boolean
}>`
    &:hover{
        color: ${(props) => props.theme.brickred};
    }
`;

export const TopicIcon = styled.div<{
    updated?: boolean,
}>`
        display:flex;
      width: 5%;
      align-items: center;
      justify-content: center;
      color: ${(props) => (props.updated ? props.theme.brickred : props.theme.darkgray)};
      svg{
          max-height: 50px;
      }
`;

export const TopicInfo = styled.div`
  width: 70%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.5rem;
      border-left: lightgray 1px solid;
`;

export const TopicInfoDetails = styled.div`
display: flex;
        align-items: center;

        p{
            margin: 0 1rem;

        }
        svg{
            margin-right: 10px;
        }
        span{
            max-width: 30px;
            display: inline-block;
        }
      
`;

export const TopicActivity = styled.div`
  width: 25%;
      padding-left: 0.5rem;
      border-left: lightgray 1px solid;
`;
