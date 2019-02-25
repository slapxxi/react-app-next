import styled from '@self/styles/styled';

let Button = styled('button')`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.color.background};
  padding: 1rem;
  border-radius: 5px;
  border: 0;
  color: ${({ theme }) => theme.color.text};
  font-size: 1.4rem;
`;

export default Button;
