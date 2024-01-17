import users from '../../models/users.js';

export default async (req, res) => {
  try {
    const userId = req.id;
    const user = await users.findById(userId, {
      invitations: { $elemMatch: { accepted: false } },
    });

    if (user && user.invitations && user.invitations.length > 0) {
      const invitations = user.invitations;
      res.json({ invitations: invitations });
      // Do something with the invitations
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
