import React from "react";
import PropTypes from "prop-types";
import Chart from "../../components/Charts/Chart";
import {
  buildEventsAverageBubbleData,
  formatTooltipForAverageChart,
} from "../../helpers/buildChartData";

function EventAverages(props) {
  const { eventList } = props;
  const filteredEvents = eventList.filter(
    (event) => event.impactAverage !== null && event.probabilityAverage !== null
  );
  const buildBubbleChart = () => {
    return {
      type: "bubble",
      scaleSteps: 10,
      options: {
        title: {
          display: true,
          text:
            "Distribución de eventos según el promedio de impacto y probabilidad",
        },
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
        tooltips: {
          mode: "point",
          callbacks: {
            title: () => "Promedio",
            label: (tooltipItem) => {
              return formatTooltipForAverageChart(tooltipItem, filteredEvents);
            },
          },
          titleFontSize: 20,
          bodyFontSize: 16,
        },
      },
      data: {
        labels: filteredEvents.map((event) => event.description),
        datasets: buildEventsAverageBubbleData(filteredEvents),
      },
    };
  };

  const chartConfig = buildBubbleChart();

  return (
    <div className="modal-body">
      <Chart chartConfig={chartConfig} />
    </div>
  );
}

EventAverages.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
};

export default EventAverages;
