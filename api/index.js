const express = require("express");
//const formData = require("express-form-data");
const bodyParser = require("body-parser");
const multer = require("multer");
const FormData = require("form-data");
const formidable = require("express-formidable");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
//app.use(formidable());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//const baseUrlService = "http://172.16.11.161:8000";
const baseUrlService = "http://172.16.13.12:5050/selfservice_test";
//const baseUrlService = 'http://localhost:8000'
//const store = require('../store/index')
const os = require("os");

/* username: 'ZESAONMEFT',
          password: 'P0w3r@Z1m['
          42467   1357   771999313 */
// const options = {
//   uploadDir: os.tmpdir(),
//   autoClean: true
// };

// // parse data with connect-multiparty.
// app.use(formData.parse(options));
// // delete from the request all empty files (size == 0)
// app.use(formData.format());
// // change the file objects to fs.ReadStream
// app.use(formData.stream());
// // union the body and the files
// app.use(formData.union());

app.post("/", (req, res, next) => {
  res.json("API roott");
});
app.post("/user", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/userr/",
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post('/viewkctoken/:mtr', async (req, res, next) => {

  const axios = require('axios')
  const Base64 = require('js-base64').Base64;
  var meter = Base64.decode(req.params.mtr.split("").reverse().join(""))
  var meter = Base64.decode(meter)

  await axios.request({
      url: "/viewkctokennew/" + meter,
      method: "post",
      baseURL: baseUrlService,
      //baseURL: baseUrlService,
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

app.post('/savekctrequests', async (req, res, next) => {

  const axios = require('axios')
  const Base64 = require('js-base64').Base64;

  await axios.request({
      url: "/savekctrequests",
      method: "post",
      baseURL: baseUrlService,
      data: req.body,
    }).then(response => {
      // res.json(response.data)
      console.log(response.data)
    })
    .catch(e => {
      if (e.response && (e.response.status == 401 || e.response.status == 400)) {

        res.status(400).send('Not Authorised');
      } else {

        res.status(503).send("Server Down");
      }
    });
})
app.post("/signup", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/user",
      method: "post",
      baseURL: baseUrlService,
      data: req.body,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/suburbs/:town", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/job/quotation/suburbs/" + req.params.town,
      method: "post",
      baseURL: baseUrlService,
      data: req.body,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/streets/:surbub", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/job/quotation/suburbs/" + req.params.surbub,
      method: "post",
      baseURL: baseUrlService,
      data: req.body,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/towns", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/job/quotation/towns",
      method: "post",
      baseURL: baseUrlService,
      data: req.body,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/addapp", async (req, res, next) => {
  const axios = require("axios");
  await axios
    .request({
      url: "/addapplication",
      method: "post",
      baseURL: baseUrlService,
      data: req.body,
      // headers: {
      //   ...formHeaders,
      // }
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
/********************* MR MUKWEMBI ADDED THESE **************************/
app.post("/sheddingpeaks", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/peaks/all",
      method: "post",
      baseURL: "http://172.16.13.12:5050/loadshedding",
      // data: req.body,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      console.log(e);
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/currentstage", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/stages/1",
      method: "post",
      baseURL: "http://172.16.13.12:5050/loadshedding",
      // data: req.body,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      console.log(e);
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/sheddingsub/:town", async (req, res, next) => {
  const axios = require("axios");
  console.log("im here");

  await axios
    .request({
      url: "/area/town/" + req.params.town,
      method: "get",
      baseURL: "http://zetdcapi.pythonanywhere.com",
      // data: req.body,
    })
    .then((response) => {
      res.json(response.data.data);
      console.log(response.data.data);
    })
    .catch((e) => {
      console.log(e);
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/shedschedule/:area_code", async (req, res, next) => {
  const axios = require("axios");
  console.log("Weekly schedule is here");

  await axios
    .request({
      url: "/schedule/area/" + req.params.area_code,
      method: "get",
      baseURL: "http://zetdcapi.pythonanywhere.com/",
      // data: req.body,
    })
    .then((response) => {
      res.json(response.data.data);
      console.log(response.data.data);
    })
    .catch((e) => {
      console.log(e);
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/todayshedschedule/:area_code", async (req, res, next) => {
  const axios = require("axios");
  console.log("Today's schedule is here");

  await axios
    .request({
      url: "/schedule/area/today/" + req.params.area_code,
      method: "get",
      baseURL: "http://zetdcapi.pythonanywhere.com",
      // data: req.body,
    })
    .then((response) => {
      res.json(response.data.data);
      console.log(response.data.data);
    })
    .catch((e) => {
      console.log(e);
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/townall", async (req, res, next) => {
  const axios = require("axios");
  // console.log("im here");

  await axios
    .request({
      url: "/town/all",
      method: "post",
      baseURL: "http://zetdcapi.pythonanywhere.com/",
      // data: req.body,
    })
    .then((response) => {
      res.json(response.data.data);
    })
    .catch((e) => {
      console.log(e);
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
/********************* END OF MR MUKWEMBI ADDED THESE **************************/
app.post("/tracker/:pjob", async (req, res, next) => {
  //var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  //console.log(ip)
  const axios = require("axios");

  await axios
    .request({
      url: "/job/trackjob/" + req.params.pjob,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});

/********************* MAY NOT WORK BECAUSE OF THE BASE HOST URL **************************/
app.post("/tracking/:pjob", async (req, res, next) => {
  //var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  //console.log(ip)
  const axios = require("axios");

  await axios
    .request({
      url: "/api/newnetmet3/refnum/" + req.params.pjob,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
/********************* MAY NOT WORK BECAUSE OF THE BASE HOST URL **************************/

app.post("/docstracker/:pjob", async (req, res, next) => {
  //var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  //console.log(ip)
  const axios = require("axios");

  await axios
    .request({
      url: "http://172.16.13.12:5050/selfservice_test/getdocumentid/" + req.params.pjob,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});

app.post("/quotation/:pjob", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/job/quotation/" + req.params.pjob,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/pjobbill/:pjob", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/pjobbill/" + req.params.pjob,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post(
  "/accounts/add/:verification/:verification2",
  async (req, res, next) => {
    const axios = require("axios");

    await axios
      .request({
        url:
          "/account/add/" +
          req.params.verification +
          "/" +
          req.params.verification2,
        method: "post",
        baseURL: baseUrlService,
        data: req.body,
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  }
);
app.post("/clientcontact/:nisrad", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/clientsonecontact/" + req.params.nisrad,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/contactcheck/:nisrad", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/clientscontacts/" + req.params.nisrad,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/updatecontact", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/clientscontactsadd",
      method: "put",
      baseURL: baseUrlService,
      data: req.body,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/getmein", async (req, res, next) => {
  const axios = require("axios");
  const Base64 = require("js-base64").Base64;
  var pass = Base64.decode(req.query.password.split("").reverse().join(""));
  var pass = Base64.decode(pass);
  //console.log(pass)
  //const movieID = movieOptions[Math.floor(Math.random() * movieOptions.length)]
  await axios
    .request({
      url: "/oauth/token",
      method: "post",
      baseURL: baseUrlService,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: "my-client",
        password: "secret",
      },
      params: {
        grant_type: req.query.grant_type,
        username: req.query.username,
        password: pass,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      //res.send(Promise.reject(e))
      // console.log(e.response.data.error_description);
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send(e.response.data);
      } else {
        res.status(503).send("Server Down");
      }
    });
  //res.json(movie.data)
});
app.post("/client/:nisrad", async (req, res, next) => {
  const axios = require("axios");

  //console.log(this.$store.auth)
  if (req.params.nisrad.length <= 9) {
    await axios
      .request({
        url: "/clients/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  } else {
    await axios
      .request({
        url: "/clientsprep/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  }
});
app.post("/paymentclient/:nisrad", async (req, res, next) => {
  const axios = require("axios");
  const Base64 = require("js-base64").Base64;
  var nisrad = Base64.decode(req.params.nisrad.split("").reverse().join(""));
  var nisrad = Base64.decode(nisrad);
  //console.log(this.$store.auth)
  if (nisrad.length <= 9) {
    await axios
      .request({
        url: "/paymentclientclients/" + nisrad,
        method: "post",
        baseURL: baseUrlService,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  } else {
    await axios
      .request({
        url: "/clientsprep/" + nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  }
});
app.post("/financial/:nisrad", async (req, res, next) => {
  const axios = require("axios");

  if (req.params.nisrad.length <= 9) {
    await axios
      .request({
        url: "/payments/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
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
        Authorization: req.header("Authorization"),
      },
    });

    const financialfinal = await axios
      .request({
        url: "/payments/" + financial.data.nis_RAD,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  }
});
app.post("/point/:nisrad", async (req, res, next) => {
  const axios = require("axios");
  if (req.params.nisrad.length <= 9) {
    await axios
      .request({
        url: "/servicepoint/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  } else {
    await axios
      .request({
        url: "/servicepointprep/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          Authorization: req.header("Authorization"),
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  }
});
app.post("/statement/:nisrad", async (req, res, next) => {
  const axios = require("axios");
  if (req.params.nisrad.length <= 9) {
    await axios
      .request({
        url: "/servicestatement/" + req.params.nisrad,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          Authorization: req.header("Authorization"),
        },
        params: {
          datefrom: req.query.datefrom,
          dateto: req.query.dateto,
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  } else {
    const client = await axios.request({
      url: "/clientsprep/" + req.params.nisrad,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    });
    const statement = await axios
      .request({
        url: "/servicestatement/" + client.data.nis_RAD,
        method: "post",
        baseURL: baseUrlService,
        headers: {
          Authorization: req.header("Authorization"),
        },
        params: {
          datefrom: req.query.datefrom,
          dateto: req.query.dateto,
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  }
});
app.post("/reading/:numsum", async (req, res, next) => {
  const axios = require("axios");

  const reading = await axios
    .request({
      url: "/readings/" + req.params.numsum,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/bill/:nisrad", async (req, res, next) => {
  const axios = require("axios");

  const bills = await axios
    .request({
      url: "/bills/" + req.params.nisrad,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/token/:numapa", async (req, res, next) => {
  const axios = require("axios");

  const tokens = await axios
    .request({
      url: "/tokens/" + req.params.numapa,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/bill/view/:numrec/:nisrad", async (req, res, next) => {
  const axios = require("axios");

  const billracho = await axios
    .request({
      url: "/billview/" + req.params.nisrad + "/" + req.params.numrec,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/chartbill/:nisrad/:year", async (req, res, next) => {
  const axios = require("axios");

  const chartbills = await axios
    .request({
      url: "/chartbills/" + req.params.nisrad + "/" + req.params.year,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/chartpayment/:nisrad/:year", async (req, res, next) => {
  const axios = require("axios");

  const chartpayments = await axios
    .request({
      url: "/chartpayments/" + req.params.nisrad + "/" + req.params.year,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/chartconsumption/:numsum/:year", async (req, res, next) => {
  const axios = require("axios");

  const chartconsumptions = await axios
    .request({
      url: "/chartconsumption/" + req.params.numsum + "/" + req.params.year,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/charttoken/:numapa/:year", async (req, res, next) => {
  const axios = require("axios");

  const chartconsumptions = await axios
    .request({
      url: "/charttokens/" + req.params.numapa + "/" + req.params.year,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/account", async (req, res, next) => {
  const axios = require("axios");

  const accounts = await axios
    .request({
      url: "/accounts/",
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/balance/:nisrad", async (req, res, next) => {
  const axios = require("axios");
  if (req.params.nisrad.length <= 9) {
    const balance = await axios.request({
      url: "/account/getbal/" + req.params.nisrad,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    });
    res.send("Account Balance $" + balance.data.cust_BALANCE.toFixed(2));
  } else {
    const balance = await axios.request({
      url: "/prepaiddebt/" + req.params.nisrad,
      method: "post",
      baseURL: baseUrlService,
      headers: {
        Authorization: req.header("Authorization"),
      },
    });
    res.send(
      "Outstanding Debt Balance $" + balance.data.cust_BALANCE.toFixed(2)
    );
  }
});
app.post("/payonline/:region", async (req, res, next) => {
  const axios = require("axios");
  const fs = require("fs");

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var hh = today.getHours();
  var minutes = today.getMinutes();
  var ss = today.getSeconds();
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (hh < 10) {
    hh = "0" + hh;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var thedate = "" + yyyy + mm + dd + hh + minutes + ss;
  var today = yyyy + "" + mm + "" + dd;
  fs.writeFile(
    "/var/www/selfservice.zetdc.co.zw/web/translogs/" +
      today +
      "_" +
      req.body.nisrad +
      "_" +
      Date.now() +
      ".txt",
    JSON.stringify(req.body),
    (err) => {
      // fs.writeFile('C:/wamp64/' + today + "_" + req.body.nisrad + "_" + Date.now() + '.txt', JSON.stringify(req.body), (err) => {

      // In case of a error throw err.
      if (err) throw err;
    }
  );
  var requestBody = {
    zetdc_REF: req.body.zetdcref,
    mobile: req.body.mobile,
    customername: req.body.customername,
    contactphone: req.body.contactphone,
    email: req.body.email,
    method: req.body.method,
    status: "PENDING SUBSCRIBER VALIDATION",
    mno_REF: " ",
    amount: req.body.amount,
    address: req.body.address,
    acc_TYPE: req.body.acctype,
    transaction_DATE: new Date().getTime(),
  };
  await axios
    .request({
      url: "/payparams/" + req.params.region,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      var merchant = response.data;
      if (merchant != "") {
        axios
          .request({
            url: "/payments/add",
            method: "post",
            baseURL: baseUrlService,
            data: requestBody,
          })
          .then((response) => {
            //res.json(response.data)
            if (response.data == "saved") {
              var jsonBody = {
                clientCorrelator: req.body.zetdcref,
                notifyUrl: "https://selfservice.zetdc.co.zw/api/emnoresponse",
                referenceCode: req.body.zetdcref,
                tranType: "MER",
                endUserId: req.body.mobile,
                remarks: "ZETDC",
                transactionOperationStatus: "Charged",
                paymentAmount: {
                  charginginformation: {
                    amount: req.body.amount,
                    currency: "USD",
                    description: "ZETDC Online Payment",
                  },
                  chargeMetaData: {
                    channel: "WEB",
                    purchaseCategoryCode: "Online Payment",
                    onBeHalfOf: "ZETDC",
                  },
                },
                merchantCode: merchant.merchant_code,
                merchantPin: merchant.merchant_pin,
                merchantNumber: merchant.merchant_number,
                currencyCode: "USD",
                countryCode: "ZW",
                terminalID: "TERM123456",
                location: "25 Samora Machael",
                superMerchantName: "ZETDC",
                merchantName: "ZETDC",
                source: "Web Portal",
              };

              axios
                .request({
                  url: "/ecocashGateway/payment/v1/transactions/amount",
                  method: "post",
                  baseURL: "https://payonline.econet.co.zw",
                  headers: {
                    "Content-Type": "application/json",
                  },

                  /* proxy: {
          host: '192.168.240.50',
          port: 8080
        },  */
                  auth: {
                    username: "ZETDC",
                    password: "$d4v4l0p4r",
                  },
                  data: jsonBody,
                })
                .then((response) => {
                  //console.log(response.data)
                  res.json("payment sent");
                })
                .catch((e) => {
                  if (
                    e.response &&
                    (e.response.status == 401 || e.response.status == 400)
                  ) {
                    res.status(400).send("Not Authorised");
                  } else {
                    res.status(500).send(e);
                  }
                  // console.log(e)
                });
            }
          })
          .catch((e) => {
            if (
              e.response &&
              (e.response.status == 401 || e.response.status == 400)
            ) {
              res.status(400).send("Not Authorised");
            } else {
              res.status(500).send(e);
            }
            // console.log(e)
          });
      }
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(500).send(e);
      }
      // console.log(e)
    });
  //res.send('hello')
});
app.post("/checkpayment/:zetdcref", async (req, res, next) => {
  const Base64 = require("js-base64").Base64;
  var zetdcref = Base64.decode(
    req.params.zetdcref.split("").reverse().join("")
  );
  var zetdcref = Base64.decode(zetdcref);
  const axios = require("axios");
  var status = {
    transStatus: "PENDING SUBSCRIBER VALIDATION",
    transRef: "",
    accountNumber: "",
    amount: "",
    mobile: "",
    ecocashRef: "",
    transDate: "",
    customerName: "",
    customerAddress: "",
  };
  await axios
    .request({
      url: "/payments/status/" + zetdcref,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      //console.log(response.data)

      var detail = response.data[0];
      if (detail != "") {
        var thedate = new Date(detail.transaction_DATE);
        var dd = thedate.getDate();
        var mm = thedate.getMonth() + 1;
        var hh = thedate.getHours();
        var minutes = thedate.getMinutes();
        var ss = thedate.getSeconds();
        var yyyy = thedate.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        if (hh < 10) {
          hh = "0" + hh;
        }
        if (ss < 10) {
          ss = "0" + ss;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        //  var thedate = dd + '-' + mm + '-' + yyyy + ' ' + hh + ":" + minutes + ":" + ss;
        var transdate = "" + yyyy + mm + dd + hh + minutes + ss;

        status = {
          transStatus: detail.status,
          transRef: detail.zetdc_REF,
          accountNumber: detail.zetdc_REF.substring(
            2,
            detail.zetdc_REF.length - 13
          ),
          amount: detail.amount,
          mobile: detail.mobile,
          ecocashRef: detail.mno_REF,
          transDate: detail.transaction_DATE,
          customerName: detail.customername,
          customerAddress: detail.address,
        };
        if (
          detail.status == "PENDING SUBSCRIBER VALIDATION" &&
          new Date().getTime() - 30000 > detail.transaction_DATE
        ) {
          axios
            .request({
              url:
                "/ecocashGateway/payment/v1/" +
                detail.mobile +
                "/transactions/amount/" +
                detail.zetdc_REF,
              method: "get",
              baseURL: "https://payonline.econet.co.zw",
              headers: {
                "Content-Type": "application/json",
              },

              /*   proxy: {
                host: '192.168.240.50',
                port: 8080
              }, */
              auth: {
                username: "ZETDC",
                password: "$d4v4l0p4r",
              },
            })
            .then((response) => {
              var thedate = new Date(response.data.startTime);
              console.log(response.data.transactionOperationStatus);
              var dd = thedate.getDate();
              var mm = thedate.getMonth() + 1;
              var hh = thedate.getHours();
              var minutes = thedate.getMinutes();
              var ss = thedate.getSeconds();
              var yyyy = thedate.getFullYear();
              if (dd < 10) {
                dd = "0" + dd;
              }
              if (mm < 10) {
                mm = "0" + mm;
              }
              if (hh < 10) {
                hh = "0" + hh;
              }
              if (ss < 10) {
                ss = "0" + ss;
              }
              if (minutes < 10) {
                minutes = "0" + minutes;
              }
              //var thedate = dd + '-' + mm + '-' + yyyy + ' ' + hh + ":" + minutes + ":" + ss;
              var transdate = "" + yyyy + mm + dd + hh + minutes + ss;
              status = {
                transStatus: response.data.transactionOperationStatus,
                transRef: response.data.clientCorrelator,
                accountNumber: response.data.clientCorrelator.substring(
                  2,
                  response.data.clientCorrelator.length - 13
                ),
                amount: response.data.paymentAmount.charginginformation.amount,
                mobile: response.data.endUserId,
                ecocashRef: response.data.ecocashReference,
                transDate: response.data.startTime,
                customerName: detail.customername,
                customerAddress: detail.address,
              };
              if (response.data.transactionOperationStatus == "COMPLETED") {
                var jsonBody = {
                  mti: "0200",
                  id: response.data.id,
                  mobilenumber: response.data.endUserId,
                  currencycode:
                    response.data.paymentAmount.charginginformation.currency,
                  processingcode: "500000",
                  customername: detail.customername,
                  address: detail.address,
                  customeraccountnumber:
                    response.data.clientCorrelator.substring(
                      2,
                      response.data.clientCorrelator.length - 13
                    ),
                  transactionreference: response.data.clientCorrelator,
                  transmissiondate: response.data.endTime,
                  transactionamount:
                    response.data.paymentAmount.charginginformation.amount,
                  transaction_OPERATION_STATUS:
                    response.data.transactionOperationStatus,
                  client_CORRELATOR: response.data.clientCorrelator,
                  server_REFERENCE_CODE: response.data.serverReferenceCode,
                  mno_REFERENCE: response.data.ecocashReference,
                  message: "CHARGED",
                  acc_TYPE: detail.acc_TYPE,
                  source: response.data.source,
                  merchant_CODE: response.data.merchantCode,
                };
                var requestBody = {
                  zetdc_REF: response.data.clientCorrelator,
                  mobile: response.data.endUserId,
                  customername: detail.customername,
                  contactphone: detail.contactphone,
                  email: detail.email,
                  method: detail.method,
                  status: "COMPLETED",
                  mno_REF: response.data.ecocashReference,
                  amount:
                    response.data.paymentAmount.charginginformation.amount,
                  address: detail.address,
                  acc_TYPE: detail.acc_TYPE,
                  transaction_DATE: response.data.endTime,
                };
                axios
                  .request({
                    url: "/payments/add",
                    method: "post",
                    baseURL: baseUrlService,
                    data: requestBody,
                  })
                  .then((response) => {})
                  .catch((e) => {
                    console.log(e);
                  });
                axios
                  .request({
                    url:
                      "/paymentreturned/" +
                      detail.email +
                      "/" +
                      detail.contactphone,
                    method: "post",
                    baseURL: baseUrlService,
                    data: jsonBody,
                  })
                  .then((respo) => {
                    //console.log(respo.data)
                    if (respo.data != "") {
                      /* var message = "Dear Customer\nYou have successfully paid $" + respo.data.paymentAmount.charginginformation.amount + " for account " + respo.data.clientCorrelator.substring(2, respo.data.clientCorrelator.length - 13) + " to ZETDC.\nYour receipt number is " + respo.data.clientCorrelator + " \nThank you for the payment."
                    var burl = "http://portal.bulksmsweb.com/index.php?app=ws&u=dchiputura&h=974073747401ed886a087827905066d9&op=pv&to=" + detail.contactphone + "&msg=" + message
                    axios.request({
                        url: burl,
                        method: "get",
                        /*  proxy: {
                          host: '192.168.240.50',
                          port: 8080
                        },  */
                      /* }).then(response => {
                        console.log(response.data)
                      })
                      .catch(e => {
                        console.log(e)
                      });*/
                    }
                    /*  */
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              } else if (response.data.transactionOperationStatus == "FAILED") {
                axios
                  .request({
                    url: "/payments/status/" + response.data.clientCorrelator,
                    method: "post",
                    baseURL: baseUrlService,
                  })
                  .then((responsee) => {
                    //console.log(response.data)
                    var detail = responsee.data[0];
                    var requestBody = {
                      zetdc_REF: response.data.clientCorrelator,
                      mobile: response.data.endUserId,
                      customername: detail.customername,
                      contactphone: detail.contactphone,
                      email: detail.email,
                      method: detail.method,
                      status: response.data.transactionOperationStatus,
                      mno_REF: response.data.ecocashReference,
                      amount:
                        response.data.paymentAmount.charginginformation.amount,
                      address: detail.address,
                      acc_TYPE: detail.acc_TYPE,
                      transaction_DATE: response.data.endTime,
                    };

                    axios
                      .request({
                        url: "/payments/add",
                        method: "post",
                        baseURL: baseUrlService,
                        data: requestBody,
                      })
                      .then((response) => {})
                      .catch((e) => {
                        console.log(e);
                      });
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              } else {
                axios
                  .request({
                    url: "/payments/status/" + response.data.clientCorrelator,
                    method: "post",
                    baseURL: baseUrlService,
                  })
                  .then((respo) => {
                    //console.log(response.data)
                    var detail = respo.data[0];

                    var requestBody = {
                      zetdc_REF: response.data.clientCorrelator,
                      mobile: response.data.endUserId,
                      customername: detail.customername,
                      contactphone: detail.contactphone,
                      email: detail.email,
                      method: detail.method,
                      mno_REF: response.data.ecocashReference,
                      status: "TIMED OUT",
                      amount: detail.amount,
                      acc_TYPE: detail.acc_TYPE,
                      address: detail.address,
                      transaction_DATE: response.data.endTime,
                    };
                    axios
                      .request({
                        url: "/payments/add",
                        method: "post",
                        baseURL: baseUrlService,
                        data: requestBody,
                      })
                      .then((respons) => {
                        status = {
                          transStatus: "TIMED OUT",
                          transRef: response.data.clientCorrelator,
                          accountNumber:
                            response.data.clientCorrelator.substring(
                              2,
                              response.data.clientCorrelator.length - 13
                            ),
                          amount:
                            response.data.paymentAmount.charginginformation
                              .amount,
                          mobile: response.data.endUserId,
                          ecocashRef: response.data.ecocashReference,
                          transDate: response.data.startTime,
                          customerName: detail.customername,
                          customerAddress: detail.address,
                        };
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }

              //  res.json(status)
            })
            .catch((e) => {
              console.log(e);
            });
          //res.json(status)
        } else if (response.data.transactionOperationStatus == "FAILED") {
          //  res.json(status)
        }
      }
    })
    .catch((e) => {
      console.log(e);
    });

  res.json(status);
});
app.post("/paymentstatus/:zetdcref", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/payments/status/" + req.params.zetdcref,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      //console.log(response.data)
      var detail = response.data[0];
      axios
        .request({
          url:
            "/ecocashGateway/payment/v1/" +
            detail.mobile +
            "/transactions/amount/" +
            req.params.zetdcref,
          method: "get",
          baseURL: "https://payonline.econet.co.zw",
          headers: {
            "Content-Type": "application/json",
          },

          /*   proxy: {
            host: '192.168.240.50',
            port: 8080
          },  */
          auth: {
            username: "ZETDC",
            password: "$d4v4l0p4r",
          },
        })
        .then((response) => {
          var thedate = new Date(response.data.startTime);
          var dd = thedate.getDate();
          var mm = thedate.getMonth() + 1;
          var hh = thedate.getHours();
          var minutes = thedate.getMinutes();
          var ss = thedate.getSeconds();
          var yyyy = thedate.getFullYear();
          if (dd < 10) {
            dd = "0" + dd;
          }
          if (mm < 10) {
            mm = "0" + mm;
          }
          if (hh < 10) {
            hh = "0" + hh;
          }
          if (ss < 10) {
            ss = "0" + ss;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          //var thedate = dd + '-' + mm + '-' + yyyy + ' ' + hh + ":" + minutes + ":" + ss;
          var transdate = "" + yyyy + mm + dd + hh + minutes + ss;
          var status = {
            transStatus: response.data.transactionOperationStatus,
            transRef: response.data.clientCorrelator,
            accountNumber: response.data.clientCorrelator.substring(
              2,
              response.data.clientCorrelator.length - 13
            ),
            amount: response.data.paymentAmount.charginginformation.amount,
            mobile: response.data.endUserId,
            ecocashRef: response.data.ecocashReference,
            transDate: thedate,
            customerName: detail.customername,
            customerAddress: detail.address,
          };
          if (response.data.transactionOperationStatus == "COMPLETED") {
            var jsonBody = {
              mti: "0200",
              mobilenumber: response.data.endUserId,
              currencycode: response.data.currencyCode,
              processingcode: "500000",
              customername: detail.customername,
              address: detail.address,
              customeraccountnumber: response.data.clientCorrelator.substring(
                2,
                response.data.clientCorrelator.length - 13
              ),
              transactionreference: response.data.clientCorrelator,
              transmissiondate: response.data.endTime,
              transactionamount:
                response.data.paymentAmount.charginginformation.amount,
              transaction_OPERATION_STATUS:
                response.data.transactionOperationStatus,
              client_CORRELATOR: response.data.clientCorrelator,
              server_REFERENCE_CODE: response.data.serverReferenceCode,
              mno_REFERENCE: response.data.ecocashReference,
              message: "CHARGED",
              acc_TYPE: detail.acc_TYPE,
              source: response.data.source,
            };

            axios
              .request({
                url:
                  "/paymentreturned/" +
                  detail.email +
                  "/" +
                  detail.contactphone,
                method: "post",
                baseURL: baseUrlService,
                data: jsonBody,
              })
              .then((respo) => {
                //console.log(respo.data)
                if (respo.data != "") {
                  var message =
                    "Dear Customer\nYou have successfully paid $" +
                    response.data.paymentAmount.charginginformation.amount +
                    " for account " +
                    response.data.clientCorrelator.substring(
                      2,
                      response.data.clientCorrelator.length - 13
                    ) +
                    " to ZETDC.\nYour receipt number is " +
                    response.data.clientCorrelator +
                    " \nThank you for the payment.";
                  var burl =
                    "http://portal.bulksmsweb.com/index.php?app=ws&u=dchiputura&h=974073747401ed886a087827905066d9&op=pv&to=" +
                    detail.contactphone +
                    "&msg=" +
                    message;
                  axios
                    .request({
                      url: burl,
                      method: "get",
                      /*  proxy: {
                      host: '192.168.240.50',
                      port: 8080
                    },  */
                    })
                    .then((response) => {
                      console.log(response.data);
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }
                /*  */
              })
              .catch((e) => {
                console.log(e);
              });
          }

          res.json(status);
        })
        .catch((e) => {
          res.send(e);
        });
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/changepass", async (req, res, next) => {
  const axios = require("axios");

  const Base64 = require("js-base64").Base64;
  var oldpass = Base64.decode(
    req.query.oldpassword.split("").reverse().join("")
  );
  oldpass = Base64.decode(oldpass);

  var newpass = Base64.decode(
    req.query.newpassword.split("").reverse().join("")
  );
  newpass = Base64.decode(newpass);

  await axios
    .request({
      url: "/user/changepassword",
      method: "post",
      baseURL: baseUrlService,
      params: {
        oldpassword: oldpass,
        newpassword: newpass,
      },
      headers: {
        Authorization: req.header("Authorization"),
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/forgotpassword", async (req, res, next) => {
  const axios = require("axios");

  await axios
    .request({
      url: "/users/resetpassword",
      method: "post",
      baseURL: baseUrlService,
      params: {
        username: req.query.username,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/computeamount/:mtr", async (req, res, next) => {
  const axios = require("axios");
  const Base64 = require("js-base64").Base64;
  var meter = Base64.decode(req.params.mtr.split("").reverse().join(""));
  var meter = Base64.decode(meter);
  await axios
    .request({
      url: "/computeamount/" + meter,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/viewtoken/:mtr", async (req, res, next) => {
  const axios = require("axios");
  const Base64 = require("js-base64").Base64;
  var meter = Base64.decode(req.params.mtr.split("").reverse().join(""));
  var meter = Base64.decode(meter);

  await axios
    .request({
      url: "/viewtokens/" + meter,
      method: "post",
      baseURL: baseUrlService,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/trackcomplaint/:type/:cmp", async (req, res, next) => {
  const axios = require("axios");
  const Base64 = require("js-base64").Base64;
  var cnumber = Base64.decode(req.params.cmp.split("").reverse().join(""));
  var cnumber = Base64.decode(cnumber);

  if (req.params.type == 1) {
    await axios
      .request({
        url: "/trackcomplaintnis/" + cnumber,
        method: "post",
        baseURL: baseUrlService,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  } else if (req.params.type == 2) {
    await axios
      .request({
        url: "/trackcomplaintname/" + cnumber,
        method: "post",
        baseURL: baseUrlService,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  } else if (req.params.type == 3) {
    await axios
      .request({
        url: "/trackcomplaint/" + cnumber,
        method: "post",
        baseURL: baseUrlService,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  } else if (req.params.type == 4) {
    await axios
      .request({
        url: "/trackcomplaintinc/" + cnumber,
        method: "post",
        baseURL: baseUrlService,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  } else if (req.params.type == 5) {
    await axios
      .request({
        url: "/trackcomplaintmtr/" + cnumber,
        method: "post",
        baseURL: baseUrlService,
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((e) => {
        if (
          e.response &&
          (e.response.status == 401 || e.response.status == 400)
        ) {
          res.status(400).send("Not Authorised");
        } else {
          res.status(503).send("Server Down");
        }
      });
  }
});
app.post("/resetpass", async (req, res, next) => {
  const axios = require("axios");

  const Base64 = require("js-base64").Base64;
  var pass = Base64.decode(req.query.password.split("").reverse().join(""));
  pass = Base64.decode(pass);

  await axios
    .request({
      url: "/users/changepassword",
      method: "get",
      baseURL: baseUrlService,
      params: {
        password: pass,
        id: req.query.id,
        token: req.query.token,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      if (
        e.response &&
        (e.response.status == 401 || e.response.status == 400)
      ) {
        res.status(400).send("Not Authorised");
      } else {
        res.status(503).send("Server Down");
      }
    });
});
app.post("/emnoresponse", async (req, res, next) => {
  console.log("responded");
  //console.log(req.body)
  const axios = require("axios");
  const fs = require("fs");
  fs.writeFile(
    "/var/www/selfservice.zetdc.co.zw/web/translogs/ecoresponse" +
      Date.now() +
      ".txt",
    JSON.stringify(req.body),
    (err) => {
      // In case of a error throw err.
      if (err) throw err;
    }
  );

  if (req.body.transactionOperationStatus == "COMPLETED") {
    //console.log("am here")
    await axios
      .request({
        url: "/payments/status/" + req.body.clientCorrelator,
        method: "post",
        baseURL: baseUrlService,
      })
      .then((response) => {
        //console.log(response.data)
        var detail = response.data[0];

        var requestBody = {
          zetdc_REF: req.body.clientCorrelator,
          mobile: req.body.endUserId,
          customername: detail.customername,
          contactphone: detail.contactphone,
          email: detail.email,
          method: detail.method,
          status: "COMPLETED",
          mno_REF: req.body.ecocashReference,
          amount: req.body.paymentAmount.charginginformation.amount,
          address: detail.address,
          acc_TYPE: detail.acc_TYPE,
          transaction_DATE: req.body.endTime,
        };
        axios
          .request({
            url: "/payments/add",
            method: "post",
            baseURL: baseUrlService,
            data: requestBody,
          })
          .then((response) => {})
          .catch((e) => {
            console.log(e);
          });
        var jsonBody = {
          mti: "0200",
          mobilenumber: req.body.endUserId,
          currencycode: req.body.paymentAmount.charginginformation.currency,
          processingcode: "500000",
          customername: detail.customername,
          address: detail.address,
          customeraccountnumber: req.body.clientCorrelator.substring(
            2,
            req.body.clientCorrelator.length - 13
          ),
          transactionreference: req.body.clientCorrelator,
          transmissiondate: req.body.endTime,
          transactionamount: req.body.paymentAmount.charginginformation.amount,
          transaction_OPERATION_STATUS: req.body.transactionOperationStatus,
          client_CORRELATOR: req.body.clientCorrelator,
          server_REFERENCE_CODE: req.body.serverReferenceCode,
          mno_REFERENCE: req.body.ecocashReference,
          message: "CHARGED",
          id: req.body.id,
          acc_TYPE: detail.acc_TYPE,
          source: req.body.source,
          merchant_CODE: req.body.merchantCode,
        };

        axios
          .request({
            url: "/paymentreturned/" + detail.email + "/" + detail.contactphone,
            method: "post",
            baseURL: baseUrlService,
            data: jsonBody,
          })
          .then((respo) => {
            //console.log(respo.data)
            /* if (respo.data != "") {
            var message = "Dear Customer\nYou have successfully paid $" + req.body.paymentAmount.charginginformation.amount + " for account " + req.body.clientCorrelator.substring(2, req.body.clientCorrelator.length - 13) + " to ZETDC.\nYour receipt number is " + req.body.clientCorrelator + " \nThank you for the payment."
            var burl = "http://portal.bulksmsweb.com/index.php?app=ws&u=dchiputura&h=974073747401ed886a087827905066d9&op=pv&to=" + detail.contactphone + "&msg=" + message
            axios.request({
                url: burl,
                method: "get",
                /*  proxy: {
                  host: '192.168.240.50',
                  port: 8080
                },  */
            /*  }).then(response => {
                console.log(response.data)
              })
              .catch(e => {
                console.log(e)
              });
          }
       */
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        res.send(e);
      });
  } else if (req.body.transactionOperationStatus == "FAILED") {
    axios
      .request({
        url: "/payments/status/" + req.body.clientCorrelator,
        method: "post",
        baseURL: baseUrlService,
      })
      .then((response) => {
        //console.log(response.data)
        var detail = response.data[0];
        var requestBody = {
          zetdc_REF: req.body.clientCorrelator,
          mobile: req.body.endUserId,
          customername: detail.customername,
          contactphone: detail.contactphone,
          email: detail.email,
          method: detail.method,
          mno_REF: req.body.ecocashReference,
          status: "FAILED",
          amount: detail.amount,
          acc_TYPE: detail.acc_TYPE,
          address: detail.address,
          transaction_DATE: req.body.endTime,
        };
        axios
          .request({
            url: "/payments/add",
            method: "post",
            baseURL: baseUrlService,
            data: requestBody,
          })
          .then((response) => {})
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  } else if (
    req.body.transactionOperationStatus == "PENDING SUBSCRIBER VALIDATION"
  ) {
    axios
      .request({
        url: "/payments/status/" + req.body.clientCorrelator,
        method: "post",
        baseURL: baseUrlService,
      })
      .then((response) => {
        //console.log(response.data)
        var detail = response.data[0];
        var requestBody = {
          zetdc_REF: req.body.clientCorrelator,
          mobile: req.body.endUserId,
          customername: detail.customername,
          contactphone: detail.contactphone,
          email: detail.email,
          method: detail.method,
          mno_REF: req.body.ecocashReference,
          status: "PENDING SUBSCRIBER VALIDATION",
          amount: detail.amount,
          address: detail.address,
          acc_TYPE: detail.acc_TYPE,
          transaction_DATE: detail.transaction_DATE,
        };
        axios
          .request({
            url: "/payments/add",
            method: "post",
            baseURL: baseUrlService,
            data: requestBody,
          })
          .then((response) => {})
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  res.status(200).send("Done");
});

// export the server middleware
module.exports = {
  path: "/api",
  handler: app,
};
