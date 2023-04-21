'use-strict';

const Router = require("koa-router");
const router = new Router();

const { postUser, getUser, getUsers } = require('./controllers/user');
const { postGroup, getGroup, getGroups, postUserToGroup } = require('./controllers/group');
const { postChore, getChore, getChores } = require('./controllers/chore');
const { postAction, getAction, getActions, getUserActions, getUserActionsInGroup } = require('./controllers/action');
const { getLogin } = require('./utils/auth');

router.get('/user/:id', getUser);
router.get('/users', getUsers);
router.post('/user', postUser);

router.get('/group/:id', getGroup);
router.get('/groups', getGroups);
router.post('/group', postGroup);
router.post('/group/:groupId/:userId', postUserToGroup);

router.get('/chore/:id', getChore);
router.get('/chores', getChores);
router.post('/chore', postChore);

router.get('/action/:id', getAction);
router.get('/actions', getActions);
router.post('/action', postAction);
router.get('/user/:id/actions', getUserActions);
router.get('/user/:userId/group/:groupId/actions', getUserActionsInGroup);

router.get('/login', getLogin)

module.exports = router;