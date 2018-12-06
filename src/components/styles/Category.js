import styled from 'styled-components';

export const CategoryContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
  margin: 7px 7px 0px 7px;

  .main {
    display: flex;
    background: #336699;
    border-radius: 5px;
    padding-left: 4px;

    h1 {
      margin: 0;
      padding: 0;
      padding-left: 5px;
      flex: 4;
      font-size: 25px;
      line-height: 35px;
      text-align: left;
    }
    button {
      padding-left: 1px;
      background: #336699;
      padding-left: 2px;
      height: 35px;
    }

    .completed {
      background: #0b5;
    }
  }

  .completed {
    background: #0b5;
  }

  .items {
    width: 99%;
    margin-left: 1%;
    form {
      background: #555;
      height: 25px;
      line-height: 25px;
      border-radius: 5px;
      margin: 5px 0;
    }
  }
`;
