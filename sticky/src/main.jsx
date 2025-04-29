import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.scss";
import "./styles/global.scss";
import Root, { loader as rootLoader, action as rootAction}  from "./root/root.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage404 from "./errorPage_404.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage404 />,
		loader: rootLoader,
		action: rootAction,
		hydrateFallbackElement: <div>Загрузка...</div>,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</StrictMode>
);
