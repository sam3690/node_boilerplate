const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const auth = require('../middleware/auth');
const hasPermissionSession = require('../middleware/hasPermissionSession');

//List users
router.get('/', auth, hasPermissionSession('users', 'CanView'), usersController.listUsers);

//Create user
router.post('/', auth, hasPermissionSession('users', 'CanAdd'), usersController.createUser);

//Update user
router.put('/:id', auth, hasPermissionSession('users', 'CanEdit'), (req, res) => {
    res.json({ message: `User updated` });
});

//Delete user
router.delete('/:id', auth, hasPermissionSession('users', 'CanDelete'), (req, res) => {
    res.json({ message: `User deleted` });
});

module.exports = router;