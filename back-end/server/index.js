require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const multer  = require('multer')

const routes = require('../constants/routes')
const userRoutes = require('../routes/users.routes')
const cashCategoriesRoutes = require('../routes/cashCategories.routes')
const banksRoutes = require('../routes/banks.routes')
const brokersRoutes = require('../routes/broker.routes')
const statisticsRoutes = require('../routes/statistics.routes')
const PORT = process.env.PORT || 3001;
const { connectToServer } = require('../db')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${req.query.bankId}.${file.originalname.split('.').pop()}`)
    }
})

const upload = multer({ storage })

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
app.put(routes.ROUTE_BANK_ORGANIZATION, banksRoutes);
app.patch(routes.ROUTE_BANK_ORGANIZATION, banksRoutes);
app.delete(routes.ROUTE_BANK_ORGANIZATION, banksRoutes);
app.delete(routes.ROUTE_BANK_ACCOUNT, banksRoutes);
app.post(routes.ROUTE_BANK_AVATAR, upload.single('avatar'), banksRoutes);

app.get(routes.ROUTE_BROKER, brokersRoutes);
app.post(routes.ROUTE_BROKER, brokersRoutes);
app.patch(routes.ROUTE_BROKER, brokersRoutes);
app.post(routes.ROUTE_BROKER_ASSETS, brokersRoutes);
app.delete(routes.ROUTE_BROKER_ASSETS, brokersRoutes);
app.patch(routes.ROUTE_BROKER_ASSETS, brokersRoutes);
app.post(routes.ROUTE_BROKER_AVATAR, upload.single('avatar'), brokersRoutes);

app.get(routes.ROUTE_CASH_STATISTICS, statisticsRoutes);
app.post(routes.ROUTE_CASH_STATISTICS, statisticsRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});