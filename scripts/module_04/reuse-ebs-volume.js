// Imports
const AWS = require('aws-sdk')
const proxy = require('proxy-agent');
  const dotenv = require('dotenv'); //it reads system variables .env file
  dotenv.config();

  const proxyInfo = process.env.PROXY_INFO;

  console.log(proxyInfo);

//AWS.config.update({ region: '/* TODO: Add your region */' })
AWS.config.loadFromPath('./config.json');
// AWS.config.update({
//   httpOptions: { 
//     agent: proxy(proxyInfo)
//   }
// });

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = 'vol-001b615ca4b965540'
const instanceId = 'i-00e1a1c6b1c973bcd' //Instance Id from the result of the execution of create-ec2-instance file

detachVolume(volumeId)
.then(() => attachVolume(instanceId, volumeId))

function detachVolume (volumeId) {
  // TODO: Configure detachVolume params
  const params = {
    VolumeId: volumeId
  }

  return new Promise((resolve, reject) => {
    // TODO: Detach the volume
    ec2.detachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function attachVolume (instanceId, volumeId) {
  // TODO: Configure attachVolume params
  const params = {
    InstanceId: instanceId,
    VolumeId: volumeId,
    Device: '/dev/sdf'
  }

  return new Promise((resolve, reject) => {
    // TODO: Attach the volume
    ec2.attachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
