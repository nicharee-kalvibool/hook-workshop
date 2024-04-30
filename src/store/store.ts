import { configureStore } from "@reduxjs/toolkit";
import PokemonService from "../services/PokemonService";

export const store = configureStore({
    reducer: {
        [PokemonService.reducerPath]: PokemonService.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware().concat(PokemonService.middleware);
        return middleware;
    },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
