<template>
  <div id="pageDashboard">
    <loading :active.sync="isLoading" :can-cancel="false" :width="110" :height="110" backgroundColor="#ffffff"
      :opacity="0.5" :zIndex="999" :color="API.getLoaderColor" :loader="API.getLoader" :on-cancel="onCancel"
      :is-full-page="fullPage" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></loading>
    <v-container grid-list-xl fluid>
      <v-layout row wrap class="chart-wrapper">
        <v-flex lg8 sm12 xs12 id="my">
          <v-widget title="" content-bg="white" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
            <div slot="widget-content">
              <v-card>
                <v-card-title>
                  <b style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">My Tokens</b>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details
                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="tokens" :search="search" :loading="load"
                  loading-text="Loading Data, Please wait..."
                  style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                  <template v-slot:items="props">
                    <td>
                      <b>{{ props.item.msno }}</b>
                    </td>
                    <td>
                      <b>{{ props.item.receipt_NO }}</b>
                    </td>
                    <td>
                      <b>{{ props.item.token }}</b>
                    </td>
                    <td>
                      <b>${{ props.item.token_AMOUNT.toFixed(2) }}</b>
                    </td>
                    <td>
                      <b>{{ props.item.token_UNITS.toFixed(2) }}</b>
                    </td>
                    <td>
                      <b>{{ props.item.trn_TIMESTAMP }}</b>
                    </td>
                  </template>
                  <template v-slot:no-results>
                    <v-alert :value="true" color="error" icon="warning"
                      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Your search for "{{ search }}" found
                      no
                      results.</v-alert>
                  </template>
                </v-data-table>
              </v-card>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from "@/variables";
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
    myapi: API,
    API: API,
    isLoading: false,
    fullPage: true,
    load: true,
    search: "",
    headers: [
      {
        text: "Meter Number",
        align: "left",
        sortable: true,
        value: "msno"
      },
      {
        text: "Receipt Number",
        value: "receipt_NO",
        align: "left",
        sortable: true
      },

      { text: "Token Number", value: "token", sortable: true },
      { text: "Token Amount($)", value: "token_AMOUNT", sortable: true },
      { text: "Token Units", value: "token_UNITS", sortable: true },
      { text: "Purchase Date", value: "trn_TIMESTAMP", sortable: false }
    ],
    tokens: [],
    color: Material
  }),
  computed: {
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
    if (this.$cookies.get(API.accCookie).length > 9) {
      /*   let loader = this.$loading.show({
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
      this.isLoading = true;
      //console.log(API.getCookie(API.accCookie))
      this.$axios
        .request({
          url: "/api/token/" + this.$cookies.get(API.accCookie),
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          this.isLoading = false;
          this.tokens = response.data;
          this.load = false;
          //  console.log(response.data)
          //loader.hide()
        })
        .catch(e => {
          this.isLoading = false;
          if (e.response.status == 401) {
            Cookie.remove("auth");
            this.$store.commit("setAuth", null);
            this.$router.push("/");
          }
        });
    } else {
      this.$router.push("/home/mybills");
    }
  },
  methods: {
    switchacc: function (e) {
      this.loading = true;
      API.setCookie(API.accCookie, e, 15);
      // console.log(e)
      this.loading = false;
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
