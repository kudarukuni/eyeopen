<template>
  <div id="pageDashboard">
    <loading :active.sync="isLoading" :can-cancel="false" :width="110" :height="110" backgroundColor="#ffffff"
      :opacity="0.5" :zIndex="999" :color="API.getLoaderColor" :loader="API.getLoader" :is-full-page="fullPage"
      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></loading>
    <v-container grid-list-xl style="min-width:700px">
      <v-layout row wrap class="chart-wrapper">
        <v-flex lg8 sm12 xs12 id="my">
          <v-widget title="" content-bg="white" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
            <div slot="widget-content">
                <v-card-title>
                  <b style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">My Accounts</b>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details
                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :mobile-breakpoint="100" :items="accounts" :search="search"
                  style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                  <template v-slot:items="props">
                    <td>
                      <b>{{ props.item.nis_RAD }}</b>
                    </td>
                    <td v-if="props.item.nis_RAD.length > 9">{{ typeyacho }}</td>
                    <td v-else>{{ typeyacho2 }}</td>
                  </template>
                  <template v-slot:no-results>
                    <v-alert :value="true" color="error" icon="warning"
                      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Your search for "{{ search }}" found
                      no
                      results.</v-alert>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <td v-if="$cookies.get(myapi.accCookie) == item.nis_RAD">
                      <v-btn :disabled="true" color="secondary">Active</v-btn>
                    </td>
                    <td v-else>
                      <v-btn :loading="loading" :disabled="loading" color="primary" @click="switchacc(item.nis_RAD)"
                        style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Switch</v-btn>
                    </td>
                  </template>
                </v-data-table><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from "@/variables";
import { mapGetters } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  layout: "main",
  middleware: "authenticated",
  components: {
    VWidget,
    Loading
  },
  data: () => ({
    loading: false,
    clickCount: 0,
    accountType: 0,
    myapi: API,
    typeyacho: "Prepaid",
    typeyacho: "Prepaid",
    isLoading: false,
    fullPage: true,
    API: API,
    search: "",
    headers: [
      {
        text: "Account Number/ Meter Number",
        align: "left",
        sortable: true,
        value: "nis_RAD"
      },
      { text: "Action", value: "action", sortable: false }
    ],
    accounts: [],
    color: Material
  }),
  computed: {
    ...mapGetters(["doneAuth"]),
    activity() {
      return API.getActivity();
    },
    posts() {
      return API.getPost(3);
    },
    siteTrafficData() {
      return API.getMonthVisit;
    },
    locationData() {
      return API.getLocation;
    }
  },
  created() {
    API.checkContact();
    /* let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainerr,
      canCancel: false,
      onCancel: this.onCancel,
      color: API.getLoaderColor,
      loader: API.getLoader,
      width: 110,
      height: 110,
      backgroundColor: "#ffffff",
      opacity: 0.5,
      zIndex: 999
    }) */
    /*    EventBus.$on("i-got-clicked", clickCount => {
      // console.log(API.getCookie(API.accCookie))
      this.counter++
      this.axios
        .request({
          url: "/accounts",
          method: "post",
          baseURL: API.getBaseURL,

          params: {
            access_token: API.getCookie(API.tokenCookie)
          }
        })
        .then(response => {
          this.accounts = response.data
          //  console.log(response.data)
          loader.hide()
        })
        .catch(e => {
          API.getAuth(e.response.status)
          //console.log(e)
        })
    }) */
    //console.log(API.getCookie(API.accCookie))
    this.isLoading = true;
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
        this.isLoading = false;
        this.accounts = response.data;
        // if(this.accounts.nis_RAD ==)
        //    console.log(response.data)
        //  loader.hide()
      })
      .catch(e => {
        this.isLoading = false;
        if (e.response.status == 401) {
          Cookie.remove("auth");
          this.$store.commit("setAuth", null);
          this.$router.push("/");
        }
        // console.log(e)
      });
  },
  methods: {
    switchacc: function (e) {
      //this.loading = true
      // console.log(e)
      this.$cookies.set(API.accCookie, e, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      //this.$router.push("/home/dashboard/")
      window.location.reload(true);
      //history.go(0)
      // this.emitGlobalClickEvent()
      // this.emitGlobalMenuEvent(API.getCookie(API.accCookie))
      // console.log(e)
      // this.loading = false
    }
  }
};
</script>
<style scoped>
.flex.lg8 {
  flex-basis: 100%;
  flex-grow: 0;
  max-width: 100%;
}

.chart-wrapper {
  width: 100%;
}

#widgcont {
  max-width: 80%;
}

#pageDashboard {
  overflow: auto;
}

#my {
  overflow: auto;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
