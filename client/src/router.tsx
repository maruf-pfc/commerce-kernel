import { createBrowserRouter } from "react-router-dom"
import CustomerLayout from "./components/layout/CustomerLayout"
import StoreHome from "./pages/customer/StoreHome"
import { PublicOnlyLayout } from "./components/auth/PublicOnlyLayout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import { ProtectedLayout } from "./components/auth/ProtectedLayout"
import CustomerProfile from "./pages/customer/CustomerProfile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <StoreHome />,
      },
      {
        element: <PublicOnlyLayout />,
        children: [
          {
            path: "sign-in/*",
            element: <Login />,
          },
          {
            path: "sign-up",
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "profile",
            element: <CustomerProfile />,
          },
        ],
      },
    ],
  },
])

export default router
