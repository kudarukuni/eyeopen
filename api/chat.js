const express = require('express')
const app = express()
app.use(express.json())
const accountSid = 'AC1c64d1b52ecfb2de192829095f8cd9d6';
const authToken = 'd0dd02665807bfd507c9eab3dae8b6b7';
const client = require('twilio')(accountSid, authToken);

app.post('/receive', (req, res, next) => {

    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: '*Hi, Welcome to ZETDC*',
         to: 'whatsapp:+263774055366'
       })
      .then(message => console.log(message.sid));
      
  })






module.exports = {
    path: '/chat',
    handler: app
  }