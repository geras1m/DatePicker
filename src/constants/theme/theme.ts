import { IColors, IFontSizes, IFontWeight } from '@constants/theme/types';

export const fontSizes: IFontSizes = {
  px13: '13px',
  px14: '14px',
  px16: '16px',
};

export const fontWeight: IFontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const colors: IColors = {
  black: '#030304',
  white: '#ffffff',
  grey: '#AAAAAA',
  grey1: '#dddddd',
  red: '#ff0000',
  blue: '#2F80ED',
  green: '#00ff0b',
};

export const Theme = {
  fontSizes: { ...fontSizes },
  fontWeight: { ...fontWeight },
  colors: { ...colors },
};
