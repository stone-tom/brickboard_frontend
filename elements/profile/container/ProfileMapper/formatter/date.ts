import { format } from 'date-fns';

const date = (value: string) => format(new Date(value), 'dd.MM.yyyy');

export default date;
