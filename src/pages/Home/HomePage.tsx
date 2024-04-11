import { useNavigate } from "react-router-dom";
import styles from "./styles/Hompage.module.css";
import { Book, HelpCircle } from "react-feather";

const HomePage = () => {
    const nevigate = useNavigate();

    const handleNevigate = (url: string) => {
        nevigate(url);
    };

    return (
        <div className="flex min-h-[100vh] w-[100vw] items-center bg-slate-100">
            <nav className={styles.nav}>
                <input
                    id="menu"
                    type="checkbox"
                />
                <label htmlFor="menu">Menu</label>
                <div className={styles.menu}>
                    <div onClick={() => handleNevigate("/assignment-2")}>
                        <span>Assignment 2</span>
                        <Book color="#fff" />
                    </div>
                    <div className={styles.disbaled}>
                        <HelpCircle color="#ddd" />
                    </div>
                    <div className={styles.disbaled}>
                        <HelpCircle color="#ddd" />
                    </div>
                    {/* <div className={styles.disbaled}>
                        <HelpCircle color="#ddd" />
                    </div> */}
                </div>
            </nav>
        </div>
    );
};

export default HomePage;
