'use client';

import styles from './shop.module.css';

import Header from '../components/Header';
import Product from '../components/Product';
import ShopCard from '../components/ShopCard';

import { useState, useEffect }from 'react';

const Shop = () => {
    const [ products, setProducts ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ selectedShopId, setSelectedShopId ] = useState(1);

    const [ shops, setShops ] = useState([]);
    //const url = 'http://localhost:7000/';
    const url = 'https://delivery-app-server-dg2d.onrender.com/';
    useEffect(() => {
        fetch(url + `products?shopId=${selectedShopId}`)
            .then(response => response.json())
            .then(json => {
                if (typeof json === 'string') {
                    setErrorMessage(json); 
                    setProducts([]); 
                } else { 
                    setProducts(json);
                    setErrorMessage(''); 
                }});
    }, [selectedShopId]);
    
    let productsList = [];
    
    if (products.length > 0) {
        productsList = products.map(item => {
            return <Product key={item.id} id={item.id} title={item.content.title} imageName={item.content.image} price={item.content.price}/>}
        );
    }

    useEffect(() => {
        fetch(url + 'shops')
            .then(response => response.json())
            .then(json => setShops(json));
    }, []);

    let shopsList = [];
    if (shops.length > 0) {
        shopsList = shops.map(item => {
            return <ShopCard key={item.id} shopId={item.id} name={item.content.name} setSelectedShopId={setSelectedShopId}/>}
        );
    }
    let content = '';
    
    return (
        <>
            <Header/>     
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>Магазини</h3>
                    <div className={styles.shops}>
                        {shopsList}
                    </div>
                </div>
                <div className={styles.column}>
                    <h3>Товари</h3>
                    { errorMessage !== '' ? <div className={styles.error}>{errorMessage}</div> : <div className={styles.products}>{productsList}</div> }
                </div>
            </div>
        </>
    );
};

export default Shop;