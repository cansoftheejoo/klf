import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./Spinner.module.css"

const Spinner = () => {
    return (
        <div className={styles.container}>
              <Icon icon="line-md:loading-twotone-loop" fontSize={20} color="#aaa" />
        </div>
    );
}

export default Spinner;