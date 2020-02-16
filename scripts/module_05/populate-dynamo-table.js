// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')
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
// TODO: Declare dynamoDB DocumentClient object
const client = new AWS.DynamoDB.DocumentClient()

helpers.getHamsterData()
.then(data => populateTable('hamsters', data))
.then(() => helpers.getRaceData())
.then(data => populateTable('races', data))
.then(data => console.log(data))

function populateTable (tableName, data) {
  // TODO: Create params const object
  const params = {
    RequestItems: {
      [tableName]: data.map(item => {
        return {
          PutRequest: {
            Item: item
          }
        }
      })
    }
  }

  //console.log(params)

  return new Promise((resolve, reject) => {
    // TODO: Call batch write function
    client.batchWrite(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
