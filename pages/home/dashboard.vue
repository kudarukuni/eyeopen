<template>
  <div id="pageDashboard" style="min-width:500px">
    <loading :active.sync="isLoading" :can-cancel="false" :width="110" :height="110" backgroundColor="#ffffff"
      :opacity="0.5" :zIndex="999" :color="API.getLoaderColor" :loader="API.getLoader" :is-full-page="fullPage"
      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></loading>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg8 sm12 xs12 id="my">
          <v-widget title="Energy Billing Statistics" content-bg="white"
            style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
            <div slot="widget-content" id="widgcont" ref="formContainerr">
              <v-flex xs12 sm3 d-flex>
                <v-select :items="items" :value="new Date().getFullYear()" @change="changeData($event)" filled
                  v-model="year" label="Year" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"
                  class="v-select__selection"></v-select>
              </v-flex>

              <div id="this-is-bar-chart" class="chart-wrapper" v-show="$cookies.get(myapii.accCookie).length <= 9"
                v-echarts="barChartOptions" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></div>

              <div id="this-is-bar-chart" class="chart-wrapper" v-show="$cookies.get(myapii.accCookie).length <= 9"
                v-echarts="barChartOptionsConsumption" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
              </div>

              <div id="this-is-bar-chart" class="chart-wrapper" v-show="$cookies.get(myapii.accCookie).length <= 9"
                v-echarts="barChartOptionsPayments" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></div>

              <div id="this-is-bar-chart" class="chart-wrapper" v-show="$cookies.get(myapii.accCookie).length > 9"
                v-echarts="barChartOptionsTokens" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></div>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from "@/variables";
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters } from "vuex";
import VWidget from "@/components/VWidget";
import V_Echarts from "vue-echarts-directive";
import Swal from "sweetalert2";
const Cookie = process.client ? require("js-cookie") : undefined;
import Material from "vuetify/es5/util/colors";
export default {
  middleware: "authenticated",
  layout: "main",
  components: {
    VWidget,
    Loading
  },
  directives: {
    echarts: V_Echarts
  },
  data: () => ({
    bills: [],
    year: new Date().getFullYear(),
    apii: "",
    myapii: API,
    API: API,
    isLoading: false,
    fullPage: true,
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    payments: [],
    consumption: [],
    tokenpayments: [],
    barChartOptions: {},
    barChartOptionsPayments: {},
    barChartOptionsConsumption: {},
    barChartOptionsTokens: {},
    color: Material,
    items: []
  }),

  computed: {
    ...mapGetters(["doneAuth"]),
    activity() {
      return API.getActivity();
    },
    posts() {
      return API.getPost(3);
    },
    locationData() {
      return API.getLocation;
    }
  },
  methods: {
    changeData: function (e) {
      //console.log(this.$store.state.auth.user)
      //API.checkContact()
      this.apii = this.$cookies.get(API.accCookie);

      if (this.$cookies.get(API.accCookie).length <= 9) {
        this.isLoading = true;
        this.$axios
          .request({
            url: "/api/chartbill/" + this.$cookies.get(API.accCookie) + "/" + e,
            method: "post",
            baseURL: process.env.baseUrl,
            headers: {
              Authorization:
                "Bearer " + this.$store.getters.doneAuth.access_token
            }
          })
          .then(response => {
            this.bills = response.data;

            this.barChartOptions = {
              title: {
                text: "Billing Trend (" + this.year + ")"
              },
              tooltip: {},
              fill: true,
              legend: {
                show: true
              },
              xAxis: {
                data: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
                ]
              },
              yAxis: {},
              series: [
                {
                  name: "Bill Amount ($)",
                  title: "bill",
                  type: "line",
                  smooth: true,
                  color: "blue",
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: this.bills
                }
              ]
            };
          })
          .catch(e => {
            //  API.getAuth(e.response.status)
            //console.log(e.response.status)
          });
        // console.log(this.bills)
        this.$axios
          .request({
            url:
              "/api/chartpayment/" + this.$cookies.get(API.accCookie) + "/" + e,
            method: "post",
            baseURL: process.env.baseUrl,
            headers: {
              Authorization:
                "Bearer " + this.$store.getters.doneAuth.access_token
            }
          })
          .then(response => {
            this.payments = response.data;

            this.barChartOptionsPayments = {
              title: {
                text: "Payments Trend (" + this.year + ")"
              },
              tooltip: {},
              fill: true,
              legend: {
                show: true
              },
              xAxis: {
                data: this.months
              },
              yAxis: {},
              series: [
                {
                  name: "Payment Amount($)",
                  title: "payment",
                  type: "line",
                  smooth: true,
                  color: "green",
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: this.payments
                }
              ]
            };
          })
          .catch(e => {
            //API.getAuth(e.response.status)
            // console.log(e)
          });
        this.$axios
          .request({
            url: "/api/point/" + this.$cookies.get(API.accCookie),
            method: "post",
            baseURL: process.env.baseUrl,
            headers: {
              Authorization:
                "Bearer " + this.$store.getters.doneAuth.access_token
            }
          })
          .then(response => {
            // console.clear()
            this.servicepoint = response.data;
            this.$axios
              .request({
                url: "/api/chartconsumption/" + response.data.num_SUM + "/" + e,
                method: "post",
                baseURL: process.env.baseUrl,
                headers: {
                  Authorization:
                    "Bearer " + this.$store.getters.doneAuth.access_token
                }
              })
              .then(response => {
                this.consumption = response.data;
                this.isLoading = false;
                this.barChartOptionsConsumption = {
                  title: {
                    text: "Consumption Trend (" + this.year + ")"
                  },
                  tooltip: {},
                  fill: true,
                  legend: {
                    show: true
                  },
                  xAxis: {
                    data: this.months
                  },
                  yAxis: {},
                  series: [
                    {
                      name: "Consumption (KWh/KVA)",
                      title: "consumption",
                      type: "line",
                      smooth: true,
                      color: "purple",
                      itemStyle: { normal: { areaStyle: { type: "default" } } },
                      data: this.consumption
                    }
                  ]
                };
              })
              .catch(e => {
                //API.getAuth(e.response.status)
                //console.log(e)
              });

            this.isLoading = false;
          })
          .catch(e => {
            //  API.getAuth(e.response.status)
            //console.log(e)
            this.isLoading = false;
          });
      } else {
        /*      let loader = this.$loading.show({
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
      })  */
        this.isLoading = true;
        this.$axios
          .request({
            url:
              "/api/charttoken/" + this.$cookies.get(API.accCookie) + "/" + e,
            method: "post",
            baseURL: process.env.baseUrl,
            headers: {
              Authorization:
                "Bearer " + this.$store.getters.doneAuth.access_token
            }
          })
          .then(response => {
            this.tokenpayments = response.data;
            this.isLoading = false;
            this.barChartOptionsTokens = {
              title: {
                text: "Token Purchase Trend (" + this.year + ")",
                textStyle: {
                  fontFamily: 'Gill Sans',
                  fontWeight: 'bold',
                  fontStyle: 'normal'
                }
              },
              tooltip: {},
              fill: true,
              legend: {
                show: true
              },
              xAxis: {
                data: this.months,
                axisLabel: {
                  textStyle: {
                    fontFamily: 'Helvetica',
                    fontWeight: 'bold',
                    fontStyle: 'normal'
                  }
                }
              },
              yAxis: {
                axisLabel: {
                  textStyle: {
                    fontFamily: 'Helvetica',
                    fontWeight: 'bold',
                    fontStyle: 'normal'
                  }
                }
              },
              series: [
                {
                  name: "Amount ($)",
                  title: "token",
                  type: "line",
                  smooth: true,
                  color: "#f0f0f0",
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: this.tokenpayments
                }
              ]
            };
          })
          .catch(e => {
            //  API.getAuth(e.response.status)
            //console.log(e)
            this.isLoading = false;
          });
      }
    },
    dropDown: function () {
      var i = 0;
      for (i = new Date().getFullYear(); i >= 2012; i--) {
        this.items.push(i);
      }
    }
  },
  created() {
    //console.log(this.$store.state.auth.user)
    /*    if (this.$cookies.get(API.accCookie).length <= 9) {
    this.$axios
      .request({
        url: "/api/contactcheck/" + this.$cookies.get(API.accCookie),
        method: "post",
        baseURL: process.env.baseUrl,
      })
      .then(response => {
        //console.log(response.data + "fdferfe")
        if (response.data == "not_found") {
          this.$router.push("/home/updatecontacts")
          Swal.fire({
            title: "ONE MORE STEP TO COMPLETE YOUR REGISTRATION!",
            type: "warning",
            text: "We have noted that your Contact Information we have in our Database is outdated. Please take a few moments to update your contact Information. This will enable us to send you notifications via email and sms.",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OKAY"
          }).then(result => {
            if (result.value) {
              
            }
          })
        }
      })
      .catch(e => {
                if (e.response.status == 401) {
     Cookie.remove('auth')
      this.$store.commit("setAuth", null);
      this.$router.push("/");
            }
      })
  } else {
    this.$axios
      .request({
        url: "/api/client/" + this.$cookies.get(API.accCookie),
        method: "post",
        baseURL: process.env.baseUrl,

        headers: {
          Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
        }
      })
      .then(response => {
        //this.personal = response.data
        //console.log(response.data.nis_RAD)
        loader.hide()
        this.$axios
          .request({
            url: "/api/contactcheck/" + response.data.nis_RAD,
            method: "post",
            baseURL: process.env.baseUrl,
          })
          .then(response => {
            //console.log(response.data + "fdferfe")
            if (response.data == "not_found") {
              router.push("/contactsupdate")
              Swal.fire({
                title: "ONE MORE STEP TO COMPLETE YOUR REGISTRATION!",
                type: "warning",
                text: "We have noted that your Contact Information we have in our Database is outdated. Please take a few moments to update your contact Information. This will enable us to send you notifications via email and sms.",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                }
              })

            }
          })
          .catch(e => {
                    if (e.response.status == 401) {
     Cookie.remove('auth')
      this.$store.commit("setAuth", null);
      this.$router.push("/");
            }
          })
      })
  } */

    this.apii = this.$cookies.get(API.accCookie);
    this.isLoading = true;
    if (this.$cookies.get(API.accCookie).length <= 9) {
      this.$axios
        .request({
          url:
            "/api/chartbill/" +
            this.$cookies.get(API.accCookie) +
            "/" +
            new Date().getFullYear(),
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          this.bills = response.data;

          this.barChartOptions = {
            title: {
              text: "Billing Trend (" + this.year + ")"
            },
            tooltip: {},
            fill: true,
            legend: {
              show: true
            },
            xAxis: {
              data: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ]
            },
            yAxis: {},
            series: [
              {
                name: "Bill Amount ($)",
                title: "bill",
                type: "line",
                smooth: true,
                color: "blue",
                itemStyle: { normal: { areaStyle: { type: "default" } } },
                data: this.bills
              }
            ]
          };
        })
        .catch(e => {
          if (e.response.status == 401) {
            Cookie.remove("auth");
            this.$store.commit("setAuth", null);
            this.$router.push("/");
          }
        });
      // console.log(this.bills)
      this.$axios
        .request({
          url:
            "/api/chartpayment/" +
            this.$cookies.get(API.accCookie) +
            "/" +
            new Date().getFullYear(),
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          this.payments = response.data;

          this.barChartOptionsPayments = {
            title: {
              text: "Payments Trend (" + this.year + ")"
            },
            tooltip: {},
            fill: true,
            legend: {
              show: true
            },
            xAxis: {
              data: this.months
            },
            yAxis: {},
            series: [
              {
                name: "Payment Amount($)",
                title: "payment",
                type: "line",
                smooth: true,
                color: "green",
                itemStyle: { normal: { areaStyle: { type: "default" } } },
                data: this.payments
              }
            ]
          };
        })
        .catch(e => {
          if (e.response.status == 401) {
            Cookie.remove("auth");
            this.$store.commit("setAuth", null);
            this.$router.push("/");
          }
        });
      this.$axios
        .request({
          url: "/api/point/" + this.$cookies.get(API.accCookie),
          method: "post",
          baseURL: process.env.baseUrl,

          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          // console.clear()
          this.servicepoint = response.data;
          this.$axios
            .request({
              url:
                "/api/chartconsumption/" +
                response.data.num_SUM +
                "/" +
                new Date().getFullYear(),
              method: "post",
              baseURL: process.env.baseUrl,
              headers: {
                Authorization:
                  "Bearer " + this.$store.getters.doneAuth.access_token
              }
            })
            .then(response => {
              this.consumption = response.data;
              //loader.hide()
              this.barChartOptionsConsumption = {
                title: {
                  text: "Consumption Trend (" + this.year + ")"
                },
                tooltip: {},
                fill: true,
                legend: {
                  show: true
                },
                xAxis: {
                  data: this.months
                },
                yAxis: {},
                series: [
                  {
                    name: "Consumption (KWh/KVA)",
                    title: "consumption",
                    type: "line",
                    smooth: true,
                    color: "purple",
                    itemStyle: { normal: { areaStyle: { type: "default" } } },
                    data: this.consumption
                  }
                ]
              };
            })
            .catch(e => {
              if (e.response.status == 401) {
                Cookie.remove("auth");
                this.$store.commit("setAuth", null);
                this.$router.push("/");
              }
            });

          this.isLoading = false;
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
      /*       let loader = this.$loading.show({
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
      this.$axios
        .request({
          url:
            "/api/charttoken/" +
            this.$cookies.get(API.accCookie) +
            "/" +
            new Date().getFullYear(),
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          this.tokenpayments = response.data;
          this.isLoading = false;
          this.barChartOptionsTokens = {
            title: {
              text: "Token Purchase Trend (" + this.year + ")",
              textStyle: {
                fontFamily: 'Gill Sans',
                fontWeight: 'bold',
                fontStyle: 'normal'
              }
            },
            tooltip: {},
            fill: true,
            legend: {
              show: true
            },
            xAxis: {
              data: this.months,
              axisLabel: {
                textStyle: {
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  fontStyle: 'normal'
                }
              }
            },
            yAxis: {
              axisLabel: {
                textStyle: {
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  fontStyle: 'normal'
                }
              }
            },
            series: [
              {
                name: "Amount ($)",
                title: "token",
                type: "line",
                smooth: true,
                color: "#f0f0f0",
                itemStyle: { normal: { areaStyle: { type: "default" } } },
                data: this.tokenpayments
              }
            ]
          };
        })
        .catch(e => {
          this.isLoading = false;
          if (e.response.status == 401) {
            Cookie.remove("auth");
            this.$store.commit("setAuth", null);
            this.$router.push("/");
          }
        });
    }
    this.dropDown();
    //console.log(this.siteTrafficData)
  }
};
</script>
<style scoped>
.v-select__selection {
  width: 100%;
  justify-content: flex-start;
}

.flex.lg8 {
  flex-basis: 100%;
  flex-grow: 0;
  max-width: 100%;
}

.chart {
  min-width: 800px;
  width: 100%;
  height: 400px;
}

.chart-wrapper {
  width: 100%;
  height: 400px;
}

#widgcont {
  max-width: 100%;
  overflow: auto;
}</style>