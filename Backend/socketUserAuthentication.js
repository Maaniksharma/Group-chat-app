import jwt from 'jsonwebtoken';

export default function authenticateUser(token, callback) {
  try {
    const decodedToken = jwt.verify(token, process.env.secretkey);
    callback(null, decodedToken.id); // Pass the decoded ID to the callback
  } catch (error) {
    console.error('Failed to authenticate:', error);
    callback(error); // Pass the error to the callback
  }
}
