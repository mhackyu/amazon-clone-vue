import { format, fromUnixTime } from 'date-fns';

export const currencyFormat = (num = 0) => {
  return num
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const dateFormat = date => {
  return format(fromUnixTime(date), 'MMMM dd, yyyy h:mma');
};
