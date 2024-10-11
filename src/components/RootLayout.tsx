import { Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <p>RootLayout</p>
      <Outlet />
    </>
  );
}

export default RootLayout;
