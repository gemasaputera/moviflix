import dayjs from 'dayjs';
import id from 'dayjs/locale/id';

const dateFormat = (date: string, format: string) => {
  return dayjs(date).locale(id).format(format);
};

export { dateFormat };
