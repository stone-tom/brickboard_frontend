import date from './date';
import bool from './bool';

const formatters: {
  [key: string]: (value: any) => string
} = {
  date,
  bool,
};

const formatter = (format: ((value: any) => string) | string) => {
  if (typeof format === 'string') {
    return formatters[format];
  }
  return format;
};

export default formatter;
