import styles from './MobileNav.module.css'

const MobileNav = () => {
    return (
        <div className={styles.container}>
            <ul>
                <li><button>홈</button></li>
                <li><button>홈</button></li>
                <li><button>홈</button></li>
                <li><button>마이</button></li>
            </ul>
        </div>
    );
}

export default MobileNav;