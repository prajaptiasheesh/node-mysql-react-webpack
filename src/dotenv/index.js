var dotEnv = require('dotenv');
var path = require('path');
var devEnv = 'development', prodEnv = 'production'
var currentProcessDir = process.cwd();

var prodEnvFilePath = path.join(currentProcessDir,'.env.production'), 
devEnvFile = path.join(currentProcessDir,'.env.development');

if(process.env.NODE_ENV === devEnv){
    dotEnv.config({ path: devEnvFile, debug: true, override: true })
}else if(process.env.NODE_ENV === prodEnv){
    dotEnv.config({ path: prodEnvFilePath, override: false })
}