export function generateCumulativeResultFlow(financialFlow, dates) {
  let sum = 0;
  let i = 0;
  return financialFlow.reduce((res, { date, payment }, index) => {
    if (!dates) {
      res.push({ date, value: payment + sum });
    } else {
      const currentDate = dates[i];
      if (
        index === financialFlow.length - 1 ||
        currentDate.isBefore(financialFlow[index + 1].date)
      ) {
        res.push({ date, value: payment + sum });
        i++;
      }
    }
    sum += payment;
    return res;
  }, []);
}
