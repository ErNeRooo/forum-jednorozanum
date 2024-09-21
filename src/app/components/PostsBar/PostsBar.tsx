import PostTypes from "@/app/types/PostTypes";
import styles from "./PostsBar.module.sass";
import Post from "./Post/Post";

const PostsBar = () => {
  const mockPosts: PostTypes[] = [
    {
      id: "@312ew1",
      author: "Ossy",
      date: "11.09.2001",
      hour: "8:46",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor dignissim enim eget tristique.",
      image: "",
      comments: [
        {
          id: "s2dddq22",
          author: "Nick",
          date: "12.02.2022",
          hour: "12:00",
          text: "Sed id ligula auctor, maximus neque quis, molestie metus.",
          image: "",
        },
        {
          id: "2cwsdqdwf2",
          author: "Quasyn",
          date: "12.02.2022",
          hour: "12:00",
          text: "Maecenas eleifend, leo in dignissim iaculis, tortor lacus placerat lectus, nec ultricies augue eros a magna. Donec interdum volutpat magna, in consequat metus. Nam scelerisque in ex at feugiat. Proin eu elit odio. Vivamus hendrerit nisl ut finibus vestibulum. Donec varius vehicula rhoncus. Sed eu lacus finibus, tempor leo ut, sollicitudin tellus. Etiam rutrum accumsan lacus vitae sagittis. In cursus ex non euismod aliquam. Sed in est nulla. Cras id pharetra libero.",
          image: "",
        },
      ],
    },
    {
      id: "1231232",
      author: "Roman Balboa",
      date: "12.02.2022",
      hour: "12:00",
      text: "Ut ac finibus eros. Vestibulum sed diam et mi porttitor feugiat. Maecenas sagittis egestas purus, a vestibulum quam. Mauris purus tellus, congue eget odio at, facilisis ullamcorper lectus.",
      image: "",
      comments: [],
    },
    {
      id: "s2dd22",
      author: "Nick",
      date: "12.02.2022",
      hour: "12:00",
      text: "Nulla ante sapien, posuere sit amet mauris ut, viverra maximus purus. Nulla semper porttitor est imperdiet cursus. In hac habitasse platea dictumst. Curabitur posuere massa ac rutrum mattis. Nullam dignissim ipsum nisi, et iaculis massa viverra sed. Sed vel egestas nisl, eu hendrerit eros. Aenean non ante sed nunc consequat dapibus vel varius nisi. Phasellus fermentum laoreet tincidunt.",
      image: "",
      comments: [],
    },
    {
      id: "2cwdwf2",
      author: "Quasyn",
      date: "12.02.2022",
      hour: "12:00",
      text: "text 1",
      image: "",
      comments: [],
    },
  ];

  return (
    <div className={styles.PostsBar}>
      {mockPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsBar;
