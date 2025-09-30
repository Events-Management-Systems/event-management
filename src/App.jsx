import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
// import CreateEvent from "./pages/CreateEvent";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/info/:id", element: <Info /> },
  // { path: "/create", element: <CreateEvent /> }
]);

export default function App() {
  return <RouterProvider router={router} />;
}

