import moment from "moment";

function getNextDate(date, interval) {
  const nextDate = moment(date).dayOfYear(date.dayOfYear() + interval);
  return nextDate;
}

export function generateDailyPaymentDates({
  startDate,
  endDate,
  period: { interval },
}) {
  const paymentDates = [];
  let date = moment(startDate);
  while (date.isSameOrBefore(endDate, "day")) {
    paymentDates.push(date);
    date = getNextDate(date, interval);
  }
  return paymentDates;
}
