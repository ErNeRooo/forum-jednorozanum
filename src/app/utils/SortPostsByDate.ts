import PostTypes from "../types/PostTypes";

const SortPostsByDate = (
  posts: PostTypes[],
  order: "asc" | "desc"
): PostTypes[] => {
  return [...posts].sort((a, b) => {
    const aDate = new Date(
      parseInt(a.year),
      parseInt(a.month) - 1,
      parseInt(a.day),
      parseInt(a.hours),
      parseInt(a.minutes),
      parseInt(a.seconds),
      parseInt(a.miliseconds)
    );

    const bDate = new Date(
      parseInt(b.year),
      parseInt(b.month) - 1,
      parseInt(b.day),
      parseInt(b.hours),
      parseInt(b.minutes),
      parseInt(b.seconds),
      parseInt(b.miliseconds)
    );

    const aOffsetUTCinMiliseconds = parseInt(a.offsetUTC) * 3600000;
    const bOffsetUTCinMiliseconds = parseInt(b.offsetUTC) * 3600000;

    const aTime = aDate.getTime() - aOffsetUTCinMiliseconds;
    const bTime = bDate.getTime() - bOffsetUTCinMiliseconds;

    if (order === "asc") {
      return aTime - bTime;
    } else {
      return bTime - aTime;
    }
  });
};

export default SortPostsByDate;
