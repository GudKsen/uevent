import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Register from "./components/register/Register";
import LogIn from "./components/register/LogIn";
import ResetPass from "./components/register/ResetPass";
import UserPage from "./components/user/UserPage";
import Setting from "./components/user/Setting";
import Event from "./components/event/Event";
import EventPage from "./components/event/EventPage";
import RegiConfirm from "./components/register/RegiConfirm";
// import DeleteProfile from "./components/register/DeleteProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "api/auth/register",
    element: <Register />,
  },
  {
    path: "api/auth/login",
    element: <LogIn />,
  },
  // {
  //   path: "delete_profile",
  //   element: <DeleteProfile />,
  // },
  {
    path: "api/auth/register/:token",
    element: <RegiConfirm />,
  },
  {
    path: "api/auth/resetpass",
    element: <ResetPass />,
  },
  
  {
    path: "userpage",
    element: <UserPage />,
  },
  {
    path: "eventpage/:id",
    element: <EventPage />,
  },
  {
    path: "events",
    element: <Event />,
  },
  {
    path: "userpage",
    element: <UserPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
