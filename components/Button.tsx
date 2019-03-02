import styled from '@self/styles/styled';

let Button = styled('button')`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.color.link};
  padding: 1rem;
  border-radius: 5px;
  border: 0;
  color: ${({ theme }) => theme.color.background};
  font-size: 1.4rem;

  :disabled {
    background: ${({ theme }) => theme.color.text};
    cursor: not-allowed;
  }

  :disabled:hover {
    background: ${({ theme }) => theme.color.text};
  }

  :hover {
    background: ${({ theme }) => theme.color.linkActive};
  }
`;

export default Button;
