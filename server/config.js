const { User } = require('./db/models');


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb+srv://kcsujeet:admin123@cluster0-uci96.mongodb.net/graphql?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));