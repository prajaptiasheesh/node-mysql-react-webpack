const {sendGmailMail, testGmail} = require('./gmail.service');
const { sendMailTrapMail, testMailTrap } = require('./mailtrap.service');

module.exports = class Mailer{
    constructor(type){
        switch(type){
           case 'gmail': {
                this.mailer = sendGmailMail
                this.test = testGmail.bind(this)
                break;
           }
           case 'mailtrap': {
                this.mailer = sendMailTrapMail.bind(this)
                this.test = testMailTrap.bind(this)
                break;
           }
           default: {
                this.mailer = sendGmailMail.bind(this)
                this.test = testGmail.bind(this)
           }
        }
    }

    testMail(){
        this.test();
    }
    sendMail(data, templatePath){
        return this.mailer(data, templatePath)
    }
}