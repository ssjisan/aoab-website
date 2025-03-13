import {
  Certificate,
  EnrollHistory,
  Logout,
  Password,
  Profile,
} from "../../assets/Icons";

const navConfig = ({ pathname }) => [
  {
    title: "Profile",
    icon: (
      <Profile
        color={pathname === "/profile" ? "#9C27B0" : "#637381"}
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
        color={pathname === "/password" ? "#9C27B0" : "#637381"}
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
        color={pathname === "/enrollment-history" ? "#9C27B0" : "#637381"}
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
  {
    title: "Certificate",
    icon: (
      <Certificate
        color={pathname === "/certificate" ? "#9C27B0" : "#637381"}
        size={20}
      />
    ),
    items: [
      {
        title: "Certificates",
        link: "/certificate",
      },
    ],
  },
  {
    title: "Log out",
    icon: <Logout color="#D32F2F" size={20} />,
    items: [
      {
        title: "Log Out",
        link: "/logout",
      },
    ],
  },
];

export default navConfig;
