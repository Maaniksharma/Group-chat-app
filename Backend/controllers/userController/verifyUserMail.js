import jwt from 'jsonwebtoken';
import users from '../../models/users.js'; // Assuming you have a User model defined with Mongoose

export default async (req, res) => {
  try {
    const DEmail = jwt.decode(req.query.token).email;
    const user = await users.findOneAndUpdate(
      { email: DEmail },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }
    res.send({ message: 'verified' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
