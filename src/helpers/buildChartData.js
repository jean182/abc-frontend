import { camelCase } from "lodash";
import translate from "./i18n";

export const buildBubbleData = (response) => {
  return response.map((item) => {
    const backgroundColor = ["#2A4988", "#416fcc"];
    return {
      label: item.username,
      data: [
        {
          x: item.probabilityScale,
          y: item.impactScale,
          r: 5,
        },
      ],
      backgroundColor,
      borderColor: backgroundColor,
      borderWidth: 1,
    };
  });
};

export const buildBarData = (response) => {
  const { labels, data } = response;
  const backgroundColor = ["#3359A5", "#2A4988", "#416fcc"];
  return {
    labels,
    datasets: [
      {
        label: translate("charts.barChartLabel"),
        data: labels.map((label) => {
          return data[camelCase(label)];
        }),
        barThickness: 30,
        backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };
};
