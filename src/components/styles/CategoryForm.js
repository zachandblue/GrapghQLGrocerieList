import styled from 'styled-components';

export const CategoryForm = styled.form`
  display: flex;
  flex-direction: row;
  background: #ddd;
  border-radius: 5px;
  padding: 0;
  padding-left: 5px;
  margin: 7px 7px 0 7px;

  label {
    display: flex;
    flex: 4;
    flex-direction: column;
    flex: 4;
    input {
      font-size: 25px;

      background: #ddd;
      border: none;
      color: #222;
      ::placeholder {
        color: #666;
      }
    }
  }

  button {
    flex: 1;
    background: #ddd;
    color: #222;
    padding-left: 1px;
  }
`;
