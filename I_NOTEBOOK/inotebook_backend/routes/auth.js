const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser')

//Route endpoing api/auth/createuser with no login required adn with express validations
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors it send bad response
    const result = validationResult(req);
    try {
        if (result.isEmpty()) {
            //Another Method to check the email if already exist
            let check = await User.findOne({ email: req.body.email }).exec()
            console.log(req.body.email)
            console.log(check)
            if (check) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    msg: "Email already exist"
                });
            } else {
                //Password encryption
                const salt = await bcrypt.genSalt(10);
                secPass = await bcrypt.hash(req.body.password, salt);

                const user = User.create({
                    name: req.body.name,
                    password: secPass,
                    email: req.body.email
                })
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                
                const jwtData = jwt.sign(payload, process.env.JWT_SECRET)
                // user.save()
                res.json({
                    status: 200,
                    success: true,
                    msg: 'User Registered Successfully',
                    token: jwtData
                });
            }
        }
        else {
            //Error statement
            res.status(400).json(result.errors[0].msg);
        }
    }
    catch (error) {
        //Error statement
        res.status(500).json("Some error occured" + error)
    }
})

//Login authentication
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json(result.errors[0].msg);
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ msg: "Please try to login with correct credential" })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({ msg: "Please try to login with correct credential" })
        }
        const payload = {
                user: {
                    id: user.id
                }
        }
        const jwtData = await jwt.sign(payload, process.env.JWT_SECRET)
        
        // user.save()
        res.json({
            status: 200,
            success: true,
            msg: 'Login Successfully',
            token: jwtData
        });


    } catch (error) {
        res.status(500).json("Some error occured" + msg)

    }
})
//ROUTE 3 : Get Logged in user details -- Login required
router.post('/getuser',fetchUser, async (req, res) => {
   
    try {
        const user = await User.findOne({ _id:req.user.id }).select("-password")
        
        res.send(user)
    } catch (error) {
        res.status(500).json("Some error occured" + error)

    }
})

module.exports = router