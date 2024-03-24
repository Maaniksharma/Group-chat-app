import express from 'express';
import loginPost from '../controllers/userController/userLogin.js';
import signupPost from '../controllers/userController/userSignup.js';
import verifyMail from '../controllers/userController/verifyUserMail.js';
import authenticateUser from '../controllers/userController/authenticateUser.js';
import fetchGroups from '../controllers/userController/fetchGroups.js';
import createGroup from '../controllers/userController/createGroup.js';
import fetchMessages from '../controllers/userController/fetchmessages.js';
import SearchUsers from '../controllers/userController/searchUsers.js';
import sendInvite from '../controllers/userController/sendInvite.js';
import fetchInvitations from '../controllers/userController/fetchInvitations.js';
import fetchInvitationsDetails from '../controllers/userController/fetchInvitationDetails.js';
import joinGroup from '../controllers/userController/joinGroup.js';
import fetchMetrics from '../controllers/userController/fetchMetrics.js';
// import EditUser from '../controllers/userController/EditUser.js';

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
