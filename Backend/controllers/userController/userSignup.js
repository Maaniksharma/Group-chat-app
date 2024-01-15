import Mailgun from '../../mailgun.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import users from '../../models/users.js';

export default async (req, res) => {
  const { username, email, region, password } = req.body;
  try {
    const existingUser = await users.findOne({
      $or: [{ email: email }, { userName: username }],
    });

    if (existingUser) {
      return res.send({ error: 0 });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds, you can adjust this value
        const user = new users({
          userName: username,
          email: email,
          region: region,
          password: hashedPassword,
          isVerified: false,
        });
        await user.save();
      } catch (error) {
        console.error('Error occurred during insertion:', error);
        res.status(500).send({ error: 'Server error' });
        return;
      }

      const MailToken = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '1d',
      });
      console.log(MailToken);
      const String = 'http://localhost:5173/verifyemail?token=' + MailToken;

      Mailgun(email, String, 'Account Verification', () => {
        console.log('email sent');
      });

      res.send({ message: 'success' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'Server error' });
  }
};
