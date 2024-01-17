import groups from '../../models/groups.js';
import users from '../../models/users.js';

export default async (req, res) => {
  try {
    const { groupId, page } = req.query;
    const pageSize = 15;

    // Fetch the group document without slicing the messages array
    const group = await groups.findById(groupId).exec();

    // Calculate the start and end indices for the slice
    const totalMessages = group.messages.length;
    // Calculate the start and end indices for the slice
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, totalMessages);

    // Slice the messages array from the start
    const messages = group.messages.slice(start, end);

    // Fetch the userName for each userId in the messages array
    const promises = messages.map(async (messageDoc) => {
      const message = messageDoc.toObject(); // Convert the Mongoose document to a plain JavaScript object
      const user = await users
        .findById(message.userId)
        .select('userName')
        .exec();
      delete message.userId;
      message.senderName = user.userName; // Add the userName to the message
      return message; // Return the updated message
    });

    const updatedMessages = await Promise.all(promises);

    res.send(updatedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};
