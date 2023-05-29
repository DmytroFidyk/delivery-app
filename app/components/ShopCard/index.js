import styles from './shop.module.css';

const ShopCard = ({ shopId, name, setSelectedShopId }) => {
    return (
        <div className={styles.card} onClick={() => setSelectedShopId(shopId)}>
            <div className={styles.name}>{name}</div>
        </div>
    );
};

export default ShopCard;