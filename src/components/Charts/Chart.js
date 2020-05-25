import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Chartjs from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chartjs.plugins.unregister(ChartDataLabels);

const Chart = ({ chartConfig }) => {
  const chartContainer = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, chartConfig]);

  return (
    <div className="panel-content text-center">
      <canvas ref={chartContainer} />
    </div>
  );
};

Chart.propTypes = {
  chartConfig: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Chart;
