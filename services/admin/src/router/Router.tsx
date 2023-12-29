import {App} from "@/components/App";
import {Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import {About} from "@/pages/about";

const routes = [
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: 'about',
        element: <Suspense fallback="Loading..."><About /></Suspense>
      },
    ]
  },
];

export const router = createBrowserRouter(routes);

export default routes