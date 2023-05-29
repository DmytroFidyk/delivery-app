import Link from 'next/link';
import styles from './header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>DeliveryApp</div>
            <div className={styles.navigation}>
                <Link href="/">Каталог</Link>
                <Link href="/cart">Кошик</Link>
            </div>
        </div>
    );
};

export default Header;