import { useGetPokemonDetailMutation } from "@services/PokemonService";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./components/TopBar";
import NotFound from "./components/NotFound";
import DetailLoader from "./components/DetailLoader";
import classNames from "classnames";
import styles_item from "./styles/PokemonItem.module.scss";
import styles from "./styles/PokemonDetail.module.scss";
import { toPascalCase } from "@utils/stringConvert";
import StateSection from "./components/StatsSection";
import PokemonInfo from "./components/PokemonInfo";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useEffect } from "react";
import EvolutioItem from "./components/EvolutioItem";

const PokemonDetail = () => {
    const { id } = useParams();
    const nevigate = useNavigate();

    const [getPokemonDetail, { isLoading, data, isError }] = useGetPokemonDetailMutation();
    const { data: pokemon_data } = data || {};

    const handleNevigate = (path: string) => {
        nevigate(path);
    };

    const handleNevigateChange = (action: string) => {
        let no = parseInt(id || "");
        if (action == "+") {
            no++;
        } else {
            no--;
        }
        let new_id = no.toString().padStart(3, "0");

        handleNevigate(`/pokedex/${new_id}`);
    };

    const handleFetchData = async () => {
        await getPokemonDetail(id || "").unwrap();
    };

    useEffect(() => {
        if (id) {
            handleFetchData();
        }
    }, [id]);

    return (
        <div className="flex flex-col w-full min-h-[100vh] min-w-[100vw] bg-gray-200 relative">
            <TopBar type={pokemon_data?.data?.[0]?.type?.[0] || ""} />
            {isError || pokemon_data?.data?.length == 0 ? (
                <NotFound />
            ) : (
                <>
                    {isLoading ? (
                        <DetailLoader />
                    ) : (
                        <div className="flex flex-col items-center pt-[100px] w-full relative">
                            <div className="pb-2 text-gray-500 text-[40px]">{pokemon_data?.data[0].name.toUpperCase()}</div>
                            <div
                                className={classNames("px-3 py-1 rounded-md text-white", styles_item[pokemon_data?.data[0].type[0] || ""])}
                            >
                                {toPascalCase(pokemon_data?.data[0].species || "")} Pokémon
                            </div>
                            <div className={classNames("py-10 flex w-full container", styles.detailSection)}>
                                <div className={classNames("px-5 flex-1", styles.infoBox)}>
                                    <PokemonInfo data={pokemon_data?.data?.[0]} />
                                </div>
                                <div className="px-5 flex-[2]">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokemon_data?.data[0].no}.png`}
                                        alt=""
                                    />
                                </div>
                                <div className={classNames("px-5 flex-1", styles.statBox)}>
                                    <StateSection
                                        stats={pokemon_data?.data[0].stats}
                                        type={pokemon_data?.data[0].type[0] || ""}
                                    />
                                </div>
                            </div>
                            <div
                                className={classNames(
                                    "text-[24px] px-3 rounded-md text-white",
                                    styles_item[pokemon_data?.data[0].type[0] || ""]
                                )}
                            >
                                EVOLUTION CHAIN
                            </div>
                            <div className="flex w-full container justify-around py-10">
                                {pokemon_data?.data[0].evolution.map((item, key) => (
                                    <EvolutioItem
                                        key={`evolution_${key}`}
                                        dataItem={item}
                                    />
                                ))}
                            </div>
                            <div
                                className="fixed left-4 p-3 top-[48vh] bg-white rounded-full cursor-pointer"
                                onClick={() => handleNevigateChange("-")}
                            >
                                <ChevronLeft />
                            </div>
                            <div
                                className="fixed right-4 p-3 top-[48vh] bg-white rounded-full cursor-pointer"
                                onClick={() => handleNevigateChange("+")}
                            >
                                <ChevronRight />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PokemonDetail;
