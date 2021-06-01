export const dateToString = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const toISO = (date: Date) => {
  return date.toISOString().substring(0, 10);
};
