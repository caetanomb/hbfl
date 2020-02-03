// Imports
// TODO: Import the aws-sdk
const helpers = require('./helpers')
const dotenv = require('dotenv');
dotenv.config();

const proxyInfo = process.env.PROXY_INFO;

console.log(proxyInfo);

//process.exit();

//Set region
AWS.config.update({region: 'eu-central-1'})
AWS.config.loadFromPath('./config.json');
AWS.config.update({
  httpOptions: { 
    agent: proxy(proxyInfo)
  }
});

// Declare local variables
// TODO: Create an ec2 object
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

// Do all the things together
createSecurityGroup(sgName)
.then(() => {
  return createKeyPair(keyName)
})
.then(helpers.persistKeyPair)
.then(() => {
  return createInstance(sgName, keyName)
})
.then((data) => {
  console.log('Created instance with:', data)
})
.catch((err) => {
  console.error('Failed to create instance with:', err)
})

// Create functions
function createSecurityGroup (sgName) {
  // TODO: Implement sg creation & setting SSH rule
  const params = {
    Description: sgName,
    GroupName: sgName
  }

  return new Promise((resolve, reject) => {
    ec2.createSecurityGroup(params, (err, data) => {
      if (err) {
        if (err.code.indexOf('InvalidGroup.Duplicate') < 0) 
          reject(err)
      }
      //else {
        const params = {
          GroupId: data.GroupId,
          IpPermissions: [
            {
              IpProtocol: 'tcp',
              FromPort: 22,
              ToPort: 22,
              IpRanges: [
                {
                  CidrIp: '0.0.0.0/0'
                }
              ]
            },
            {
              IpProtocol: 'tcp',
              FromPort: 3000,
              ToPort: 3000,
              IpRanges: [
                {
                  CidrIp: '0.0.0.0/0'
                }
              ]
            }
          ]
        }

        ec2.authorizeSecurityGroupIngress(params, (err) => {
          if (err) reject(err)
          else resolve()
        })
     // }
    })
  })
}

function createKeyPair (keyName) {
  // TODO: Create keypair
}

function createInstance (sgName, keyName) {
  // TODO: create ec2 instance
}
