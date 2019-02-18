/** @jsx jsx */
import { css, jsx } from '@emotion/core';
interface Props extends React.ComponentProps<'div'> {}

let containerStyles = () => css`
  padding: 2rem;
`;

function PageContainer({ children }: Props) {
  return <div css={containerStyles}>{children}</div>;
}

export default PageContainer;
