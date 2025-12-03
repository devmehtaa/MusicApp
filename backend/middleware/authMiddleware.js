const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header("Authorization");
    if(!token){
        return res.status(500).json({message: "Access Denied"});
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.status(500).json({error: error.message});
    }
};