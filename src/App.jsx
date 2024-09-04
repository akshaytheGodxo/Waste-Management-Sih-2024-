import React from "react"
import Classifier from "./components/Classifier";
import LandingPage from "./components/LandingPage";
import Request from "./components/Request";
import Store from "./components/Store";
import { createBrowserRouter ,RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path:"/classifier",
      element: <Classifier />
    },
    {
      path: "/store",
      element: <Store />
    },
    {
      path:"/request-collection",
      element: <Request />
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
export default App