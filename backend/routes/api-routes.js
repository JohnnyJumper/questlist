const router = require('express').Router();
const users = require('../models/users');

router.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    users.findById(id).then((user) => {
        if (user)
           return res.json(user);
        else
            return res.json({err: 'couldnt find user'});
    });
});

module.exports = router;