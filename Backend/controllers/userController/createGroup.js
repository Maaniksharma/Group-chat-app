import groups from '../../models/groups.js';
import users from '../../models/users.js';
export default async (req, res) => {
  try {
    const { groupName } = req.body;
    const { id: userId } = req;
    const group = await groups.findOne({ groupName });
    if (group) {
      res.status(400).json({ message: 'Group already exists' });
    } else {
      const newGroup = new groups({
        groupName,
        createdBy: userId,
        members: [userId],
        messages: [
          {
            userId: userId,
            message: 'Welcome to the group',
          },
        ],
      });
      await newGroup.save();
      await users.findByIdAndUpdate(userId, {
        $push: { groups: newGroup._id },
      });
      res.status(200).json({ message: 'success', group: newGroup });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
