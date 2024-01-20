import users from '../../models/users.js';
import groups from '../../models/groups.js'; // replace with the path to your groups model

export default async (req, res) => {
  const userId = req.id;

  try {
    const userGroups = await users.findById(userId).select('groups');

    if (userGroups.groups.length === 0) {
      return res.json({ groups: [] });
    } else {
      const groupDetails = await groups
        .find({ _id: { $in: userGroups.groups } })
        .select({ groupName: 1, messages: { $slice: 1 } })
        .sort({ 'messages.at': -1 }); // Sort by the 'at' field of the most recent message in descending order
      // Destructure the messages array into a message object
      const groupDetailsWithMessage = groupDetails.map((group) => ({
        ...group._doc,
        message: group.messages[0],
      }));

      return res.json({ groups: groupDetailsWithMessage });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching groups' });
  }
};
