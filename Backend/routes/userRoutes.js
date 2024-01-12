import express from 'express';
import loginPost from '../Controllers/userController/UserLogin.js';
import signupPost from '../Controllers/userController/userSignup.js';
import verifyMail from '../Controllers/userController/verifyUserMail.js';
import authenticateUser from '../Controllers/userController/authenticateUser.js';
import fetchGroups from '../Controllers/userController/fetchGroups.js';
// import EditUser from '../Controllers/userController/EditUser.js';

const router = express.Router();

router.post('/login', loginPost);
router.post('/signup', signupPost);
router.get('/verify', verifyMail);
router.get('/groups', authenticateUser, fetchGroups);

// router.post('/edituser', authenticateUser, EditUser);

export default router;
