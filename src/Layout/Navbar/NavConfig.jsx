const main = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About Us",
    link: "/about-us",
  },
  {
    id: 3,
    title: "Courses & Events",
    submenu: [
      {
        id: 1,
        title: "AO Alliance - Global",
        link: "https://events.ao-alliance.org/",
        subtitle: "Discover international training opportunities.",
      },
      {
        id: 2,
        title: "AO Alliance - Bangladesh",
        link: "/educations&training/aoa-bangladesh",
        subtitle: "Explore local learning opportunities",
      },
    ],
  },
  {
    id: 4,
    title: "Links & Forms",
    submenu: [
      {
        id: 1,
        title: "Links",
        link: "/links&forms/links",
        subtitle: "Discover all important links",
      },
      {
        id: 2,
        title: "Forms",
        link: "/links&forms/forms",
        subtitle: "Explore all essential forms",
      },
    ],
  },
  {
    id: 5,
    title: "Online learning",
    link: "/online-learning",
  },
  {
    id: 6,
    title: "Videos",
    link: "/videos",
  },
  {
    id: 7,
    title: "Gallery",
    link: "/gallery",
  },
];

export { main };
