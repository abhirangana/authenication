const express = require('express');
const authRoutes=require('./routes/auth-routes');
const profileRoutes=require('./routes/profile-routes');

const passportSetup=require('./config/passport-setup');
const mongoose =require('mongoose');
const keys =require('./config/keys');
const app=express();
const cookieSession=require('cookie-session');
const passport=require('passport');

app.set('view engine','ejs');

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));
mongoose.connect(keys.mongodb.dbURI,()=>{
   console.log('connected to mongodb');
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/',(req,res)=>{
	res.render('home');
});

app.listen(3000,() =>{
   console.log('app now listening for requests on port 3000')
});   