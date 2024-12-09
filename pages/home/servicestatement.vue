<template>
  <div id="pageDashboard">
    <loading :active.sync="isLoading" :can-cancel="false" :width="110" :height="110" backgroundColor="#ffffff"
      :opacity="0.5" :zIndex="999" :color="API.getLoaderColor" :loader="API.getLoader" :is-full-page="fullPage"
      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></loading>
    <v-container grid-list-xl fluid>
      <v-layout row wrap class="chart-wrapper">
        <v-flex lg8 sm12 xs12 id="my">
          <v-widget title="Service Statement" content-bg="white"
            style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
            <div slot="widget-content" id="widgcont">
              <h4>Financial Transactions For Service: <b style="color:#000000;"><font size="5" family="Arial">{{ account }}</font></b></h4><br/>
              <table width="100%">
                <tr>
                  <td width="250">
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" full-width
                      min-width="250px">
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="datefrom" label="From" prepend-icon="event" readonly v-on="on"
                          min-width="490px"></v-text-field>
                      </template>
                      <v-date-picker v-model="datefrom" @input="menu2 = false"
                        :max="new Date().toISOString().substr(0, 10)"></v-date-picker>
                    </v-menu>
                  </td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td width="250">
                    <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" full-width min-width="250px">
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="dateto" label="To" prepend-icon="event" readonly v-on="on"
                          min-width="490px"></v-text-field>
                      </template>
                      <v-date-picker v-model="dateto" @input="menu = false"
                        :max="new Date().toISOString().substr(0, 10)"></v-date-picker>
                    </v-menu>
                  </td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td style="width:200px">
                    <v-btn :loading="loading" :disabled="loading" color="primary" width="200"
                      @click="showStatement(datefrom, dateto)">
                      Show Statement
                      <v-icon right dark>remove_red_eye</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn :loading="loading" :disabled="loading" color="primary" @click="downloadStatement(account)">
                      Download PDF
                      <v-icon right dark>cloud_download</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </table>

              <div id="service" class="border" ref="formContainer">
                <table width="95%">
                  <tr>
                    <td>
                      <img :src="computeLogo" height="90" width="90" alt="ZETDC Logo" />
                    </td>
                    <td>
                      <h4>
                        Customer Information: <b v-for="(service, index) in servicestatement" v-if="index <= 0"
                          :key="index">{{ service.customer_NAME }} ({{ service.nis_RAD }})</b>
                      </h4>
                    </td>
                  </tr>
                </table>

                <table width="100%">
                  <tr>
                    <th>Date</th>
                    <th>Transaction Number</th>
                    <th>Invoice Number</th>
                    <th>Invoice Identifier</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Accumulated Amount</th>
                  </tr>
                  <tr>
                    <td>
                      <b>Balance brought forward at:</b>
                    </td>
                    <td>
                      <b v-for="(service, index) in servicestatement" v-if="index <= 0" :key="index">{{
                        service.transaction_DATE }}</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <div v-for="(service, index) in servicestatement"
                        v-if="service.invoice_DESC == 'CONVERTED LAST BILL BALANCE'">
                        <p v-for="(service, index) in servicestatement" v-if="index <= 0" :key="index">
                          {{ service.invoice_DESC }}</p>
                      </div>
                    </td>
                    <td>
                      <div v-for="(service, index) in servicestatement"
                        v-if="service.invoice_DESC == 'CONVERTED LAST BILL BALANCE'">
                        <p v-for="(service, index) in servicestatement" v-if="index <= 0" :key="index">${{
                          service.invoice_AMOUNT }}</p>
                      </div>
                    </td>
                    <td v-for="(service, index) in servicestatement" v-if="index <= 0" :key="index">${{
                      service.invoice_TOTAL }}</td>
                  </tr>
                  <tr v-for="(service, index) in servicestatement" :key="index"
                    v-if="servicestatement[index]['invoice_DESC'] != 'CONVERTED LAST BILL BALANCE'">
                    <td>{{ servicestatement[index]["transaction_DATE"] }}</td>
                    <td>{{ servicestatement[index]["transaction_NO"] }}</td>
                    <td>{{ servicestatement[index]["invoice_NO"] }}</td>
                    <td>{{ servicestatement[index]["invoice_IDENTIFIER"] }}</td>
                    <td>{{ servicestatement[index]["invoice_DESC"] }}</td>
                    <td>${{ servicestatement[index]["invoice_AMOUNT"].toFixed(2) }}</td>
                    <td>${{ servicestatement[index]["invoice_TOTAL"].toFixed(2) }}</td>
                  </tr>

                  <tr style="border-bottom: 1px solid #000;">
                    <td>
                      <h5>
                        <b>Sum transactions:</b>
                      </h5>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <hr />
                      <b>${{ computeSum }}</b>
                    </td>
                    <td>
                      <hr />
                      <b>${{ computeclose }}</b>
                    </td>
                  </tr>
                  <tr class="bordered">
                    <td>
                      <h5>
                        <b>Closing balance as at:</b>
                      </h5>
                    </td>
                    <td>
                      <b>{{ dateto }}</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <hr />
                      <b>${{ computeclose }}</b>
                    </td>
                  </tr>
                </table>
              </div>
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
import VWidget from "@/components/VWidget";
import Swal from "sweetalert2";
import Material from "vuetify/es5/util/colors";
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  layout: "main",
  middleware: "authenticated",
  components: {
    VWidget,
    Loading
  },
  data: () => ({
    color: Material,
    isLoading: false,
    fullPage: true,
    API: API,
    datefrom: new Date().toISOString().substr(0, 10),
    dateto: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    loading: false,
    account: ''
  }),
  asyncData(context) {
    return { servicestatement: [] };
  },
  computed: {
    computeLogo() {
      return "/logo.png";
    },
    computeSum() {
      var sum = 0;
      for (var i = 0; i < this.servicestatement.length; i++) {
        sum += this.servicestatement[i]["invoice_AMOUNT"];
      }
      return sum.toFixed(2);
    },
    computeclose() {
      var sum = 0;
      for (var i = 0; i < this.servicestatement.length; i++) {
        sum = this.servicestatement[i]["invoice_TOTAL"];
      }
      return sum.toFixed(2);
    }
  },
  created() {
    this.account = this.$cookies.get(API.accCookie)
    API.checkContact();
    /*    let loader = this.$loading.show({
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
        url: "/api/statement/" + this.$cookies.get(API.accCookie),
        method: "post",
        baseURL: process.env.baseUrl,
        headers: {
          Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
        },
        params: {
          datefrom: "1970-01-01",
          dateto: new Date().toISOString().substr(0, 10)
        }
      })
      .then(response => {
        this.servicestatement = response.data;
        this.isLoading = false;
        // console.log(this.servicestatement);
        // loader.hide()
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
    downloadStatement(e) {
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
      })
      this.load = true */
      this.isLoading = true
      this.load = true
      if (process.client) {
        const jsPDF = require("jspdf");
        const html2canvas = require("html2canvas");
        const doc = new jsPDF("p", "pt", "a4");
        /** WITH CSS */
        var canvasElement = document.createElement("canvas");
        html2canvas(this.$refs.formContainer, { canvas: canvasElement }).then(
          function (canvas) {
            const img = canvas.toDataURL("image/jpeg");
            var imgWidth = 210;
            var pageHeight = 295;
            var imgHeight = (canvas.height * imgWidth) / canvas.width;
            var heightLeft = imgHeight;

            var doc = new jsPDF("p", "mm", "a4");
            var position = 0;
            //loader.hide();
            this.isLoading = false
            doc.addImage(img, "JPEG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(img, "JPEG", 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }

            doc.save(e + "_ServiceStatement.pdf");
          }.bind(this)
        );
      }

    },
    showStatement: function (datefrom, dateto) {
      this.isLoading = true;
      this.$axios
        .request({
          url: "/api/statement/" + this.$cookies.get(API.accCookie),
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          },
          params: {
            datefrom: datefrom,
            dateto: dateto
          }
        })
        .then(response => {
          this.servicestatement = response.data;
          this.isLoading = false;
          //this.loading = false;
          if (response.data.length == 0) {
            this.loading = false;
            Swal.fire({
              title: "No records found",
              type: "warning",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OKAY"
            }).then(result => {
              if (result.value) {
                document.location.replace("/home/servicestatement");
                // this.$router.push("/servicestatement")
              }
            });
          }
          //console.log(response.data.length)
        })
        .catch(e => {
          this.isLoading = false;
          if (e.response.status == 401) {
            Cookie.remove("auth");
            this.$store.commit("setAuth", null);
            this.$router.push("/");
          }
        });
      // this.loading = false;
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

td {
  text-align: center;
  color: #5a3fd4;
}

#widgcont {
  min-width: 100%;
}

#pageDashboard {
  overflow: auto;
}

.bordered {
  border-bottom: 1px solid #000;
}

.border {
  width: 100%;
  border: 1px solid black;
  font-size: 12px;
}

.chart-wrapper {
  width: 100%;
}
</style>
