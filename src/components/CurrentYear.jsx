import { currentYear } from "../utils/getDate";

export const Year = () => {
  return <span className="year">{currentYear}</span>;
};
