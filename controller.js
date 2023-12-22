const User=require("./schema");

module.exports.signUp=async(req,res)=>{
    try{
      const existingUser=await User.findOne(req.body);
      if(existingUser){
          res.status(404).send('User already exist');
          return res.redirect('back');
      }else{
          if(req.body.password==req.body.confirmPassword){
              await User.create(req.body);
            //   res.status(200).send('User is created');
              return res.redirect('/signIn'); 
          }
      }
    }catch(err){
        console.error(err);
        return res.redirect('back');
    }
}

