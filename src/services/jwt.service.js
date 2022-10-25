var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');

var privateKeyPath = path.join(__dirname, '../','jwt-keys', 'private.pem') 
var publicKeyPath = path.join(__dirname, '../','jwt-keys', 'public.pem') 

class Jwt{
    constructor(){
        fs.readFile(privateKeyPath, 'utf8', (err, data)=>{
            this.privateKey = data.toString()
        });

        fs.readFile(publicKeyPath, 'utf8', (err, data)=>{
            this.publicKey = data.toString()
        });
        this.algorithm = 'RS256'
    }

    generateToken(data){
        return new Promise((resolve)=>{
            jwt.sign(data, this.privateKey, { 
                algorithm: this.algorithm, 
                expiresIn: Date.now() + 1000*60*60 
            }, (error, token)=>{
                resolve({token, error})
            })
        })
    }

    verifyToken(token){
        return new Promise((resolve)=>{
            jwt.verify(token, this.publicKey, (error, result)=> {
                resolve({result, error});
            })
        })
    }
}

module.exports = new Jwt();