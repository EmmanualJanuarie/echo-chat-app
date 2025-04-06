import { Schema, model } from "mongoose";
import { compare, genSalt, hash } from "bcryptjs";

const userSchema = new Schema(
  {
    flname: { type: String, required: true }, // Correct
    email: { type: String, required: true, unique: true }, // Correct
    password: { type: String, required: true }, // Correct
    bio: { type: String }, // Correct
    tel: { type: String, required: true }, // Correct, changed to String

    pic: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", // Correct
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // Correct
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { // Corrected this line
    return next(); // If password is not modified, skip hashing
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  return next(); // Call next to proceed with saving the user
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await compare(enteredPassword, this.password);
};

const User = model('User', userSchema);

export default  User;
