import CalendarIcon from '@assets/CalendarIcon.svg';
import ClearIcon from '@assets/ClearIcon.svg';
import { CalendarButton, ClearButton, Input } from '@components/DateInput/styled';
import { Wrapper } from '@components/RangeInputBlock/styled';
import { placeholder } from '@root/constants';
import { InputRangeType } from '@root/types';
import { ChangeEvent, FC } from 'react';

interface IRangeInputProps {
  type: InputRangeType;
  value: string;
  changeValue: (event: ChangeEvent<HTMLInputElement>, inputType: InputRangeType) => void;
  clearInput: (type: InputRangeType) => void;
}

export const RangeInput: FC<IRangeInputProps> = ({ type, value, changeValue, clearInput }) => {
  return (
    <Wrapper>
      <CalendarButton type='button'>
        <CalendarIcon alt='calendar' />
      </CalendarButton>
      <Input value={value} onChange={(event) => changeValue(event, type)} placeholder={placeholder} />
      <ClearButton type='button' onClick={() => clearInput(type)}>
        <ClearIcon alt='clear' />
      </ClearButton>
    </Wrapper>
  );
};
