const FormatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const offsetUTC: number = date.getTimezoneOffset();

  const formatedYear = year;
  const formatedMonth = month > 10 ? month : `0${month}`;
  const formatedDay = day > 10 ? day : `0${day}`;
  const formatedHours = hours > 10 ? hours : `0${hours}`;
  const formatedMinutes = minutes > 10 ? minutes : `0${minutes}`;
  const formatedSeconds = seconds > 10 ? seconds : `0${seconds}`;
  const formatedOffsetUTC =
    offsetUTC < 0 ? `-${Math.abs(offsetUTC) / 60}` : `+${offsetUTC / 60}`;

  const miliseconds: string = date.getMilliseconds().toString();

  return {
    year: formatedYear.toString(),
    month: formatedMonth.toString(),
    day: formatedDay.toString(),
    offsetUTC: formatedOffsetUTC.toString(),
    hours: formatedHours.toString(),
    minutes: formatedMinutes.toString(),
    seconds: formatedSeconds.toString(),
    miliseconds,
  };
};

export default FormatDate;
