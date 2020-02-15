// Imports
const AWS = require('aws-sdk')
const proxy = require('proxy-agent');
  const dotenv = require('dotenv'); //it reads system variables .env file
  dotenv.config();

  const proxyInfo = process.env.PROXY_INFO;

  console.log(proxyInfo);

//AWS.config.update({ region: '/* TODO: Add your regions */' })
AWS.config.loadFromPath('./config.json');
// AWS.config.update({
//   httpOptions: { 
//     agent: proxy(proxyInfo)
//   }
// });

// Declare local variables
const ec2 = new AWS.EC2()
const sgName = 'hamster_sg'
const keyName = 'hamster_key'
const instanceId = 'i-06bbe3113a8487b47' //Running instance created on Module 2

stopInstance(instanceId)
.then(() => createInstance(sgName, keyName))
.then((data) => console.log('Created instance with:', data))

function createInstance (sgName, keyName) {
  const params = {
    ImageId: 'ami-0df0e7600ad0913a9',
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    Placement: {
      AvailabilityZone: 'eu-central-1b'
    },
    SecurityGroups: [
      sgName
    ]
  }

  return new Promise((resolve, reject) => {
    ec2.runInstances(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function stopInstance (instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  }

  return new Promise((resolve, reject) => {
    ec2.stopInstances(params, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
