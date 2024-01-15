import mailgun from '../../mailgun.js';
import jwt from 'jsonwebtoken';
import users from '../../models/users.js';
import process from 'process';
import bcrypt from 'bcrypt';

export default async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await users.findOne({
      userName: username,
    });
    if (!user) {
      res.json({ err: 1 });
      return;
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.json({ err: 1 });
      return;
    }
    if (user.isVerified) {
      const newUser = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        region: user.region,
      };
      const token = jwt.sign({ id: newUser.id }, process.env.secretkey, {
        expiresIn: '2h',
      });
      res.json({ token: token, user: newUser });
    } else {
      const email = user.email;
      const MailToken = jwt.sign({ email }, process.env.secretkey, {
        expiresIn: '1d',
      });
      console.log(MailToken);
      const String = `${process.env.url}/verify?token=` + MailToken;
      mailgun(email, String, 'Account Verification', () => {
        console.log('email sent');
      });
      res.json({ err: 2 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ err: 3 });
  }
};
