import {App} from "@/components/App";
import {Suspense} from "react";
import {Shop} from "@/pages/shop";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/shop",
    element: <App />,
    children: [
      {
        path: 'main',
        element: <Suspense fallback="Loading..."><Shop /></Suspense>
      },
      {
        path: 'sub',
        element: <Suspense fallback="Loading..."><div>sub</div></Suspense>
      }
    ]
  },
];

export const router = createBrowserRouter(routes);

export default routes