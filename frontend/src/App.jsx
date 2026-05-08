import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

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
      // {
      //   path: "dashboard",
      //   Component: Dashboard,
      // },
      // {
      //   path: "problems",
      //   Component: Problems,
      // },
      // {
      //   path: "problem/:id",
      //   Component: Problem,
      // },
      // {
      //   path: "session/:id",
      //   Component: Session,
      // },
    ],
  },
]);

const App = () => {
  // const { isLoaded } = useUser();

  // if (!isLoaded) return <Loader />;

  return (
    <>
      {/* <Toaster toastOptions={{ duration: 2000 }} /> */}
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
