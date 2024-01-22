import { Fragment } from "react";

const Code = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  return <Fragment>{code}</Fragment>;
};
export default Code;
