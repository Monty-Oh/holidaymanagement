export function formatInputDate(begDt) {
  const dates = begDt.split('-');
  const newDate = new begDt(dates[0], dates[1], dates[2]);
  return newDate;
}

export function formatDateToYYYYMMDD(date) {
  console.log(date);
  return date;
}
