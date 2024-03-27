export const getFormattedInputValue = (value: string) => {
  const dateFromValue = value.split('/').join('');

  if (dateFromValue.length > 4) {
    return `${dateFromValue.slice(0, 2)}/${dateFromValue.slice(2, 4)}/${dateFromValue.slice(4)}`;
  }
  if (dateFromValue.length > 2) {
    return `${dateFromValue.slice(0, 2)}/${dateFromValue.slice(2)}`;
  }
  return dateFromValue;
};
