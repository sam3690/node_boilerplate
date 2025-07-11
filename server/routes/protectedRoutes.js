const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


router.get('/dashboard', auth, (req, res) => {
    res.send({ message: 'Welcome to the protected dashboard route!', user: req.session.user.name });
});

module.exports = router;