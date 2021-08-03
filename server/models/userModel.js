const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.mongo_URL;

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // sets the name of the DB that our collections are part of
  dbName: 'eat',
})
  .then(() => {
    console.log('Connected to Mongo DB.');
  })
  .catch((err) => {
    console.log(err);
  });

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

// create User Schema for the database
const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  location: { type: String },
  preferCuisine: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // answerGenerated: {type: String}
});

// this is to hash the password before saving into data
userSchema.pre('save', (next) => {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return next();
});

const User = mongoose.model('user', userSchema);
module.exports = { User };
