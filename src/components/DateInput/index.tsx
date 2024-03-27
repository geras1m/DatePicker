import CalendarIcon from '@assets/CalendarIcon.svg';
import ClearIcon from '@assets/ClearIcon.svg';
import { CalendarButton, ClearButton, Input, InputWrapper } from '@components/DateInput/styled';
import { placeholder } from '@root/constants';
import { ChangeEvent, FC, KeyboardEvent } from 'react';

interface IDateInputProps {
  inputValue: string;
  changeValue: (event: ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
  setDate: () => void;
}

export const DateInput: FC<IDateInputProps> = ({ inputValue, changeValue, clearInput, setDate }) => {
  const setDateByEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') setDate();
  };

  return (
    <InputWrapper>
      <CalendarButton type='button'>
        <CalendarIcon alt='calendar' />
      </CalendarButton>
      <Input onKeyDown={setDateByEnter} value={inputValue} onChange={changeValue} placeholder={placeholder} />
      <ClearButton type='button' onClick={clearInput}>
        <ClearIcon alt='clear' />
      </ClearButton>
    </InputWrapper>
  );
};
