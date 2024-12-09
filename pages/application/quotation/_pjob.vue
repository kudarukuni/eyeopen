<template>
<div id="pageDashboard" style="min-width:900px;overflow:auto">
<client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <v-card class="elevation-1 pa-3">
    <v-card-text>
      <div>
        <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :width="110"
          :height="110"
          backgroundColor="#ffffff"
          :opacity="0.5"
          :zIndex="999"
          :color="API.getLoaderColor"
          :loader="API.getLoader"
          :on-cancel="onCancel"
          :is-full-page="fullPage"
        ></loading>
        <div class="layout column align-center">
          <h2 class="flex my-4 primary--text" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif">Quotation For Job {{ $route.params.pjob }}</h2>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<center>
        <v-btn :loading="load" color="primary" @click="createPDF($route.params.pjob)">
          Download PDF
          <v-icon right dark>cloud_download</v-icon>
        </v-btn></center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div ref="quote" height="1035" style="width:735px;height:1035px;padding:2px">
          <table width="735" border="0" style="font-size:24px; font-family: 'Gill Sans', Arial, Helvetica, sans-serif">
            <tr>
              <td width="500">
                <img :src="computeLogo" height="110" alt="ZETDC Logo" />
              </td>
              <td>
                <b style="font-size:20px">ZETDC</b>
                <br />Operator:
                <b>ONLINE</b>
                <br />
                District Office: {{ quotation.district_OFFICE }}
                <br />
                Date/Time: {{ quotation.date_TIME }}
                <br />REFERENCE:
                <b>{{ $route.params.pjob }}</b>
              </td>
            </tr>
          </table>

          <br />

          <table width="735">
            <tr>
              <td>
                <hr />
              </td>
            </tr>
            <tr>
              <td>
                <h3 align="center">
                  <b>QUOTATION FOR ELECTRICITY SUPPLY</b>
                </h3>
              </td>
            </tr>
          </table>

          <table width="735" style="font-size:16px">
            <tr>
              <td width="367.5">
                <fieldset>
                  <legend>
                    <b>Customer Details</b>
                  </legend>
                  Customer Name: {{ quotation.customer_NAME }}
                  <br />
                  House Number: {{ quotation.house_NUMBER }}
                  <br />
                  Street: {{ quotation.street }}
                  <br />
                  Suburb: {{ quotation.suburb }}
                </fieldset>
              </td>
              <td width="367.5">
                <fieldset>
                  <legend>
                    <b>Point Of Supply</b>
                  </legend>
                  Stand Number: {{ quotation.stand_NUMBER }}
                  <br />
                  Street Name: {{ quotation.street }}
                  <br />
                  Street No: {{ quotation.street_NUMBER }}
                  <br />
                  Suburb: {{ quotation.suburb }}
                </fieldset>
              </td>
            </tr>
          </table>

          <br />
          <p>
            <b>Dear Sir/Madam</b>
          </p>
          <table width="735">
            <tr>
              <td width="735">
                <p style="font-size:14px">
                  With Reference to your enquiry for an/a New/Increased/Decrease electricity service or re_routing
                  and/or Substation resite at the specified point of supply, the load indicated below can be made
                  available.
                  <br />We will carry out the work within one month of recieving payment from you, provided your
                  substation is within a kilometre of an existing network with sufficient capacity to meet your
                  requirements and also provided you are ready to recieve supply and the relevant notices have been
                  lodged with us.
                </p>
              </td>
            </tr>
          </table>

          <p style="font-size:16px">The Tariff will be as follows:</p>

          <table width="735" style="font-size:16px">
            <tr>
              <td>
                Supply Specification:
                <b>{{ quotation.supply_SPECIFICATION }}</b>
                {{ quotation.unit_MEASURE }}
              </td>

              <td>{{ quotation.phase }}</td>
              <td>Volts +/- 10%</td>
            </tr>
            <tr>
              <td>
                Tariff Classification:
                <b>{{ quotation.tariff_CLASSIFICATION }}</b>
              </td>
            </tr>
            <tr>
              <td>
                Service Connection:
                <b>{{ quotation.service_CONNECTION }}</b>
              </td>
            </tr>
          </table>

          <br />
          <p
            style="font-size:16px"
          >Before supply can be provided the following payments are required:</p>

          <table width="735" style="font-size:16px">
            <tr>
              <th width="600" align="left">Description</th>
              <th width="600" align="right">Amount to Pay</th>
            </tr>
          </table>

          <table width="735">
            <tr>
              <td>
                <hr />
              </td>
            </tr>
          </table>

          <table width="735" style="font-size:14px">
            <tr>
              <td width="600" align="left">VALUE ADDED TAX ON CONNECTION CHARGES</td>
              <td width="600" align="right">${{ quotation.vat }}</td>
            </tr>
            <tr>
              <td width="600" align="left">Connection Charges</td>
              <td width="600" align="right">${{ quotation.connection_CHARGES }}</td>
            </tr>
            <tr>
              <td width="600" align="left">Normal Security Deposit</td>
              <td width="600" align="right">${{ quotation.security_DEPOSIT }}</td>
            </tr>
            <tr>
              <td width="600" align="left"></td>
              <td width="600" align="right"></td>
            </tr>
            <tr>
              <td width="600" align="left">
                <b>Total payment required to start work:</b>
              </td>
              <td width="600" align="right">
                <b>${{ (quotation.security_DEPOSIT + quotation.connection_CHARGES + quotation.vat).toFixed(2) }}</b>
              </td>
            </tr>
          </table>

          <p style="font-size:14px">Comment:</p>
          <table width="735">
            <tr>
              <td width="735">
                <div width="735px" style="border: solid 1px black;min-height:80px"></div>
              </td>
            </tr>
          </table>

          <table width="735">
            <tr>
              <td width="735">
                <p style="font-size:14px">
                  This quotation is subject to the terms of the Electricity Act(1985) any amendments thereto and any
                  regulations and by-laws made thereunder and approval by the board of the Authority. This quotation is
                  valid for a period of 30 days from the date of application. If the quotation remains unpaid for this
                  period the Authority will automatically requote the application.
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </v-card-text>
    <v-card-text>
      <div class="layout column align-center"></div>
    </v-card-text>
  </v-card>
