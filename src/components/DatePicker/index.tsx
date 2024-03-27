import { ErrorBoundary } from '@components/ErrorBoundary';
import { ThemeProvider } from '@components/ThemeProvider';
import { ConfigCalendar } from '@root/sevice/configCalendar';
import { IRangeDatePickerConfig } from '@root/types';
import { FC } from 'react';

export const DatePicker: FC<IRangeDatePickerConfig> = (config) => {
  const DataPickerCalendar = ConfigCalendar.getDatePickerWithRange(config);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DataPickerCalendar />
      </ThemeProvider>
    </ErrorBoundary>
  );
};
