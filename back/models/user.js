const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true }).catch((error) => {
  console.log(error);
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  pwHash: {
    type: String,
    unique: true,
    minlength: 8,
  },
  highScore: {
    type: Number,
  },
});
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.pwHash;
  },
});

module.exports = mongoose.model('User', userSchema);
