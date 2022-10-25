const { v4: uuidv4 } = require('uuid');
module.exports = {
  "development": {
    "username": 'root',
    "password": 'vostro3558',
    "database": 'ilika',
    "host": '127.0.0.1',
    "port": 3306,
    "dialect": "mysql",
    "seederStorageTableName": "sequelize_data",
    "debug": false,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
