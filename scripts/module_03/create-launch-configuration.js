const AWS = require('aws-sdk')
const helpers = require('./helpers')
const proxy = require('proxy-agent');
const dotenv = require('dotenv'); //it reads system variables .env file
dotenv.config();
const proxyInfo = process.env.PROXY_INFO;
console.log(proxyInfo);

//AWS.config.update({ region: '/* TODO: add your region */' })
AWS.config.loadFromPath('./config.json');
AWS.config.update({
  httpOptions: {
    agent: proxy(proxyInfo)
  }
})

// Declare local variables
// TODO: Create an autoscaling object
const autoscaling = new AWS.AutoScaling()

const lcName = 'hamsterLC'
const roleName = 'hamsterLCRole'
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

helpers.createIamRole(roleName)
.then(profileArn => createLaunchConfiguration(lcName, profileArn))
.then(data => console.log(data))

function createLaunchConfiguration (lcName, profileArn) {
  // TODO: Create a launch configuration
  params = {
    IamInstanceProfile: profileArn,
    ImageId: 'ami-0ac4524d89f61f99c',
    InstanceType: 't2.micro',
    LaunchConfigurationName: lcName,
    KeyName: keyName,
    SecurityGroups: [
      sgName
    ],
    UserData: 'IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9jYWV0YW5vbWIvaGJmbC5naXQgL2hvbWUvYml0bmFtaS9oYmZsCmNob3duIC1SIGJpdG5hbWk6IC9ob21lL2JpdG5hbWkvaGJmbApjZCAvaG9tZS9iaXRuYW1pL2hiZmwKc3VkbyBucG0gaW5zdGFsbCBwbTIgLWcKc3VkbyBucG0gaQpzdWRvIHBtMiBzdGFydCBpbmRleC5qcw=='
  }

  return new Promise((resolve, reject) => {
    autoscaling.createLaunchConfiguration(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
