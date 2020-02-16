// Imports
const AWS = require('aws-sdk')
const proxy = require('proxy-agent')
const dotenv = require('dotenv') //it reads system variables .env file

dotenv.config()
const proxyInfo = process.env.PROXY_INFO
console.log(proxyInfo)

//AWS.config.update({ region: '/* TODO: Add your regions */' })
AWS.config.loadFromPath('./config.json');
// AWS.config.update({
//   httpOptions: { 
//     agent: proxy(proxyInfo)
//   }
// });

// Declare local variables
// TODO: Declare dynamoDB object
const dynamo = new AWS.DynamoDB()

createTable('hamsters')
.then(() => createTable('races'))
.then(data => console.log(data))

function createTable (tableName) {
  // TODO: Declare params for createTable
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'N'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput:{
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  }

  return new Promise((resolve, reject) => {
    // TODO: Call createTable function
    dynamo.createTable(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
