'use client';
import Header from '../components/Header';
import styles from './cart.module.css';
import SelectedProduct from '../components/SelectedProduct';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
    const [ order, setOrder ] = useState(null);
    const [ customerName, setCustomerName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ address, setAddress ] = useState('');

    const [productsInCart, setProductsInCart] = useState(useSelector((state) => state.productsInCart.value));

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let inCart = JSON.parse(window.localStorage.getItem('products-in-cart')) || [];
            setProductsInCart(inCart);
        }
    }, []);

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

    let productsList = [];

    if (productsInCart.length > 0) {
        productsList = productsInCart.map(item => {
            return <SelectedProduct key={item.title} id={item.id} title={item.title} imageName={item.imageName} price={item.price}/>
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
        setProductsInCart([]);
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

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.column}>                   
                    <div className={styles.cart}>
                        <div className={styles.title}><h3>Кошик</h3></div>
                        {productsList}
                        {productsInCart.length > 0 ? <div className={styles.title}><h3>Всього до оплати: {total} ₴</h3></div> : <div>У вашому кошику порожньо</div>}
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.form}>
                        <div className={styles.title}><h3>Оформлення замовлення</h3></div>
                        <input className={styles.input} type="text" placeholder="Ім'я та прізвище" onChange={changeHandlerCustomer} value={customerName}/>
                        <input className={styles.input} type="text" placeholder="Номер телефону" onChange={changeHandlerPhone} value={phone}/>
                        <input className={styles.input} type="text" placeholder="Е-пошта" onChange={changeHandlerEmail} value={email}/>
                        <input className={styles.input} type="text" placeholder="Адреса" onChange={changeHandlerAddress} value={address}/>
                        <button className={styles.button} onClick={() => makeOrder(orderData)}>Замовити</button>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Cart;