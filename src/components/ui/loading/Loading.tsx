import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./Loading.module.css"

const Loading = ({
    absolute = false
}) => {
    return (
        <div className={`${styles.container} ${absolute ? styles.absolute : ''}`}>
             <Icon icon="line-md:loading-twotone-loop" fontSize={50} />
             
        </div>
    );
}

export default Loading;