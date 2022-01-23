const express = require("express");
const https = require("https");

const {URL_BASE, URL_CURRENCIES,} = require('../constants/urls')
const PORT = process.env.PORT || 3001;

const app = express();

require('dotenv').config()

app.get("/currencies", (req, response) => {
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

app.get("/conversion-rates", (req, response) => {
    console.log('req', req.query)
    
    const url = `https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.FREE_CURRENCY_API_KEY}&base_currency=${req.query.base}`;
    
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

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});