import React from "react";
import PropTypes from "prop-types";
import { first, isEmpty } from "lodash";
import ReactExport from "react-data-export";
import { formatISO } from "date-fns";
import t from "../../helpers/i18n";

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

export default function Download({ evaluationList, eventList }) {
  const data = evaluationList.map((evaluation) => {
    const event = eventList.find(
      ({ evaluationIds }) => first(evaluationIds) === evaluation.id
    );
    return {
      id: event.id,
      fileNumber: event.fileNumber,
      description: event.description,
      voteType: t(`eventsEnum.voteType.${event.voteType}`),
      procedureType: t(`eventsEnum.procedureType.${event.procedureType}`),
      proposedBy: event.proposedBy,
      approvalDate: event.approvalDate,
      impactAverage: isEmpty(evaluation.impactAverage)
        ? "0"
        : evaluation.impactAverage,
      probabilityAverage: isEmpty(evaluation.probabilityAverage)
        ? "0"
        : evaluation.probabilityAverage,
    };
  });
  const date = formatISO(new Date(), { representation: "date" });
  return (
    <ExcelFile
      element={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <button className="btn btn-primary" type="button">
          Descargar reporte
        </button>
      }
      filename={`reporte-${date}`}
    >
      <ExcelSheet data={data} name="Promedio de eventos">
        <ExcelColumn label={t("table.events.fileNumber")} value="fileNumber" />
        <ExcelColumn
          label={t("table.events.description")}
          value="description"
        />
        <ExcelColumn
          label={t("table.events.procedureType")}
          value="procedureType"
        />
        <ExcelColumn label={t("table.events.voteType")} value="voteType" />
        <ExcelColumn label={t("table.events.proposedBy")} value="proposedBy" />
        <ExcelColumn
          label={t("table.events.approvalDate")}
          value="approvalDate"
        />
        <ExcelColumn label="Promedio Impacto" value="impactAverage" />
        <ExcelColumn label="Promedio Probabilidad" value="probabilityAverage" />
      </ExcelSheet>
    </ExcelFile>
  );
}

Download.propTypes = {
  evaluationList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  eventList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
};
