#!/usr/bin/bash

cd 
cd Dev/ProjectAutomation
node server/routes/index.js $1
cd
cd Dev
mkdir $1
cd $1
git init
npm init -y
npx install-peerdeps --dev eslint-config-wesbos
touch .gitignore
touch READEME.md
touch .eslintrc
git add .
git commit -m "Initial Commit"
git remote add origin https://github.com/[yourusernamehere]/$1.git
git push -u origin master
code .