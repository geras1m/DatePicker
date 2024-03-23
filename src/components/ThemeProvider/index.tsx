import GlobalStyles from '@components/ThemeProvider/styled';
import { Theme } from '@constants/theme/theme';
import { FC, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

interface IThemeProvider {
  children: ReactNode;
}

export const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  return (
    <StyledThemeProvider theme={Theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};
