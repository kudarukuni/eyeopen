 <template>
  <div id="pageDashboard" style="min-width:900px;overflow:auto">
    <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      <v-card class="elevation-1 pa-3">
        <v-container grid-list-xl fluid>
          <div id="pageDashboard" style="min-width:500px;overflow-x:auto" v-if="paying">
            <v-layout row wrap>
              <v-flex lg8 sm12 xs12 id="my">
                <v-widget title="Payment Status" content-bg="white">
                  <div slot="widget-content">
                    <div v-show="paystatus.transStatus=='PENDING SUBSCRIBER VALIDATION'">
                      <v-row>
                        <img
                          src="/loading.gif"
                          style="align:center"
                          height="150"
                          width="150"
                          alt="loading"
                        />
     
                      
                      </v-row>

                      <h2>Transaction In Progress, if you do not get a prompt on your mobile please dial *151*2*4# to approve transaction. <v-btn
                          text
                          color="primary"
                          @click="startover"
                        >Click here to try again.</v-btn></h2>
                    </div>

                    <div v-show="paystatus.transStatus=='COMPLETED'">
                      <img src="/check.gif" style="align:center" height="100" width="100" alt="loading" />
                      <h2 style="color:green">
                        Payment Successful!! Thank you for paying your ZESA bills.
                        <v-btn
                          text
                          color="primary"
                          @click="startover"
                        >Click here to make another payment</v-btn>
                      </h2>
                    </div>

                    <div v-show="paystatus.transStatus=='FAILED'">
                      <img
                        src="/failed.png"
                        style="align:center"
                        height="300"
                        width="200"
                        alt="loading"
                      />
                      <h2>
                        This Transaction has failed,
                        <v-btn text color="primary" @click="startover">Click here to try again.</v-btn>
                      </h2>
                    </div>

                    <div v-show="paystatus.transStatus=='TIMED OUT'">
                      <img src="/timed.png" style="align:center" height="300" width="200" alt="loading" />
                      <h2>
                        This Transaction has timed out,
                        <v-btn text color="primary" @click="startover">Click here to try again.</v-btn>
                      </h2>
                    </div>
                    <table style="width:100%">
                      <tr>
                        <td style="max-width:450px">
                          <v-simple-table style="margin-top:50px;max-width:450px">
                            <tbody>
                              <tr>
                                <td>Transaction Status</td>
                                <td>
                                  <p>{{paystatus.transStatus}}</p>
                                </td>
                              </tr>
                              <tr>
                                <td>Transaction Ref</td>
                                <td>{{paystatus.transRef}}</td>
                              </tr>
                              <tr>
                                <td>Identity Number</td>
                                <td>{{paystatus.accountNumber}}</td>
                              </tr>
                              <tr>
                                <td>Amount</td>
                                <td>{{paystatus.amount}}</td>
                              </tr>
                              <tr>
                                <td>Mobile Number</td>
                                <td>{{paystatus.mobile}}</td>
                              </tr>
                              <tr>
                                <td>External Reference</td>
                                <td>{{paystatus.ecocashRef}}</td>
                              </tr>
                              <tr>
                                <td>Date of Transaction</td>
                                <td>{{ convertTimeStamp(paystatus.transDate)}}</td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </td>
                        <td>
                          <div v-show="isLoading">
                            <p style="line-height: 2.0em;font-family: Consolas">
                              <img
                                src="/logo.png"
                                style="display: block; margin-left: 120px;margin-right: auto;"
                                height="80"
                                width="80"
                                alt="ZETDC Logo"
                              />
                              <br />----------------------------------------
                              <br />BPN:200019701 VAT No: 10051551
                              <br />ZIMBABWE ELECTRICITY TRANSMISSION
                              <br />AND DISTRIBUTION COMPANY
                              <br />25 SAMORA MACHEL AVENUE,
                              <br />ELECTRICITY CENTRE
                              <br />HARARE. TEL: 263-242-773300/40
                              <br />REG#: 2292/2009
                              <br />TAX INVOICE
                              <br />
                              Date: {{convertTimeStamp(paystatus.transDate)}}
                              <br />........................................
                              <br />
                              Receipt no.: {{paystatus.transRef}}
                              <br />
                              Identity Number: {{paystatus.accountNumber}}
                              <br />
                              <span v-if="paystatus.transRef.length <=22">
                                Electricity Postpaid Bill
                                <br />
                              </span>
                              <span v-if="paystatus.transRef.length>22">
                                Electricity New Connection Fee
                                <br />
                              </span>
                              Customer Name: {{paystatus.customerName}}
                              <br />
                              Customer Address: {{paystatus.customerAddress}}
                              <br />........................................
                              <br />
                              TOTAL PAID: {{paystatus.amount}}
                              <br />........................................
                              <br />----------------------------------------
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </v-widget>
              </v-flex>
            </v-layout>
          </div>
          <div v-if="details">
            <v-layout row wrap>
              <v-flex lg8 sm12 xs12 id="my" style="min-width:430px;overflow-x:auto">
                <v-widget>
                <center><h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color = '#3f51b5'>
                  <b>Make Payment</b></font>
                </h2></center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div slot="widget-content">
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
                      :is-full-page="fullPage"
                    ></loading>
                    <v-stepper step="1">
                      <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1">Account Information</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="e1 > 2" step="2">Payment Details</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="3">Transaction Summary</v-stepper-step>
                      </v-stepper-header>

                      <v-stepper-items>
                        <v-stepper-content step="1">
                          <v-card class="mb-12" height="200px">
                            <v-form ref="form1">
                              <v-col class="d-flex" cols="12" sm="6" md="3">
                                <v-select
                                  :items="items"
                                  item-text="accountt"
                                  required
                                  :rules="[v => !!v || 'Account Type is required']"
                                  item-value="abbr"
                                  @change="accType($event)"
                                  v-model="payment.acctype"
                                  label="What to Pay?"
                                  outlined
                                ></v-select>
                              </v-col>
                              <v-col class="d-flex" cols="12" sm="6" md="3">
                                <v-text-field
                                  v-model="payment.nisrad"
                                  :label="account_label"
                                  outlined
                                  :rules="[v => !!v || 'This field is required']"
                                ></v-text-field>
                              </v-col>
                            </v-form>
                          </v-card>

                          <v-btn color="primary" @click="valForm1">Continue</v-btn>

                          <v-btn text @click="cancelled">Cancel</v-btn>
                        </v-stepper-content>

                        <center><v-stepper-content step="2">
                          <fieldset style="max-width:350px">
                            <legend>Select Payment Method</legend>
                            <v-item-group>
                              <v-container>
                                <v-row>
                                  <v-col md="4">
                                    <v-item>
                                      <v-card
                                        :class="{ activated: activeEcocash }"
                                        value="Ecocash"
                                        @click="selectedPay('activeEcocash')"
                                      >
                                        <img
                                          src="/ecocash-logo.png"
                                          height="90"
                                          width="90"
                                          alt="ZETDC Logo"
                                        />
                                        <v-scroll-y-transition>
                                          <div v-if="activeEcocash" class="display-1"></div>
                                        </v-scroll-y-transition>
                                      </v-card>
                                    </v-item>
                                  </v-col>
                                  <!--  <v-col md="4">
                                    <v-item>
                                      <v-card
                                        :class="{ activated: activeTelecash }"
                                        value="Telecash"
                                        @click="selectedPay('activeTelecash')"
                                      >
                                        <img
                                          src="/telecash.jpg"
                                          height="90"
                                          width="90"
                                          alt="ZETDC Logo"
                                        />
                                        <v-scroll-y-transition>
                                          <div v-if="activeTelecash"></div>
                                        </v-scroll-y-transition>
                                      </v-card>
                                    </v-item>
                                  </v-col>
                                  <v-col md="4">
                                    <v-item>
                                      <v-card
                                        :class="{ activated: activeOnemoney }"
                                        value="OneMoney"
                                        @click="selectedPay('activeOnemoney')"
                                      >
                                        <img
                                          src="/onemoney.jpg"
                                          height="40"
                                          width="90"
                                          alt="ZETDC Logo"
                                        />
                                        <v-scroll-y-transition>
                                          <div v-if="activeOnemoney" class="display-1"></div>
                                        </v-scroll-y-transition>
                                      </v-card>
                                    </v-item>
                                  </v-col>-->
                                </v-row>
                              </v-container>
                            </v-item-group>
                          </fieldset>
                          <v-card class="mb-12" height="420px">
                            <v-form ref="form2">
                              <v-row></v-row>
                              <v-col class="d-flex" cols="12" sm="6" md="3">
                                <v-text-field
                                  label="Email Address (Optional)"
                                  type="email"
                                  v-model="payment.email"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col class="d-flex" cols="12" sm="6" md="3">
                                <v-text-field
                                  label="Contact Phone"
                                  :rules="[
                            v => !!v || 'Contact Phone is required']"
                                  v-model="payment.contactphone"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="18" md="4">
                                <v-label>Ecocash Number</v-label>
                                <VuePhoneNumberInput
                                  v-model="payment.mobile"
                                  required
                                  style="min-width:300px"
                                  @update="onUpdate"
                                  default-country-code="ZW"
                                  :only-countries="['ZW']"
                                  valid-color="green"
                                />
                              </v-col>
                            
                            <v-col class="d-flex" cols="12" sm="6" md="3">
                              <v-text-field label="Amount" v-model="payment.amount" :rules="[
                            v => !!v || 'Amount is required',v => /^-?\d*\.?\d*$/.test(v) || 'Invalid Amount']"></v-text-field>
                            </v-col>
                            </v-form>
                          </v-card>

                          <v-btn color="primary" @click="summary()">Continue</v-btn>

                          <v-btn text @click="cancelled">Cancel</v-btn>
                        </v-stepper-content></center>

                        <p align="right"><v-stepper-content step="3">
                          <v-card class="mb-12" height="400px" v-if="payment.acctype==1">
                            <v-alert type="error" v-if="isUSD" :dismissible="true">
                              <ul style="list-style-type: none">
                                <li>Cannot pay for this Account in ZWL$.</li>
                              </ul>
                            </v-alert>
                            <v-alert type="error" v-if="emptyNum" :dismissible="true">
                              <ul style="list-style-type: none">
                                <li>Please enter your mobile money number.</li>
                              </ul>
                            </v-alert>
                            <v-alert type="error" v-if="isInactive" :dismissible="true">
                              <ul style="list-style-type: none">
                                <li>You cannot pay for an Inactive Account.</li>
                              </ul>
                            </v-alert>
                            <v-alert type="error" v-if="isPrep" :dismissible="true">
                              <ul style="list-style-type: none">
                                <li>You cannot pay for a Prepaid Account.</li>
                              </ul>
                            </v-alert>
                            <v-simple-table>
                              <tbody>
                                <tr>
                                  <td>Account Number</td>
                                  <td>{{payment.nisrad}}</td>
                                </tr>
                                <tr>
                                  <td>Customer Name</td>
                                  <td>{{ personal.ape1_CLI }} {{personal.nom_CLI}}</td>
                                </tr>
                                <tr>
                                  <td>Customer Address</td>
                                  <td>{{ personal.customeraddress }}</td>
                                </tr>
                                <tr>
                                  <td>Amount to be paid</td>
                                  <td>${{payment.amount}}</td>
                                </tr>
                                <tr>
                                  <td>ZETDC Reference</td>
                                  <td>{{payment.zetdcref}}</td>
                                </tr>
                                <tr>
                                  <td>Payment Method</td>
                                  <td>{{payment.method}}</td>
                                </tr>
                                <tr>
                                  <td>Mobile Number</td>
                                  <td>{{payment.mobile}}</td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-card>
                          <v-card class="mb-12" height="590px" v-if="payment.acctype==2">
                            <v-alert type="error" v-if="isUSD" :dismissible="true">
                              <ul style="list-style-type: none">
                                <li>This Job is already paid for.</li>
                              </ul>
                            </v-alert>
                            <v-alert type="error" v-if="emptyNum" :dismissible="true">
                              <ul style="list-style-type: none">
                                <li>Please enter your mobile money number.</li>
                              </ul>
                            </v-alert>
                            <v-alert type="error" v-if="overAmount" :dismissible="true">
                              <ul style="list-style-type: none">
                                <li>Amount should be equal to the balance.</li>
                              </ul>
                            </v-alert>
                            <v-alert type="error" v-if="pJobNotAllowed" :dismissible="true">
                              <ul style="list-style-type: none">
                                <li>You cannot pay for New Connection fee in this status.</li>
                              </ul>
                            </v-alert>

                            <v-simple-table>
                              <tbody>
                                <tr>
                                  <td>Application Number</td>
                                  <td>{{payment.nisrad}}</td>
                                </tr>
                                <tr>
                                  <td>Customer Name</td>
                                  <td>{{ personal.customer_NAME }}</td>
                                </tr>
                                <tr>
                                  <td>Customer Address</td>
                                  <td>{{ personal.house_NUMBER }}, {{personal.street }}, {{personal.suburb }}</td>
                                </tr>
                                <tr>
                                  <td>Amount you wish to pay</td>
                                  <td>${{payment.amount}}</td>
                                </tr>
                                <tr>
                                  <td>Amount paid so far</td>
                                  <td>${{paid.toFixed(2)}}</td>
                                </tr>
                                <tr>
                                  <td>Balance</td>
                                  <td>${{((personal.security_DEPOSIT + personal.connection_CHARGES + personal.vat).toFixed(2)-paid.toFixed(2)).toFixed(2)}}</td>
                                </tr>
                                <tr>
                                  <td>Job Status</td>
                                  <td>{{personal.desc_EST}}</td>
                                </tr>
                                <tr>
                                  <td>New Connection Fee Total Amount</td>
                                  <td>${{(personal.security_DEPOSIT + personal.connection_CHARGES + personal.vat).toFixed(2)}}</td>
                                </tr>
                                <tr>
                                  <td>ZETDC Reference</td>
                                  <td>{{payment.zetdcref}}</td>
                                </tr>
                                <tr>
                                  <td>Payment Method</td>
                                  <td>{{payment.method}}</td>
                                </tr>
                                <tr>
                                  <td>Mobile Number</td>
                                  <td>{{payment.mobile}}</td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                          </v-card>
                          <v-btn
                            color="primary"
                            :disabled="isUSD || overAmount || pJobNotAllowed || isPrep || isInactive || emptyNum"
                            @click="pay()"
                          >Confirm</v-btn>

                          <v-btn text @click="cancelled">Cancel</v-btn>
                        </v-stepper-content></p>
                      </v-stepper-items>
                    </v-stepper>
                    <center><v-btn style="margin-top:20px" outlined big color="indigo" :href="'/'">Back Home</v-btn></center>
                  </div>
                </v-widget>
              </v-flex>
            </v-layout>
          </div>
        </v-container>
      </v-card>
    </client-only>
  </div>
