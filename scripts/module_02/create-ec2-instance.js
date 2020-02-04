// Imports
// TODO: Import the aws-sdk
const AWS = require('aws-sdk');
const proxy = require('proxy-agent');
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
const ec2 = new AWS.EC2()
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
      if (err) reject(err)        
      else {
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
      }
    })
  })
}

function createKeyPair (keyName) {
  // TODO: Create keypair
  const params = {
    KeyName: keyName
  }

  return new Promise((resolve, reject) => {
    ec2.createKeyPair(params, (err, data) => {
      if (err) reject(err)        
      else resolve(data)
    })
  });

}

function createInstance (sgName, keyName) {
  // TODO: create ec2 instance
  const params = {
    ImageId: 'ami-07cda0db070313c52', //AMI id
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    SecurityGroups: [
      sgName
    ],
    UserData: 'IyEvYmluL2Jhc2gKc3VkbyB5dW0gdXBkYXRlCmN1cmwgLS1zaWxlbnQgLS1sb2NhdGlvbiBodHRwczovL3JwbS5ub2Rlc291cmNlLmNvbS9zZXR1cF8xMi54IHwgc3VkbyBiYXNoIC0Kc3VkbyB5dW0gaW5zdGFsbCAteSBub2RlanMKc3VkbyB5dW0gaW5zdGFsbCAteSBnaXQKZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9jYWV0YW5vbWIvaGJmbC5naXQKY2QgaGJmbApucG0gaQpucG0gcnVuIHN0YXJ0'
  }

  return new Promise((resolve, reject) => {
    ec2.runInstances(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
