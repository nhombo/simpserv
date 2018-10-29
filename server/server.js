
    const express = require('express');
    const morgan = require('morgan');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const config = require('./config/config').get(process.env.NODE_ENV);
    const app = express();

    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI || config.DATABASE);

    const {User} = require('./models/user');
    const {auth} = require('./middleware/auth');

    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(express.static('client/build'))

    app.post('/api/user', (req,res)=> {
       const user = new User({
        email: req.body.email,
        password: req.body.password
       });
       user.save((err, doc)=>{
            if(err) res.status(400).send(err);
             res.status(200).send(doc)
       })
    })
 /*login et avec la methode pour la comparaison from le model*/

app.post('/api/user/login', (req,res)=>{
    User.findOne({email:req.body.email}, (err, user)=>{
        if(!user) res.json({message: 'Mauvaise authentication, email pas trouvé !'});

        user.compareLePassword(req.body.password, (err, isMatch)=>{
            if(err) throw err; 
            if(!isMatch) return res.status(400).json({message: 'mauvais mot de passe'});
            /*****ci-après result avant token */
            // res.status(200).send(isMatch)
            /*****ci-après result après generation de token */
            user.genereToken((err,user)=>{
                if(err) res.status(400).send(err);
                res.cookie('monescookie', user.token).send('ok');
            })
        })
    })
})

app.get('/user/profile',auth,(req,res)=>{
    // res.status(200).send('Vous avez accès ');
    res.status(200).send(req.token);
})

app.get('/api/users', (req,res)=>{
    res.send([
        {
            id:1,
            prenom:"Pierro",
            nom:"Tayson"
        },
        {
            id:2,
            prenom:"Lean",
            Nom: "Dupond"
        }
    ])
})

app.get('/api/voits', (req,res)=>{
    res.send([
        {
            id:1,
            marque:"Toyota",
            modele:"corola"
        },
        {
            id:2,
            marque:"Mercedes",
            modele: "Sprinter"
        }
    ])
})

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*', (req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}
    const port = process.env.PORT || 3002;
    
    app.listen(port, () => {
    console.log(`Le server écoute sur le port ${port}`);
    });


