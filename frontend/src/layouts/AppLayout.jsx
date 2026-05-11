import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
