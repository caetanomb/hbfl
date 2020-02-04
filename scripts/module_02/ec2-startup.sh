#!/bin/bash
sudo yum update
curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install -y nodejs
sudo yum install -y git
git clone https://github.com/caetanomb/hbfl.git
cd hbfl
npm install pm2 -g
npm i
sudo pm2 start index.js

# The above commands base64 encoded for entering into UserData
# 
