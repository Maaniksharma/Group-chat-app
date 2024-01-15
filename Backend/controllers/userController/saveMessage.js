import users from '../../models/users.js';
import groups from '../../models/groups.js';

export default async (id, data) => {
  try {
    const group = await groups.findById(data.groupId);

    if (!group) {
      console.log('Group not found');
      return;
    }

    // Create a new message
    const newMessage = {
      userId: id,
      message: data.message,
      at: Date.now(),
    };

    // Add the message to the group's messages
    group.messages.push(newMessage);

    // Save the group
    await group.save();

    // If the group is saved successfully, emit the last message to all clients
    const lastMessage = group.messages[group.messages.length - 1];
    const user = await users.findById(lastMessage.userId).select('userName');
    const messageData = {
      senderName: user.userName, // Replace this with the actual sender's name
      timestamp: lastMessage.at,
      message: lastMessage.message,
    };
    return messageData;
  } catch (err) {
    // Handle any errors
    console.error(err);
  }
};
