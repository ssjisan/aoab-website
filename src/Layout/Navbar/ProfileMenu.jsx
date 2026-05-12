import { EnrollHistory, Password, Profile } from "../../assets/Icons";

const navConfig = ({ pathname }) => [
  {
    title: "Profile",
    icon: (
      <Profile
        color={pathname === "/profile" ? "#003258" : "#637381"}
        size={20}
      />
    ),
    items: [
      {
        title: "Profile",
        link: "/profile",
      },
    ],
  },
  {
    title: "Password",
    icon: (
      <Password
        color={pathname === "/password" ? "#003258" : "#637381"}
        size={20}
      />
    ),
    items: [
      {
        title: "Password",
        link: "/password",
      },
    ],
  },
  {
    title: "Enrollment history",
    icon: (
      <EnrollHistory
        color={pathname === "/enrollment-history" ? "#003258" : "#637381"}
        size={20}
      />
    ),
    items: [
      {
        title: "Enrollment history",
        link: "/enrollment-history",
      },
    ],
  },
];

export default navConfig;
