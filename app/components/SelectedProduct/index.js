import Image from 'next/image';
import styles from './selectedproduct.module.css';
import { useDispatch } from 'react-redux';
import { removeFromCart, changeCount } from '../../features/shoppingCart/shoppingCartSlice';
import { useState } from 'react';

const SelectedProduct = ({id, title, imageName, price}) => {
    const [ count, setCount ] = useState(1);
    const dispatch = useDispatch();

    const product = {
        'id': id,
        'title': title, 
        'imageName': imageName, 
        'price': price,
        'count': count
    };

    return (
        <div className={styles.card}>
            <div className={styles.image}><Image src={'/' + imageName} width="200" height="120" alt="Зображення товару"/></div>
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.price}>{price} ₴</div>
                </div>
                <div>
                    <button onClick={() => {setCount(count + 1); dispatch(changeCount(product)); }}>+</button>
                        {count}
                    <button onClick={() => {if (count > 1) { setCount(count - 1); dispatch(changeCount(product)); }}}>-</button>
                </div>
                <button className={styles.button} onClick={() => dispatch(removeFromCart(product))}>Видалити</button>
            </div>
        </div>
    );
};

export default SelectedProduct;