var nodemailer = require('nodemailer');
var ejs = require('ejs');
var path = require('path');

var transport = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "499815a9946e44",
      pass: "8e6da30e0ef105"
    }
  }
let transporter = nodemailer.createTransport(transport)
var currentProcessDir = process.cwd();
//Verifying the Nodemailer Transport instance
const testMailTrap = ()=>{
    transporter.verify((error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Mail trap server is ready to take messages');
        }
    });
}


const sendMailTrapMail = function(templatePath, data){
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
    testMailTrap, sendMailTrapMail
}