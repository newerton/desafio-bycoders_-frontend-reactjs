import dayjs, { extend } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

extend(timezone);
extend(utc);

export const hours = (date: string, tz: string): string => {
  return dayjs(date).tz(tz).format('HH:mm');
};
