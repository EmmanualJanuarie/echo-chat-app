import { Schema, model } from "mongoose";
import { compare, genSalt, hash } from "bcryptjs";

const userSchema = Schema(
  {
    flname: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    bio: { type: "String"},
    tel: { type: "Number", required: true },

    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) { // Corrected this line
    return next(); // If password is not modified, skip hashing
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next(); // Call next to proceed with saving the user
});

const User = model("User", userSchema);

export default  User;
