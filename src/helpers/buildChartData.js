import { camelCase } from "lodash";
import translate from "./i18n";

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColorHex() {
  const hex = "0123456789ABCDEF";
  let color = "#";
  for (let i = 1; i <= 6; i += 1) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const buildBubbleData = (response) => {
  return response.map((item) => {
    const backgroundColor = [
      getRandomColorHex(),
      getRandomColorHex(),
      getRandomColorHex(),
      getRandomColorHex(),
    ];
    return {
      label: item.username,
      data: [
        {
          x: item.probabilityScale,
          y: item.impactScale,
          r: Math.round(getRandomNumber(5, 15)),
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
  const backgroundColor = [
    getRandomColorHex(),
    getRandomColorHex(),
    getRandomColorHex(),
    getRandomColorHex(),
  ];
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
