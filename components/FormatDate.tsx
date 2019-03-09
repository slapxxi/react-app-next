import { Maybe } from '@self/lib/types';
import { format } from 'date-fns';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'time'> {
  date: Maybe<Date | string>;
}

function FormatDate(props: Props) {
  let { date, ...rest } = props;

  if (date && typeof date === 'string') {
    date = new Date(date);
  }

  if (date) {
    date = date as Date;
    return (
      <time {...rest} dateTime={date.toUTCString()}>
        {format(date, 'DD/MM/YY')}
      </time>
    );
  }

  return <time {...rest}>N/A</time>;
}

export default FormatDate;
