/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Theme } from '@self/lib/types';

interface Props extends React.ComponentProps<'input'> {
  errors?: boolean;
}

function FormInput(props: Props) {
  let { errors, ...rest } = props;

  return (
    <input
      {...rest}
      css={(theme: Theme) => css`
        border: 1px solid ${theme.color.em};
        padding: 0.5rem;
        border-radius: 3px;

        ${errors && 'border-color: tomato;'}

        &:focus {
          border-color: transparent;
          ${errors && 'outline: none; box-shadow: 0 0 5px 2px tomato;'}
        }
      `}
    />
  );
}

export default FormInput;
