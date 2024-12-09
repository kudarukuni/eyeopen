/*const soap = require('soap');
const express = require('express');
var bodyParser = require('body-parser')
const fs = require('fs');


var myService = {
  MyService: {
      MyPort: {
          MyFunction: function(args) {
              return {
                  name: args.name
              };
          },

          // This is how to define an asynchronous function.
          MyAsyncFunction: function(args, callback) {
              // do some work
              callback({
                  name: args.name
              });
          },

          // This is how to receive incoming headers
          HeadersAwareFunction: function(args, cb, headers) {
              return {
                  name: headers.Token
              };
          },

          // You can also inspect the original `req`
          reallyDetailedFunction: function(args, cb, headers, req) {
              console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
              return {
                  name: headers.Token
              };
          }
      }
  }
 };

 var xml = fs.readFileSync('C:/wamp64/www/iopen/api/service.wsdl', 'utf8');

 //http server example
 /*var server = http.createServer(function(request,response) {
  response.end('404: Not Found: ' + request.url);
 });

 server.listen(3000);
 soap.listen(server, '/wsdl', myService, xml);



 //express server example
 var app = express();
 //body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(3000, function(){
     //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/wsdl', myService, xml);

    
});*/
const express = require('express')
const router = express.Router()
const app = express()

const soap = require('soap')
let request = require('request');
let request_with_defaults = request.defaults({'proxy': "http://192.168.240.50:8080", 'timeout': 5000, 'connection': 'keep-alive'});
let soap_client_options = {'request': request_with_defaults};

router.use((req,res,next)=>{
    Object.setPrototypeOf(req,app.request)
    Object.setPrototypeOf(res,app.response)
    req.res = res
    res.req = req
    next();
});

router.post('/kimlik-sorgu-api',async(req, res) => {
    console.log('Stored Data!', req.body)
    //res.status(200).json({ message : "success!" })
    const url = 'https://tckimlik.nvi.gov.tr/service/kpspublic.asmx?WSDL';
    const args = {
      "Ad": "tt",
      "Soyad": "ff",
      "TCKimlikNo": "mm n",
      "DogumYili": "hh"
  };
    soap.createClient(url,soap_client_options, function(err, client) {
        client.TCKimlikNoDogrula(JSON.parse(args), function(err, result) {
           // console.log(result);
            res.status(200).json({ result })
        });
    });
});

module.exports ={
    path: '/wsdl',
    handler: router
}

