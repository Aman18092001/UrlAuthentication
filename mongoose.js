const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/Authorize')
    .then(()=> console.log('successfully connected to database'))
    .catch((err)=>console.log('error in mongoDb connection:',err))



