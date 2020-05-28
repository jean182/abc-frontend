import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import EmptyHomeScreen from "./EmptyHomeScreen";
import Chart from "../Charts/Chart";
import bubbleConfig from "../../data/bubble-config";
import barConfig from "../../data/bar-config";
import radarConfig from "../../data/radar-config";
import {
  getBarChart,
  getBubbleChart,
  getRadarChart,
} from "../../api/eventsEndpoints";
import {
  buildBarData,
  buildBubbleData,
  buildRadarData,
} from "../../helpers/buildChartData";
import translate from "../../helpers/i18n";

export default function GraphicsContainer({ selectedEvent }) {
  const [bubbleData, setBubbleData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [radarData, setRadarData] = useState({});

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
      const fetchRadarData = async () => {
        try {
          const result = await getRadarChart(selectedEvent.id);
          setRadarData(result.data);
        } catch (err) {
          setRadarData({});
        }
      };

      fetchBarData();

      fetchBubbleData();

      fetchRadarData();
    }
  }, [selectedEvent]);

  if (isEmpty(barData) || isEmpty(bubbleData) || isEmpty(radarData))
    return <EmptyHomeScreen />;

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

  const buildRadarChart = () => {
    return {
      ...radarConfig,
      data: buildRadarData(radarData),
    };
  };

  const chartConfig = buildBubbleChart();

  return (
    <div>
      <div className="row panel-wrapper">
        <div className="col-sm-12 dist-cxu-box--filled">
          <div className="graphic empty-container mb-3 d-flex justify-content-center align-items-center">
            <div className="graphic--title">
              <p>{translate("home.chart1Title")}</p>
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
              <p>{translate("home.chart2Title")}</p>
            </div>
            <div className="graphic--wrapper">
              {!isEmpty(barData) && <Chart chartConfig={buildBarChart()} />}
            </div>
          </div>
        </div>
        <div className="col-sm-12 dist-uxpae-box--filled">
          <div className="graphic empty-container-2 mb-3 d-flex justify-content-center align-items-center">
            <div className="graphic--title">
              <p>{translate("home.chart3Title")}</p>
            </div>
            <div className="graphic--wrapper">
              {!isEmpty(radarData) && <Chart chartConfig={buildRadarChart()} />}
            </div>
          </div>
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
