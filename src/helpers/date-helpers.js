import {
  eachDayOfInterval,
  format,
  formatISO,
  isValid,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";

export function getIsoDatesFromInterval(startDate, endDate) {
  const dates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  return dates.map((date) => formatISO(date, { representation: "date" }));
}

export function monthYearOrDay(isoDate, timeUnit) {
  const date = parseISO(isoDate);
  if (isValid(date)) {
    switch (timeUnit) {
      case "day":
        return format(date, "d", { locale: es });
      case "month":
        return format(date, "MMM", { locale: es });
      case "year":
        return format(date, "yyyy", { locale: es });
      default:
        return isoDate;
    }
  }
  return "";
}
