require('module-alias/register')
require('./src/config');
require('./src/db/models')
const routes = require('./src/routes/v1');
const CONFIGS = require('./src/config');
const Mailer = require('./src/services');

const app = require('express')();
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');

/** webpack configuration */
const webpackConfig = require('./config/webpack.config')('development');
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const compiler = webpack(webpackConfig);
const extendedWebpackMiddleware = middleware(compiler, { publicPath:  webpackConfig.output.publicPath });
/** end webpack configuration  */
var Gmail = new Mailer('mailtrap');

Gmail.testMail()
const options = {
  key: fs.readFileSync( path.join(__dirname, 'src', 'certificates', 'key.pem') ),
  cert: fs.readFileSync(path.join(__dirname, 'src', 'certificates','cert.pem'))
};

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const whitelist = ['http://localhost:3000', 'https://localhost:3000', 'localhost']
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(extendedWebpackMiddleware)
app.use(require('webpack-hot-middleware')(compiler))
app.use(cors(corsOptionsDelegate))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1', routes);

let listener = (text)=>()=>{
  console.log(text);
}

if(CONFIGS.isProduction){
  https.createServer(options, app).listen(listener('https running on port 443'));
}else{
  /**
   * if 443 port needs to be used read below article
   * https://stackoverflow.com/questions/69000077/error-listen-eacces-permission-denied-0-0-0-0443
   */
  https.createServer(options, app).listen(443, listener('https running on port 443'));
  http.createServer(app).listen(8080,listener('https running on port 8080'));
}