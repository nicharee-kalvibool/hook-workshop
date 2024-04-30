import { createApi } from "@reduxjs/toolkit/query/react";
import { POKEMON_DETAIL, POKEMON_LIST } from "@constants/PathConfig";
import FetchBaseService from "./FetchBaseService";
import { PokemonDetailResponse, PokemonListResponse } from "./response/PokemonService.type";

const PokemonService = createApi({
    reducerPath: "pokemon_service",
    baseQuery: FetchBaseService,
    endpoints: (builder) => ({
        getPokemonList: builder.query<PokemonListResponse, void>({
            query: () => ({
                url: POKEMON_LIST,
                method: "GET",
            }),
        }),
        getPokemonDetail: builder.mutation<PokemonDetailResponse, string>({
            query: (id) => ({
                url: POKEMON_DETAIL.replace(":POKEMON_ID", id),
                method: "GET",
            }),
        }),
    }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailMutation } = PokemonService;

export default PokemonService;
