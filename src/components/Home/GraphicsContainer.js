import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import Chart from "../Charts/Chart";
import bubbleConfig from "../../data/bubble-config";
import { getBubbleChart } from "../../api/eventsEndpoints";
import buildChartData from "../../helpers/buildChartData";

export default function GraphicsContainer({ selectedEvent }) {
  const [bubbleData, setBubbleData] = useState([]);

  useEffect(() => {
    if (!isEmpty(selectedEvent)) {
      const fetchBubbleData = async () => {
        try {
          const result = await getBubbleChart(selectedEvent.id);
          setBubbleData(result.data);
        } catch (err) {
          setBubbleData([]);
        }
      };

      fetchBubbleData();
    }
  }, [selectedEvent]);

  const buildBubbleChart = () => {
    return {
      ...bubbleConfig,
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: buildChartData(bubbleData),
      },
    };
  };

  const chartConfig = buildBubbleChart();

  return (
    <div className="row">
      <div className="col-sm-12 empty-container">
        {!isEmpty(chartConfig.data.datasets) && (
          <Chart chartConfig={chartConfig} />
        )}
      </div>
    </div>
  );
}

GraphicsContainer.defaultProps = {
  selectedEvent: {},
};

GraphicsContainer.propTypes = {
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};
