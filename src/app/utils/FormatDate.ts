const FormatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const offsetUTC: number = date.getTimezoneOffset();
  const miliseconds = date.getMilliseconds();

  const formatedYear = year;
  const formatedMonth = month > 9 ? month : `0${month}`;
  const formatedDay = day > 9 ? day : `0${day}`;
  const formatedHours = hours > 9 ? hours : `0${hours}`;
  const formatedMinutes = minutes > 9 ? minutes : `0${minutes}`;
  const formatedSeconds = seconds > 9 ? seconds : `0${seconds}`;
  const formatedOffsetUTC =
    offsetUTC < 0 ? `+${Math.abs(offsetUTC) / 60}` : `-${offsetUTC / 60}`;

  return {
    year: formatedYear.toString(),
    month: formatedMonth.toString(),
    day: formatedDay.toString(),
    offsetUTC: formatedOffsetUTC.toString(),
    hours: formatedHours.toString(),
    minutes: formatedMinutes.toString(),
    seconds: formatedSeconds.toString(),
    miliseconds: miliseconds.toString(),
  };
};

export default FormatDate;
