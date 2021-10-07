const router = require('express').Router();
const User = require('../models/user');
const { auth } = require('../middleware/auth');

router.post('/register', async (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if (err) return res.json({ registerSuccess: false })
        return res.status(200).json({ registerSuccess: true })
    })
});

router.post('/signin', (req, res) => {
    User.findOne({ username:req.body.username }, (err, user) => {
        if(!user) {
            return res.json({
                signInSuccess: false
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ signInSuccess: false });
            
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                res.cookie("x_auth", user.token)
                .status(200)
                .json({ signInSuccess: true, userId: user._id });
            });
        });
    });
 });

 router.get('/signout', auth, (req, res) => {
     User.findOneAndUpdate({ _id: req.user._id }, {token: ""}, (err, user) => {
         if (err) return res.json({ signOutSuccess: false });
         return res.status(200).send({ signOutSuccess: true });
     });
 });

 router.get('/auth', auth, (req, res) => {
     res.status(200).json({
         isAuth: true,
         username: req.user.username,
         isAdmin: req.user.isAdmin
     });
 });

module.exports = router;