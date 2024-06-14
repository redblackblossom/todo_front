import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/join",
      element: <Join />,
    },
    {
      path: "/main",
      element: <Main />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
