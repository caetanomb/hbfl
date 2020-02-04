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

// TODO: Configure region

// Declare local variables
// TODO: Create an ec2 object
const ec2 = new AWS.EC2()

function listInstances () {
  // TODO: List instances using ec2.describeInstances()
  return new Promise((resolve, reject) => {
    ec2.describeInstances({}, (err, data) => {
      if (err) reject(err)
      else {
        var reducedResult = data.Reservations.reduce((i, r) => {
                      return i.concat(r.Instances)
                    }, [])
        resolve(reducedResult)
      }
    })
  })
}

function terminateInstance (instanceId) {
  // TODO: Terminate an instance with a given instanceId
  const params = {
    InstanceIds: [
      instanceId
    ]
  }

  return new Promise((resolve, reject) => {
    ec2.terminateInstances(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

listInstances()
.then(data => console.log(data))
// terminateInstance('i-0eac96f8258a4689d')
//  .then(data => console.log(data));
