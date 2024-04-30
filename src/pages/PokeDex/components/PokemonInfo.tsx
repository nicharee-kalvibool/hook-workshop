import styles from "../styles/StatsSection.module.scss";
import styles_item from "../styles/PokemonItem.module.scss";
import classNames from "classnames";
import { PokemonDetailData } from "@services/response/PokemonService.type";
import { toPascalCase } from "@utils/stringConvert";

const PokemonInfo = ({ data }: { data?: PokemonDetailData }) => {
    return (
        <div className={classNames("flex w-full flex-col items-center p-2 bg-white bg-opacity-30 rounded-lg", styles.containerinfo)}>
            <div className="text-[30px] mb-3 font-semibold">INFO.</div>
            <div className="flex w-full items-center mb-3">
                <div className="min-w-[100px] text-right pr-3 text-[18px]">No.</div>
                <div className="w-full">{data?.no}</div>
            </div>

            <div className="flex w-full items-center mb-3">
                <div className="min-w-[100px] text-right pr-3 text-[18px]">Name</div>
                <div className="w-full">{data?.name.toUpperCase()}</div>
            </div>

            <div className="flex w-full items-center mb-3">
                <div className="min-w-[100px] text-right pr-3 text-[18px]">Species</div>
                <div className="w-full">{toPascalCase(data?.species || "")}</div>
            </div>

            <div className="flex w-full items-center mb-3">
                <div className="min-w-[100px] text-right pr-3 text-[18px]">Type</div>
                {data?.type.map((type, key) => (
                    <div
                        key={`type_${type}_${key}`}
                        className={classNames("px-2 py-1 flex items-center rounded mr-2", styles_item[`${type}`])}
                    >
                        <div className="w-[20px] h-[20px]">
                            <img
                                className="w-full h-full object-contain"
                                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/Others/type-icons/png/${type}.png`}
                                alt=""
                            />
                        </div>{" "}
                        <span className="pl-1 text-white">{toPascalCase(type)}</span>
                    </div>
                ))}
                <div className="w-full"></div>
            </div>
            <div className="flex w-full mb-3">
                <div className="min-w-[100px] text-right pr-3 text-[18px]">Abilities</div>
                <div className="flex items-center flex-wrap">
                    {data?.moves?.byLevelUp && data?.moves?.byLevelUp?.length > 0 ? (
                        <>
                            {data?.moves.byLevelUp.map((skill, key) => {
                                if (key <= 4) {
                                    return (
                                        <div
                                            key={`type_${skill.move}_${key}`}
                                            className={classNames(
                                                "px-2 py-1 flex items-center rounded mr-2 mb-1",
                                                styles_item[`${skill.type}`]
                                            )}
                                        >
                                            <div className="w-[20px] h-[20px]">
                                                <img
                                                    className="w-full h-full object-contain"
                                                    src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/Others/type-icons/png/${skill.type}.png`}
                                                    alt=""
                                                />
                                            </div>
                                            <span className="pl-1 text-white text-nowrap">{toPascalCase(skill.move)}</span>
                                        </div>
                                    );
                                }
                            })}
                        </>
                    ) : (
                        <>-</>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PokemonInfo;
