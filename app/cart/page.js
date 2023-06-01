'use client';
import Header from '../components/Header';
import styles from './cart.module.css';
import SelectedProduct from '../components/SelectedProduct';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../features/shoppingCart/shoppingCartSlice';

const Cart = () => {
    const [ order, setOrder ] = useState(null);
    const [ customerName, setCustomerName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ address, setAddress ] = useState('');

    let productsInCart = useSelector((state) => state.productsInCart.value);
    const dispatch = useDispatch();

    useEffect(() => {     
            if (order !== null) {
                const requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(order)
                };
                fetch('https://delivery-app-server-dg2d.onrender.com/orders', requestOptions)
                    .then(response => response.json())
                    .then(json => console.log(json));
            }
    }, [order]);
    //http://localhost:7000/orders
    let productsList = [];

    if (productsInCart.length > 0) {
        productsList = productsInCart.map(item => {
            return <SelectedProduct key={item.title} id={item.id} title={item.title} imageName={item.imageName} price={item.price} count={item.count}/>
        });
    }

    let total = 0;

    for (let i = 0; i < productsInCart.length; i++) {
        total += productsInCart[i].price;
    }

    const makeOrder = (order) => {
        setOrder(order);
        setCustomerName('');
        setPhone('');
        setEmail('');
        setAddress('');
    };

    const orderData = {
        products: productsInCart,
        customerName: customerName,
        phone: phone,
        email: email,
        address: address
    };

    const changeHandlerCustomer = (event) => {
        setCustomerName(event.target.value);
    };

    const changeHandlerPhone = (event) => {
        setPhone(event.target.value);
    };

    const changeHandlerEmail = (event) => {
        setEmail(event.target.value);
    };

    const changeHandlerAddress = (event) => {
        setAddress(event.target.value);
    };
    let textMessage = '';
    if (productsInCart.length > 0) {
        textMessage = <div className={styles.title}>Всього до оплати: {total} ₴</div>;
    } else {
        textMessage = <div>У вашому кошику порожньо</div>;
    }

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.column}>                   
                    <div className={styles.cart}>
                        <h3 className={styles.title}>Кошик</h3>
                        {productsList}
                        <div>{textMessage}</div>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.form}>
                        <div className={styles.title}>Оформлення замовлення</div>
                        <input className={styles.input} type="text" placeholder="Ім'я та прізвище" onChange={changeHandlerCustomer} value={customerName}/>
                        <input className={styles.input} type="text" placeholder="Номер телефону" onChange={changeHandlerPhone} value={phone}/>
                        <input className={styles.input} type="text" placeholder="Е-пошта" onChange={changeHandlerEmail} value={email}/>
                        <input className={styles.input} type="text" placeholder="Адреса" onChange={changeHandlerAddress} value={address}/>
                        <button className={styles.button} onClick={() => {
                            makeOrder(orderData); orderData.products.forEach(element => {
                                dispatch(removeFromCart(element));
                            });
                            }}>Замовити</button>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Cart;