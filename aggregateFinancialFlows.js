import flatten from "lodash/flatten.js";

export function aggregateFinancialFlows(financialFlows) {
  const resultingFinancialFlow = flatten(financialFlows)
    .sort(({ date: date1 }, { date: date2 }) =>
      date1.isSameOrBefore(date2, "day") ? -1 : 1
    )
    .reduce((result, payment) => {
      if (!result.length) {
        return [{ payment: 0, log: [], ...payment }];
      }
      const lastPayment = result[result.length - 1];
      if (lastPayment.date.isSame(payment.date, "day")) {
        lastPayment.payment += payment.payment ?? 0;
        lastPayment.log = [...lastPayment.log, ...(payment.log ?? [])];
      } else {
        result.push({ payment: 0, log: [], ...payment });
      }
      return result;
    }, []);

  let sum = 0;
  resultingFinancialFlow.forEach((payment) => {
    if (payment.interest) {
      payment.payment += sum * payment.interest;
      payment.log = [
        ...payment.log,
        `${payment.interest} interest: ${sum * payment.interest}`,
      ];
    }
    sum += payment.payment;
  });

  return resultingFinancialFlow;
}