import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide a Username"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Please Provide a Email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please Provide a Password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// const User = mongoose.model.users || mongoose.model("users", userSchema);
let User;
if (mongoose.modelNames().includes('users')) {
  // If it exists, retrieve the existing model
  User = mongoose.model('users');
} else {
  // If it doesn't exist, define the "users" model
  User = mongoose.model('users', userSchema);
}


export default User;
