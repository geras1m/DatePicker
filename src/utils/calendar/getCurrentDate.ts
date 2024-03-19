export const getCurrentDate = () => {
  const currentFullDate = new Date();
  const currentYear = currentFullDate.getFullYear();
  const currentMonth = currentFullDate.getMonth();
  const currentDate = currentFullDate.getDate();

  return { currentYear, currentMonth, currentDate };
};
