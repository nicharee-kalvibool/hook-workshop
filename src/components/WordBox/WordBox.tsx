import { DataStuct } from "@pages/ToDoList/ToDoV1";
import classNames from "classnames";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Lock, Unlock } from "react-feather";
import "./styles/WordBox.css";

type WordBoxProps = {
    text?: string;
    data?: DataStuct;
    head?: boolean;
    showLock?: boolean;
    autoRemove?: boolean;
    onClick?: Function;
};

const WordBox = ({ text, data, head, showLock, onClick, autoRemove }: WordBoxProps) => {
    const [lock, setLock] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();
    const [clear, setClear] = useState(false);

    const fnHandleTimeout = () => {
        timerRef.current = setTimeout(() => {
            if (onClick) {
                setClear(true);
            }
        }, 5000);
    };

    const fnHandleCallbackTimeout = useCallback(() => {
        fnHandleTimeout();
    }, []);

    const handlelock = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (lock && autoRemove) {
            fnHandleCallbackTimeout();
        } else {
            clearTimeout(timerRef.current);
        }
        setLock(!lock);
    };

    useEffect(() => {
        if (!lock && autoRemove) {
            fnHandleCallbackTimeout();
        } else {
            clearTimeout(timerRef.current);
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    const fnHandleClickRemoveItem = () => {
        if (!lock && onClick && data) {
            onClick(data);
        }
    };

    useEffect(() => {
        if (clear && autoRemove) {
            fnHandleClickRemoveItem();
        }
    }, [clear]);

    return (
        <div
            className={classNames(
                "flex items-center shadow-lg bg-white p-1 rounded-md item-center justify-center mb-5 relative overflow-hidden",
                {
                    "font-bold text-lg": head,
                    "cursor-pointer": !lock && !!onClick,
                }
            )}
            onClick={() => {
                if (!lock && typeof onClick == "function") {
                    onClick(data);
                }
            }}
        >
            {!lock && autoRemove && <div className="progress absolute left-0 h-full z-[0]" />}
            <div className="relative flex items-center justify-center bg-white w-full h-ful rounded-md">
                <span className="select-none z-[1] l p-2">{data?.word ? data?.word : text}</span>
                {showLock && (
                    <div className="absolute right-2 z-[2]">
                        {lock ? (
                            <div
                                className="flex justify-center items-center bg-slate-300 rounded-md p-2 cursor-pointer"
                                onClick={(e) => {
                                    handlelock(e);
                                }}
                            >
                                <Lock size={14} />
                            </div>
                        ) : (
                            <div
                                className="flex justify-center items-center bg-transparent rounded-md p-2 cursor-pointer hover:bg-slate-200"
                                onClick={(e) => {
                                    handlelock(e);
                                }}
                            >
                                <Unlock size={14} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WordBox;
