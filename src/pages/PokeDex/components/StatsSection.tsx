import { PokemonDataState } from "@services/response/PokemonService.type";
import { PokemonDataStateKey } from "./PokemonItem";
import styles from "../styles/StatsSection.module.scss";
import styles_item from "../styles/PokemonItem.module.scss";
import { toPascalCase } from "@utils/stringConvert";
import classNames from "classnames";

const StatsSection = ({ stats, type }: { stats?: PokemonDataState; type: string }) => {
    return (
        <div className={classNames("flex w-full flex-col items-center p-2 bg-white bg-opacity-30 rounded-lg", styles.containerStats)}>
            <div className="text-[30px] mb-3 font-semibold">STATS</div>
            <div className="flex flex-col items-center justify-center mb-4">
                <div className={classNames("flex flex-col items-center rounded-full w-[130px] h-[130px] p-2", styles_item[type])}>
                    <span className="text-white text-xs mb-4">power</span>
                    <span className="text-white text-5xl">{stats?.total || 0}</span>
                </div>
            </div>
            {stats &&
                Object.keys(stats).map((name) => {
                    if (name != "total") {
                        return (
                            <div
                                key={`stat_${name}`}
                                className="flex w-full items-center mb-3"
                            >
                                <div className="w-[200px] text-right pr-3 text-[18px]">{toPascalCase(name)}</div>
                                <div className="bg-white w-full h-[10px] rounded-full relative overflow-hidden">
                                    <div
                                        style={{ width: `${stats[name as PokemonDataStateKey]}%` }}
                                        className={classNames("absolute left-0 top-0 h-[10px]", styles.statBar, styles[name])}
                                    ></div>
                                </div>
                                <span className="pl-2 min-w-[50px] flex-shrink-0 ">{stats[name as PokemonDataStateKey]}</span>
                            </div>
                        );
                    }
                })}
        </div>
    );
};

export default StatsSection;
