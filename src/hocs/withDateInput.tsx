import { DateInput } from '@components/DateInput';
import { ErrorText } from '@components/DateInput/styled';
import { ICalendarProps, IInputDate, ISimpleDatePickerConfig } from '@root/types';
import { getFormattedInputValue } from '@utils/calendar/getFormattedInputValue';
import { isValidateDate } from '@utils/calendar/isValidDate';
import { ChangeEvent, ComponentType, useState } from 'react';

const maxInputValueLength = 10;

export const withDateInput = (Component: ComponentType<ICalendarProps>, config: ISimpleDatePickerConfig) => {
  return function ComponentWithDateInput() {
    const { view, maxDate, minDate, withWeekends, startOfWeek } = config;
    const [inputValue, setInputValue] = useState('');
    const [calendarDate, setCalendarDate] = useState<IInputDate>({
      day: null,
      month: null,
      year: null,
    });

    const handleOnChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.length > 10) return;

      const formattedValue = getFormattedInputValue(value);

      setInputValue(() => formattedValue);
    };

    const handleClearInput = () => {
      setInputValue('');
      setCalendarDate({
        day: null,
        month: null,
        year: null,
      });
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

    const isShowInvalidateWarningMassage =
      !isValidateDate(inputValue) && inputValue.length === maxInputValueLength;

    return (
      <div>
        <DateInput
          inputValue={inputValue}
          setDate={handleSetUserDate}
          clearInput={handleClearInput}
          changeValue={handleOnChangeValue}
        />
        {isShowInvalidateWarningMassage && <ErrorText>Invalid date</ErrorText>}
        {/* {isShowOverDateWarningMassage && <ErrorText>The date goes beyond</ErrorText>} */}
        <Component
          startOfWeek={startOfWeek}
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
