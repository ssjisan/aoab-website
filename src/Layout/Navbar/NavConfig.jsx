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
    title: "Educations & Training",
    link: "/educations&training",
    submenu: [
      {
        id: 1,
        title: "AOA - Global",
        link: "https://events.ao-alliance.org/",
      },
      {
        id: 2,
        title: "AOA - Bangladesh",
        link: "/educations&training/aoa-bangladesh",
      },
    ],
  },
  {
    id: 4,
    title: "Clinical Research",
    link: "/clinical-research",
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
    title: "Contact",
    link: "/contact",
  },
];

export { main };
