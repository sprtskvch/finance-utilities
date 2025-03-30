export function printPaymentDates(paymentDates) {
    paymentDates.forEach((date) => {
      console.log(date.format("DD.MM.YYYY"));
    });
  }