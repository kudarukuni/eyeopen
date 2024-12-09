const express = require('express')
const app = express()
app.use(express.json())
const baseUrlService = 'http://172.16.29.12:5050/selfservice'
//const baseUrlService = 'http://localhost:8000'

app.post('/getmein', async (req, res, next) => {
    const axios = require('axios')
    const Base64 = require('js-base64').Base64;
    var pass = Base64.decode(req.query.password.split("").reverse().join(""))
    var pass = Base64.decode(pass)

    await axios.request({
        url: "/oauth/token",
        method: "post",
        baseURL: baseUrlService,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: 'my-client',
          password: 'secret'
        },
        params: {
          grant_type: req.query.grant_type,
          username: req.query.username,
          password: pass
        }
  
      }).then(response => {
        res.json(response.data)
      })
      .catch(e => {
        //res.send(Promise.reject(e))
        // console.log(e.response.data.error_description);
        if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
          res.status(400).send(e.response.data);
        } else {
  
          res.status(503).send("Server Down");
        }
      });
    //res.json(movie.data)
  })

  app.post('/user', async (req, res, next) => {
    const axios = require('axios')
    await axios.request({
      url: "/userr/",
      method: "post",
      baseURL: baseUrlService,
      headers: {
        'Authorization': req.header('Authorization')
      }
    }).then(response => {
      res.json(response.data)
    }).catch(e => {
      if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
        res.status(400).send('Not Authorised');
      } else {
  
        res.status(503).send("Server Down");
      }
    });
  })
  
  app.post('/viewtoken/:mtr', async (req, res, next) => {


    const axios = require('axios')
    const Base64 = require('js-base64').Base64;
    var meter = Base64.decode(req.params.mtr.split("").reverse().join(""))
    var meter = Base64.decode(meter)
  
  
    await axios.request({
        url: "/viewtokens/" + meter,
        method: "post",
        baseURL: baseUrlService,
  
  
      }).then(response => {
        res.json(response.data)
      })
      .catch(e => {
        if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
          res.status(400).send('Not Authorised');
        } else {
  
          res.status(503).send("Server Down");
        }
      });
  })
  
  app.post('/balance/:nisrad', async (req, res, next) => {


    const axios = require('axios')
    if (req.params.nisrad.length <= 9) {
  
      const balance = await axios.request({
        url: "/account/getbal/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          'Authorization': req.header('Authorization')
        },
  
  
      })
      res.send("Balance $" + balance.data.cust_BALANCE.toFixed(2))
    } else {
      const balance = await axios.request({
        url: "/prepaiddebt/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          'Authorization': req.header('Authorization')
        },
  
  
      })
      res.send("Debt Balance $" + balance.data.cust_BALANCE.toFixed(2))
    }
  })
  app.post('/client/:nisrad', async (req, res, next) => {


    const axios = require('axios')
  
    //console.log(this.$store.auth)
    if (req.params.nisrad.length <= 9) {
      await axios.request({
          url: "/clients/" + req.params.nisrad,
          method: "post",
          baseURL: baseUrlService,
          headers: {
            'Authorization': req.header('Authorization')
          },
  
  
        }).then(response => {
          res.json(response.data)
        })
        .catch(e => {
          if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
            res.status(400).send('Not Authorised');
          } else {
  
            res.status(503).send("Server Down");
          }
        });
    } else {
      await axios.request({
          url: "/clientsprep/" + req.params.nisrad,
          method: "post",
          baseURL: baseUrlService,
          headers: {
            'Authorization': req.header('Authorization')
          },
  
  
        }).then(response => {
          res.json(response.data)
        })
        .catch(e => {
          if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
            res.status(400).send('Not Authorised');
          } else {
  
            res.status(503).send("Server Down");
          }
        });
    }
  
  
  })
  
  
  app.post('/financial/:nisrad', async (req, res, next) => {


    const axios = require('axios')
  
    if (req.params.nisrad.length <= 9) {
      await axios.request({
          url: "/payments/" + req.params.nisrad,
          method: "post",
          baseURL: baseUrlService,
          headers: {
            'Authorization': req.header('Authorization')
          },
  
  
        }).then(response => {
          res.json(response.data)
        })
        .catch(e => {
          if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
            res.status(400).send('Not Authorised');
          } else {
  
            res.status(503).send("Server Down");
          }
        });
    } else {
      const financial = await axios.request({
        url: "/clientsprep/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          'Authorization': req.header('Authorization')
        },
  
  
      })
  
      const financialfinal = await axios.request({
          url: "/payments/" + financial.data.nis_RAD,
          method: "post",
          baseURL: baseUrlService,
          headers: {
            'Authorization': req.header('Authorization')
          },
  
  
        }).then(response => {
          res.json(response.data)
        })
        .catch(e => {
          if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
            res.status(400).send('Not Authorised');
          } else {
  
            res.status(503).send("Server Down");
          }
        });
    }
  })
  app.post('/point/:nisrad', async (req, res, next) => {


    const axios = require('axios')
    if (req.params.nisrad.length <= 9) {
  
      await axios.request({
          url: "/servicepoint/" + req.params.nisrad,
          method: "post",
          baseURL: baseUrlService,
          headers: {
            'Authorization': req.header('Authorization')
          },
  
  
        }).then(response => {
          res.json(response.data)
        })
        .catch(e => {
          if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
            res.status(400).send('Not Authorised');
          } else {
  
            res.status(503).send("Server Down");
          }
        });
    } else {
      await axios.request({
          url: "/servicepointprep/" + req.params.nisrad,
          method: "post",
          baseURL: baseUrlService,
          headers: {
            'Authorization': req.header('Authorization')
          },
  
  
        }).then(response => {
          res.json(response.data)
        })
        .catch(e => {
          if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
            res.status(400).send('Not Authorised');
          } else {
  
            res.status(503).send("Server Down");
          }
        });
    }
  })

  app.post('/reading/:numsum', async (req, res, next) => {


    const axios = require('axios')
  
    const reading = await axios.request({
        url: "/readings/" + req.params.numsum,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          'Authorization': req.header('Authorization')
        }
      }).then(response => {
        res.json(response.data)
      })
      .catch(e => {
        if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
          res.status(400).send('Not Authorised');
        } else {
  
          res.status(503).send("Server Down");
        }
      });
  })
  app.post('/token/:numapa', async (req, res, next) => {


    const axios = require('axios')
  
    const tokens = await axios.request({
        url: "/tokens/" + req.params.numapa,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          'Authorization': req.header('Authorization')
        }
      }).then(response => {
        res.json(response.data)
      })
      .catch(e => {
        if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
          res.status(400).send('Not Authorised');
        } else {
  
          res.status(503).send("Server Down");
        }
      });
  })

  app.post('/bill/:nisrad', async (req, res, next) => {


    const axios = require('axios')
  
    const bills = await axios.request({
        url: "/bills/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          'Authorization': req.header('Authorization')
        }
      }).then(response => {
        res.send(response.data)
      })
      .catch(e => {
        if (e.response && (e.response.status == 401 || e.response.status == 400)) {
  
          res.status(400).send('Not Authorised');
        } else {
  
          res.status(503).send("Server Down");
        }
      });
  })
module.exports = {
    path: '/mobile',
    handler: app
  }
