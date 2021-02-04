import styled from 'styled-components';

export const FileWrapper = styled.div`
  input[type="file"]{
    &:focus{
        outline: 0;
        cursor: pointer;
    }
    &::-webkit-file-upload-button {
        border: 0;
        background: $primary-color;
        color: #fff;
        padding: em(5) em(20);
        border: 2px solid $primary-color;
        cursor: pointer;
        &:focus{
            outline: 0;
        }
        &:hover{
            background: $primary-color-darker;
            border: 2px solid $primary-color-darker;
            color: #fff;
            text-decoration: none;
        }
    }
  }
`;
