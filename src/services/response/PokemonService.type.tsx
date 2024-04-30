import { TypeResponse } from "../TypeResponse";

export type PokemonDataState = {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    special: number;
    total: number;
};

export type PokemonData = {
    no: string;
    name: string;
    species: string;
    type: string[];
    stats: PokemonDataState;
};

export type PokemonListResponse = TypeResponse<{
    data: PokemonData[];
}>;

export type PokemonEvoData = {
    no: string;
    name: string;
    stage: number;
    method: string;
};

export type PokemonAbilitesData = {
    move: string;
    type: string;
};

export type PokemonDetailData = {
    evolution: PokemonEvoData[];
    moves: { byLevelUp: PokemonAbilitesData[] };
} & PokemonData;

export type PokemonDetailResponse = TypeResponse<{
    data: PokemonDetailData[];
}>;
