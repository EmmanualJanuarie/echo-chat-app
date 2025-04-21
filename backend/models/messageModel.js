import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User " },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User " }],
    // New field for file uploads
    file: {
      url: { type: String, trim: true }, // URL of the uploaded file
      type: { type: String, trim: true }, // Type of the file (e.g., 'image/png', 'application/pdf')
      size: { type: Number }, // Size of the file in bytes
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;