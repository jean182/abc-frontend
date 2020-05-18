import { camelCase, truncate } from "lodash";
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

export const formatTooltipForAverageChart = (tooltipItem, events) => {
  const event = events[tooltipItem.datasetIndex];
  let label = `Exp ${event.fileNumber}` || "";

  if (label) {
    label += ": ";
  }
  const impact = Math.round(tooltipItem.yLabel * 100) / 100;
  const probability = Math.round(tooltipItem.xLabel * 100) / 100;
  label += `Impacto: ${impact}, Probabilidad: ${probability}`;

  return label;
};

export const buildEventsAverageBubbleData = (response) => {
  return response.map((item) => {
    const backgroundColor = ["#2A4988", "#416fcc"];
    return {
      label: truncate(item.description),
      data: [
        {
          x: item.probabilityAverage,
          y: item.impactAverage,
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
