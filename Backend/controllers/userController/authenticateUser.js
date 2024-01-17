// authenticateSeller.js
import jwt from 'jsonwebtoken';

export default function authenticateUser(req, res, next) {
  try {
    let token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.secretkey);
    req.id = decodedToken.id; // Add email to request object
    next(); // Continue to next middleware or route handler
  } catch (error) {
    console.error('Failed to authenticate:', error);
    res.status(401).json({ err: 'Unauthorized' });
  }
}
