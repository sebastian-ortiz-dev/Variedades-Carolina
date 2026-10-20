import { createBrowserRouter } from "react-router";
import { authMiddleware } from "../middleware/authVerification";
import { tokenValidation } from "../middleware/validationToken";
import NavbarNavegation from "../layouts/mainLayout"
import Login from "../modules/auth/pages/LoginPage";
import dashboard from "../pages/dashboard";
import inventory from "../modules/inventory/pages/listInvetory"

export const router = createBrowserRouter([
    {
        path: "/",
        middleware: [authMiddleware, tokenValidation],
        element: <NavbarNavegation />,
        children:[
            { index: true, path:"dashboard", Component: dashboard },
            { path:"inventory", Component: inventory },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "*",
        element: <h1>Not Found 404</h1>
    },
]);