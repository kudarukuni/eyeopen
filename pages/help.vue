<template>
  <div id="pageDashboard" style="min-width:900px;overflow:auto">
    <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <v-card style="min-width:900px;overflow:auto;border-radius:30px">
    <v-card-text>
      <div>
        <div class="layout column align-center">
          <center><h1 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color = '#3f51b5'>
            <b>ZETDC Self Service Portal Help</b></font>
          </h1></center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <v-container fluid grid-list-xl>
          <v-row>
            <div class="layout column align-center primary--text">
              <img src="/save-time.png" alt="time" width="110" height="110" />
              <h3 class="align-center">Save Time</h3>
            </div>
            <div class="layout column align-center primary--text" style="margin-left:50px">
              <img src="/easy-access.png" alt="easy" width="140" height="140" />
              <h3 class="align-center">Easy Access</h3>
            </div>
          </v-row>
          <div
            style="background-color:grey;height:35px;padding:5px;margin-top:40px;border-radius:10px"
          >
            <h1>1. Registering for online electricity account is as easy as 1-2-3!</h1>
          </div>

          <p
            style="margin-top:20px;font-family: 'Gill Sans', Arial, Helvetica, sans-serif;font-size:16px"
          >
            To register an electricity account complete the form available
            <nuxt-link to="/register">here.</nuxt-link>You will be required to provide information related to your electricity account e.g Account Number, Meter Number, Bill Numbers e.t.c
          </p>
          <div
            style="background-color:grey;height:35px;padding:5px;margin-top:40px;border-radius:10px"
          >
            <h1>2. Logging in to Self Service Portal</h1>
          </div>
          <p
            style="margin-top:20px;font-family: 'Gill Sans', Arial, Helvetica, sans-serif;font-size:16px"
          >
            After registering for an account <nuxt-link to="/register">here,</nuxt-link> you will now be able to login to your account  <nuxt-link to="/">here.</nuxt-link> using username and the password you used to create an account.
          </p>

           <div
            style="background-color:grey;height:35px;padding:5px;margin-top:40px;border-radius:10px"
          >
            <h1>3. Viewing your last 3 purchased tokens</h1>
          </div>
          <p
            style="margin-top:20px;font-family: 'Gill Sans', Arial, Helvetica, sans-serif;font-size:16px"
          >
            You can view the last 3 transactions/tokens for your prepaid electricity account by providing your Meter Number  <nuxt-link to="/viewtoken">here.</nuxt-link> <br><b>Note: Login to retrieve all your tokens.</b>
          </p>
          <div
            style="background-color:grey;height:35px;padding:5px;margin-top:40px;border-radius:10px"
          >
            <h1>4. Calculate how much you will get before buying Electricity Tokens</h1>
          </div>
          <p
            style="margin-top:20px;font-family: 'Gill Sans', Arial, Helvetica, sans-serif;font-size:16px"
          >
            You can now calculate how much units you will get by entering amount or enter units you want to purchase and get the amount you will be required to pay <nuxt-link to="/unitscalculator">here.</nuxt-link> <br> <b>Note: This only applies to prepaid customers </b>
          </p>
           <div
            style="background-color:grey;height:35px;padding:5px;margin-top:40px;border-radius:10px"
          >
            <h1>5. Tracking Electricity Connection Application</h1>
          </div>
          <p
            style="margin-top:20px;font-family: 'Gill Sans', Arial, Helvetica, sans-serif;font-size:16px"
          >
            You can track the progress of your electricity connection application online by providing your P-Reference Number  <nuxt-link to="/application/tracker">here.</nuxt-link> 
          </p>
        </v-container>
      </div>
      <v-btn style="margin-top:20px" outlined big color="indigo" :href="'/'">back home</v-btn>
    </v-card-text>
  </v-card>
  </client-only>
  </div>
</template>

<script>

export default {
  layout: "regauth",
  middleware: "notAuthenticated",
  components: {
  },
  data: () => ({
  
  }),
  created() {},
  methods: {
   
  }
};
</script>

<style scoped>
.container {
  margin-top: 0 !important;
}

.activestate {
  color: rgb(12, 161, 45);
  cursor: pointer;
}

@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.nextstage {
  color: rgb(17, 17, 233);
  -webkit-animation: flickerAnimation 0.5s infinite;
  -moz-animation: flickerAnimation 0.5s infinite;
  -o-animation: flickerAnimation 0.5s infinite;
  animation: flickerAnimation 0.5s infinite;
}
p {
  font-size: 13px;
}
</style>
