export function printFinancialFlow(financialFlow) {
    financialFlow.forEach(({ date, log }) => {
      console.log(
        "\n\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
      console.log(`${date.format()} \n ${log.join("\n")}`);
      console.log(
        "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
    });
  }