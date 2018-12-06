import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  border-radius: 8px;
  max-width: 400px;
  height: 700px;
  margin: 40px auto;
  border: 1px solid #eee;
  background: #f5f5f5;
  color: #eee;
  overflow: scroll;
  display: flex;
  flex-direction: column;

  @media (max-width: 400px) {
    margin-top: 0;
    border-radius: 0;
  }
`;
