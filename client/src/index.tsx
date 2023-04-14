import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Register from "./components/register/Register";
import LogIn from "./components/register/LogIn";
import ResetPass from "./components/register/ResetPass";
import ResetPassConfirm from "./components/register/ResetPassConfirm";
import UserPage from "./components/user/UserPage";
import Setting from "./components/user/Setting";
import Event from "./components/event/Event";
import EventPage from "./components/event/EventPage";
import RegiConfirm from "./components/register/RegiConfirm";
import BankCard from "./components/bankCard/bankCard";
import CreateEvent from "./components/event/CreateEvent/CreateEvent";
import AdminPanel from "./components/Admin/AdminPanel";
import { CreateOrganization } from "./components/Organization/CreateOrganization";
import { OrganizationPage } from "./components/Organization/OrganizationPage";
import DeleteProf from "./components/register/DeleteProf";
import { PaymentPage } from "./components/Payment/PaymentPage";
import { ManageEvents } from "./components/Organizer/ManageEvents";
import { Thankyou } from "./components/Payment/Thankyou";

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
    path: "api/user/:id",
    element: <DeleteProf />,
  },
  {
    path: "/api/auth/password-reset/:confirm_token/:id",
    element: <ResetPassConfirm />,
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
  {
    path: "bankcard",
    element: <BankCard />,
  },
  {
    path: "thankyou",
    element: <Thankyou />,
  },
  {
    path: "events-manage",
    element: <ManageEvents/>
  },
  {
    path: "create-event",
    element: <CreateEvent/>
  },
  {
    path: "admin-panel",
    element: <AdminPanel/>
  },
  {
    path: "create-organization",
    element: <CreateOrganization/>
  },
  {
    path: "my-organization",
    element: <OrganizationPage/>
  },
  {
    path: "pay",
    element: <PaymentPage/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);


