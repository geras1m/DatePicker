import { ErrorText } from '@components/DateInput/styled';
import { RangeInput } from '@components/RangeInputBlock';
import { DateRangeInputWrapper } from '@components/RangeInputBlock/styled';
import { InputRangeType, IRangeContext, IRangeDatePickerConfig, ISimpleDatePickerConfig } from '@root/types';
import {
  getFormatAndParseInputValue,
  getParsedDateFromInputValue,
} from '@utils/calendar/getFormatAndParseInputValue';
import { isValidateDate } from '@utils/calendar/isValidDate';
import { ChangeEvent, ComponentType, createContext, useMemo, useState } from 'react';

export const RangeContext = createContext<null | IRangeContext>(null);

export const withRange = (
  Component: ComponentType<ISimpleDatePickerConfig>,
  config: IRangeDatePickerConfig,
) => {
  return function ComponentWithRange() {
    const { view, maxDate, minDate, withWeekends, startOfWeek, startDateRange, endDateRange } = config;

    const [startRange, setStartRange] = useState(startDateRange);
    const [endRange, setEndRange] = useState(endDateRange);
    const [rangeStartAndEndDates, setRangeStartAndEndDates] = useState([startDateRange, endDateRange]);

    const handleOnChangeInputValue = (event: ChangeEvent<HTMLInputElement>, inputType: InputRangeType) => {
      const { value } = event.target;
      if (value.length > 10) return;

      const formattedValue = getFormatAndParseInputValue(value);

      if (inputType === 'from') setStartRange(() => formattedValue);
      if (inputType === 'to') setEndRange(() => formattedValue);
    };

    const handleClearInput = (type: InputRangeType) => {
      if (type === 'from') setStartRange('');
      if (type === 'to') setEndRange('');
    };

    const handleClearRange = () => {
      setStartRange('');
      setEndRange('');
      setRangeStartAndEndDates(['', '']);
    };

    const startParsedRangeDate = getParsedDateFromInputValue(startRange);
    const endParsedRangeDate = getParsedDateFromInputValue(endRange);

    const handlePickRangeByCell = (year: number, month: number, date: number) => {
      const pickedDate = new Date(year, month, date).getTime();
      const startRangeDate = new Date(
        startParsedRangeDate.year,
        startParsedRangeDate.month - 1,
        startParsedRangeDate.day,
      ).getTime();
      const endRangeDate = new Date(
        endParsedRangeDate.year,
        endParsedRangeDate.month - 1,
        endParsedRangeDate.day,
      ).getTime();

      const resultDate = `${date < 10 ? `0${date}` : date}/${month + 1 < 10 ? `0${month + 1}` : month + 1}/${year}`;

      if (!startRangeDate) {
        setStartRange(() => resultDate);
        setRangeStartAndEndDates((state) => [resultDate, ...state]);
      } else if (!endRangeDate && pickedDate !== startRangeDate) {
        setEndRange(() => resultDate);
        setRangeStartAndEndDates((state) => [...state, resultDate]);
      }
    };

    const isShowInvalidateWarningMassage = !isValidateDate(startRange) && startRange.length === 10;

    const isValidRange =
      startRange.length === 10 &&
      endRange.length === 10 &&
      new Date(startParsedRangeDate.year, startParsedRangeDate.month, startParsedRangeDate.day) >=
        new Date(endParsedRangeDate.year, endParsedRangeDate.month, endParsedRangeDate.day);

    if (startRange.length === 10 && endRange.length === 10 && !isValidRange) {
      if (startRange !== rangeStartAndEndDates[0] || endRange !== rangeStartAndEndDates[1]) {
        setRangeStartAndEndDates([startRange, endRange]);
      }
    }

    const rangeContextValue = useMemo(
      () => ({
        rangeStartAndEndDates,
        handlePickRangeByCell,
        handleClearRange,
      }),
      [rangeStartAndEndDates],
    );

    return (
      <RangeContext.Provider value={rangeContextValue}>
        <div>
          <DateRangeInputWrapper>
            From
            <RangeInput
              type='from'
              value={startRange}
              changeValue={handleOnChangeInputValue}
              clearInput={handleClearInput}
            />
            To
            <RangeInput
              type='to'
              value={endRange}
              changeValue={handleOnChangeInputValue}
              clearInput={handleClearInput}
            />
            {isShowInvalidateWarningMassage && <ErrorText>Invalid date range</ErrorText>}
            {isValidRange && <ErrorText>Invalid date isRangeError</ErrorText>}
          </DateRangeInputWrapper>
          <Component
            view={view}
            maxDate={maxDate}
            minDate={minDate}
            withWeekends={withWeekends}
            startOfWeek={startOfWeek}
          />
          {/* <ClearRangeButton type='button' onClick={handleClearRange}> */}
          {/*  Clear */}
          {/* </ClearRangeButton> */}
        </div>
      </RangeContext.Provider>
    );
  };
};
