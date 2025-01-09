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
    submenu: [
      {
        id: 1,
        title: "AO Alliance - Global",
        link: "https://events.ao-alliance.org/",
        subtitle:"Discover international training opportunities."
      },
      {
        id: 2,
        title: "AO Alliance - Bangladesh",
        link: "/educations&training/aoa-bangladesh",
        subtitle:"Explore local learning opportunities"
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
  // {
  //   id: 7,
  //   title: "Contact",
  //   link: "/contact",
  // },
];

export { main };
