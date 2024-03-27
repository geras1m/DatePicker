import { Calendar } from '@components/Calendar';
import { withDateInput } from '@hocs/withDateInput';
import { withRange } from '@hocs/withRange';
import { IRangeDatePickerConfig, ISimpleDatePickerConfig } from '@root/types';

export class ConfigCalendar {
  static getSimpleCalendar = (config: ISimpleDatePickerConfig) => {
    return withDateInput(Calendar, config);
  };

  static getDatePickerWithRange = (config: IRangeDatePickerConfig) => {
    return withRange(withDateInput(Calendar, config), config);
  };
}
