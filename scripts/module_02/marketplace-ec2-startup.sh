#!/bin/bash
sudo apt-get update
sudo apt-get -y install git
git clone https://github.com/caetanomb/hbfl.git /home/bitnami/hbfl
chown -R bitnami: /home/bitnami/hbfl
cd /home/bitnami/hbfl
npm install pm2 -g
sudo npm i
sudo pm2 start index.js

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9jYWV0YW5vbWIvaGJmbC5naXQgL2hvbWUvYml0bmFtaS9oYmZsCmNob3duIC1SIGJpdG5hbWk6IC9ob21lL2JpdG5hbWkvaGJmbApjZCAvaG9tZS9iaXRuYW1pL2hiZmwKbnBtIGluc3RhbGwgcG0yIC1nCnN1ZG8gbnBtIGkKc3VkbyBwbTIgc3RhcnQgaW5kZXguanM=
