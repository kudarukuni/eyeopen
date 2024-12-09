<template>
  <v-app>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
   <!-- <a href="http://172.16.29.12:5050/Getsi" class="float" target="_blank">
      <i class="fa fa-reddit-alien my-float" aria-hidden="true"></i>
    </a>-->
    <div class="whatsapp-chat">
      <a href="https://wa.me/+263715519387" target="_blank">
        <i class="fa fa-whatsapp my-float2" aria-hidden="true"></i>
        <span class="whatsapp-label">Chat with us</span>
      </a>
    </div>
    <v-toolbar dark color="indigo" :max-height="65">      
      <a href="/" target="_self">
        <img src="/logo.png" alt="ZETDCLOGO" width="60" height="62"/>
      </a>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <center style="padding:15px">
  	    <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text ><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">My Tokens</h4></b><v-icon>arrow-down-drop</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-tile>
              <v-btn text @click="token"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">View Token</h4></b></v-btn>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-btn text @click="kctoken"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Key Change Token</h4></b></v-btn>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-btn text @click="ieug"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Capture Readings</h4></b></v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>
        	
        <v-btn text @click="tokenCal"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Units Calculator</h4></b></v-btn>

        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text ><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Follow Up</h4></b><v-icon>arrow-down-drop</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-tile>
              <v-btn text @click="trackfault"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Track Fault</h4></b></v-btn>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-btn text @click="track"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Track Application</h4></b></v-btn>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-btn text @click="downloadapplication"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Download My Form</h4></b></v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>        

        <v-btn text @click="shedding"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">LoadShedding</h4></b></v-btn>
        <v-btn text @click="pay"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Pay Your Bill</h4></b></v-btn>
  	      
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text ><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Applications</h4></b><v-icon>arrow-down-drop</v-icon></v-btn>
          </template>
          <v-list>            
            <v-list-tile>
              <!-- <v-btn text @click="applicaion"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">E21 Application Form</h4></b></v-btn> -->
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>              
              <v-btn text @click="applicaion3"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">E22 Application Form</h4></b></v-btn>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>              
              <!-- <v-btn text @click="applicaion5"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">E24 Application Form</h4></b></v-btn> -->
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <!-- <v-btn text @click="applicaion4"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">E25 Application Form</h4></b></v-btn> -->
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-btn text @click="applicaion2"><b><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Contractors Form</h4></b></v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>
        </center>      
      </v-toolbar-items>
      <v-spacer></v-spacer>  
      <a href="/" target="_self">
        <img src="/logo.png" alt="ZETDCLOGO" width="60" height="62"/>
      </a>    
    </v-toolbar>
    <v-main class="layout column align-center">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import API from "@/variables";
  export default {
    data: () => ({API: API,}),

    methods: {
      pay: function(){
        this.$router.push("/paybill");
      },

      downloadapplication: function(){
        this.$router.push("/downloadapplication");
      },
      applicaion: function(){
        this.$router.push("/terms");
      },
      applicaion2: function(){
        this.$router.push("/termsandconditions");
      },
      applicaion3: function(){
        this.$router.push("/indyconn");
      },
      applicaion4: function(){
        this.$router.push("/termandconditions");
      },
      applicaion5: function(){
        this.$router.push("/termsandcondition");
      },

      shedding: function(){
        this.$router.push("/loadshedding");
      },
      track: function() {
        this.$router.push("/application/tracker");
      },
      trackfault: function(){
        this.$router.push("/trackcomplaint");
      },
      token: function() {
        this.$router.push("/viewtoken");
      },
      kctoken: function() {
        this.$router.push("/viewkctoken");
      },
      tokenCal: function(){
        this.$router.push("/unitscalculator")
      },
      help: function(){
        this.$router.push("/help")
      },
      uploadit: function(){
        this.$router.push("/uploadpdf")
      },
      chatbotit: function(){
        this.$router.push("/chat")
      },
      ieug: function(){
        this.$router.push("/ieuglogin")
      }
    },
    beforeCreate() {
      //console.log(API.getCookie("4AFAB952496A0D3C8D9832AC327CA820"))
      /* if (API.getCookie(API.tokenCookie) != null) {
        document.location.replace("/")
      } */
    }
  };
</script>
<style scoped lang="css">
  .split-bg {
    height: 10%;
    width: 100%;
    position: absolute;
    left: 0;
    content: "";
    z-index: 0;
  }
  .flex {
    max-width: 80% !important;
  }
  @media only screen and (max-width: 560px) {
    .head {
      display: none;
    }
  }
  .container {
    padding: 1px !important;
    overflow: auto;
  }
  .v-main {
    background-image: url("/new.jpg");
    background-size: cover;
  }
  .float{
    position:fixed;
    width:60px;
    height:60px;
    bottom:50px;
    right:70px;
    background-color:#3f51b5;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    font-size:30px;
    box-shadow: 2px 2px 3px #999;
    z-index:100;
  }
  .my-float{
    margin-top:16px;
    color: #fff;
  }
  .float2{
    position:fixed;
    width:60px;
    height:60px;
    bottom:50px;
    left:85px;
    background-color:#25D366;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    font-size:30px;
    box-shadow: 2px 2px 3px #999;
    z-index:100;
  }
  .my-float2{
    margin-top:16px;
    color: #fff;
  }
.whatsapp-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

.whatsapp-chat a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  background-color: #25D366;
  padding: 10px 15px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.whatsapp-chat .fa-whatsapp {
  font-size: 24px;
  margin-right: 8px;
}

.whatsapp-chat .whatsapp-label {
  font-size: 14px;
  font-weight: bold;
}
</style>

