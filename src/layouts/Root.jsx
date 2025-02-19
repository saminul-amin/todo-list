import { Outlet } from "react-router-dom";
import NavBar from "../pages/shared/NavBar";

export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
