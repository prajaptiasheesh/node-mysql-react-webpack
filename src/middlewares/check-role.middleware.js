const checkRoleMiddleware = (permissions)=>(req, res, next)=>{
    let user = req.user;
    if(permissions.includes(user.roleName)){
        next()
    }else{
        res.status(500).json({ error: "access denied" })
    }
}

module.exports = checkRoleMiddleware