import Logo from "@assets/images/pokemon-logo.png";
import classNames from "classnames";
import styles from "./styles/MenuFilter.module.scss";
import pokemonType from "@assets/data/pokemon_type.json";
import { useSwipeable } from "react-swipeable";

const MenuFilter = ({ callback, sticky, selected }: { callback: (type: string) => void; sticky?: boolean; selected: number }) => {
    const handlers = useSwipeable({
        onSwipedLeft: () => handleDragEnd("+"),
        onSwipedRight: () => handleDragEnd("-"),
        onSwiped: () => console.log("onSwiped"),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    const handleChangeFilter = (key: number) => {
        callback(pokemonType[key]);
    };

    const handleDragEnd = (direction: string) => {
        console.log(direction);

        if (direction == "-") {
            if (selected > 0) {
                handleChangeFilter(selected - 1);
            }
        } else {
            if (selected < 18) {
                handleChangeFilter(selected + 1);
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            {sticky ? (
                <div className={classNames("flex flex-col items-center w-full", styles.sticky)}>
                    <div className="w-[120px] max-h-[50px] flex items-center justify-center">
                        <img
                            src={Logo}
                            alt=""
                            className="object-cover"
                        />
                    </div>

                    <div className={classNames("text-[40px] font-bold -mt-[10px]", styles.logoText)}>DEX</div>
                    <div
                        {...handlers}
                        className="w-full -mt-[80px]"
                    >
                        <div className="flex w-full overflow-x-hidden items-center max-w-[100vw] pb-6">
                            <div
                                className={classNames(
                                    "relative h-[150px] flex items-end",
                                    styles.filterContainer,
                                    styles[`active${selected}`]
                                )}
                            >
                                {pokemonType.map((items, key) => (
                                    <div
                                        key={`type_${key}`}
                                        className={classNames(styles.filter, styles[`type${key - selected}`], styles[items])}
                                        onClick={() => handleChangeFilter(key)}
                                    >
                                        {items != "all" && (
                                            <img
                                                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/Others/type-icons/png/${items}.png`}
                                                alt=""
                                                className={classNames("object-cover", styles.typeIcon)}
                                            />
                                        )}

                                        <span>{items.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full">
                    <div className="w-[500px] max-h-[250px] flex items-center justify-center">
                        <img
                            src={Logo}
                            alt=""
                            className="object-cover"
                        />
                    </div>

                    <div className={classNames("text-[90px] font-bold -mt-[50px]", styles.logoText)}>DEX</div>
                    <div
                        {...handlers}
                        className="w-full -mt-[50px]"
                    >
                        <div className="flex w-full overflow-x-hidden items-center max-w-[100vw] pb-6">
                            <div
                                className={classNames(
                                    "relative h-[150px] flex items-end",
                                    styles.filterContainer,
                                    styles[`active${selected}`]
                                )}
                            >
                                {pokemonType.map((items, key) => (
                                    <div
                                        key={`type_${key}`}
                                        className={classNames(styles.filter, styles[`type${key - selected}`], styles[items])}
                                        onClick={() => handleChangeFilter(key)}
                                    >
                                        {items != "all" && (
                                            <img
                                                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/Others/type-icons/png/${items}.png`}
                                                alt=""
                                                className={classNames("object-cover", styles.typeIcon)}
                                            />
                                        )}

                                        <span>{items.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuFilter;
