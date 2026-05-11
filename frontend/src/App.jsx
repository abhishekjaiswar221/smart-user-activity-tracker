import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ActivitySimulator from "./pages/ActivitySimulator";
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
      {
        path: "activity",
        Component: ActivitySimulator,
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
