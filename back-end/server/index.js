require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');

const routes = require('../constants/routes')
const userRoutes = require('../routes/users.routes')
const cashCategoriesRoutes = require('../routes/cashCategories.routes')
const banksRoutes = require('../routes/banks.routes')
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

app.post(routes.ROUTE_CASH_CATEGORY_ITEM, cashCategoriesRoutes);
app.delete(routes.ROUTE_CASH_CATEGORY_ITEM, cashCategoriesRoutes);
app.get(routes.ROUTE_CURRENCIES, cashCategoriesRoutes);
app.get(routes.ROUTE_CONVERSION_RATES, cashCategoriesRoutes);
app.get(routes.ROUTE_GET_CASH_STRUCTURE, cashCategoriesRoutes);

app.get(routes.ROUTE_BANK_ORGANIZATION, banksRoutes);
app.post(routes.ROUTE_BANK_ORGANIZATION, banksRoutes);
app.patch(routes.ROUTE_BANK_ORGANIZATION, banksRoutes);
app.delete(routes.ROUTE_BANK_ORGANIZATION, banksRoutes);
app.delete(routes.ROUTE_BANK_ACCOUNT, banksRoutes);

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