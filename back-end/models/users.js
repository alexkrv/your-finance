const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		password: {
			type: String
		},
		date: {
			type: Date,
			default: Date.now
		}
	},
	{ strict: false }
);

module.exports = User = mongoose.model('users', UserSchema);