import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Chartjs from "chart.js";

const Chart = ({ chartConfig, displayLegend }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, chartConfig]);

  const hideShowLegend = () => {
    chartInstance.options.legend.display = !chartInstance.options.legend
      .display;
    chartInstance.update();
    setShowLegend(!showLegend);
  };

  return (
    <div className="panel-content text-center">
      {displayLegend && (
        <div className="custom-control custom-switch d-flex justify-content-end">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customSwitch1"
            checked={showLegend}
            onChange={hideShowLegend}
          />
          <label className="custom-control-label pt-1" htmlFor="customSwitch1">
            Leyenda
          </label>
        </div>
      )}
      <canvas height="145vh" ref={chartContainer} />
    </div>
  );
};

Chart.defaultProps = {
  displayLegend: false,
};

Chart.propTypes = {
  chartConfig: PropTypes.oneOfType([PropTypes.object]).isRequired,
  displayLegend: PropTypes.bool,
};

export default Chart;
