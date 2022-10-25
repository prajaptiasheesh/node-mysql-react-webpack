module.exports = {
    isProduction : process.env.NODE_ENV ? process.env.NODE_ENV.indexOf('production') >= 0 : false,
    gmailUserName: process.env.GMAIL_USER_NAME,
    gmailUserPassword: process.env.GMAIL_USER_PASSWORD,
    mailTrapUsername: process.env.MAIL_TRAP_USER_NAME,
    mailTrapPassword: process.env.MAIL_TRAP_PASSWORD
}