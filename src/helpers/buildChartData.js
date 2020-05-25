import { camelCase, first, last } from "lodash";
import Chartjs from "chart.js";
import translate from "./i18n";

const { color } = Chartjs.helpers;

const colorList = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 159, 64)",
  "rgb(75, 192, 192)",
  "rgb(255, 0, 0)",
  "rgb(153, 102, 255)",
  "rgb(28, 214, 20)",
  "rgb(195, 5, 148)",
];

const prettyFileNumber = (description) =>
  description.substring(0, description.lastIndexOf(":"));

export const buildBubbleData = (response) => {
  return response.map((item, index) => {
    const backgroundColor = colorList[index];
    return {
      label: item.username,
      data: [
        {
          x: item.probabilityScale,
          y: item.impactScale,
          r: 5,
        },
      ],
      backgroundColor: color(backgroundColor).alpha(0.2).rgbString(),
      borderColor: backgroundColor,
      pointBackgroundColor: backgroundColor,
      borderWidth: 1,
    };
  });
};

export const formatTooltipForAverageChart = (tooltipItem, events) => {
  const event = events[tooltipItem.datasetIndex];
  let label = prettyFileNumber(event.description) || "";

  if (label) {
    label += ": ";
  }
  const impact = Math.round(tooltipItem.yLabel * 100) / 100;
  const probability = Math.round(tooltipItem.xLabel * 100) / 100;
  label += `Impacto: ${impact}, Probabilidad: ${probability}`;

  return label;
};

export const buildEventsAverageBubbleData = (response, eventList) => {
  return response.map((item, index) => {
    const backgroundColor = ["#2A4988", "#416fcc"];
    const event = eventList[index];
    return {
      label: prettyFileNumber(event.description),
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
  return {
    labels,
    datasets: [
      {
        label: translate("charts.barChartLabel"),
        data: labels.map((label) => {
          return data[camelCase(label)];
        }),
        barThickness: 30,
        backgroundColor: color("rgb(43, 73, 135, 1)").alpha(0.5).rgbString(),
        borderColor: "rgb(43, 73, 135)",
        borderWidth: 1,
      },
    ],
  };
};

export const buildRadarData = (response) => {
  const sortedResponse = response.map((item) => {
    const { values } = item;
    const sortedValues = values.sort((a, b) => a[0].localeCompare(b[0]));
    return {
      ...item,
      sortedValues,
    };
  });
  const labels = first(sortedResponse).values.map((item) => first(item));
  return {
    labels,
    datasets: sortedResponse.map((item, index) => {
      const { description, values } = item;
      const scores = values.map((value) => last(value));
      return {
        label: description,
        backgroundColor: color(colorList[index]).alpha(0.2).rgbString(),
        borderColor: colorList[index],
        pointBackgroundColor: colorList[index],
        data: scores,
      };
    }),
  };
};
