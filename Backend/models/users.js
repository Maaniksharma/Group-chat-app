import mongoose from 'mongoose';
const users = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    region: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('groupchatusers', users);
