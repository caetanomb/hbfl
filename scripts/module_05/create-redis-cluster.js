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

// TODO: Create an elasticache object
const ec = new AWS.ElastiCache()

helpers.createSecurityGroup('hamster_redis_sg', 6379)
.then(sgId => createRedisCluster('hamster', sgId))
.then(data => console.log(data))

function createRedisCluster (clusterName, sgId) {
  // TODO: Create params object
  const params = {
    CacheClusterId: clusterName,
    CacheNodeType: 'cache.t2.micro',
    Engine: 'Redis',
    NumCacheNodes: 1,
    SecurityGroupIds: [
      sgId
    ]
  }

  return new Promise((resolve, reject) => {
    // TODO: Create cache cluster
    ec.createCacheCluster(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
