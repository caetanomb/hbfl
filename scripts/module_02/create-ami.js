// Imports
// TODO: Import the aws-sdk

const AWS = require('aws-sdk')
const proxy = require('proxy-agent');
const dotenv = require('dotenv'); //it reads system variables .env file
dotenv.config();

const proxyInfo = process.env.PROXY_INFO;

AWS.config.loadFromPath('./config.json');
AWS.config.update({
  httpOptions: { 
    agent: proxy(proxyInfo)
  }
});

// Declare local variables
// TODO: Create an ec2 object
const ec2 = new AWS.EC2()

createImage('i-0eac96f8258a4689d', 'hamsterImage')
.then(() => console.log('Complete'))

function createImage (seedInstanceId, imageName) {
  // TODO: Implement AMI creation
 const params = {
   InstanceId: seedInstanceId,
   Name: imageName
 }

 return new Promise((resolve, reject) => {
   ec2.createImage(params, (err, data) => {
     if (err) reject(err)
     else resolve(data)
   })
 })

}
