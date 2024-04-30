import classNames from "classnames";
import styles from "../styles/PokemonItem.module.scss";
import { PokemonData } from "@services/response/PokemonService.type";

export const PokemonStateKey = ["hp", "attack", "defense", "speed", "special", "total"] as const;
export type PokemonDataStateKey = (typeof PokemonStateKey)[number];

type PokemonItemProps = {
    data: PokemonData;
    onClick?: (id: string) => void;
};

const PokemonItem = ({ data, onClick }: PokemonItemProps) => {
    return (
        <div className={classNames("mb-8 px-2 relative", styles.pokemonCard)}>
            <div
                className={styles.pokemonCardInner}
                onClick={() => onClick && onClick(data.no)}
            >
                <div className={classNames("flex flex-col items-center w-full", styles.pokemonItem, styles.pokemonCardFront)}>
                    <img
                        className="absolute top-8 w-[180px] h-[180px] object-contain z-[3]"
                        src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${data.no}.png`}
                        alt=""
                    />
                    <div className="flex flex-col absolute top-6 right-6 z-3 bg-black bg-opacity-60 bg-blend-saturation p-2 rounded-md z-[3]">
                        {data.type.map((type, key) => (
                            <div
                                key={`type_${data.name}_${key}`}
                                className={classNames(styles.typeIcon, styles[`${type}`])}
                            >
                                <img
                                    className="w-full h-full object-contain"
                                    src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/Others/type-icons/png/${type}.png`}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                    <div className={classNames("w-full h-[200px] -mb-4 relative", styles.pokemonImgSection)}>
                        <div className={classNames(`relative w-full h-full`, styles.pokemonImg, styles[`${data.type[0]}Type`])}></div>
                    </div>
                    <div className={classNames("flex flex-col w-full items-center p-3 rounded-lg", styles.pokemonDetail)}>
                        <span className="text-lg font-bold uppercase mb-2 bg-black bg-opacity-20 bg-blend-saturation px-3 rounded-md text-white">
                            {data.name}
                        </span>
                        <div className="flex w-full items-center justify-between">
                            {Object.keys(data.stats).map((name) => (
                                <div
                                    key={`state_${name}`}
                                    className="flex w-full flex-col items-center"
                                >
                                    <div className={styles.statusIcon}>
                                        <img
                                            className="w-full h-full object-contain"
                                            src={`/src/assets/images/icons/${name}.svg`}
                                            alt=""
                                        />
                                    </div>
                                    <span>{data.stats[name as PokemonDataStateKey]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={classNames("flex flex-col items-center w-full", styles.pokemonItem, styles.pokemonCardBack)}>
                    <div className="flex justify-center w-full mb-2">
                        <img
                            className="w-[120px] h-[50px] object-cover"
                            src="/src/assets/images/pokemon-logo.png"
                            alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div
                            className={classNames(
                                `relative w-full h-full flex justify-center`,
                                styles.pokemonImg,
                                styles[`${data.type[0]}Type`]
                            )}
                        >
                            <span className="text-lg text-white font-bold uppercase px-3 rounded-md">#{data.no}</span>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-2">
                        <span className="text-lg font-bold uppercase mb-2 bg-black bg-opacity-10 bg-blend-saturation px-3 rounded-md">
                            {data.name}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2">
                        <div
                            className={classNames("flex flex-col items-center rounded-full w-[130px] h-[130px] p-2", styles[data.type[0]])}
                        >
                            <span className="text-white text-xs mb-4">power</span>
                            <span className="text-white text-5xl">{data.stats.total}</span>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-auto">
                        <span className="text-gray-500 text-xs">Poke DEX</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonItem;
