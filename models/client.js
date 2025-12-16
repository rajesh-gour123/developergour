const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    message: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client_Msg", clientSchema);
