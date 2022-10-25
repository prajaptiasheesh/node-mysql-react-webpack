const crypto = require('crypto');

const hashContent = (password)=>{
    return new Promise((resolve)=>{
        try {
            const salt = crypto.randomBytes(16).toString('hex'); 
            const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
            resolve({
                password: hash,
                salt
            })
        } catch (err) {
            resolve({ error: err }) 
        }
    })
}

const isValidHashUsingSalt = (password, hash, salt)=>{
        const capturedHash = crypto.pbkdf2Sync(password,  salt, 1000, 64, `sha512`).toString(`hex`); 
        return capturedHash === hash; 
}

module.exports = {
    isValidHashUsingSalt,
    hashContent
}