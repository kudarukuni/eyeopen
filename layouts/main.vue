<template>
  <v-app id="inspire" class="app dashboard">
    <app-drawer class="app--drawer" :show-drawer="showDrawer"></app-drawer>
    <app-toolbar class="app--toolbar" color="#3f51b5" dark @side-icon-click="handleDrawerVisiable"></app-toolbar>
    <v-main>
      <!-- Page Header 
      <page-header></page-header>-->
      <div class="page-wrapper">
        <nuxt />
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="white pa-3 app--footer" v-on:click="resetTimeoutU()">
        <span class="caption">
          <b style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">ZETDC <a href="https://portfolio-kudarukuni.vercel.app">&copy;</a> {{ new Date().getFullYear() }}</b>
        </span>
        <v-spacer></v-spacer>
        <span class="caption mr-1">
          <b style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">ZETDC Self Service Portal</b>
        </span>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";
import PageHeader from "@/components/PageHeader";
import API from "@/variables";
import Vue from "vue";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader
  },

  data() {
    return {
      timeoutID: "",
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Test",
          to: "/inspire"
        }
      ],
      showDrawer: true
    };
  },
  methods: {
    handleDrawerVisiable() {
      this.showDrawer = !this.showDrawer;
    },
    setup() {
      if (process.client) {
        addEventListener("mousemove", this.resetTimer, false);
        addEventListener("mousedown", this.resetTimer, false);
        addEventListener("keypress", this.resetTimer, false);
        addEventListener("DOMMouseScroll", this.resetTimer, false);
        addEventListener("mousewheel", this.resetTimer, false);
        addEventListener("touchmove", this.resetTimer, false);
        addEventListener("MSPointerMove", this.resetTimer, false);
        this.startTimer();
      }
    },
    startTimer() {
      this.timeoutID = window.setTimeout(this.goInactive, 600000);
    }, resetTimer(e) {
      window.clearTimeout(this.timeoutID);

      this.goActive();
    }, goActive() {
      this.startTimer();
    },
    goInactive() {
      window.clearTimeout(this.timeoutID);
      Cookie.remove("auth");
      this.$store.commit("setAuth", null);
      this.$router.push("/");
    },

  },
  beforeCreate() {
    /* if (API.getCookie(API.tokenCookie) == null) {
      document.location.replace("/")
    } */
  },
  created() {
    this.setup()
  }
};
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
</style>