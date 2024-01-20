import express from 'express';
import loginPost from '../Controllers/userController/UserLogin.js';
import signupPost from '../Controllers/userController/userSignup.js';
import verifyMail from '../Controllers/userController/verifyUserMail.js';
import authenticateUser from '../Controllers/userController/authenticateUser.js';
import fetchGroups from '../Controllers/userController/fetchGroups.js';
import createGroup from '../Controllers/userController/createGroup.js';
import fetchMessages from '../Controllers/userController/fetchMessages.js';
import SearchUsers from '../Controllers/userController/searchUsers.js';
import sendInvite from '../Controllers/userController/sendInvite.js';
import fetchInvitations from '../Controllers/userController/fetchInvitations.js';
import fetchInvitationsDetails from '../Controllers/userController/fetchInvitationDetails.js';
import joinGroup from '../Controllers/userController/joinGroup.js';
import fetchMetrics from '../Controllers/userController/fetchMetrics.js';
// import EditUser from '../Controllers/userController/EditUser.js';

const router = express.Router();

router.post('/login', loginPost);
router.post('/signup', signupPost);
router.get('/verify', verifyMail);
router.get('/groups', authenticateUser, fetchGroups);
router.post('/creategroup', authenticateUser, createGroup);
router.get('/fetchmessages', authenticateUser, fetchMessages);
router.get('/searchusers', authenticateUser, SearchUsers);
router.post('/sendinvite', authenticateUser, sendInvite);
router.get('/invitations', authenticateUser, fetchInvitations);
router.post('/invitationsdetails', authenticateUser, fetchInvitationsDetails);
router.post('/joingroup', authenticateUser, joinGroup);
router.get('/metrics', authenticateUser, fetchMetrics);

// router.post('/edituser', authenticateUser, EditUser);

export default router;
