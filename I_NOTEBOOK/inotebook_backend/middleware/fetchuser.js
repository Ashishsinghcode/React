const jwt = require('jsonwebtoken')

fetchUser = async(req,res,next)=>{
    //Get the user from JWT token and append id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate with a valid token"})
    }
    try {
        const data = await jwt.verify(token,process.env.JWT_SECRET)
        req.user= data.user
       
       
    next()
} catch (error) {
    res.status(401).send({catcherror:"Please authenticate with a valid token"})
    
}
}
module.exports= fetchUser