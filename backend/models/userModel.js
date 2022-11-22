const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 100,
      required: true,
    },
    phone: {
      type: String,
      minLength: 9,
      maxLength: 9,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password, phone) {
  if (!email || !password || !phone) {
    throw Error('All fields must be filled!');
  }

  const enteredEmail = email.trim().toLowerCase();
  const enteredPhone = phone.trim();

  if (!enteredEmail || !enteredPhone) {
    throw Error('All fields must be filled!');
  }

  if (!validator.isEmail(enteredEmail)) {
    throw Error('Email is not valid!');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough!');
  }

  if (!validator.isMobilePhone(enteredPhone, 'pl-PL')) {
    throw Error('Phone is not valid!');
  }

  const emailExists = await this.findOne({ email: enteredEmail });

  if (emailExists) {
    throw Error('Email is already in use!');
  }

  const phoneExists = await this.findOne({ phone: enteredPhone });

  if (phoneExists) {
    throw Error('Phone is already in use!');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    email: enteredEmail,
    password: hashedPassword,
    phone: enteredPhone,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled!');
  }

  const enteredEmail = email.trim().toLowerCase();

  if (!enteredEmail) {
    throw Error('All fields must be filled!');
  }

  const user = await this.findOne({ email: enteredEmail });

  if (!user) {
    throw Error('Incorrect email!');
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw Error('Incorrect password!');
  }

  return user;
};

userSchema.statics.deleteUser = async function (user_id, password) {
  if (!password) {
    throw Error('All fields must be filled!');
  }

  const user = await this.findById(user_id);

  if (!user) {
    throw Error('There was an error!');
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw Error('Incorrect password!');
  }

  const deletedUser = await this.findByIdAndDelete(user_id);

  return deletedUser;
};

module.exports = mongoose.model('User', userSchema);
