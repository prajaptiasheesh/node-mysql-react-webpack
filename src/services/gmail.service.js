var nodemailer = require('nodemailer');
var ejs = require('ejs');
var path = require('path');
var CONFIGS = require('../config');

var transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: CONFIGS.gmailUserName?.trim(),
      pass: CONFIGS.gmailUserPassword?.trim()
    }
  }
let transporter = nodemailer.createTransport(transport)
var currentProcessDir = process.cwd();
//Verifying the Nodemailer Transport instance
const testGmail = ()=>{
    transporter.verify((error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Server is ready to take messages');
        }
    });
}


const sendGmailMail = function(templatePath, data){
    return new Promise((resolve, reject)=>{
        ejs.renderFile(path.join(currentProcessDir, templatePath), data, function (err, html) {
            if(err){
                return reject(err)
            }
            if(data){
                var mainOptions = {
                    from: transport.auth.user,
                    to: data.email,
                    subject: data.title,
                    html: html
                };
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        return reject(err)
                    } else {
                        return resolve(info);
                    }
                });
            }
        })
    })
}

module.exports = {
    testGmail, sendGmailMail
}