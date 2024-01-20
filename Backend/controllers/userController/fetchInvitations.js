import users from '../../models/users.js';

export default async (req, res) => {
  try {
    const userId = req.id;
    const user = await users.findById(userId);

    if (user && user.invitations && user.invitations.length > 0) {
      const invitations = user.invitations.filter(
        (invitation) => !invitation.accepted
      );
      console.log(invitations);
      if (invitations.length > 0) {
        res.json({ invitations: invitations });
        // Do something with the invitations
      } else {
        // No invitations found
        res.json({ invitations: [] });
      }
    } else {
      // No invitations found
      res.json({ invitations: [] });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occured while fetching invitations' });
    // Handle error
  }
};
