'use strict';

module.exports = (app, passport)=>{
    app.get('/', (req, res)=>{
        res.render('index');
    });

    app.get('/login', (req, res)=>{
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failuredirect: '/login',
        failuFlash: true
    }));

    app.get('/signup', (req, res)=>{
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failuredirect: '/signup',
        failuFlash: true
    }));

    app.get('/profile', isLoggedIn, (req, res)=>{
        res.render('profile', {
            user: req.user
        });
    });

    app.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    })

};

// funcion para mirar el estado del usuario y bloquear rutas dependiendo
function isLoggedIn(req, res, next){    
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/');
}