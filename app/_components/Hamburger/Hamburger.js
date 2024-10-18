
import styles from "./Hamburger.module.scss";

const Hamburger = (props) => {
    return (
        <button
            className={`${styles.hamburger} ${styles.hamburgerSlider} ${
                props.dark ? styles.dark : ""
            } ${props.active ? styles.isActive : ""}`}
            type="button"
        >
            <span className={styles.hamburgerBox}>
                <span className={styles.hamburgerInner}></span>
            </span>
        </button>
    );
};

export default Hamburger;
