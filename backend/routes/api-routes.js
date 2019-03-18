const router = require('express').Router();
const users = require('../models/users');
const lists = require('../models/quests');


router.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    users.findById(id).then((user) => {
        if (user)
           return res.json(user);
        else
            return res.json({err: 'couldnt find user'});
    });
});

router.get('/list/:id', (req, res) => {
    const {id} = req.params;
    lists.findById(id).then(list => res.json(list))
    .catch(err => res.json({err}));
});



router.post('/lists/:userID', (req, res) => {
    const {userID} = req.params;
    let list = new lists({})
   
});



module.exports = router;