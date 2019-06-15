require('dotenv').config()

const request = require('superagent')
const express = require('express')
const open = require('open')
const path = require('path')

const app = express()
const server = app.listen(process.env.PORT || 3000);

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const repoName = process.argv[2]

let reqPath = path.join(__dirname, '../views')

app.set('views', reqPath)
app.set('view engine', 'pug')

open(`http://localhost:${process.env.PORT || 3000}`)

app.get('/', (req, res) => res.render('index', {
  client_id: CLIENT_ID
}))
app.get('/callback', (req, res) => {
  const session_code = req.query.code
  
  request
    .post('https://github.com/login/oauth/access_token')
    .send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: session_code,
    }) // sends a JSON post body
    .set('ACCEPT', 'application/json')
    .then((result) => {
      const access_token = result.body['access_token']
      const scopes = result.body['scope']
      const has_repo_scope = scopes === 'repo'

      if (has_repo_scope) {
        request
          .post(`https://api.github.com/user/repos?access_token=${access_token}`)
          .send({
            name: repoName,
          })
          .set('ACCEPT', 'application/json')
          .then((err, result) => {
            res.send(`Created ${repoName} on github, you can close this window.`)
            setTimeout(function () {
              process.exit()
            }, 1000)
          })
          .catch((err) => console.log(err))
      }
    })
})