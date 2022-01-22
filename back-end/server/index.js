const express = require("express");
const https = require("https");

const {URL_FREE_CURRCONV} = require('../constants/urls')
const PORT = process.env.PORT || 3001;

const app = express();

require('dotenv').config()

app.get("/currencies", (req, response) => {
    https.get(`${URL_FREE_CURRCONV}${process.env.FREE_CURRCONV_API_KEY}`, (res) => {
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

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});