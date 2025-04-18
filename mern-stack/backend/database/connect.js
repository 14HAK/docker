import 'dotenv/config';

// create a connection to our MongoDB database
const mongoose = require('mongoose');
console.log(process.env.DB_URL);
function connect() {
	mongoose
		.connect(process.env.DB_URL)
		.then(() => {
			console.log('Successfully connected to database');
		})
		.catch((err) => {
			console.log('database connection failed. exiting now...');
			console.error(err);
			process.exit(1);
		});
}

module.exports = connect;
