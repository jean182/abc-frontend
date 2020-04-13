import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import Chart from "../Charts/Chart";
import bubbleConfig from "../../data/bubble-config";
import barConfig from "../../data/bar-config";
import { getBarChart, getBubbleChart } from "../../api/eventsEndpoints";
import { buildBarData, buildBubbleData } from "../../helpers/buildChartData";

export default function GraphicsContainer({ selectedEvent }) {
  const [bubbleData, setBubbleData] = useState([]);
  const [barData, setBarData] = useState([]);

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
      const fetchBarData = async () => {
        try {
          const result = await getBarChart(selectedEvent.id);
          setBarData(result.data);
        } catch (err) {
          setBarData([]);
        }
      };

      fetchBarData();

      fetchBubbleData();
    }
  }, [selectedEvent]);

  const buildBubbleChart = () => {
    return {
      ...bubbleConfig,
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: buildBubbleData(bubbleData),
      },
    };
  };

  const buildBarChart = () => {
    return {
      ...barConfig,
      data: buildBarData(barData),
    };
  };

  const chartConfig = buildBubbleChart();

  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          {!isEmpty(chartConfig.data.datasets) && (
            <Chart chartConfig={chartConfig} />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          {!isEmpty(barData) && <Chart chartConfig={buildBarChart()} />}
        </div>
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
