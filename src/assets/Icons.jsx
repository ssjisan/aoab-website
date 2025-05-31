import PropTypes from "prop-types";

export const Menu = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.25 14.48H3.75C3.55109 14.48 3.36032 14.559 3.21967 14.6996C3.07902 14.8403 3 15.0311 3 15.23C3 15.4289 3.07902 15.6197 3.21967 15.7603C3.36032 15.901 3.55109 15.98 3.75 15.98H20.25C20.4489 15.98 20.6397 15.901 20.7803 15.7603C20.921 15.6197 21 15.4289 21 15.23C21 15.0311 20.921 14.8403 20.7803 14.6996C20.6397 14.559 20.4489 14.48 20.25 14.48Z"
        fill={color}
      />
      <path
        d="M20.25 10.48H3.75C3.55109 10.48 3.36032 10.401 3.21967 10.2603C3.07902 10.1197 3 9.92889 3 9.72998C3 9.53107 3.07902 9.3403 3.21967 9.19965C3.36032 9.059 3.55109 8.97998 3.75 8.97998H20.25C20.4489 8.97998 20.6397 9.059 20.7803 9.19965C20.921 9.3403 21 9.53107 21 9.72998C21 9.92889 20.921 10.1197 20.7803 10.2603C20.6397 10.401 20.4489 10.48 20.25 10.48Z"
        fill={color}
      />
    </svg>
  );
};

