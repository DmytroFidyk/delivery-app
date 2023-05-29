import Image from 'next/image';
import styles from './product.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/shoppingCart/shoppingCartSlice';

const Product = ({id, title, imageName, price}) => {
    const dispatch = useDispatch();

    const product = {
        'id': id,
        'title': title, 
        'imageName': imageName, 
        'price': price,
        'count': 1
    };

    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <Image src={'/' + imageName} width="240" height="180" alt="Зображення товару"/>
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{title}</div>
                <div className={styles.price}>{price} ₴</div>
            </div>
            <button className={styles.button} onClick={() => dispatch(addToCart(product))}>В кошик</button>
        </div>
    );
};

export default Product;