import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js"; // Correctly import the Chat model

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
console.log("Message model:", Message); // Should log the model function
const allMessages = asyncHandler(async (req, res) => {
  console.log("Fetching messages for chatId:", req.params.chatId);
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat")
      .populate({
        path: "chat.users",
        select: "name pic email",
      });
    
    console.log("Fetched messages:", messages); // Check the messages

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(400);
    throw new Error(error.message);
  }
});



//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");

     // If you want to populate the chat users, you can do this:
     message = await message.populate({
      path: "chat.users",
      select: "name pic email", // Select only necessary fields
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export default { allMessages, sendMessage };