import {createRoot} from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "@/router/Router";

const container = document.getElementById('root');
if (!container) {
  throw new Error('add div with #root to the public/index.html')
}

const root = createRoot(container);
root.render(<RouterProvider router={router} />);