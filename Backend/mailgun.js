// import mailjet from 'node-mailjet';
import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();
const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_SECRET_KEY,
});

export default (email, Link, title, callback) => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'manikss123456@gmail.com',
          Name: 'Chat Karo',
        },
        To: [
          {
            Email: `${email}`,
            Name: 'passenger 1',
          },
        ],
        Subject: 'Verify Your Account',
        TextPart: 'Dear Customer Welcome to Chat Karo ',
        HTMLPart: `<h3>Click on this Link <a href='${Link}'>Mailjet</a>!</h3><br />May the delivery force be with you!`,
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
      callback(null, result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
      callback(err, null);
    });
};
