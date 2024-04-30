import MenuFilter from "@components/TypeFilter/MenuFilter";
import { useGetPokemonListQuery } from "../../services/PokemonService";
import PokemonItem from "./components/PokemonItem";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { PokemonData } from "@services/response/PokemonService.type";
import Loader from "./components/Loader";
import ReactVisibilitySensor from "react-visibility-sensor";
import pokemonType from "@assets/data/pokemon_type.json";
import { useNavigate } from "react-router-dom";

const PokeDexPage = () => {
    const nevigate = useNavigate();
    const [show_data, setShowData] = useState<PokemonData[]>([]);
    const [type, setType] = useState<string>("all");
    const [page, setPage] = useState(1);
    const [total_page, setTotalPage] = useState(0);
    const [loading, setLoaing] = useState(false);
    const [show_top_bar, setShowTopbar] = useState(false);

    const listRef = useRef<HTMLDivElement>(null);

    const { isLoading, data } = useGetPokemonListQuery();

    const handleLoadMoreData = async (page: number) => {
        return new Promise((resolve) => {
            const temp = [...(data?.data?.data || [])];
            let new_data: PokemonData[] = [];
            if (type != "all") {
                new_data = temp.filter((item) => item.type.includes(type)).splice(0, page * 15);
            } else {
                new_data = temp.splice(0, page * 15);
            }

            setTimeout(() => {
                setPage(page);
                setShowData(new_data);
                setLoaing(false);
                resolve(true);
            }, 1000);
        });
    };

    useEffect(() => {
        if (!isLoading) {
            setTotalPage(Math.floor(data?.results ? data?.results / 15 : 0));
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) {
            setLoaing(true);
            handleLoadMoreData(1);
            if (type !== "all") {
                let temp = data?.data.data.filter((item) => item.type.includes(type)) || [];
                setTotalPage(Math.floor(temp?.length > 0 ? temp.length / 15 : 0));
            } else {
                setTotalPage(Math.floor(data?.results ? data?.results / 15 : 0));
            }
        }
    }, [type, isLoading]);

    const handleCallbackType = (type: string) => {
        setType(type);
        listRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const handleShowTopBar = (isVisible: boolean) => {
        setShowTopbar(!isVisible);
    };

    const handleNevigate = (id: string) => {
        nevigate(`/pokedex/${id}`);
    };

    return (
        <div className="flex flex-col min-h-[100vh] w-[100vw] bg-black">
            <div className="relative flex flex-col min-h-[100vh] w-[100vw] justify-center items-center">
                <MenuFilter
                    selected={pokemonType.indexOf(type)}
                    callback={handleCallbackType}
                />
                <div>
                    <ReactVisibilitySensor onChange={handleShowTopBar}>
                        <div className="p-1" />
                    </ReactVisibilitySensor>
                </div>
            </div>
            <div
                ref={listRef}
                className="min-h-[100vh] w-[100vw] bg-black flex flex-col items-center"
            >
                {show_top_bar && (
                    <div className="fixed top-0 z-50 w-full">
                        <MenuFilter
                            selected={pokemonType.indexOf(type)}
                            callback={handleCallbackType}
                            sticky
                        />
                    </div>
                )}

                <div className="w-full container py-[210px] ">
                    {loading || isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {show_data.length > 0 ? (
                                <InfiniteScroll
                                    pageStart={1}
                                    loadMore={handleLoadMoreData}
                                    hasMore={page < total_page}
                                    loader={<Loader key="loader_initial_1" />}
                                    className="w-full flex flex-wrap justify-around"
                                >
                                    {show_data.map((items, key) => (
                                        <PokemonItem
                                            key={`pokemon_item_${items.name}`}
                                            data={items}
                                            onClick={handleNevigate}
                                        />
                                    ))}
                                </InfiniteScroll>
                            ) : (
                                <div className="bg-white rounded-lg p-5 text-center bg-opacity-20 text-white">Not Found</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PokeDexPage;
