import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import EmptyHomeScreen from "./EmptyHomeScreen";
import Chart from "../Charts/Chart";
import bubbleConfig from "../../data/bubble-config";
import barConfig from "../../data/bar-config";
import { getBarChart, getBubbleChart } from "../../api/eventsEndpoints";
import { buildBarData, buildBubbleData } from "../../helpers/buildChartData";
import translate from "../../helpers/i18n";

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

  if (isEmpty(barData) || isEmpty(bubbleData)) return <EmptyHomeScreen />;

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
        <div className="col-sm-12 dist-cxu-box--filled">
          <div className="graphic empty-container mb-3 d-flex justify-content-center align-items-center">
            <div className="graphic--title">
              <p>{translate("home.noDataMessageOne")}</p>
            </div>
            <div className="graphic--wrapper">
              {!isEmpty(chartConfig.data.datasets) && (
                <Chart chartConfig={chartConfig} />
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-12 dist-uxpae-box--filled">
          <div className="graphic empty-container-2 mb-3 d-flex justify-content-center align-items-center">
            <div className="graphic--title">
              <p>{translate("home.noDataMessageTwo")}</p>
            </div>
            <div className="graphic--wrapper">
              {!isEmpty(barData) && <Chart chartConfig={buildBarChart()} />}
            </div>
          </div>
        </div>
        <div className="empty-container-2 d-flex justify-content-center align-items-center">
          <p>{translate("home.noDataMessageThree")}</p>
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
