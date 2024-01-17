import users from '../../models/users.js';

export default async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const matchedUsers = await users
      .find({
        userName: { $regex: new RegExp(searchTerm, 'i') },
      })
      .select('userName');

    res.status(200).json(matchedUsers);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'An error occurred while searching for users' });
  }
};
