import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groupchatusers',
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  at: {
    type: Date,
    default: Date.now,
  },
});

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'groupchatusers',
      required: true,
    },
    messages: [messageSchema],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupchatusers',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const groups = mongoose.model('groups', groupSchema);

export default groups;
