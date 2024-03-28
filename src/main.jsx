import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Library from "./pages/Library.jsx";
import { Navbar } from "./components/Navbar.jsx";

import "./index.css";
import BookPage from "./pages/BookPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "/book/:olid",
    element: <BookPage />,
  },
  {
    path: "/book/*",
    element: <h1>Oops, this book doesn&apos;t exist (yet)!</h1>,
  },
  {
    path: "*",
    element: <h1>Oops, this route doesn&apos;t exist!</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <div className="container pt-3 pb-5">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
