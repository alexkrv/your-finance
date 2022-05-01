require('dotenv').config()

const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const {URL_BASE, URL_CURRENCIES,} = require('../constants/urls')
const routes = require('../constants/routes')
const userRoutes = require('../routes/users.routes')
const cashCategoriesRoutes = require('../routes/cashCategories.routes')
const PORT = process.env.PORT || 3001;
const { connectToServer } = require('../db')

const app = express();

connectToServer((error) => {
    if(error){
        throw new Error(error)
    }
    console.log('connectToServer: connected')
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post(routes.ROUTE_LOGIN, userRoutes);

app.post(routes.ROUTE_ADD_CASH_CATEGORY, cashCategoriesRoutes);

app.get(routes.ROUTE_CURRENCIES, (req, response) => {
    const url = `${URL_BASE}${URL_CURRENCIES}?apiKey=${process.env.FREE_CURRCONV_API_KEY}`;

    https.get(url, (res) => {
        let data = ''
        res.on('data', (d) => {
            data += d
        });
        
        res.on('end', () => {
            console.log('/currencies done')
            response.json(data.toString());
        })

    }).on('error', (e) => {
        console.error(e);
    });
});

app.get(routes.ROUTE_CONVERSION_RATES, (req, response) => {
    console.log('req', req.query)
    
    const url = `https://api.currencyapi.com/v3/latest?apikey=${process.env.FREE_CURRENCY_API_KEY}&base_currency=${req.query.base}`;
    
    https.get(url, (res) => {
        let data = ''
        res.on('data', (d) => {
            data += d
        });

        res.on('end', () => {
            console.log('/convert done')
            response.json(data.toString());
        })

    }).on('error', (e) => {
        console.error(e);
    });
});
const mockData = [// TODO delete mockData, use real from DB
    {
        timeStamp: Date.now(),
        value: Math.round(Math.random()*1000),
        difference: Math.round(Math.random()*1000),
        currencyId: 'RUB',
        comment: 'Some comment',
        id: Date.now()
    }
]

app.get(routes.ROUTE_CASH_STATISTICS, (req, response) => {
    response.json(mockData) // TODO delete mockData, use real from DB
});

app.get(`${routes.ROUTE_CREATE_STATISTICS_RECORD}/:currencyId`, (req, response) => {
    const lastRecord = mockData[mockData.length - 1]

    mockData.push({ // TODO delete mockData, use real from DB
        timeStamp: Date.now(),
        value: Math.round(Math.random()*1000),
        difference: Math.round(Math.random()*1000) - lastRecord.value,
        currencyId: req.params.currencyId,
        comment: 'Some very long comment about global financial situation in the world that lead to so weird balance state',
        id: Date.now()
    })

    response.json(mockData)
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});