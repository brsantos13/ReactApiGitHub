import styled, { keyframes, css } from 'styled-components';

interface ErrorRequest {
  error: boolean;
}

export const AlertErro = styled.div`
  padding-top: 8px;
  text-align: center;
  text-transform: uppercase;
  color: red;
`;

export const Input = styled.input<ErrorRequest>`
  flex: 1;
  border: 1px solid #eee;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  ${(props) =>
    props.error &&
    css`
      box-shadow: 0 0 5px 3px red;
    `}
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

interface Load {
  readonly loading: boolean;
}

export const SubmitButton = styled.button<Load>`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.loading &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  & + li {
    border-top: 1px solid #eee;
  }

  a {
    color: #7159c1;
    text-decoration: none;
  }
`;
