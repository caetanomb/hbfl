// Imports
const AWS = require('aws-sdk')
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
const autoScaling = new AWS.AutoScaling()
const asgName = 'hamsterASG'
const lcName = 'hamsterLC'
const policyName = 'hamsterPolicy'
const tgArn = 'arn:aws:elasticloadbalancing:eu-central-1:531776858924:targetgroup/hamsterTG/ff5a55ad4ad9c7d5'

createAutoScalingGroup(asgName, lcName)
.then(() => createASGPolicy(asgName, policyName))
.then((data) => console.log(data))

function createAutoScalingGroup (asgName, lcName) {
  // TODO: Create an auto scaling group
  const params = {
    AutoScalingGroupName: asgName,
    AvailabilityZones: [
      'eu-central-1a',
      'eu-central-1b'
    ],
    TargetGroupARNs: [
      tgArn
    ],
    LaunchConfigurationName: lcName,
    MaxSize: 2,
    MinSize: 1    
  }

  return new Promise((resolve, reject) => {
    autoScaling.createAutoScalingGroup(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function createASGPolicy (asgName, policyName) {
  // TODO: Create an auto scaling group policy
  const params = {
    AdjustmentType: 'ChangeInCapacity',
    AutoScalingGroupName: asgName,
    PolicyName: policyName,
    PolicyType: 'TargetTrackingScaling',
    TargetTrackingConfiguration: {
      TargetValue: 5,
      PredefinedMetricSpecification: {
        PredefinedMetricType: 'ASGAverageCPUUtilization'
      }
    }
  }

  return new Promise((resolve, reject) => {
    autoScaling.putScalingPolicy(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
