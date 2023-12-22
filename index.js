const express=require('express');
const app=express();
const port=8000;
const passport=require('passport');
const passportLocal=require('./passportConfig');
const mongoose=require('./mongoose');
const userController=require('./controller');
const initializePassport=require('./passportConfig').initializePassport;
initializePassport();
const session=require('express-session');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'blahsomething',
    resave:false,
    saveUninitialized:false,
    maxAge:{
        maxAge:(1000*60*100)
    }
}))
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine','ejs');

app.get('/signUp',(req,res)=>{
    res.render('signUp');
})
app.post('/session',userController.signUp);

app.get('/signIn',(req,res)=>{
    res.render('loginIn');
})
app.post('/signIn',passport.authenticate('local',{failureRedirect:'/signUp'}),(req,res)=>{
    res.send('user is logged in successfully');
})

app.listen(port,()=>{
    console.log(`app is running on port:${port}`);
})