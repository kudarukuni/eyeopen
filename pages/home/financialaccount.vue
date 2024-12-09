<template>
  <client-only>
    <div id="pageDashboard">
      <loading :active.sync="isLoading" :can-cancel="false" :width=110 :height=110 backgroundColor="#ffffff" :opacity=0.5
        :zIndex=999 :color=API.getLoaderColor :loader=API.getLoader :is-full-page="fullPage"
        style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></loading>
      <v-container grid-list-xl style="min-width:1000px">
        <v-layout row wrap>
          <table width="100%" style="margin-bottom:15px">
            <tr>
              <td>
                <v-card :hover="true" color="#e4e8ed">
                  <v-card-title primary-title>
                    <div>
                      <h6>
                        <p style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Account Number</p>
                        <b>
                          <font color="#3f51b5">{{ head.nis }}</font>
                        </b>
                      </h6>
                      <div></div>
                    </div>
                  </v-card-title>
                </v-card>
              </td>
              <td>
                <v-card :hover="true">
                  <v-card-title primary-title>
                    <div>
                      <h6>
                        <p style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Financial Account</p>
                        <b>
                          <font color="#3f51b5">{{ head.acc }}</font>
                        </b>
                      </h6>
                      <div></div>
                    </div>
                  </v-card-title>
                </v-card>
              </td>
              <td>
                <v-card :hover="true" color="#e4e8ed">
                  <v-card-title primary-title>
                    <div>
                      <h6>
                        <p style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Account Type</p>
                        <b>
                          <font color="#3f51b5">{{ head.type }}</font>
                        </b>
                      </h6>
                      <div></div>
                    </div>
                  </v-card-title>
                </v-card>
              </td>
              <td>
                <v-card :hover="true">
                  <v-card-title primary-title>
                    <div>
                      <h6>
                        <p style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Service Tariff</p>
                        <b>
                          <font color="#3f51b5">{{ head.tariff }}</font>
                        </b>
                      </h6>
                      <div></div>
                    </div>
                  </v-card-title>
                </v-card>
              </td>
            </tr>
          </table>

          <v-flex lg8 sm12 xs12 id="my" ref="formContainerr">
            <v-card>
              <v-card-title>
                <b>
                  <font style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">My Payments</font>
                </b>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details
                  style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></v-text-field>
              </v-card-title>
              <v-data-table :headers="headers" :items="payments" :search="search" :mobile-breakpoint="100" :loading="load"
                loading-text="Loading Data, Please wait..."
                style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                <template v-slot:items="props">
                  <td>
                    <b>
                      <font style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">{{ props.item.receipt_NO }}
                      </font>
                    </b>
                  </td>
                  <td>
                    <b>
                      <font style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">{{ props.item.payment_METHOD
                      }}</font>
                    </b>
                  </td>
                  <td>
                    <b>
                      <font style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">{{ props.item.payment_DATE }}
                      </font>
                    </b>
                  </td>
                  <td>
                    <b>
                      <font style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">${{
                        props.item.payment_AMOUNT.toFixed(2) }}</font>
                    </b>
                  </td>
                </template>
                <template v-slot:no-results>
                  <v-alert :value="true" color="error" icon="warning"
                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Your search for "{{ search }}" found
                    no results.</v-alert>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </client-only>
</template>

<script>
import API from "@/variables";
const Cookie = process.client ? require("js-cookie") : undefined;
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
import Vue from "vue";
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
    active: true,
    isLoading: false,
    fullPage: true,
    search: "",
    load: true,
    headers: [
      { text: "Receipt No", value: "receipt_NO", sortable: true },
      { text: "Payment Method", value: "payment_METHOD", sortable: true },
      { text: "Payment Date", value: "payment_DATE", sortable: true },
      { text: "Amount($)", value: "payment_AMOUNT", sortable: true }
    ],
    payments: [],
    head: {
      nis: "",
      acc: "",
      type: "",
      tariff: ""
    },
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
    //API.checkContact()
    /*     if(process.browser){
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainerr,
      canCancel: true,
      onCancel: this.onCancel,
      color: API.getLoaderColor,
      loader: API.getLoader,
      width: 110,
      height: 110,
      backgroundColor: "#ffffff",
      opacity: 0.5,
      zIndex: 999
    })
    } */

    this.isLoading = true;
    //console.log(API.getCookie(API.accCookie))
    this.$axios
      .request({
        url: "/api/financial/" + this.$cookies.get(API.accCookie),
        method: "post",
        baseURL: process.env.baseUrl,
        headers: {
          Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
        }
      })
      .then(response => {
        this.payments = response.data;
        this.load = false;
        this.isLoading = false;


        this.load = false;
        this.head.nis = this.payments[0].nis_RAD;
        this.head.acc = this.payments[0].financial_ACCOUNT;
        this.head.type = this.payments[0].account_TYPE;
        this.head.tariff = this.payments[0].service_TARIFF;
        // console.log(response.data)
      })
      .catch(e => {
        this.isLoading = false;

        if (e.response.status == 401) {
          Cookie.remove("auth");
          this.$store.commit("setAuth", null);
          this.$router.push("/");
        }
      });
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

#widgcont {
  max-width: 80%;
}

#pageDashboard {
  overflow: auto;
}

#my {
  overflow: auto;
}
.chart-wrapper {
  width: 100%;
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
}</style>
