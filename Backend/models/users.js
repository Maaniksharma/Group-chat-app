import mongoose from 'mongoose';
const InvitationSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groups',
    required: true,
  },
  groupName: {
    type: String,
    required: true,
    trim: true,
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groupchatusers',
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  at: {
    type: Date,
    default: Date.now,
  },
});
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
    invitations: [InvitationSchema],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('groupchatusers', users);
