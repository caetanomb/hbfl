// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')
const proxy = require('proxy-agent');
const dotenv = require('dotenv'); //it reads system variables .env file

dotenv.config();
const proxyInfo = process.env.PROXY_INFO;
console.log(proxyInfo);

//AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.loadFromPath('./config.json');

// Declare local variables
const s3 = new AWS.S3()
const bucketName = 'hamster-bucket-pluralsight-caetano'

helpers.getPublicFiles()
.then(files => uploadS3Objects(bucketName, files))
.then(data => console.log(data))

function uploadS3Objects (bucketName, files) {
  // TODO: Define putObject params object
  const params = {
    Bucket: bucketName,
    ACL: 'public-read'
  }

  const filePromises = files.map((file) => {
    const newParams = Object.assign({}, params, {
      // TODO: Add individual file params
      Body: file.contents,
      Key: file.name,
      ContentType: helpers.getContentType(file.name)
    })

    return new Promise((resolve, reject) => {
      // TODO: Put objects in S3
      s3.putObject(newParams, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  })

  return Promise.all(filePromises)
}
