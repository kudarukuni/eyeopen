<template>
<client-only>
  <div id="pageDashboard" style="min-width:900px;overflow:auto">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg8 sm12 xs12 id="my">
          <v-widget title="Payment Status" content-bg="white">
            <div slot="widget-content">
              <div v-show="paystatus.transStatus=='PENDING SUBSCRIBER VALIDATION'">
                <v-row>
   <img src="/loading.gif" style="align:center" height="150" width="150" alt="loading" />
                <router-link
        to="/home/pay"
      >
      <img src="/tryagain.jpg" style="align:right;margin-left:300px" height="100" width="100" alt="Try again" /></router-link>
              
                </v-row>
             
                <h2 >Transaction In Progress, if you do not get a prompt on your mobile please dial *151*2*4# to approve transaction.</h2>
             </div>

              <div v-show="paystatus.transStatus=='COMPLETED'">
                <img src="/check.gif" style="align:center" height="100" width="100" alt="loading" />
                <h2 style="color:green">Payment Successful!! Thank you for paying your ZESA bills. <router-link
        to="/home/pay"
      >Click here to make another payment</router-link></h2>
              </div>

              <div v-show="paystatus.transStatus=='FAILED'">
                <img src="/failed.png" style="align:center" height="300" width="200" alt="loading" />
                <h2>This Transaction has failed, <router-link
        to="/home/pay"
      >Click here to try again.</router-link></h2>
              </div>

              <div v-show="paystatus.transStatus=='TIMED OUT'">
                <img src="/timed.png" style="align:center" height="300" width="200" alt="loading" />
                <h2>This Transaction has timed out, <router-link
        to="/home/pay"
      >Click here to try again.</router-link></h2>
              </div>
              <table style="width:100%">
                <tr>
                  <td style="max-width:450px">
                    <v-simple-table style="margin-top:50px;max-width:450px">
                <tbody>
                  <tr>
                    <td>Transaction Status</td>
                    <td><p>{{paystatus.transStatus}}</p></td>
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
              </v-simple-table></td>
                  <td> <div v-show="isLoading">
              <p style="line-height: 2.0em;font-family: Consolas"> 
    
    <img src="/logo.png" style="display: block; margin-left: 120px;margin-right: auto;" height="80" width="80" alt="ZETDC Logo" />
     <br> ---------------------------------------- <br>
    
    BPN:200019701 VAT No: 10051551 <br>
    
    ZIMBABWE ELECTRICITY TRANSMISSION<br>
    AND DISTRIBUTION COMPANY<br>
    25 SAMORA MACHEL AVENUE,<br>
    ELECTRICITY CENTRE<br>
    
    HARARE. TEL: 263-242-773300/40<br>
    REG#: 2292/2009<br>
    TAX INVOICE<br>
    Date: {{convertTimeStamp(paystatus.transDate)}}<br>
    
    ........................................<br>
    Receipt no.: {{paystatus.transRef}}<br>
    Identity Number: {{paystatus.accountNumber}}<br>
    <span v-if="paystatus.transRef.length <=22">Electricity Postpaid Bill<br></span> 
    <span v-if="paystatus.transRef.length>22">Electricity New Connection Fee<br></span>
    Customer Name: {{paystatus.customerName}}<br>
    Customer Address: {{paystatus.customerAddress}}<br>
    ........................................<br>
    TOTAL PAID: {{paystatus.amount}}<br>
    ........................................<br>
    ---------------------------------------- </p>
            </div></td>
                </tr>
              </table>
              
              
            </div>
           
          </v-widget>
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

export default {
  layout: "main",
  middleware: "authenticated",
  components: {
    VWidget
  },
  data: () => ({
    color: Material,
    e1: 0,
    receipt:false,
    paystatus: {},
    timer: "",
    account_label: "Account Number",
    payment: {
      mobile: "",
      nisrad: "",
      method: "",
      amount: 0,
      acctype: "",
      zetdcref: ""
    },
    items: [
      {
        accountt: "Postpaid",
        abbr: 1
      },
      {
        accountt: "Prepaid",
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
  created() {
    this.paystatus.transStatus = "Loading..."
    this.paystatus.transRef = "Loading..."
    this.paystatus.accountNumber = "Loading..."
    this.paystatus.amount = "Loading..."
    this.paystatus.mobile = "Loading..."
    this.paystatus.ecocashRef = "Loading..."
    this.paystatus.transDate = new Date().getTime()
    this.checkStatus;
    this.timer = setInterval(this.checkStatus, 3000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    convertTimeStamp: function(unixtimestamp){
// Months array
 var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

 // Convert timestamp to milliseconds
 var date = new Date(unixtimestamp*1);

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
 var convdataTime = day+'-'+month+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
 
 return convdataTime;
 
},
    accType: function(e) {
      if (e == 1) {
        this.account_label = "Account Number";
      } else {
        this.account_label = "Meter Number";
      }
      //console.log(e)
    },
    checkStatus: function() {
      
      this.$axios
        .request({
          url: "/api/checkpayment/" + this.$route.params.ref,
          method: "post",
          baseURL: process.env.baseUrl
        })
        .then(response => {
          //this.isLoading = false;
          this.paystatus = response.data;
          this.paystatus.amount = "$"+this.paystatus.amount.toFixed(2)
          if(this.paystatus.transStatus=="COMPLETED"){
            this.isLoading = true;
            clearInterval(this.timer)
          }else if(this.paystatus.transStatus=="FAILED"){
            //this.isLoading = true;
            clearInterval(this.timer)
          }else if(this.paystatus.transStatus=="TIMED OUT"){
            //this.isLoading = true;
            clearInterval(this.timer)
          }
          //console.log(this.paystatus)
        })
        .catch(e => {
          this.isLoading = false;
          if (e.response && e.response.status == 500) {
            // console.log("couldn't make payment")
          }
        });
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
</style>
