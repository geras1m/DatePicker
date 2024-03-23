import { ErrorBoundary } from '@components/ErrorBoundary';
import { ThemeProvider } from '@components/ThemeProvider';
import { ConfigCalendar } from '@root/sevice/configCalendar';
import { IDatePickerConfig } from '@root/types';
import { FC } from 'react';

export const DatePicker: FC<IDatePickerConfig> = (config) => {
  const DataPicker = ConfigCalendar.getSimpleCalendar(config);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DataPicker />
      </ThemeProvider>
    </ErrorBoundary>
  );
};