</client-only>
</div>
</template>
<script>
import API from "@/variables";
import Swal from "sweetalert2";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  layout: "regauth",
  components: {
    Loading
  },
  data: () => ({
    quotation: [],
    load: false,
    API: API,
    isLoading: false,
    fullPage: true,
    pjob: 0
  }),
  computed: {
    computeLogo() {
      return "/logo.png";
    }
  },
  created() {
    this.viewQuote(this.$route.params.pjob);
  },
  methods: {
    onCancel() {},
    createPDF(e) {
      this.isLoading = true;
      if (process.client) {
        const jsPDF = require("jspdf");
        const html2canvas = require("html2canvas");
        const doc = new jsPDF("p", "pt", [595.28, 841.89]);

        var canvasElement = document.createElement("canvas");
        html2canvas(this.$refs.quote, { canvas: canvasElement }).then(
          function(canvas) {
            const img = canvas.toDataURL("image/png");
            doc.addImage(img, "PNG", 15, 10);
            doc.save(e + ".pdf");
            this.isLoading = false;
          }.bind(this)
        );
      }
    },
    viewQuote: function(pjob) {
      this.isLoading = true;
      this.$axios
        .request({
          url: "/api/quotation/" + pjob,
          method: "post",
          baseURL: process.env.baseUrl
        })
        .then(response => {
          this.isLoading = false;
          if (response.data == "cannot") {
            // loader.hide()
            Swal.fire({
              title: "Cannot View Quotation",
              type: "warning",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OKAY"
            }).then(result => {
              if (result.value) {
                this.$router.push("/application/tracker");
              }
            });
          } else {
            // loader.hide()
            this.quotation = response.data;
            // this.quotation.vat =  parseFloat(response.data.vat).toFixed(2)
          }

          // console.log(response.data)
        })
        .catch(e => {
          //   console.log(e)
          this.isLoading = false;
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.viewQuote(to.params.pjob);

    next();
  }
};
</script>

<style scoped>
.a >>> * {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 10;
  list-style: none;
}
div {
  text-align: justify;
  text-justify: inter-word;
}
</style>
