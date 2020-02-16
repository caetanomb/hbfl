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

const client = new AWS.DynamoDB.DocumentClient()

function getAll (tableName) {
  // TODO: Declare params for scan
  const params = {
    TableName: tableName
  }

  return new Promise((resolve, reject) => {
    // TODO: Scan table and return
    client.scan(params, (err, data) => {
      if (err) reject(err)
      else resolve(data.Items)
    })
  })
}

function get (tableName, id) {
  // TODO: Declare params for query
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'id = :hkey',
    ExpressionAttributeValues: {
      'hkey': +id
    }
  }

  return new Promise((resolve, reject) => {
    // TODO: Query table and return
    client.query(params, (err, data) => {
      if (err) reject(err)
      else resolve(data.Items[0])
    })
  })
}

function put (tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  }
  return new Promise((resolve, reject) => {
    client.put(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = {
  get,
  getAll,
  put
}
