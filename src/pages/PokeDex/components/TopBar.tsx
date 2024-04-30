import classNames from "classnames";
import styles from "../styles/PokemonItem.module.scss";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "react-feather";

const TopBar = ({ type }: { type: string }) => {
    const nevigate = useNavigate();

    const handleNevigate = () => {
        nevigate("/pokedex");
    };

    return (
        <div className={classNames("flex items-center py-3 px-5 w-full fixed top-0 z-10", styles[type])}>
            <div
                className="p-3 bg-white rounded-full cursor-pointer"
                onClick={() => handleNevigate()}
            >
                <ChevronLeft />
            </div>

            <div className="flex justify-center items-center bg-black bg-opacity-20 w-fit ml-3 rounded-md px-2 py-1">
                <img
                    className="w-[120px] h-[50px] object-cover"
                    src="/src/assets/images/pokemon-logo.png"
                    alt=""
                />
                <div className={classNames("text-[30px] font-bold ml-3", styles.logoText)}>DEX</div>
            </div>
        </div>
    );
};

export default TopBar;
