const jwt= require('jsonwebtoken')
const express= require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
require('../db/conn');
const User= require("../model/userSchema");



router.get('/',(req, res)=>{ 
    res.send(`hello world from the server router.js`);
    });
//Using Promises
    
/*router.post('/register', (req,res)=>{
    const {name, email , phone, designation, password, cpassword} = req.body;
    if( !name || !email || !phone || !designation || ! password || !cpassword){
        return res.status(422).json({error: "plz fill details"});
    }

    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist){
                return res.status(422).json({error: "Email already exist" });

            }

            const user= new User({name, email, phone, designation, password, cpassword });
            user.save().then(() => {
               res.status(201).json({message: "User registered successfully"});
            }).catch((err) => res.status(500).json({ error: "Failed to registered"}));
        }).catch(err => {console.log(err); });
    });
*/

// Using Async 
    router.post('/register',async  (req,res)=>{
        const {name, email , phone, designation, password, cpassword} = req.body;
        if( !name || !email || !phone || !designation || ! password || !cpassword){
            return res.status(422).json({error: "plz fill details"});
        }
        try{
           const userExist= await User.findOne({ email: email })
           if (userExist){
            return res.status(422).json({error: "Email already exist" });

        }
        const user= new User({name, email, phone, designation, password, cpassword });
        
        await user.save();
        res.status(201).json({message: "User registered successfully"});  
        

        } catch (err){
        console.log(err);
        }
        });
//login route
router.post('/signin',async (req, res) =>{
    //console.log(req.body);
    //res.json({message: "awsome"});
    try{
        let token;
        const {email, password } = req.body;

       if(!email || !password){
        return res.status(400).json({error:"Invalid"})
       }
       const userLogin = await User.findOne({email: email });
       //console.log(userLogin);
       if (userLogin){
        const isMatch = await bcrypt.compare(password, userLogin.password);
        token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwttoken",token,{
            expires: new Date(Date.now()+25892000000),
            httpOnly: true
        });
        
       if(!isMatch){
       res.status(400).json({error:"user error"});}
       else{
      res.json({message: "user signin successfully"});
       }


       }
       else{

        res.status(400).json({error:"user error"});

       }

       const isMatch = await bcrypt.compare(password, userLogin.password);
       if(!isMatch){
       res.status(400).json({error:"user error"});}
       else{
      res.json({message: "user signin successfully"});
       }

    } catch(err){
     console.log(err);
    }
    
});
    module.exports = router;
    
