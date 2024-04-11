import { useRoutes } from "react-router-dom";
import { HomePage, ToDoV1, ToDoV2 } from "@pages/index";

const Router = () => {
    const element = useRoutes([
        {
            path: "/",
            element: <HomePage />,
        },
        { path: "/assignment-2-ver-1", element: <ToDoV1 /> },
        { path: "/assignment-2-ver-2", element: <ToDoV2 /> },
    ]);
    return element;
};

export default Router;
