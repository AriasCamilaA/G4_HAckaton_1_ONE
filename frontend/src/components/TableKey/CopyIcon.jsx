import React from "react";

export const CopyIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M16 1H4C2.9 1 2 1.9 2 3V15C2 16.1 2.9 17 4 17H16C17.1 17 18 16.1 18 15V3C18 1.9 17.1 1 16 1ZM16 15H4V3H16V15Z"
      fill="currentColor"
    />
    <path
      d="M20 7H18V19H6V21C6 22.1 6.9 23 8 23H20C21.1 23 22 22.1 22 21V9C22 7.9 21.1 7 20 7Z"
      fill="currentColor"
    />
  </svg>
);

export default CopyIcon;