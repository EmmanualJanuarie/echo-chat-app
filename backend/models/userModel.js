import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Ensure model is registered only once
if (!mongoose.models.User) {
  const userSchema = new mongoose.Schema({
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
  }, { timestamps: true });

  // Password hashing middleware
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  });

  // Password comparison method
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  // Register the model
  mongoose.model("User", userSchema);
}

export default mongoose.models.User; // Return the registered model