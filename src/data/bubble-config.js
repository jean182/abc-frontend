export default {
  type: "bubble",
  scaleSteps: 10,
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 10,
          },
          scaleLabel: {
            display: true,
            labelString: "Impacto",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 10,
          },
          scaleLabel: {
            display: true,
            labelString: "Probabilidad",
          },
        },
      ],
    },
  },
};
