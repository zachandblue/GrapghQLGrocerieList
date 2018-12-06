import styled from 'styled-components';

export const StyledItem = styled.div`
  display: flex;

  background: #767e76;
  height: 27px;
  margin-top: 5px;
  line-height: 16px;
  font-size: 16px;
  border-radius: 5px;
  text-align: left;
  .main {
    flex: 4;
    border-radius: 5px 0 0 5px;
    background: #767e76;
  }

  .completed {
    background: #767e76;
  }
  h4 {
    flex: 4;
    line-height: 16px;
    margin: 5px;
    padding: 0;
  }
  button {
    flex: 1;
    font-size: 25px;
    height: 27px;
    border: none;
    background: #767e76;
    padding-left: 1px;
    border-left: 2px solid #f5f5f5;
  }
`;
