export default {
  type: "horizontalBar",
  data: {
    labels: [
      "Label 1",
      "Label 2",
      "Label 3",
      "Label 4",
      "Label 5",
      "Label 6",
      "Label 7",
    ],
    datasets: [
      {
        data: [2000, 4000, 6000, 8000, 10000, 12000, 14000],
        backgroundColor: [
          "#73BFB8",
          "#73BFB8",
          "#73BFB8",
          "#73BFB8",
          "#73BFB8",
          "#73BFB8",
          "#73BFB8",
        ],
      },
    ],
  },
  options: {
    tooltips: {
      enabled: false,
    },
    responsive: true,
    legend: {
      display: false,
      position: "bottom",
      fullWidth: true,
      labels: {
        boxWidth: 10,
        padding: 50,
      },
    },
    scales: {
      yAxes: [
        {
          barPercentage: 0.75,
          gridLines: {
            display: true,
            drawTicks: true,
            drawOnChartArea: false,
          },
          ticks: {
            fontColor: "#555759",
            fontFamily: "Lato",
            fontSize: 11,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            drawTicks: false,
            tickMarkLength: 5,
            drawBorder: false,
          },
          ticks: {
            padding: 5,
            beginAtZero: true,
            fontColor: "#555759",
            fontSize: 11,
          },
          scaleLabel: {
            display: true,
            padding: 10,
            fontColor: "#555759",
            fontSize: 16,
            fontStyle: 700,
            labelString: "Scale Label",
          },
        },
      ],
    },
  },
};
