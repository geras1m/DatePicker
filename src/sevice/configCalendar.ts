import { Calendar } from '@components/Calendar';
import { withDateInput } from '@hocs/withDateInput';
import { IDatePickerConfig } from '@root/types';

export class ConfigCalendar {
  static getSimpleCalendar = (config: IDatePickerConfig) => {
    return withDateInput(Calendar, config);
  };
}
