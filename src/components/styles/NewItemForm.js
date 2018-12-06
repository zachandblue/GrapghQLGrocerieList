import styled from 'styled-components';

export const ItemForm = styled.form`
  label {
    display: flex;
    flex-direction: row;
    margin-top: 7px;
    z-index: 10;
    input {
      display: flex;
      justify-content: center;
      flex: 4;
      background: #ccc;
      height: 25px;
      z-index: 10;

      border-radius: 5px 0 0 5px;
      text-align: left;
      font-size: 15px;
      padding-left: 5px;
      color: #222;
      border: none;
      ::placeholder {
        font-size: 15px;

        color: #666;
      }
    }
    button {
      flex: 1;
      font-size: 25px;
      height: 27px;
      padding-left: 1px;
      border: none;
      background: #ccc;
      border-left: 2px solid #f5f5f5;
      color: #222;
    }
  }
`;
