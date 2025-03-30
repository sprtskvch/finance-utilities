import moment from "moment";

function getNextDate(date, dayInMonth, interval, excludeWeekends = false) {
  const nextDate = moment(date).month(date.month() + interval);
  if (nextDate.daysInMonth() >= dayInMonth) {
    nextDate.date(dayInMonth);
  } else {
    nextDate.endOf("month");
  }
  if (excludeWeekends) {
    if (nextDate.day() === 0) {
      nextDate.day(-2);
    }
    if (nextDate.day() === 6) {
      nextDate.day(5);
    }
  }
  return nextDate;
}

export function generateMonthlyPaymentDates({
  startDate,
  endDate,
  period: { interval, dayInMonth, excludeWeekends = false },
}) {
  const paymentDates = [];
  let date = moment(startDate);
  if (date.daysInMonth() >= dayInMonth) {
    date.date(dayInMonth);
    if (date < startDate) {
      date = getNextDate(date, dayInMonth, interval, excludeWeekends);
    }
  } else {
    date.endOf("month");
    if (excludeWeekends) {
      if (date.day() === 0) {
        date.day(-2);
      }
      if (date.day() === 6) {
        date.day(5);
      }
    }
  }
  while (date.isSameOrBefore(endDate, "day")) {
    paymentDates.push(date);
    date = getNextDate(date, dayInMonth, interval, excludeWeekends);
  }
  return paymentDates;
}