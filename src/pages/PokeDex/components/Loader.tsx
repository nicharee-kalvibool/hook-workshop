import { PokemonStateKey } from "./PokemonItem";
import styles from "../styles/PokemonItem.module.scss";

const Loader = ({ amount = 5 }: { amount?: number }) => {
    return (
        <div className="w-full flex flex-wrap justify-around">
            {Array.from(Array(amount)).map((_, key) => (
                <div
                    key={`loading_${key}`}
                    role="status"
                    className="w-[250px] h-[325px] p-3 border border-gray-200 rounded-xl shadow animate-pulse flex flex-col items-center"
                >
                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded w-full">
                        <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                        >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                    </div>
                    <div className="w-[50%] h-5 bg-gray-200 rounded-md mb-2"></div>
                    <div className="flex items-center">
                        {PokemonStateKey.map((name) => (
                            <div
                                key={`state_${name}`}
                                className="flex w-full flex-col items-center"
                            >
                                <div className={styles.statusIcon}>
                                    <img
                                        className="w-full h-full object-contain invert"
                                        src={`/src/assets/images/icons/${name}.svg`}
                                        alt=""
                                    />
                                </div>
                                <div className="h-[24px] w-[24px] animate-pulse bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Loader;