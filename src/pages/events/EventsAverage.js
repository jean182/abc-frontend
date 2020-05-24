import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { flatten, isEmpty } from "lodash";
import Chart from "../../components/Charts/Chart";
import EmptyHomeScreen from "../../components/Home/EmptyHomeScreen";
import { getEvaluations } from "../../api/eventsEndpoints";
import {
  buildEventsAverageBubbleData,
  formatTooltipForAverageChart,
} from "../../helpers/buildChartData";

function EventAverages(props) {
  const { eventList } = props;
  const [evaluationList, setEvaluationList] = useState([]);

  useEffect(() => {
    const ids = flatten(eventList.map(({ evaluationIds }) => evaluationIds));
    if (!isEmpty(ids)) {
      const fetchEvalutions = async () => {
        try {
          const result = await getEvaluations(ids);
          setEvaluationList(result.data);
        } catch (err) {
          setEvaluationList([]);
        }
      };

      fetchEvalutions();
    }
  }, [eventList]);

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
              return formatTooltipForAverageChart(tooltipItem, eventList);
            },
          },
          titleFontSize: 20,
          bodyFontSize: 16,
        },
      },
      data: {
        labels: eventList.map((event) => event.description),
        datasets: buildEventsAverageBubbleData(evaluationList, eventList),
      },
    };
  };

  const chartConfig = buildBubbleChart();

  const renderGraphic = () => {
    return isEmpty(evaluationList) ? (
      <EmptyHomeScreen />
    ) : (
      <Chart chartConfig={chartConfig} />
    );
  };

  return <div className="modal-body">{renderGraphic()}</div>;
}

EventAverages.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
};

export default EventAverages;
