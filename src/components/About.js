import { Outlet } from "react-router-dom";

function About() {
  return (
    <>
      <h4 style={{ textAlign: "center" }}>회사정보</h4>
      <Outlet></Outlet>
    </>
  );
}

export default About;
