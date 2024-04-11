import { useRoutes } from "react-router-dom";
import { HomePage, ToDoListPage } from "@pages/index";

const Router = () => {
    const element = useRoutes([
        {
            path: "/",
            element: <HomePage />,
        },
        { path: "/assignment-2", element: <ToDoListPage /> },
    ]);
    return element;
};

export default Router;
