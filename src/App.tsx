import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./MyContext/UserContext";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import { UserInfo } from "./Interface&Type/MyInterfaces";

const App = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
    loggedIn: false,
    userId: "",
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "Login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
