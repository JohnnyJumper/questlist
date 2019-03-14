const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    //handle with passport
    return res.send('loggin out');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google') ,(req, res) => {
    console.log('reached redirect ', req.user);
    // return res.header("Access-Control-Allow-Origin", "*").json(req.user.id);
    res.redirect(`http://localhost:3000/logging/${req.user.id}`);
});

module.exports = router;