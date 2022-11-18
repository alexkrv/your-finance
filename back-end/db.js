const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGODB_URI;
const dbName = process.env.NODE_ENV === 'production' ? 'your_finance' : 'dev_your_finance';
const client = new MongoClient(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
	connectToServer: function (callback) {
		client.connect(function (err, db) {
			if (err || !db) {
				return callback(err);
			}

			dbConnection = db.db(dbName);
			console.log('Successfully connected to MongoDB.');

			return callback();
		});
	},

	getDb: function () {
		return dbConnection;
	},
};