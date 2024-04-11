import classNames from "classnames";
import React, { MouseEvent, useCallback, useState } from "react";
import { Lock, Unlock } from "react-feather";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { DataStuct } from "@pages/ToDoList/ToDo";

type WordBoxProps = {
    text?: string;
    data?: DataStuct;
    head?: boolean;
    showLock?: boolean;
    autoRemove?: boolean;
    onClick?: Function;
    setData: React.Dispatch<React.SetStateAction<DataStuct[]>>;
    setDataWord: React.Dispatch<React.SetStateAction<DataStuct[]>>;
};

const WordBoxV2 = ({ text, data, head, showLock, onClick, autoRemove, setData, setDataWord }: WordBoxProps) => {
    const [lock, setLock] = useState(false);

    const fnToggleLock = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setLock(!lock);
    };

    const fnReturnData = useCallback(() => {
        if (!lock) {
            if (data && setData && setDataWord) {
                setData((prev) => [...prev, data]);
                setDataWord((prev) => prev.filter((item: any) => item.word !== data?.word));
            }
        }
    }, [lock]);

    return (
        <div
            className={classNames("flex items-center shadow-lg bg-white p-3 rounded-md item-center justify-center mb-5 relative", {
                "font-bold text-lg": head,
                "cursor-pointer": !lock && (!!onClick || !!setData),
            })}
            onClick={() => fnReturnData()}
        >
            <span className="select-none">{data?.word ? data?.word : text}</span>
            {showLock && (
                <div className="absolute right-2">
                    {lock ? (
                        <div
                            className="flex justify-center items-center bg-slate-300 rounded-md p-2 cursor-pointer"
                            onClick={(e: MouseEvent<HTMLDivElement>) => {
                                fnToggleLock(e);
                            }}
                        >
                            <Lock size={14} />
                        </div>
                    ) : (
                        <div
                            className="flex justify-center items-center bg-transparent rounded-md cursor-pointer"
                            onClick={(e: MouseEvent<HTMLDivElement>) => {
                                fnToggleLock(e);
                            }}
                        >
                            <CountdownCircleTimer
                                isPlaying={autoRemove && !lock}
                                duration={5}
                                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                                colorsTime={[7, 5, 2, 0]}
                                size={30}
                                strokeWidth={2}
                                onComplete={() => fnReturnData()}
                            >
                                {() => <Unlock size={14} />}
                            </CountdownCircleTimer>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WordBoxV2;
