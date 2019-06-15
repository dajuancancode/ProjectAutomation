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
touch .gitignore
touch READEME.md
git add .
git commit -m "Initial Commit"
git remote add origin https://github.com/dajuancancode/$1.git
git push -u origin master
code .