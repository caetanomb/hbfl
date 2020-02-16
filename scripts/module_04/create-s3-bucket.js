// Imports
const AWS = require('aws-sdk')
const proxy = require('proxy-agent');
  const dotenv = require('dotenv'); //it reads system variables .env file
  dotenv.config();

  const proxyInfo = process.env.PROXY_INFO;

  console.log(proxyInfo);

//AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.loadFromPath('./config.json');

// Declare local variables
// TODO: Create new s3 object
const s3 = new AWS.S3()

createBucket('hamster-bucket-pluralsight-caetano')
.then((data) => console.log(data))

function createBucket (bucketName) {
  // TODO: Define params object
  const params = {
    Bucket: bucketName,
    ACL: 'public-read'
  }

  return new Promise((resolve, reject) => {
    // TODO: Create s3 bucket
    s3.createBucket(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
