export function printCumulativeFlow(flow, consice = false) {
    flow.forEach(({ date, value }) => {
      if (!consice)
        console.log(
          "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
        );
      console.log(`${date.format()} - ${value.toFixed(2)} RUB`);
      if (!consice)
        console.log(
          "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n\n"
        );
    });
  }