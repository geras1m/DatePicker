import { DateInput } from '@components/DateInput';
import { ErrorMessage } from '@components/DateInput/ErrorMessage';
import { ICalendarDate } from '@root/types';
import { isValidateDate } from '@utils/calendar/isValidDate';
import { ChangeEvent, ComponentType, useState } from 'react';

const maxValueLength = 10;

export const WithDateInput = (Component: ComponentType<{ inputDate: null | ICalendarDate }>) => {
  const [inputValue, setInputValue] = useState('');
  const [calendarDate, setCalendarDate] = useState<null | ICalendarDate>(null);

  const handleOnChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    if (value.length > 10) return;

    value = value.split('/').join('');

    if (value.length > 4) value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    else if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;

    setInputValue(() => value);
  };

  const handleClearInput = () => {
    setInputValue('');
    setCalendarDate(null);
  };

  const handleSetUserDate = () => {
    if (isValidateDate(inputValue)) {
      const date = inputValue.split('/');
      setCalendarDate(() => ({
        day: Number(date[0]),
        month: Number(date[1]),
        year: Number(date[2]),
      }));
    }
  };

  const isShowWarningMassage = !isValidateDate(inputValue) && inputValue.length === maxValueLength;

  return (
    <div>
      <DateInput
        inputValue={inputValue}
        setDate={handleSetUserDate}
        clearInput={handleClearInput}
        changeValue={handleOnChangeValue}
      />
      {isShowWarningMassage && <ErrorMessage />}
      <Component inputDate={calendarDate} />
    </div>
  );
};
