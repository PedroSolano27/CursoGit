import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./routes/HomePage/Home.jsx";
import Memory from "./routes/MemoryPage/Memory.jsx";
import AddMemory from "./routes/AddMemoryPage/AddMemory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/memory/:id",
        element: <Memory/>
      },
      {
        path: "/memory/new",
        element: <AddMemory/>
      },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);