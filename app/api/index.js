const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 7000;

const corsOptions = {
    origin: 'https://localhost:3000/',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/products', cors(corsOptions), async (req, res) => {
    const selectedShopId = Number(req.query.shopId);

    const productsRef = db.collection('products');
    const snapshot = await productsRef.where('shopId', '==', selectedShopId).get();
    let products = [];
    if (snapshot.empty) {
        res.send(JSON.stringify('Цей магазин немає товарів.'));
    }
    else {
        snapshot.forEach(doc => {
            products.push({'id': doc.id,'content': doc.data()});
        });
        res.send(products);
    }
});

app.get('/shops', cors(corsOptions), async (req, res) => {
    const shopsRef = db.collection('shops');
    const snapshot = await shopsRef.get();
    let shops = [];
    if (snapshot.empty) {
        res.send('No matching documents.');
    }
    else {
        snapshot.forEach(doc => {
            shops.push({'id': doc.id,'content': doc.data()});
        });
        res.send(shops);
    }
});

app.post('/orders', cors(corsOptions), async (req, res) => {
    const data = req.body;
    const response = await db.collection('orders').doc().set(data);
    res.send(JSON.stringify('Замовлення оформлено!' + response));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./credentials.json');

const fireBaseApp = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: ''
});

const db = getFirestore();