</template>

<script>
import API from "@/variables";
const Cookie = process.client ? require("js-cookie") : undefined;
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import Swal from "sweetalert2";

export default {
  layout: "regauth",
  components: {
    VWidget,
    VuePhoneNumberInput,
    Loading
  },
  data: () => ({
    color: Material,
    e1: 0,
    receipt: false,
    paystatus: {},
    timer: "",
    emptyNum:false,
    overAmount: false,
    results: {},
    details: true,
    paying: false,
    paid: 0,
    isUSD: false,
    isPrep: false,
    isInactive: false,
    pJobNotAllowed: false,
    account_label: "Account Number",
    payment: {
      mobile: "",
      nisrad: "",
      method: "",
      email: "",
      contactphone: "",
      amount: "",
      acctype: "",
      zetdcref: "",
      customername: "",
      address: ""
    },
    items: [
      {
        accountt: "Postpaid Bill",
        abbr: 1
      },
      {
        accountt: "New Connection Fee",
        abbr: 2
      }
    ],
    itemspay: [
      {
        method: "Ecocash",
        abbr: "Ecocash"
      },
      {
        method: "OneMoney",
        abbr: "OneMoney"
      },
      {
        method: "Telecash",
        abbr: "Telecash"
      }
    ],
    isLoading: false,
    activeTelecash: false,
    activeEcocash: false,
    activeOnemoney: false,
    fullPage: true,
    selectedTab: "tab-1",
    personal: {},
    API: API,
    nis: ""
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
  beforeDestroy() {
    clearInterval(this.timer);
  },
  created() {
    this.paystatus.transStatus = "Loading...";
    this.paystatus.transRef = "Loading...";
    this.paystatus.accountNumber = "Loading...";
    this.paystatus.amount = "Loading...";
    this.paystatus.mobile = "Loading...";
    this.paystatus.ecocashRef = "Loading...";
    this.paystatus.transDate = new Date().getTime();
    this.payment.method = "Ecocash";
    this.activeEcocash = true;
     /* this.details=false
    this.paying=true
    this.startCheck() */
  },
  methods: {
    valForm1: function() {
      if (this.$refs.form1.validate()) {
        this.e1 = 2;
      }
    },
    startCheck: function() {
      
      this.checkStatus;
      this.timer = setInterval(this.checkStatus, 3000);
    },
    startover: function() {
      this.details = true;
      this.paying = false;
      this.e1 = 1;
       this.isLoading = false;
      clearInterval(this.timer);
      this.isUSD = false;
      this.isPrep = false;
      this.isInactive = false;
      this.payment.mobile ="";
      this.overAmount = false;
      this.emptyNum=false;
      this.pJobNotAllowed = false;
      this.personal = {};
       this.paystatus.transStatus = "Loading...";
    this.paystatus.transRef = "Loading...";
    this.paystatus.accountNumber = "Loading...";
    this.paystatus.amount = "Loading...";
    this.paystatus.mobile = "Loading...";
    this.paystatus.ecocashRef = "Loading...";
    this.paystatus.transDate = new Date().getTime();
    },
    convertTimeStamp: function(unixtimestamp) {
      // Months array
      var months_arr = [
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
      ];

      // Convert timestamp to milliseconds
      var date = new Date(unixtimestamp * 1);

      // Year
      var year = date.getFullYear();

      // Month
      var month = months_arr[date.getMonth()];

      // Day
      var day = date.getDate();

      // Hours
      var hours = date.getHours();

      // Minutes
      var minutes = "0" + date.getMinutes();

      // Seconds
      var seconds = "0" + date.getSeconds();

      // Display date time in MM-dd-yyyy h:m:s format
      var convdataTime =
        day +
        "-" +
        month +
        "-" +
        year +
        " " +
        hours +
        ":" +
        minutes.substr(-2) +
        ":" +
        seconds.substr(-2);

      return convdataTime;
    },
    checkStatus: function() {
      this.$axios
        .request({
          url: "/api/checkpayment/" + API.encryptData(this.payment.zetdcref),
          method: "post",
          baseURL: process.env.baseUrl
        })
        .then(response => {
          //this.isLoading = false;
          this.paystatus = response.data;
          this.paystatus.amount = "$" + this.paystatus.amount.toFixed(2);
          if (this.paystatus.transStatus == "COMPLETED") {
            this.isLoading = true;
            clearInterval(this.timer);
          } else if (this.paystatus.transStatus == "FAILED") {
            //this.isLoading = true;
            clearInterval(this.timer);
          } else if (this.paystatus.transStatus == "TIMED OUT") {
            //this.isLoading = true;
            clearInterval(this.timer);
          }
          //console.log(this.paystatus)
        })
        .catch(e => {
          this.isLoading = false;
          if (e.response && e.response.status == 500) {
            // console.log("couldn't make payment")
          }
        });
    },
    onUpdate(payload) {
      this.results = payload;
    },
    accType: function(e) {
      if (e == 1) {
        this.account_label = "Account Number";
      } else {
        this.account_label = "Application Number (Pjob)";
      }
      //console.log(e)
    },
    selectedPay: function(e) {
      if (e == "activeEcocash") {
        this.payment.method = "Ecocash";
        this.activeEcocash = true;
        this.activeTelecash = false;
        this.activeOnemoney = false;
      } else if (e == "activeTelecash") {
        this.payment.method = "Telecash";
        this.activeTelecash = true;
        this.activeEcocash = false;
        this.activeOnemoney = false;
      } else if (e == "activeOnemoney") {
        this.payment.method = "OneMoney";
        this.activeTelecash = false;
        this.activeEcocash = false;
        this.activeOnemoney = true;
      }
      //console.log(this.payment.method);
    },
    pay: function() {
      this.isLoading = true;
      //console.log(this.results);
      this.payment.mobile = this.results.formattedNumber;
      if (this.payment.acctype == 1) {
        this.payment.customername =
          this.personal.ape1_CLI + " " + this.personal.nom_CLI;
        this.payment.address = this.personal.customeraddress;
      } else if (this.payment.acctype == 2) {
        this.payment.customername = this.personal.customer_NAME;
        this.payment.address =
          this.personal.house_NUMBER +
          " " +
          this.personal.street +
          " " +
          this.personal.suburb;
      }
      this.payment.amount = parseFloat(this.payment.amount).toFixed(2);
      if (this.payment.acctype == 1) {
        if (this.personal.cod_TAR.startsWith("8")) {
          Swal.fire({
            title: "Cannot pay this Account in ZWL Currency",
            type: "warning",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OKAY"
          }).then(result => {
            if (result.value) {
              this.startover();
            }
          });
        } else if (this.personal.cod_TAR.startsWith("17")) {
          Swal.fire({
            title: "Cannot pay prepaid account",
            type: "warning",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OKAY"
          }).then(result => {
            if (result.value) {
              this.startover();
            }
          });
        } else {
          if (
            this.personal.est_SERV == "EC012" ||
            this.personal.est_SERV == "EC020" ||
            this.personal.est_SERV == "EC014" ||
            this.personal.est_SERV == "EC028"
          ) {
            this.$axios
              .request({
                url: "/api/payonline/" + this.personal.region_CODE,
                method: "post",
                baseURL: process.env.baseUrl,
                data: this.payment
              })
              .then(response => {
                this.isLoading = false;
                this.$refs.form1.reset();
                this.$refs.form2.reset();
                this.details = false;
                this.paying = true;
                this.startCheck();
                /* this.$router.push(
                  "/home/paymentstatus/" + this.payment.zetdcref
                );*/
              })
              .catch(e => {
                this.isLoading = false;
                if (e.response && e.response.status == 500) {
                  console.log("couldn't make payment");
                }
              });
          } else {
            this.isInactive = true;
            Swal.fire({
              title: "Cannot pay an Inactive account",
              type: "warning",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OKAY"
            }).then(result => {
              if (result.value) {
                this.startover();
              }
            });
          }
        }
      } else if (this.payment.acctype == 2) {
        if (this.pJobNotAllowed) {
          Swal.fire({
            title: "Cannot pay for New connection Fee in this status.",
            type: "warning",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OKAY"
          }).then(result => {
            if (result.value) {
              this.startover();
            }
          });
        } else {
          this.$axios
            .request({
              url: "/api/payonline/" + this.personal.region_CODE,
              method: "post",
              baseURL: process.env.baseUrl,
              data: this.payment
            })
            .then(response => {
              this.isLoading = false;
              this.$refs.form1.reset();
              this.$refs.form2.reset();
              this.details = false;
              this.paying = true;
              this.startCheck();
            })
            .catch(e => {
              this.isLoading = false;
              if (e.response && e.response.status == 500) {
                console.log("couldn't make payment");
              }
            });
        }
      }
    },
    cancelled: function() {
      this.e1 = 1;
      this.$refs.form1.reset();
      this.$refs.form2.reset();
      this.isUSD = false;
      this.isPrep = false;
      this.payment.mobile ="";
      this.isInactive = false;
      this.overAmount = false;
      this.emptyNum=false;
      this.pJobNotAllowed = false;
      this.personal = {};
      //this.$refs.form1.resetValidation()
    },
    summary: function() {
      if (this.$refs.form2.validate()) {
        this.e1 = 3;
        
         this.isUSD = false;
      this.isPrep = false;
      this.isInactive = false;
      this.overAmount = false;
      this.emptyNum=false;
      this.pJobNotAllowed = false;
        //if(process.client){
        //console.log(Date.now())
        // }
        this.payment.mobile = this.results.formattedNumber;
        //console.log(this.payment.mobile)
        this.payment.amount = parseFloat(this.payment.amount).toFixed(2)
        if (this.payment.mobile != undefined) {
          this.isLoading = true;
          if (this.payment.method == "Ecocash") {
            this.payment.zetdcref = "EC" + this.payment.nisrad + Date.now();
            if (process.client) {
              //console.log(this.payment.zetdcref.substring(2, this.payment.zetdcref.length-13))
            }
          } else if (this.payment.method == "Telecash") {
            this.payment.zetdcref = "TC" + this.payment.nisrad + Date.now();
          } else if (this.payment.method == "OneMoney") {
            this.payment.zetdcref = "OM" + this.payment.nisrad + Date.now();
          }

          //console.log(this.payment)

          if (this.payment.acctype == 1) {
            this.$axios
              .request({
                url: "/api/paymentclient/" + API.encryptData(this.payment.nisrad),
                method: "post",
                baseURL: process.env.baseUrl,
                
              })
              .then(response => {
                this.personal = response.data;
                //this.personal.nom_Zona

                if (
                  this.personal.est_SERV == "EC012" ||
                  this.personal.est_SERV == "EC020" ||
                  this.personal.est_SERV == "EC014" ||
                  this.personal.est_SERV == "EC028"
                ) {
                  if (this.personal.cod_TAR.startsWith("8")) {
                    this.isUSD = true;
                    /* Swal.fire({
                title: "Cannot pay this Account in ZWL Currency",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  this.$router.push("/home/pay");
                }
              });*/
                  } else if (this.personal.cod_TAR.startsWith("17")) {
                    this.isPrep = true;
                    /*  Swal.fire({
                title: "Cannot pay prepaid account",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  this.$router.push("/home/pay");
                }
              });*/
                  }
                } else  if (
                  this.personal.est_SERV == "EC021"){
                  //console.log(response.data);
                  this.isInactive = true;
                  /* Swal.fire({
                title: "Cannot pay an Inactive account",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  this.$router.push("/home/pay");
                }
              });
*/
                }else{
                  Swal.fire({
                title: "Invalid Account Number",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  this.cancelled();
                }
              });
                }

                //console.log(response.data)

                this.isLoading = false;
              })
              .catch(e => {
                if (process.browser) {
                  this.isLoading = false;
                }
                if (e.response && e.response.status == 401) {
                  Cookie.remove("auth");
                  this.$store.commit("setAuth", null);
                  this.$router.push("/");
                }
                // API.getAuth(e.response.status)
                //console.log(e)
              });
          } else if (this.payment.acctype == 2) {
            this.$axios
              .request({
                url: "/api/quotation/" + this.payment.nisrad,
                method: "post",
                baseURL: process.env.baseUrl
              })
              .then(response => {
                this.personal = response.data;
                if(this.personal == ""){
                  this.isLoading = false;
                  Swal.fire({
                title: "Invalid Application Number",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  this.cancelled();
                }
              });
                }else if(this.personal.estado != "17004"){
                      this.pJobNotAllowed = true;
                      this.isLoading = false;
                    }else{
                        this.$axios
                  .request({
                    url: "/api/pjobbill/" + this.payment.nisrad,
                    method: "post",
                    baseURL: process.env.baseUrl
                  })
                  .then(respo => {
                    //console.log(response.data)
                    var total =
                      (this.personal.security_DEPOSIT +
                      this.personal.connection_CHARGES +
                      this.personal.vat).toFixed(2);
                    if (respo.data != "") {
                      this.paid = respo.data.imp_CTA;

                      if (this.personal.estado != "17004") {
                        this.pJobNotAllowed = true;
                      } else if ((this.payment.amount != (total - this.paid).toFixed(2)) && ((total- this.paid).toFixed(2) < 5000)) {
                        this.overAmount = true;
                        //this.isUSD=true
                        console.log("here 1")
                      }
                    } else if (this.payment.amount != total && total < 5000) {
                      this.overAmount = true;
                     // console.log(total)
                      // this.isUSD=true
                    }else if(this.personal.estado != "17004"){
                      this.isLoading = false;
                      this.pJobNotAllowed = true;
                    }
                  })
                  .catch(e => {
                    if (process.browser) {
                      this.isLoading = false;
                    }
                    if (e.response && e.response.status == 401) {
                      Cookie.remove("auth");
                      this.$store.commit("setAuth", null);
                      this.$router.push("/");
                    }
                    // API.getAuth(e.response.status)
                    //console.log(e)
                  });
                this.isLoading = false;
                }
              this.isLoading = false;
          
              })
              .catch(e => {
                if (process.browser) {
                  this.isLoading = false;
                }
                if (e.response && e.response.status == 401) {
                  Cookie.remove("auth");
                  this.$store.commit("setAuth", null);
                  this.$router.push("/");
                }
                // API.getAuth(e.response.status)
                //console.log(e)
              });
          }
        }else{
          this.emptyNum = true
        }
      }
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
table tr {
  white-space: nowrap;
}
.valueText {
  margin-right: 120px;
  color: #3d405c;
  font-size: 16px;
}
td {
  padding-right: 10px;
}
.divider {
  margin-right: 120px;
}
.titleText {
  color: #979ba1;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted grey;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 40px;
  background-color: grey;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 110%;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent grey transparent transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.activated {
  border-bottom: 8px solid green;
}
.inputPrice input[type='number'] {
    -moz-appearance:textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>