export const Whatsapp = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.4005 3.62703C14.733 1.92432 12.4278 1 10.0736 1C5.07084 1 1.04905 5.03784 1.09809 9.95135C1.09809 11.5081 1.53951 13.0162 2.2752 14.3784L1 19L5.75749 17.7838C7.08174 18.5135 8.55313 18.8541 10.0245 18.8541C14.9782 18.8541 19 14.8162 19 9.9027C19 7.51892 18.0681 5.28108 16.4005 3.62703ZM10.0736 17.3459C8.74932 17.3459 7.42507 17.0054 6.297 16.3243L6.00272 16.1784L3.15804 16.9081L3.89373 14.1351L3.69755 13.8432C1.53951 10.3892 2.56948 5.81622 6.10082 3.67568C9.63215 1.53514 14.1935 2.55676 16.3515 6.05946C18.5095 9.56216 17.4796 14.0865 13.9482 16.227C12.8202 16.9568 11.4469 17.3459 10.0736 17.3459ZM14.3896 11.9459L13.8501 11.7027C13.8501 11.7027 13.0654 11.3622 12.5749 11.1189C12.5259 11.1189 12.4768 11.0703 12.4278 11.0703C12.2807 11.0703 12.1826 11.1189 12.0845 11.1676C12.0845 11.1676 12.0354 11.2162 11.3488 11.9946C11.2997 12.0919 11.2016 12.1405 11.1035 12.1405H11.0545C11.0054 12.1405 10.9074 12.0919 10.8583 12.0432L10.6131 11.9459C10.0736 11.7027 9.58311 11.4108 9.19074 11.0216C9.09264 10.9243 8.9455 10.827 8.84741 10.7297C8.50409 10.3892 8.16076 10 7.91553 9.56216L7.86648 9.46486C7.81744 9.41622 7.81744 9.36757 7.76839 9.27027C7.76839 9.17297 7.76839 9.07568 7.81744 9.02703C7.81744 9.02703 8.01362 8.78378 8.16076 8.63784C8.25886 8.54054 8.3079 8.39459 8.40599 8.2973C8.50409 8.15135 8.55313 7.95676 8.50409 7.81081C8.45504 7.56757 7.86648 6.25405 7.71935 5.96216C7.62125 5.81622 7.52316 5.76757 7.37602 5.71892H7.22888C7.13079 5.71892 6.98365 5.71892 6.83651 5.71892C6.73842 5.71892 6.64033 5.76757 6.54223 5.76757L6.49319 5.81622C6.3951 5.86486 6.297 5.96216 6.19891 6.01081C6.10082 6.10811 6.05177 6.20541 5.95368 6.3027C5.61035 6.74054 5.41417 7.27568 5.41417 7.81081C5.41417 8.2 5.51226 8.58919 5.6594 8.92973L5.70845 9.07568C6.14986 10 6.73842 10.827 7.52316 11.5568L7.71935 11.7514C7.86648 11.8973 8.01362 11.9946 8.11172 12.1405C9.14169 13.0162 10.3188 13.6486 11.6431 13.9892C11.7902 14.0378 11.9864 14.0378 12.1335 14.0865C12.2807 14.0865 12.4768 14.0865 12.624 14.0865C12.8692 14.0865 13.1635 13.9892 13.3597 13.8919C13.5068 13.7946 13.6049 13.7946 13.703 13.6973L13.8011 13.6C13.8992 13.5027 13.9973 13.4541 14.0954 13.3568C14.1935 13.2595 14.2916 13.1622 14.3406 13.0649C14.4387 12.8703 14.4877 12.627 14.5368 12.3838C14.5368 12.2865 14.5368 12.1405 14.5368 12.0432C14.5368 12.0432 14.4877 11.9946 14.3896 11.9459Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const Phone = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.3084 15.275C18.3084 15.575 18.2417 15.8833 18.1001 16.1833C17.9584 16.4833 17.7751 16.7666 17.5334 17.0333C17.1251 17.4833 16.6751 17.8083 16.1667 18.0166C15.6667 18.225 15.1251 18.3333 14.5417 18.3333C13.6917 18.3333 12.7834 18.1333 11.8251 17.725C10.8667 17.3166 9.90842 16.7666 8.95842 16.075C8.00008 15.375 7.09175 14.6 6.22508 13.7416C5.36675 12.875 4.59175 11.9666 3.90008 11.0166C3.21675 10.0666 2.66675 9.11663 2.26675 8.17496C1.86675 7.22496 1.66675 6.31663 1.66675 5.44996C1.66675 4.88329 1.76675 4.34163 1.96675 3.84163C2.16675 3.33329 2.48341 2.86663 2.92508 2.44996C3.45841 1.92496 4.04175 1.66663 4.65841 1.66663C4.89175 1.66663 5.12508 1.71663 5.33341 1.81663C5.55008 1.91663 5.74175 2.06663 5.89175 2.28329L7.82508 5.00829C7.97508 5.21663 8.08341 5.40829 8.15841 5.59163C8.23341 5.76663 8.27508 5.94163 8.27508 6.09996C8.27508 6.29996 8.21675 6.49996 8.10008 6.69163C7.99175 6.88329 7.83341 7.08329 7.63341 7.28329L7.00008 7.94163C6.90841 8.03329 6.86675 8.14163 6.86675 8.27496C6.86675 8.34163 6.87508 8.39996 6.89175 8.46663C6.91675 8.53329 6.94175 8.58329 6.95842 8.63329C7.10842 8.90829 7.36675 9.26663 7.73341 9.69996C8.10841 10.1333 8.50841 10.575 8.94175 11.0166C9.39175 11.4583 9.82508 11.8666 10.2667 12.2416C10.7001 12.6083 11.0584 12.8583 11.3417 13.0083C11.3834 13.025 11.4334 13.05 11.4917 13.075C11.5584 13.1 11.6251 13.1083 11.7001 13.1083C11.8417 13.1083 11.9501 13.0583 12.0417 12.9666L12.6751 12.3416C12.8834 12.1333 13.0834 11.975 13.2751 11.875C13.4667 11.7583 13.6584 11.7 13.8667 11.7C14.0251 11.7 14.1917 11.7333 14.3751 11.8083C14.5584 11.8833 14.7501 11.9916 14.9584 12.1333L17.7167 14.0916C17.9334 14.2416 18.0834 14.4166 18.1751 14.625C18.2584 14.8333 18.3084 15.0416 18.3084 15.275Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export const LeftArrow = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const RightArrow = ({ size, color }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Calender = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2V5"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V5"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9.08997H20.5"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9955 13.7H12.0045"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29431 13.7H8.30329"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29431 16.7H8.30329"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CalenderDualTone = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={"24"}
        height={"24"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.94028 2C7.35614 2 7.69326 2.32421 7.69326 2.72414V4.18487C8.36117 4.17241 9.10983 4.17241 9.95219 4.17241H13.9681C14.8104 4.17241 15.5591 4.17241 16.227 4.18487V2.72414C16.227 2.32421 16.5641 2 16.98 2C17.3958 2 17.733 2.32421 17.733 2.72414V4.24894C19.178 4.36022 20.1267 4.63333 20.8236 5.30359C21.5206 5.97385 21.8046 6.88616 21.9203 8.27586L22 9H2.92456H2V8.27586C2.11571 6.88616 2.3997 5.97385 3.09665 5.30359C3.79361 4.63333 4.74226 4.36022 6.1873 4.24894V2.72414C6.1873 2.32421 6.52442 2 6.94028 2Z"
          fill={color}
        />
        <path
          opacity="0.5"
          d="M22 14.0001V12.0001C22 11.161 21.9968 9.66527 21.9839 9H2.00966C1.99675 9.66527 2.00001 11.161 2.00001 12.0001V14.0001C2.00001 17.7713 2.00001 19.6569 3.17159 20.8285C4.34316 22.0001 6.22878 22.0001 10 22.0001H14C17.7713 22.0001 19.6569 22.0001 20.8284 20.8285C22 19.6569 22 17.7713 22 14.0001Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const Fees = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M3.77772 18.3259C4.78661 19 6.19108 19 9 19L15 19C17.8089 19 19.2134 19 20.2223 18.3259C20.659 18.034 21.034 17.659 21.3259 17.2223C22 16.2134 22 14.8089 22 12C22 9.19107 22 7.78661 21.3259 6.77772C21.034 6.34096 20.659 5.96595 20.2223 5.67412C19.2134 5 17.8089 5 15 5H9C6.19108 5 4.78661 5 3.77772 5.67412C3.34096 5.96596 2.96596 6.34096 2.67412 6.77772C2 7.78661 2 9.19108 2 12C2 14.8089 2 16.2134 2.67412 17.2223C2.96596 17.659 3.34096 18.034 3.77772 18.3259Z"
          fill={color}
        />
        <path
          d="M5.5 15.75C5.08579 15.75 4.75 15.4142 4.75 15L4.75 9C4.75 8.58579 5.08579 8.25 5.5 8.25C5.91421 8.25 6.25 8.58579 6.25 9L6.25 15C6.25 15.4142 5.91421 15.75 5.5 15.75Z"
          fill={color}
        />
        <path
          d="M17.75 15C17.75 15.4142 18.0858 15.75 18.5 15.75C18.9142 15.75 19.25 15.4142 19.25 15V9C19.25 8.58579 18.9142 8.25 18.5 8.25C18.0858 8.25 17.75 8.58579 17.75 9V15Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12ZM9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const Clock = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
        stroke="#F4866F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7099 15.18L12.6099 13.33C12.0699 13.01 11.6299 12.24 11.6299 11.61V7.51001"
        stroke="#F4866F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Location = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z"
        stroke="#F4866F"
        strokeWidth="1.5"
      />
      <path
        d="M3.6202 8.49C5.5902 -0.169998 18.4202 -0.159997 20.3802 8.5C21.5302 13.58 18.3702 17.88 15.6002 20.54C13.5902 22.48 10.4102 22.48 8.3902 20.54C5.6302 17.88 2.4702 13.57 3.6202 8.49Z"
        stroke="#F4866F"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const LocationBasic = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4999 13.4299C14.223 13.4299 15.6199 12.0331 15.6199 10.3099C15.6199 8.58681 14.223 7.18994 12.4999 7.18994C10.7768 7.18994 9.37988 8.58681 9.37988 10.3099C9.37988 12.0331 10.7768 13.4299 12.4999 13.4299Z"
        stroke="#292D32"
        strokeWidth="1.5"
      />
      <path
        d="M4.11995 8.49C6.08995 -0.169998 18.92 -0.159997 20.88 8.5C22.03 13.58 18.87 17.88 16.1 20.54C14.09 22.48 10.91 22.48 8.88995 20.54C6.12995 17.88 2.96995 13.57 4.11995 8.49Z"
        stroke="#292D32"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const SMS = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
        stroke="#031E21"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
        stroke="#031E21"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CallBasic = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
        stroke="#031E21"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
export const AlbumIcon = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 10.5V4.66667C17.5 4.22464 17.3244 3.80072 17.0118 3.48816C16.6993 3.17559 16.2754 3 15.8333 3H4.16667C3.72464 3 3.30072 3.17559 2.98816 3.48816C2.67559 3.80072 2.5 4.22464 2.5 4.66667V13.8333M17.5 10.5V16.3333C17.5 16.7754 17.3244 17.1993 17.0118 17.5118C16.6993 17.8244 16.2754 18 15.8333 18H13.3333M17.5 10.5C12.1317 10.5 9.07917 12.1542 7.45417 14.0358M2.5 13.8333V16.3333C2.5 16.7754 2.67559 17.1993 2.98816 17.5118C3.30072 17.8244 3.72464 18 4.16667 18H13.3333M2.5 13.8333C3.66917 13.6383 5.53083 13.5892 7.45417 14.0358M13.3333 18C11.9133 15.6933 9.64417 14.5433 7.45417 14.0358M7.08333 6.33333C6.66667 6.33333 5.83333 6.58333 5.83333 7.58333C5.83333 8.58333 6.66667 8.83333 7.08333 8.83333C7.5 8.83333 8.33333 8.58333 8.33333 7.58333C8.33333 6.58333 7.5 6.33333 7.08333 6.33333Z"
        stroke="#F4866F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Close = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 17L7 7"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LocationPin = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9998 22.3833C22.8717 22.3833 25.1998 20.0552 25.1998 17.1833C25.1998 14.3115 22.8717 11.9833 19.9998 11.9833C17.1279 11.9833 14.7998 14.3115 14.7998 17.1833C14.7998 20.0552 17.1279 22.3833 19.9998 22.3833Z"
        stroke="#F36D50"
        strokeWidth="1.5"
      />
      <path
        d="M6.0335 14.15C9.31683 -0.283333 30.7002 -0.266666 33.9668 14.1667C35.8835 22.6333 30.6168 29.8 26.0002 34.2333C22.6502 37.4667 17.3502 37.4667 13.9835 34.2333C9.3835 29.8 4.11683 22.6167 6.0335 14.15Z"
        stroke="#F36D50"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const Mail = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.333 34.1667H11.6663C6.66634 34.1667 3.33301 31.6667 3.33301 25.8333V14.1667C3.33301 8.33333 6.66634 5.83333 11.6663 5.83333H28.333C33.333 5.83333 36.6663 8.33333 36.6663 14.1667V25.8333C36.6663 31.6667 33.333 34.1667 28.333 34.1667Z"
        stroke="#F36D50"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.3337 15L23.117 19.1667C21.4003 20.5333 18.5837 20.5333 16.867 19.1667L11.667 15"
        stroke="#F36D50"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Call = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.6163 30.55C36.6163 31.15 36.483 31.7667 36.1997 32.3667C35.9163 32.9667 35.5497 33.5333 35.0663 34.0667C34.2497 34.9667 33.3497 35.6167 32.333 36.0333C31.333 36.45 30.2497 36.6667 29.083 36.6667C27.383 36.6667 25.5663 36.2667 23.6497 35.45C21.733 34.6333 19.8163 33.5333 17.9163 32.15C15.9997 30.75 14.183 29.2 12.4497 27.4833C10.733 25.75 9.18301 23.9333 7.79967 22.0333C6.43301 20.1333 5.33301 18.2333 4.53301 16.35C3.73301 14.45 3.33301 12.6333 3.33301 10.9C3.33301 9.76667 3.53301 8.68333 3.93301 7.68333C4.33301 6.66667 4.96634 5.73333 5.84967 4.9C6.91634 3.85 8.08301 3.33333 9.31634 3.33333C9.78301 3.33333 10.2497 3.43333 10.6663 3.63333C11.0997 3.83333 11.483 4.13333 11.783 4.56667L15.6497 10.0167C15.9497 10.4333 16.1663 10.8167 16.3163 11.1833C16.4663 11.5333 16.5497 11.8833 16.5497 12.2C16.5497 12.6 16.433 13 16.1997 13.3833C15.983 13.7667 15.6663 14.1667 15.2663 14.5667L13.9997 15.8833C13.8163 16.0667 13.733 16.2833 13.733 16.55C13.733 16.6833 13.7497 16.8 13.783 16.9333C13.833 17.0667 13.883 17.1667 13.9163 17.2667C14.2163 17.8167 14.733 18.5333 15.4663 19.4C16.2163 20.2667 17.0163 21.15 17.883 22.0333C18.783 22.9167 19.6497 23.7333 20.533 24.4833C21.3997 25.2167 22.1163 25.7167 22.683 26.0167C22.7663 26.05 22.8663 26.1 22.983 26.15C23.1163 26.2 23.2497 26.2167 23.3997 26.2167C23.683 26.2167 23.8997 26.1167 24.083 25.9333L25.3497 24.6833C25.7663 24.2667 26.1663 23.95 26.5497 23.75C26.933 23.5167 27.3163 23.4 27.733 23.4C28.0497 23.4 28.383 23.4667 28.7497 23.6167C29.1163 23.7667 29.4997 23.9833 29.9163 24.2667L35.433 28.1833C35.8663 28.4833 36.1663 28.8333 36.3497 29.25C36.5163 29.6667 36.6163 30.0833 36.6163 30.55Z"
        stroke="#F36D50"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export const Plus = ({ color, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 3V17" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M3 10H17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
export const Play = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.13587 6.68152C8.63598 6.38159 8 6.74167 8 7.32464V16.6754C8 17.2583 8.63598 17.6184 9.13587 17.3185L16.9281 12.6431C17.4136 12.3518 17.4136 11.6482 16.9281 11.3569L9.13587 6.68152Z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
export const More = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="2" fill={color} />
        <circle cx="12" cy="19" r="2" fill={color} />
        <circle cx="12" cy="5" r="2" fill={color} />
      </svg>
    </div>
  );
};
export const Cross = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6.00005L6 18M5.99995 6L17.9999 18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
export const EyeOff = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.47 14.53L2 22"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 2L14.53 9.47"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
export const EyeOn = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C13.9799 8.42004 15.5799 10.02 15.5799 12Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0001 20.27C15.5301 20.27 18.8201 18.19 21.1101 14.59C22.0101 13.18 22.0101 10.81 21.1101 9.39997C18.8201 5.79997 15.5301 3.71997 12.0001 3.71997C8.47009 3.71997 5.18009 5.79997 2.89009 9.39997C1.99009 10.81 1.99009 13.18 2.89009 14.59C5.18009 18.19 8.47009 20.27 12.0001 20.27Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Certificate = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="16" r="3" stroke={color} strokeWidth="1.5" />
        <path
          d="M12 19.2597L9.73713 21.4292C9.41306 21.7399 9.25102 21.8952 9.1138 21.949C8.80111 22.0715 8.45425 21.9666 8.28977 21.6999C8.21758 21.5829 8.19509 21.3718 8.1501 20.9495C8.1247 20.7111 8.112 20.5919 8.07345 20.4921C7.98715 20.2686 7.80579 20.0947 7.57266 20.012C7.46853 19.975 7.3442 19.9629 7.09553 19.9385C6.65512 19.8954 6.43491 19.8738 6.31283 19.8046C6.03463 19.6469 5.92529 19.3144 6.05306 19.0146C6.10913 18.883 6.27116 18.7277 6.59523 18.417L8.07345 16.9998L9.1138 15.9595"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M12 19.2597L14.2629 21.4291C14.5869 21.7398 14.749 21.8952 14.8862 21.9489C15.1989 22.0714 15.5457 21.9666 15.7102 21.6999C15.7824 21.5828 15.8049 21.3717 15.8499 20.9495C15.8753 20.7111 15.888 20.5919 15.9265 20.4921C16.0129 20.2686 16.1942 20.0947 16.4273 20.012C16.5315 19.975 16.6558 19.9628 16.9045 19.9385C17.3449 19.8953 17.5651 19.8738 17.6872 19.8046C17.9654 19.6469 18.0747 19.3143 17.9469 19.0146C17.8909 18.883 17.7288 18.7277 17.4048 18.417L15.9265 16.9998L15 16.0732"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M17.3197 17.9957C19.2921 17.9748 20.3915 17.8512 21.1213 17.1213C22 16.2426 22 14.8284 22 12V8C22 5.17157 22 3.75736 21.1213 2.87868C20.2426 2 18.8284 2 16 2L8 2C5.17157 2 3.75736 2 2.87868 2.87868C2 3.75736 2 5.17157 2 8L2 12C2 14.8284 2 16.2426 2.87868 17.1213C3.64706 17.8897 4.82497 17.9862 7 17.9983"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M9 6L15 6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 9.5H17"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
export const EnrollHistory = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.082 3.01775L20.1081 3.76729L20.082 3.01775ZM16.5 3.48744L16.2849 2.76895V2.76895L16.5 3.48744ZM13.6738 4.80275L13.2982 4.15363L13.2982 4.15363L13.6738 4.80275ZM3.9824 3.07489L3.93639 3.82348L3.9824 3.07489ZM7 3.48744L7.19136 2.76227V2.76227L7 3.48744ZM10.2823 4.87546L9.93167 5.53847L10.2823 4.87546ZM13.6276 20.0692L13.9804 20.7311L13.6276 20.0692ZM17 18.6334L16.8086 17.9082H16.8086L17 18.6334ZM19.9851 18.2228L20.032 18.9714L19.9851 18.2228ZM10.3724 20.0692L10.0196 20.7311H10.0196L10.3724 20.0692ZM7 18.6334L7.19136 17.9082H7.19136L7 18.6334ZM4.01486 18.2228L3.96804 18.9714H3.96804L4.01486 18.2228ZM2.75 16.1436V4.9978H1.25V16.1436H2.75ZM22.75 16.1436V4.93319H21.25V16.1436H22.75ZM20.0559 2.2682C18.9175 2.30785 17.4296 2.42627 16.2849 2.76895L16.7151 4.20594C17.6643 3.92179 18.9892 3.80627 20.1081 3.76729L20.0559 2.2682ZM16.2849 2.76895C15.2899 3.06684 14.1706 3.64868 13.2982 4.15363L14.0495 5.45188C14.9 4.95969 15.8949 4.45149 16.7151 4.20594L16.2849 2.76895ZM3.93639 3.82348C4.90238 3.88285 5.99643 3.99829 6.80864 4.21262L7.19136 2.76227C6.23055 2.50873 5.01517 2.38695 4.02841 2.3263L3.93639 3.82348ZM6.80864 4.21262C7.77076 4.46651 8.95486 5.02196 9.93167 5.53847L10.6328 4.21244C9.63736 3.68606 8.32766 3.06211 7.19136 2.76227L6.80864 4.21262ZM13.9804 20.7311C14.9714 20.2028 16.1988 19.6205 17.1914 19.3585L16.8086 17.9082C15.6383 18.217 14.2827 18.8701 13.2748 19.4074L13.9804 20.7311ZM17.1914 19.3585C17.9943 19.1466 19.0732 19.0313 20.032 18.9714L19.9383 17.4743C18.9582 17.5356 17.7591 17.6574 16.8086 17.9082L17.1914 19.3585ZM10.7252 19.4074C9.71727 18.8701 8.3617 18.217 7.19136 17.9082L6.80864 19.3585C7.8012 19.6205 9.0286 20.2028 10.0196 20.7311L10.7252 19.4074ZM7.19136 17.9082C6.24092 17.6574 5.04176 17.5356 4.06168 17.4743L3.96804 18.9714C4.9268 19.0313 6.00566 19.1466 6.80864 19.3585L7.19136 17.9082ZM21.25 16.1436C21.25 16.8293 20.6817 17.4278 19.9383 17.4743L20.032 18.9714C21.5062 18.8791 22.75 17.6798 22.75 16.1436H21.25ZM22.75 4.93319C22.75 3.46989 21.5847 2.21495 20.0559 2.2682L20.1081 3.76729C20.7229 3.74588 21.25 4.25161 21.25 4.93319H22.75ZM1.25 16.1436C1.25 17.6798 2.49378 18.8791 3.96804 18.9714L4.06168 17.4743C3.31831 17.4278 2.75 16.8293 2.75 16.1436H1.25ZM13.2748 19.4074C12.4825 19.8297 11.5175 19.8297 10.7252 19.4074L10.0196 20.7311C11.2529 21.3885 12.7471 21.3885 13.9804 20.7311L13.2748 19.4074ZM13.2982 4.15363C12.4801 4.62709 11.4617 4.6507 10.6328 4.21244L9.93167 5.53847C11.2239 6.22177 12.791 6.18025 14.0495 5.45188L13.2982 4.15363ZM2.75 4.9978C2.75 4.30062 3.30243 3.78451 3.93639 3.82348L4.02841 2.3263C2.47017 2.23053 1.25 3.49864 1.25 4.9978H2.75Z"
          fill={color}
        />
        <path d="M12 5.854V20.9999" stroke={color} strokeWidth="1.5" />
        <path
          d="M5 9L9 10"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M19 9L15 10"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 13L9 14"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M19 13L15 14"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const Logout = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2V6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.5 3.70593C5.26806 5.07145 3 8.27087 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 8.27087 18.7319 5.07145 15.5 3.70593"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
export const Password = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
export const Profile = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="6" r="4" stroke={color} strokeWidth="1.5" />
        <ellipse
          cx="12"
          cy="17"
          rx="7"
          ry="4"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export const Warning = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
Menu.propTypes = {
  color: PropTypes.string.isRequired,
};
Whatsapp.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Phone.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Plus.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Play.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Cross.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
RightArrow.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Calender.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
EyeOff.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
EyeOff.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
EyeOn.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Certificate.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
EnrollHistory.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Logout.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Password.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Profile.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
More.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
CalenderDualTone.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
Fees.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
