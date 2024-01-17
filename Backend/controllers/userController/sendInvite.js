import users from '../../models/users.js';
export default async (req, res) => {
  try {
    const { userId, groupId } = req.body;
    const invitedBy = req.id;
    const invitation = {
      groupId,
      invitedBy,
    };
    const userWithInvitation = await users.findOne(
      {
        _id: userId,
        'invitations.groupId': groupId,
      },
      { 'invitations.$': 1 }
    );
    if (userWithInvitation) {
      return res.status(400).json({ error: 1 });
    }
    let user = await users.findById(userId);
    user.invitations.push(invitation);
    await user.save();
    res.send({ message: 'success' });
  } catch (error) {
    console.log(error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'An error occured while sending invite' });
    }
  }
};
