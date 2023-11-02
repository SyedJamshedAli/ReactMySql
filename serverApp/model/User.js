const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },

  username: {
    type: String,
    required: true,
  },
  roles: {
    user: {
      type: Number,
      default: 3,
    },
    Editor: Number,
    Admin: Number
  },
  password:{
    type: String,
    required: true,
  },
  refreshToken:String
});

module.exports= mongoose.model('User',userSchema);

