import { useGetPokemonDetailMutation } from "@services/PokemonService";
import { PokemonEvoData } from "@services/response/PokemonService.type";
import classNames from "classnames";
import { useEffect } from "react";
import { ArrowRight } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import styles_item from "../styles/PokemonItem.module.scss";
import { toPascalCase } from "@utils/stringConvert";

const EvolutioItem = ({ dataItem }: { dataItem: PokemonEvoData }) => {
    const { id } = useParams();
    const nevigate = useNavigate();

    const [getPokemonDetail, { isLoading, data }] = useGetPokemonDetailMutation();
    const { data: pokemon_data } = data || {};

    const handleNevigate = (path: string) => {
        nevigate(path);
    };

    const handleFetchData = async () => {
        await getPokemonDetail(dataItem.no || "").unwrap();
    };

    useEffect(() => {
        if (dataItem.no) {
            handleFetchData();
        }
    }, [dataItem.no]);

    return (
        <>
            {dataItem.method && (
                <div className="flex flex-col items-center justify-center w-[180px]">
                    <div className="text-gray-500 mb-3">{dataItem.method}</div>
                    <ArrowRight />
                </div>
            )}
            <div
                className={classNames("flex flex-col items-center bg-white bg-opacity-30 rounded-lg p-3  w-[200px] cursor-pointer", {
                    [styles_item[`${pokemon_data?.data[0].type[0]}Active` || ""]]: id == dataItem.no,
                })}
                onClick={() => handleNevigate(`/pokedex/${dataItem.no}`)}
            >
                <div className="w-[100px] h-[100px]">
                    <img
                        className="w-full h-full object-contain"
                        src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${dataItem.no}.png`}
                        alt=""
                    />
                </div>
                <div className="text-gray-500 mt-3">#{dataItem.no}</div>
                <div className={classNames("px-3 py-1 rounded-md text-white mt-3", styles_item[`${pokemon_data?.data[0].type[0]}` || ""])}>
                    {toPascalCase(pokemon_data?.data[0].name || "")}
                </div>
                <div className="flex items-center mt-4">
                    {pokemon_data?.data[0].type.map((type, key) => (
                        <div
                            key={`type_${type}_${key}`}
                            className={classNames(styles_item.typeIcon2, styles_item[`${type}`])}
                        >
                            <img
                                className="w-full h-full object-contain"
                                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/Others/type-icons/png/${type}.png`}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default EvolutioItem;
