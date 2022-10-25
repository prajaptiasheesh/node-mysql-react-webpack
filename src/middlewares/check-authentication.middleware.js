const jwtService = require("../services/jwt.service")

const checkAuthentication = (req, res, next)=>{
    let token = req.get('authorization');
    jwtService.verifyToken(token)
    .then(({result, error})=>{
        if(error){
            return res.status(401).json({
                error: {
                    msg: 'Authentication failed'
                }
            });
        }else{
            req.user = result;
            next()
        }
    })
}

module.exports = checkAuthentication;