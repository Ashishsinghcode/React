const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

//Route endpoing api/auth/createuser with no login required adn with express validations
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors it send bad response
    const result = validationResult(req);
try{
    if (result.isEmpty()) {
        //Another Method to check the email if already exist
        let check = await User.findOne({ email: req.body.email }).exec()
        if (check) {
            res.status(400).json({
                status: 400,
                success: false,
                msg: "Email already exist"
            });
        } else {
            const user = User(req.body)
            user.save()
            res.send("User Registered Successfully");
        }        
    } 
    else {
        //Error statement
        res.status(400).json(result.errors[0].msg);
    }
}
catch(error){
    //Error statement
    res.status(500).json("Some error occured")
}
})
module.exports = router