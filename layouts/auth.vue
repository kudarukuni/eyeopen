 <template>
  <v-app>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

    <a href="/chat" class="float" target="_blank">
      <i class="fa fa-reddit-alien my-float" aria-hidden="false"></i>
    </a>
    <v-toolbar
      dark
      color="indigo"
      :min-height="80"
      :max-height="80"
      style="min-width:100px;overflow:auto"
    >
      <a href="/" target="_self">
        <img src="/logo.png" alt="ZETDC" width="60" height="60" />
      </a>
      <v-toolbar-title class="head">ZETDC Self Service Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <img
          v-if="API.showPayment"
          src="/pay.png"
          height="100"
          width="180"
          alt="payment"
          @click="pay"
          exact
          :style="{ cursor: 'pointer'}"
        />

        <v-btn text @click="tokenCal">Prepaid Units check</v-btn>
        <v-btn text @click="token">View Token</v-btn>
	<v-btn text @click="kctoken">Key Change Token</v-btn>
        <v-btn text @click="track">Track Application</v-btn>
        <v-btn text @click="trackfault">Track Fault</v-btn>
        <v-btn text @click="applicaion">New Application</v-btn>
        

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" title="help" @click="help">help</v-icon>
          </template>
          <span>Help</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-toolbar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import API from "@/variables";
export default {
  data: () => ({ API: API }),

  methods: {
    pay: function() {
      this.$router.push("/paybill");
    },
    kctoken: function() {
      this.$router.push("/viewkctoken");
    },
    track: function() {
      this.$router.push("/application/tracker");
    },
    trackfault: function(){
      this.$router.push("/trackcomplaint");
    },
    applicaion: function(){
this.$router.push("/terms");
    },
    token: function() {
      this.$router.push("/viewtoken");
    },
    tokenCal: function() {
      this.$router.push("/unitscalculator");
    },
    help: function() {
      this.$router.push("/help");
    }
  },
  beforeCreate() {
    //console.log(API.getCookie("4AFAB952496A0D3C8D9832AC327CA820"))
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
    bottom:40px;
    right:40px;
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
</style>
