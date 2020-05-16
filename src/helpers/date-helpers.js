const isoDate = (date) => {
  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
    -2
  )}-${`0${date.getDate()}`.slice(-2)}`;
};

export function getDates(startDate, endDate) {
  const arr = [];
  const dt = new Date(startDate);
  while (dt <= endDate) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr.map((date) => isoDate(date));
}

export const dateRangearray = () => "Balde";
