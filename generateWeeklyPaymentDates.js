import moment from "moment";

function getNextDate(date, dayInWeek, interval) {
  const nextDate = moment(date)
    .week(date.week() + interval)
    .day(dayInWeek);
  return nextDate;
}

export function generateWeeklyPaymentDates({
  startDate,
  endDate,
  period: { interval, dayInWeek },
}) {
  const paymentDates = [];
  let date = moment(startDate).day(dayInWeek);
  if (date.isBefore(startDate)) {
    date = getNextDate(date, dayInWeek, interval);
  }
  while (date.isSameOrBefore(endDate, "day")) {
    paymentDates.push(date);
    date = getNextDate(date, dayInWeek, interval);
  }
  return paymentDates;
}