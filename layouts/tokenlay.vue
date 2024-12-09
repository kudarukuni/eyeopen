<template>
  <v-app>
    <v-toolbar dark color="indigo" :max-height="80">
      <a href="/" target="_self">
        <img src="/logo.png" alt="ZETDC" width="60" height="60" />
      </a>
      <v-toolbar-title class="head">ZETDC Self Service Portal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <img v-if="API.showPayment" src="/pay.png" height="100" width="180" alt="payment" @click="pay" exact
          :style="{ cursor: 'pointer' }" />
        <v-btn text @click="token">View Token</v-btn>
	<v-btn text @click="kctoken">Key Change Token</v-btn>
        <v-btn text @click="track">Track Application</v-btn>
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
  data: () => ({ API: API, }),

  methods: {
    pay: function () {
      this.$router.push("/paybill");
    },
    kctoken: function () {
      this.$router.push("/viewkctoken");
    },
    track: function () {
      this.$router.push("/application/tracker");
    },
    token: function () {
      this.$router.push("/viewtoken");
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
  background-image: url("/back.jpg");
  background-size: cover;
}</style>
