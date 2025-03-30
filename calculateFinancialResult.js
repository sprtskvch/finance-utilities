import { generateOnePaymentDates } from "./generateOnePaymentDates.js";
import { generateDailyPaymentDates } from "./generateDailyPaymentDates.js";
import { generateWeeklyPaymentDates } from "./generateWeeklyPaymentDates.js";
import { generateMonthlyPaymentDates } from "./generateMonthlyPaymentDates.js";
import { generateFinancialFlow } from "./generateFinancialFlow.js";
import { aggregateFinancialFlows } from "./aggregateFinancialFlows.js";
import { generateCompoundInterestFlow } from "./generateCompoundInterestFlow.js";
import { generateCumulativeResultFlow } from "./generateCumulativeResultFlow.js";

export function calculateFinancialResult(
  financialFlowDescriptions,
  interestFlowDescriptions,
  dates
) {
  const financialFlows = financialFlowDescriptions.map(
    ({ type, payment, paymentLabel, ...rest }) => {
      let paymentDates = [];
      switch (type) {
        case "once":
          // @ts-expect-error
          paymentDates = generateOnePaymentDates(rest);
          break;
        case "daily":
          // @ts-expect-error
          paymentDates = generateDailyPaymentDates(rest);
          break;
        case "weekly":
          // @ts-expect-error
          paymentDates = generateWeeklyPaymentDates(rest);
          break;
        case "monthly":
          // @ts-expect-error
          paymentDates = generateMonthlyPaymentDates(rest);
          break;
      }
      return generateFinancialFlow(payment, paymentDates, paymentLabel);
    }
  );
  const paymentFlow = aggregateFinancialFlows(financialFlows);

  const interestFlows = interestFlowDescriptions.map(
    ({ type, interest, paymentLabel, ...rest }) => {
      let paymentDates = [];
      switch (type) {
        case "once":
          // @ts-expect-error
          paymentDates = generateOnePaymentDates(rest);
          break;
        case "daily":
          // @ts-expect-error
          paymentDates = generateDailyPaymentDates(rest);
          break;
        case "weekly":
          // @ts-expect-error
          paymentDates = generateWeeklyPaymentDates(rest);
          break;
        case "monthly":
          // @ts-expect-error
          paymentDates = generateMonthlyPaymentDates(rest);
          break;
      }
      return generateCompoundInterestFlow({
        startDate: rest.startDate,
        financialFlow: paymentFlow,
        paymentDates,
        interest,
        paymentLabel,
      });
    }
  );

  const agregatedFlow = aggregateFinancialFlows([paymentFlow, ...interestFlows]);
  return generateCumulativeResultFlow(agregatedFlow, dates);
}