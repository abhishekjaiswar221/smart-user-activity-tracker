import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ActivitySimulator from "./pages/ActivitySimulator";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import SuspiciousUsers from "./pages/SuspiciousUsers";
import Stats from "./pages/Stats";
import { Toaster } from "react-hot-toast";

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
      {
        path: "stats",
        Component: Stats,
      },
      {
        path: "suspicious",
        Component: SuspiciousUsers,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
