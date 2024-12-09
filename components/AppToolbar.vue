<template ref="comp">
  <v-toolbar color="indigo" fixed dark>
    <v-toolbar-title>
      <v-app-bar-nav-icon @click="handleDrawerToggle"></v-app-bar-nav-icon>
    </v-toolbar-title>
    <p style="display:none;font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">{{ counter }}</p>
    <h3 class="v-balance" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">{{ balance }}</h3>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu class="switch" bottom origin="center center" transition="scale-transition" :nudge-bottom="50">
        <template v-slot:activator="{ on }">
          <v-btn text large @click="pay" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>PAY YOUR
              BILL</b></v-btn>
          <v-btn text large v-on="on" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>SWITCH
              ACCOUNT</b></v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in accounts" :to="!item.href ? { name: item.name } : null" :href="item.href"
            :disabled="$cookies.get(myapi.accCookie) == item.nis_RAD" :target="item.target" rel="noopener" :key="index"
            @click="switched(item.nis_RAD)" :class="{
              tile: $cookies.get(myapi.accCookie) == item.nis_RAD,
              txt: $cookies.get(myapi.accCookie) == item.nis_RAD
            }">
            <v-list-item-content style="margin-left:5px">
              <v-list-item-title>{{ item.nis_RAD }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>

      <v-menu bottom origin="center center" transition="scale-transition" :nudge-bottom="50">
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="30px">
              <img src="/unnamed.jpg" alt="Your Profile Picture" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" @click="item.click">
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content style="margin-left:5px">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import Util from "@/util";
const Cookie = process.client ? require("js-cookie") : undefined;
import API from "@/variables";
export default {
  name: "AppToolbar",
  components: {},
  data() {
    return {
      balance: "Bal",
      counter: 0,
      y: 0,
      isActive: false,
      myapi: API,
      drawer: false,
      switch1: false,
      accounts: [],
      items: [
        /*  {
          icon: "account_circle",
          href: "#",
          title: "Profile",
          click: this.handleProfile
        }, */
        {
          icon: "settings",
          href: "#",
          title: "Change Password",
          click: this.handleSetting
        },
        {
          icon: "fullscreen_exit",
          href: "#",
          title: "Logout",
          click: this.handleLogut
        }
      ]
    };
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  created() {
    /* EventBus.$on("i-got-clicked", clickCount => {
      // console.log(API.getCookie(API.accCookie))
      this.counter = clickCount
      
    }) */
    this.getBal();
    this.myAccounts();
    //  console.log(this.$store.state.auth.user)
    //this.getBal()

    //console.log(this.$cookies.get(API.accCookie));
    //   API.setCookie(API.accCookie, this.$store.state.auth.user["account"][this.y].nis_RAD, 15)
  },
  methods: {
    switched(e) {
      this.$cookies.set(API.accCookie, e, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      //this.$router.push("/home/dashboard/");
      window.location.reload(true);
    },
    emitGlobalClickEvent() {
      this.clickCount++;
      // Send the event on a channel (i-got-clicked) with a payload (the click count.)
      // EventBus.$emit("i-got-clicked", this.clickCount)
    },
    emitGlobalMenuEvent(e) {
      if (e + "".length <= 9) {
        this.accountType = 1;
        MenuEventBus.$emit("menu", this.accountType);
      } else {
        this.accountType = 2;
        MenuEventBus.$emit("menu", this.accountType);
      }
    },
    myAccounts() {
      this.$axios
        .request({
          url: "/api/account",
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          this.accounts = response.data;
          //  console.log(response.data)
          //  loader.hide()
        })
        .catch(e => {
          API.getAuth(e.response.status);
          // console.log(e)
        });
    },
    handleDrawerToggle() {
      this.$emit("side-icon-click");
    },
    getBal: function () {
      this.balance = "";
      this.$axios
        .request({
          url: "/api/balance/" + this.$cookies.get(API.accCookie),
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          this.balance = response.data;
          //console.log(response.data.cust_BALANCE)
          //  API.setCookie(API.accCookie, response.data["account"][0].nis_RAD, 15)
        })
        .catch(e => {
          //  API.deleteCookie(API.accCookie)
          // console.log(e)
        });
    },
    pay() {
      this.$router.push("/home/pay");
    },

    handleSwitch() {
      this.$router.push("/myaccounts");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    handleLogut() {
      // Code will also be required to invalidate the JWT Cookie on external API
      Cookie.remove("auth");
      this.$store.commit("setAuth", null);
      this.$router.push("/");
    },
    handleSetting() {
      this.$router.push("/home/changepass");
    },
    handleProfile() { }
  }
};
</script>

<style scoped>
#switch {
  padding-top: 10px;
}

.txt {
  color: white !important;
}

@media only screen and (max-width: 959px) {
  .v-balance {
    display: none;
  }
}

@media only screen and (max-width: 500px) {
  .pay {
    display: none;
  }

  .switch {
    display: none;
  }
}

@media only screen and (min-width: 959px) {
  .v-balance {
    display: block;
    margin-left: 220px;
  }
}

.tile {
  background-color: green !important;
  font-style: unset;
}
</style>
