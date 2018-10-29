const {User} = require('../models/user');

const auth = (req,res,next)=>{
    let token = req.cookies.monescookie;
    User.findByToken(token, (err,user)=>{
        //console.log(user);
        if(err) throw err;
        if(!user) return res.status(401).send('pas acceessible !');
        req.token = token;
        next();
    })
    //console.log(token)
}

module.exports = {auth}