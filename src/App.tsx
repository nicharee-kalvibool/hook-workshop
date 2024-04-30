import Router from "@router/index";
import { Providers } from "@store/provider";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <Router />
            </Providers>
        </BrowserRouter>
    );
}

export default App;
