import groups from '../../models/groups.js';
import users from '../../models/users.js';

export default async (req, res) => {
  try {
    const { invitations } = req.body;
    const groupIds = invitations.map((invitation) => invitation.groupId);
    let groupDetails = await groups
      .find({ _id: { $in: groupIds } })
      .select({ _id: 1, groupName: 1, createdAt: 1, createdBy: 1 });

    const invitationDetails = await Promise.all(
      groupDetails.map(async (group) => {
        const createdByUser = await users.findById(group.createdBy);
        const invitation = invitations.find(
          (inv) => inv.groupId.toString() === group._id.toString()
        );
        const invitedByUser = invitation
          ? await users.findById(invitation.invitedBy)
          : null;
        return {
          ...group._doc,
          createdBy: createdByUser ? createdByUser.userName : 'User not found',
          invitedBy: invitedByUser ? invitedByUser.userName : 'User not found',
        };
      })
    );
    res.json({ invitationsDetails: invitationDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};
