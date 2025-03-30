import { generateCumulativeResultFlow } from "./generateCumulativeResultFlow.js";

export function generateCompoundInterestFlow({
  startDate,
  financialFlow,
  paymentDates,
  interest,
  paymentLabel,
}) {
  const cumilitiveFlow = generateCumulativeResultFlow(financialFlow);
  let sum = 0;
  let j = 0;
  let interestPayment = 0;
  let initDate = startDate;
  return paymentDates.map((date) => {
    for (let i = j; i < cumilitiveFlow.length; i++) {
      const { date: paymentDate, value } = cumilitiveFlow[i];
      if (paymentDate.isSameOrAfter(initDate)) {
        if (paymentDate.isAfter(date, "days")) {
          interestPayment +=
            sum * (1 + interest) ** date.diff(initDate, "days") - sum;
        } else {
          interestPayment +=
            sum * (1 + interest) ** paymentDate.diff(initDate, "days") - sum;
        }
      }
      if (paymentDate.isSameOrAfter(date, "day")) {
        initDate = date;
        j = i;
        break;
      } else {
        initDate = paymentDate;
        sum = value;
      }
    }
    sum += interestPayment;
    const monthlyInterestPayment = interestPayment;
    interestPayment = 0;
    return {
      date,
      payment: monthlyInterestPayment,
      log: [`${paymentLabel}: ${monthlyInterestPayment}`],
    };
  });
}