import PostTypes from "@/app/types/PostTypes";
import SortPostsByDate from "@/app/utils/SortPostsByDate";

const testData: PostTypes[] = [
  {
    id: "4",
    // date
    year: "2024",
    month: "02",
    day: "05",
    offsetUTC: "0",
    hours: "00",
    minutes: "56",
    seconds: "34",
    miliseconds: "000",
    // other
    author: "",
    text: "",
    category: "",
    imageUrl: "",
    comments: [],
    isPinned: false,
  },
  {
    id: "5",
    // date
    year: "2024",
    month: "02",
    day: "05",
    offsetUTC: "+2",
    hours: "00",
    minutes: "50",
    seconds: "50",
    miliseconds: "900",
    // other
    author: "",
    text: "",
    category: "",
    imageUrl: "",
    comments: [],
    isPinned: false,
  },
  {
    id: "8",
    // date
    year: "2024",
    month: "01",
    day: "04",
    offsetUTC: "+3",
    hours: "00",
    minutes: "00",
    seconds: "47",
    miliseconds: "000",
    // other
    author: "",
    text: "",
    category: "",
    imageUrl: "",
    comments: [],
    isPinned: false,
  },
  {
    id: "2",
    // date
    year: "2024",
    month: "02",
    day: "05",
    offsetUTC: "-9",
    hours: "01",
    minutes: "56",
    seconds: "34",
    miliseconds: "000",
    // other
    author: "",
    text: "",
    category: "",
    imageUrl: "",
    comments: [],
    isPinned: false,
  },
  {
    id: "6",
    // date
    year: "2024",
    month: "01",
    day: "05",
    offsetUTC: "+2",
    hours: "00",
    minutes: "00",
    seconds: "23",
    miliseconds: "000",
    // other
    author: "",
    text: "",
    category: "",
    imageUrl: "",
    comments: [],
    isPinned: false,
  },

  {
    id: "1",
    // date
    year: "2024",
    month: "02",
    day: "05",
    offsetUTC: "-10",
    hours: "00",
    minutes: "56",
    seconds: "34",
    miliseconds: "001",
    // other
    author: "",
    text: "",
    category: "",
    imageUrl: "",
    comments: [],
    isPinned: false,
  },
  {
    id: "7",
    // date
    year: "2024",
    month: "01",
    day: "04",
    offsetUTC: "+2",
    hours: "00",
    minutes: "00",
    seconds: "47",
    miliseconds: "000",
    // other
    author: "",
    text: "",
    category: "",
    imageUrl: "",
    comments: [],
    isPinned: false,
  },
  {
    id: "3",
    // date
    year: "2024",
    month: "02",
    day: "05",
    offsetUTC: "-10",
    hours: "00",
    minutes: "56",
    seconds: "34",
    miliseconds: "000",
    // other
    author: "",
    text: "",
    category: "",
    imageUrl: "",
    comments: [],
    isPinned: false,
  },
];

test("sort posts by date desc", () => {
  const expectedResult: PostTypes[] = [
    {
      id: "1",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "-10",
      hours: "00",
      minutes: "56",
      seconds: "34",
      miliseconds: "001",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "2",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "-9",
      hours: "01",
      minutes: "56",
      seconds: "34",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "3",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "-10",
      hours: "00",
      minutes: "56",
      seconds: "34",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "4",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "0",
      hours: "00",
      minutes: "56",
      seconds: "34",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "5",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "+2",
      hours: "00",
      minutes: "50",
      seconds: "50",
      miliseconds: "900",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "6",
      // date
      year: "2024",
      month: "01",
      day: "05",
      offsetUTC: "+2",
      hours: "00",
      minutes: "00",
      seconds: "23",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "7",
      // date
      year: "2024",
      month: "01",
      day: "04",
      offsetUTC: "+2",
      hours: "00",
      minutes: "00",
      seconds: "47",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "8",
      // date
      year: "2024",
      month: "01",
      day: "04",
      offsetUTC: "+3",
      hours: "00",
      minutes: "00",
      seconds: "47",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
  ];

  const result = SortPostsByDate(testData, "desc");

  expect(result).toEqual(expectedResult);
});

test("sort posts by date asc", () => {
  const expectedResult: PostTypes[] = [
    {
      id: "8",
      // date
      year: "2024",
      month: "01",
      day: "04",
      offsetUTC: "+3",
      hours: "00",
      minutes: "00",
      seconds: "47",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "7",
      // date
      year: "2024",
      month: "01",
      day: "04",
      offsetUTC: "+2",
      hours: "00",
      minutes: "00",
      seconds: "47",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "6",
      // date
      year: "2024",
      month: "01",
      day: "05",
      offsetUTC: "+2",
      hours: "00",
      minutes: "00",
      seconds: "23",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "5",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "+2",
      hours: "00",
      minutes: "50",
      seconds: "50",
      miliseconds: "900",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "4",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "0",
      hours: "00",
      minutes: "56",
      seconds: "34",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "2",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "-9",
      hours: "01",
      minutes: "56",
      seconds: "34",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "3",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "-10",
      hours: "00",
      minutes: "56",
      seconds: "34",
      miliseconds: "000",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
    {
      id: "1",
      // date
      year: "2024",
      month: "02",
      day: "05",
      offsetUTC: "-10",
      hours: "00",
      minutes: "56",
      seconds: "34",
      miliseconds: "001",
      // other
      author: "",
      text: "",
      category: "",
      imageUrl: "",
      comments: [],
      isPinned: false,
    },
  ];

  const result = SortPostsByDate(testData, "asc");

  expect(result).toEqual(expectedResult);
});
