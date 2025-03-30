export function generateFinancialFlow(payment, paymentDates, paymentLabel) {
    return paymentDates.map((date, index) => {
      if (typeof payment === "function") {
        return payment(date, index);
      }
      return {
        date,
        payment,
        log: [`${paymentLabel}: ${payment}`],
      };
    });
  }