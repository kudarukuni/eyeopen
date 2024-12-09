<template>
  <v-navigation-drawer class="app--drawer" :mini-variant.sync="mini" app v-model="showDrawer" :width="drawWidth"
    :dark="dark">
    <v-toolbar color="indigo" dark>
      <a href="/home/meterreading" target="_self">
        <img :src="computeLogo" height="60" width="60" alt="ZETDC Logo"/>
      </a>
      <v-toolbar-title class="ml-0 pl-3">
        <span style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>ZETDC</b></span>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>

    <v-list dense nav>
      <v-subheader style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>General</b></v-subheader>

      <v-list-item link @click="handleNav('/home/dashboard')">
        <v-list-item-action style="margin-right:20px">
          <v-icon>dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-title
          style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>Dashboard</b></v-list-item-title>
      </v-list-item>

      <v-list-item link @click="handleNav('/home/personaldetails')">
        <v-list-item-action style="margin-right:20px">
          <v-icon>assignment</v-icon>
        </v-list-item-action>
        <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>My Personal
            Details</b></v-list-item-title>
      </v-list-item>

      <v-list-item link @click="handleNav('/home/financialaccount')">
        <v-list-item-action style="margin-right:20px">
          <v-icon>account_balance_wallet</v-icon>
        </v-list-item-action>
        <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>My Financial
            Account</b></v-list-item-title>
      </v-list-item>

      <v-list-item link @click="handleNav('/home/servicepoint')">
        <v-list-item-action style="margin-right:20px">
          <v-icon>memory</v-icon>
        </v-list-item-action>
        <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>My Service
            Point</b></v-list-item-title>
      </v-list-item>

      <v-list-item link @click="handleNav('/home/servicestatement')">
        <v-list-item-action style="margin-right:20px">
          <v-icon>description</v-icon>
        </v-list-item-action>
        <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>Service
            Statement</b></v-list-item-title>
      </v-list-item>

      <v-list-item link @click="handleNav('/home/meterreading')">
        <v-list-item-action style="margin-right:20px">
          <v-icon>assignment</v-icon>
        </v-list-item-action>
        <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>Meter
            Reading</b></v-list-item-title>
      </v-list-item>

      <v-list-item link @click="handleNav('/home/mybills')" v-show="$cookies.get(myapii.accCookie).length <= 9">
        <v-list-item-action style="margin-right:20px">
          <v-icon>style</v-icon>
        </v-list-item-action>
        <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>My
            Bills</b></v-list-item-title>
      </v-list-item>

      <v-list-item link @click="handleNav('/home/mytokens')" v-show="$cookies.get(myapii.accCookie).length > 9">
        <v-list-item-action style="margin-right:20px">
          <v-icon>ac_unit</v-icon>
        </v-list-item-action>
        <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>My
            Tokens</b></v-list-item-title>
      </v-list-item>

      <v-list-item link @click="handleNav('/home/pay')">
        <v-list-item-action style="margin-right:20px">
          <v-icon>payment</v-icon>
        </v-list-item-action>
        <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>Make
            Payment</b></v-list-item-title>
      </v-list-item>

      <v-list-group no-action>

        <v-list-item slot="activator" ripple="ripple">
          <v-list-item-action style="margin-right:20px">
            <v-icon>account_balance</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>My
                Accounts</b></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="handleNav('/home/addaccount')">
          <v-list-item-action style="margin-right:20px">
            <v-icon>add_circle</v-icon>
          </v-list-item-action>
          <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>Add
              Account</b></v-list-item-title>
        </v-list-item>

        <v-list-item link @click="handleNav('/home/switchacc')">
          <v-list-item-action style="margin-right:20px">
            <v-icon>sync</v-icon>
          </v-list-item-action>
          <v-list-item-title style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><b>Switch
              Account</b></v-list-item-title>
        </v-list-item>

      </v-list-group>

    </v-list>
  </v-navigation-drawer>
</template>
<script>
import API from "@/variables"
import menu from "@/variables/menu"
import VuePerfectScrollbar from "vue-perfect-scrollbar"
export default {

  name: "AppDrawer",
  components: {
    VuePerfectScrollbar
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
    drawWidth: {
      type: [Number, String],
      default: "260"
    },
    showDrawer: false
  },
  data() {
    return {

      right: null,
      mini: false,
      dark: false,
      myapii: API,
      menus: menu,
      scrollSettings: {
        maxScrollbarLength: 160
      }
    }
  },
  computed: {
    computeGroupActive() {
      return true
    },
    computeLogo() {
      return "/logo.png"
    },

    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav
    }
  },
  created() {
    if (API.getCookie(API.accCookie) + "".length <= 9) {
      this.menus[7].visibility = true
      this.menus[9].visibility = false
      this.menus[8].visibility = true
    } else {
      this.menus[7].visibility = false
      this.menus[8].visibility = false
      this.menus[9].visibility = true
    }
    /*MenuEventBus.$on("menu", accountType => {
      //console.log(accountType);
      if (accountType == 1) {
        this.menus[7].visibility = true
        this.menus[8].visibility = true
      } else {
        this.menus[7].visibility = false
        this.menus[8].visibility = false
        this.menus[9].visibility = true
      }
    })*/

    /*    SideEventBus.$on("change", themeColor => {
         //console.log(accountType);
         if (themeColor == "dark") {
           this.dark = true
         } else if (themeColor == "light") {
           this.dark = false
         }
       }) */
  },

  methods: {
    handleNav(link) {
      this.$router.push(link)
    },
    genChildTarget(item, subItem) {
      if (subItem.href) return
      if (subItem.component) {
        return {
          name: subItem.component
        }
      }
      return { name: `${item.group}/${subItem.name}` }
    }
  }
}
</script>

<style scoped>.app--drawer {
  overflow: hidden
}

.drawer-menu--scroll {
  height: calc(100vh - 48px);
  overflow: auto
}</style>
