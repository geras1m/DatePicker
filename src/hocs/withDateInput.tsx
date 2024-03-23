import { ICalendarProps } from '@components/Calendar/Calendar';
import { DateInput } from '@components/DateInput';
import { ErrorText } from '@components/DateInput/styled';
import { IDatePickerConfig, IInputDate } from '@root/types';
import { isValidateDate } from '@utils/calendar/isValidDate';
import { ChangeEvent, ComponentType, useState } from 'react';

const maxInputValueLength = 10;

export const withDateInput = (Component: ComponentType<ICalendarProps>, config: IDatePickerConfig) => {
  return function ComponentWithDateInput() {
    const { view, maxDate, minDate, withWeekends } = config;
    const [inputValue, setInputValue] = useState('');
    const [calendarDate, setCalendarDate] = useState<null | IInputDate>(null);

    const handleOnChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.length > 10) return;
      const dateFromValue = value.split('/').join('');

      const getFormatValue = () => {
        if (dateFromValue.length > 4) {
          return `${dateFromValue.slice(0, 2)}/${dateFromValue.slice(2, 4)}/${dateFromValue.slice(4)}`;
        }
        if (dateFromValue.length > 2) {
          return `${dateFromValue.slice(0, 2)}/${dateFromValue.slice(2)}`;
        }
        return dateFromValue;
      };

      setInputValue(() => getFormatValue());
    };

    const handleClearInput = () => {
      setInputValue('');
      setCalendarDate(null);
    };

    const handleSetUserDate = () => {
      const [day, month, year] = inputValue.split('/');
      const parseDate = new Date(Number(year), Number(month) - 1, Number(day));
      const isValidDate = isValidateDate(inputValue) && !(parseDate < minDate || parseDate > maxDate);

      if (isValidDate) {
        setCalendarDate(() => ({
          day: Number(day),
          month: Number(month),
          year: Number(year),
        }));
      }
    };

    const isShowWarningMassage = !isValidateDate(inputValue) && inputValue.length === maxInputValueLength;

    return (
      <div>
        <DateInput
          inputValue={inputValue}
          setDate={handleSetUserDate}
          clearInput={handleClearInput}
          changeValue={handleOnChangeValue}
        />
        {isShowWarningMassage && <ErrorText>Invalid date</ErrorText>}
        <Component
          inputDate={calendarDate}
          view={view}
          minDate={minDate}
          maxDate={maxDate}
          withWeekends={withWeekends}
        />
      </div>
    );
  };
};
