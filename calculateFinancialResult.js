import { generateOnePaymentDates } from "./generateOnePaymentDates.js";
import { generateDailyPaymentDates } from "./generateDailyPaymentDates.js";
import { generateWeeklyPaymentDates } from "./generateWeeklyPaymentDates.js";
import { generateMonthlyPaymentDates } from "./generateMonthlyPaymentDates.js";
import { generateFinancialFlow } from "./generateFinancialFlow.js";
import { agregateFinancialFlows } from "./aggregateFinancialFlows.js";
import { generateCompoundInterestFlow } from "./generateCompoundInterestFlow.js";
import { generateCumilativeResultFlow } from "./generateCumulativeResultFlow.js";

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
          paymentDates = generateOnePaymentDates(rest);
          break;
        case "daily":
          paymentDates = generateDailyPaymentDates(rest);
          break;
        case "weekly":
          paymentDates = generateWeeklyPaymentDates(rest);
          break;
        case "monthly":
          paymentDates = generateMonthlyPaymentDates(rest);
          break;
      }
      return generateFinancialFlow(payment, paymentDates, paymentLabel);
    }
  );
  const paymentFlow = agregateFinancialFlows(financialFlows);

  const interestFlows = interestFlowDescriptions.map(
    ({ type, interest, paymentLabel, ...rest }) => {
      let paymentDates = [];
      switch (type) {
        case "once":
          paymentDates = generateOnePaymentDates(rest);
          break;
        case "daily":
          paymentDates = generateDailyPaymentDates(rest);
          break;
        case "weekly":
          paymentDates = generateWeeklyPaymentDates(rest);
          break;
        case "monthly":
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

  const agregatedFlow = agregateFinancialFlows([paymentFlow, ...interestFlows]);
  return generateCumilativeResultFlow(agregatedFlow, dates);
}