import users from '../../models/users.js';
import groups from '../../models/groups.js';
export default async (req, res) => {
  try {
    const { groupId, userName } = req.body;
    const userId = req.id;
    const group = await groups.findById(groupId);
    const message = {
      message: `${userName} has joined the group`,
      userId: userId,
    };
    group.messages.unshift(message);
    group.members.push(userId);
    await group.save();
    const user = await users.findById(userId);
    await users.updateOne(
      { _id: userId, 'invitations.groupId': groupId },
      { $set: { 'invitations.$.accepted': true } }
    );
    user.groups.push(groupId);
    await user.save();
    res.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching groups' });
  }
};
