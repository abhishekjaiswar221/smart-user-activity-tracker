import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";

const routes = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    Component: AppLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
