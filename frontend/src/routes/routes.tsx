import { createBrowserRouter } from "react-router";
import { authMiddleware } from "../middleware/authVerification";
import { tokenValidation } from "../middleware/validationToken";
import NavbarNavegation from "../layouts/mainLayout"
import Login from "../modules/auth/pages/LoginPage";
import dashboard from "../pages/dashboard";
import inventory from "../modules/inventory/pages/listInvetory"
import categoriesAndMeasuresPage from "../modules/inventory/pages/categoriesMeasurementUnits";
import historialMovimientosView from "../modules/inventory/pages/historialMoviments";

export const router = createBrowserRouter([
    {
        path: "/",
        middleware: [authMiddleware, tokenValidation],
        element: <NavbarNavegation />,
        children:[
            { index: true, path:"dashboard", Component: dashboard },
            { 
                path:"inventory", 
                children:[
                    { index: true, path:"list", Component: inventory},
                    { path: "categories-measurement", Component: categoriesAndMeasuresPage},
                    { path: "historial", Component: historialMovimientosView}
                ] 
            },
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