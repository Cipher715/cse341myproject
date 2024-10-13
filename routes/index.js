const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//     //#swagger.tags=['Home']
//     res.send('Hello World');
//     console.log(req.session.user)
// });

router.use('/contacts', require('./contacts'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    });
});


module.exports = router;