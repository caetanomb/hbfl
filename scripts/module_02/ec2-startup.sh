#!/bin/bash
sudo yum update
curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install -y nodejs
sudo yum install -y git
git clone https://github.com/caetanomb/hbfl.git
cd hbfl
npm i
npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKc3VkbyB5dW0gdXBkYXRlCmN1cmwgLS1zaWxlbnQgLS1sb2NhdGlvbiBodHRwczovL3JwbS5ub2Rlc291cmNlLmNvbS9zZXR1cF8xMi54IHwgc3VkbyBiYXNoIC0Kc3VkbyB5dW0gaW5zdGFsbCAteSBub2RlanMKc3VkbyB5dW0gaW5zdGFsbCAteSBnaXQKZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9jYWV0YW5vbWIvaGJmbC5naXQKY2QgaGJmbApucG0gaQpucG0gcnVuIHN0YXJ0
