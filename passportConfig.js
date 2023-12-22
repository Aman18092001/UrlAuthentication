const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('./schema');


module.exports.initializePassport=()=>{
    passport.use(new LocalStrategy({
        usernameField:"email",
    },async(email,password,done)=>{
        try{
            const user=await User.findOne({email:email});
            console.log('user from passport',user);
            if(!user){
                
                return done(null,false);
            }
            if(user.password!==password){
                
                return done(null,false);
            }
            
            return done(null,user);
        }catch(err){
            console.log('err',err);
            return done(err,false);
        }
    }  
    ));
}    


passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    try{
        const user=await User.findById(id);
        if(!user){
            done(null,false);
        }
        done(null,user);
    }catch(err){
        done(err,false);
    }
})



