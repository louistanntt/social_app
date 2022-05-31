import moment, { Moment } from "moment";

export const getMonthAndYear = (d: Moment) => {
    const date = moment(d);
  
    return date.format(`YYYY/MM`);
  };