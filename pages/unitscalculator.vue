<template>
  <div id="pageDashboard" style="min-width:900px;overflow:auto">
    <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      <v-card style="min-width:700px;overflow:auto;border-radius:10px">

        <!-- DEFAULT RENDER PAGE -->
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
              :is-full-page="fullPage"
            ></loading>
            <div class="layout column align-center">
              <center><h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color = '#3f51b5'>
                <b>Payment Unit Calculator</b></font>
              </h2></center>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-container fluid grid-list-xl v-if="false">
              <h1 class="flex my-4 secondary--text">
                <b>Prepayment Units Calculator Temporarily Unavailable</b>
              </h1>
            </v-container>

            <!-- DEFAULT RENDERED INPUT FORM -->
            <v-container fluid grid-list-xl v-if="true">
              <v-form ref="form" v-model="valid" lazy-validation @submit.prevent><center>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Meter Number"
                    :rules="[v => !!v || 'Meter Number is required']"
                    color="primary"
                    required
                    outlined
                    v-model="meternumber"
                    id="testing"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Enter Amount"
                    color="primary"
                    :rules="[v => !!v || 'Amount is required',v => /^-?\d+\.?\d*$/.test(v) || 'Invalid Amount']"
                    required
                    outlined
                    v-model="amount"
                    id="testing"
                  ></v-text-field>
                  <v-text-field
                    label="Units"
                    color="primary"
                    required
                    outlined
                    disabled
                    clearable
                    v-model="units"
                    id="testing"
                  ></v-text-field>
                </v-flex>

                <!-- CALCULATE BUTTON CODE SNIPPET -->
                <v-btn color="primary" @click="computeUnits">Calculate</v-btn>
                <!-- END OF CALCULATE BUTTON CODE SNIPPET -->
              
              </center></v-form><br/>

              <div v-if="showed"><center>
                <p style="line-height: 2.0em;font-family: Consolas">
                  <img 
                    src="/logo.png" 
                    style="display: block; margin-left: auto;margin-right: auto;" 
                    height="80" 
                    width="80" 
                    alt="ZETDC Logo"/> 

                    -------------------------------------------- 
                    
                    <br/>
                    Meter Number: {{meternumber}}
                    <br/>
                    Energy To Be Bought (kWh): {{units}}
                    <br/>
                    Tender Amount: ZWL{{amount}}
                    <br/>
                    Energy Charge: ZWL{{energycharge.toFixed(2)}}
                    <br/>
                    
                    <!-- Debt bal: ${{usage.debtbal}}<br> -->
                    <!-- Debt Bal After Payment: ${{(outstandingbal).toFixed(2)}}<br> --> 

                    Debt to be collected: ${{debttaken.toFixed(2)}}
                    <br/>
                    RE Levy (6%): ${{rea.toFixed(2)}}
                    <br/>
                  <span 
                    v-show="usage.trfname == '177' || usage.trfname == '173' || usage.trfname == '174' || usage.trfname == '175' || usage.trfname == '176'">
                    Vat (14.5%): ${{vat.toFixed(2)}}
                    <br/>
                  </span> 
                  Units bought this month (kWh): {{usage.token_UNITS}} 
                  <br/>
                  <span 
                    v-if="usage.trfname == '170' || usage.trfname == '171' || usage.trfname == '181' || usage.trfname == '182' || usage.trfname == '183' || usage.trfname == '184' || usage.trfname == '185' || usage.trfname == '186' || usage.trfname == '187'">
                    Current tarrif band: {{band}}
                  </span>
                  <br/> 

                  ........................................ 

                  <br/>
                  TOTAL TO PAY: ZWL{{amount}}
                  <br/> 

                  ........................................ 

                  <br/> 

                  ----------------------------------------

                </p></center>
              </div>
              <h2 v-if="false" style="color:green">
                <i>To buy {{units}} unit(s) you need to pay: ${{amount}} for Meter Number: {{usage.msno}}</i>
              </h2>
              <h2 v-if="false" style="color:green">
                <i>For amount ${{amount}} you will get {{units}} unit(s), for Meter Number: {{usage.msno}}</i>
              </h2>
              <v-btn style="margin-right:20px" outlined big color="indigo" :href="'/'">Back Home</v-btn>
            </v-container>
          </div>
          
        </v-card-text>
      </v-card>
    </client-only>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import API from "@/variables";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  layout: "regauth",
  middleware: "notAuthenticated",
  components: {
    Loading
  },
  data: () => ({
    date: "",
    loading: false,
    rea: 0,
    vat: 0,
    debttaken: 0,
    band: "",
    outstandingbal: 0,
    energycharge: 0,
    meternumber: "",
    API: API,
    amount: "",
    units: 0,
    isLoading: false,
    fullPage: true,
    valid: true,
    usage: {},
    showed: false,
    showedd: false
  }),
  created() {},

  methods: {
    isNumber: function isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    },
    computeAmount: function() {
      if (this.$refs.form.validate()) {
        this.showed = false;
        this.showedd = false;
        var subtot = 0;
        this.isLoading = true;
        this.$axios
          .request({
            url: "/api/computeamount/" + API.encryptData(this.meternumber),
            method: "post",
            baseURL: process.env.baseUrl
          })
          .then(response => {
            this.isLoading = false;
            this.usage = response.data;

            if (
              this.usage.trfname == "170" ||
              this.usage.trfname == "171" ||
              this.usage.trfname == "181" ||
              this.usage.trfname == "182" ||
              this.usage.trfname == "183" ||
              this.usage.trfname == "184" ||
              this.usage.trfname == "185" ||
              this.usage.trfname == "186" ||
              this.usage.trfname == "187"
            ) {
              //console.log(this.usage.total_UNITS + Number(this.units));
              //console.log("heyyyyystart")
              var i = 0;
              for (
                i = (this.usage.token_UNITS + 1).toFixed(0);
                i <= (this.usage.token_UNITS + Number(this.units)).toFixed(0);
                i++
              ) {
                if (i > 0 && i <= 50) {
                  subtot += 0.41;
                } else if (i > 50 && i <= 200) {
                  subtot += 0.91;
                  //console.log(i);
                } else if (i > 200) {
                  subtot += 3.87;
                }
              }
              if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
                // console.log("heyyyyy")

                //console.log(i);
                //this.showed = true;

                this.amount = subtot.toFixed(2) / 0.94;

                this.rea = this.amount * 0.06;

                this.energycharge = this.amount - this.rea;
                this.amount = this.amount / (1 - this.usage.percentage / 100);
                this.debttaken = this.amount - this.energycharge - this.rea;
                this.outstandingbal = this.usage.debtbal - this.debttaken;
                if (this.outstandingbal < 0) {
                  this.outstandingbal = 0;
                  this.amount = this.amount + this.outstandingbal;

                  var amnt = this.amount - this.usage.debtbal;
                  this.rea = amnt * 0.06;
                  this.energycharge = amnt - this.rea;
                  this.debttaken = this.usage.debtbal;
                }
                /*  this.amount = (
                Number(subtot.toFixed(2)) + this.rea
              );

              this.debttaken=(this.amount * (this.usage.percentage/100));
               this.energycharge=(this.amount-this.debttaken-this.rea);
              this.amount=(this.amount + this.debttaken).toFixed(2); */
              } else if (
                this.usage.per_VENDAMT != 0 &&
                this.usage.debtbal != 0
              ) {
                this.amount = subtot.toFixed(2) / 0.94;

                this.rea = this.amount * 0.06;

                this.energycharge = this.amount - this.rea;
                this.amount = (this.amount + this.usage.per_VENDAMT).toFixed(2);
                this.debttaken = this.amount - this.energycharge - this.rea;
                this.outstandingbal = this.usage.debtbal - this.debttaken;
                if (this.outstandingbal < 0) {
                  this.outstandingbal = 0;
                  this.amount = this.amount + this.outstandingbal;

                  var amnt = this.amount - this.usage.debtbal;
                  this.rea = amnt * 0.06;
                  this.energycharge = amnt - this.rea;
                  this.debttaken = this.usage.debtbal;
                }
              } else if (
                this.usage.monthlyamt != 0 &&
                this.usage.debtbal != 0
              ) {
                this.amount = subtot.toFixed(2) / 0.94;

                this.rea = this.amount * 0.06;

                this.energycharge = this.amount - this.rea;
                if (this.usage.token_AMOUNT == 0) {
                  this.amount = (this.amount + this.usage.monthlyamt).toFixed(
                    2
                  );
                  this.debttaken = this.usage.monthlyamt;
                } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
                  this.amount = this.amount.toFixed(2);
                  this.debttaken = 0;
                }

                //this.debttaken = this.usage.monthlyamt
              } else {
                this.amount = subtot.toFixed(2) / 0.94;

                this.rea = this.amount * 0.06;

                this.energycharge = this.amount - this.rea;
                this.amount = this.amount.toFixed(2);
                this.debttaken = 0;
              }

              if (this.usage.token_UNITS >= 0 && this.usage.token_UNITS <= 50) {
                this.band = "0 - 50";
              } else if (
                this.usage.token_UNITS > 50 &&
                this.usage.token_UNITS <= 200
              ) {
                this.band = "51 - 200";
              } else if (this.usage.token_UNITS > 200) {
                this.band = "200+";
              }
            } else if (this.usage.trfname == "177") {
              if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
                this.amount = (this.units * 0.91) / 0.79;

                this.rea = this.amount * 0.06;
                this.vat = this.amount * 0.15;
                this.energycharge = this.amount - this.rea - this.vat;
                this.amount = (
                  this.amount /
                  (1 - this.usage.percentage / 100)
                ).toFixed(2);
                this.debttaken =
                  this.amount - this.energycharge - this.rea - this.vat;
              } else if (
                this.usage.per_VENDAMT != 0 &&
                this.usage.debtbal != 0
              ) {
                this.amount = (this.units * 0.91) / 0.79;
                this.rea = this.amount * 0.06;
                this.vat = this.amount * 0.15;
                this.energycharge = this.amount - this.rea - this.vat;
                this.amount = (this.amount + this.usage.per_VENDAMT).toFixed(2);
                this.debttaken = this.usage.per_VENDAMT;
              } else if (
                this.usage.monthlyamt != 0 &&
                this.usage.debtbal != 0
              ) {
                this.amount = (this.units * 0.91) / 0.79;

                this.rea = this.amount * 0.06;
                this.vat = this.amount * 0.15;
                this.energycharge = this.amount - this.rea - this.vat;
                if (this.usage.token_AMOUNT == 0) {
                  this.amount = (this.amount + this.usage.monthlyamt).toFixed(
                    2
                  );
                  this.debttaken = this.usage.monthlyamt;
                } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
                  this.amount = this.amount.toFixed(2);
                  this.debttaken = 0;
                }

                //this.debttaken = this.usage.monthlyamt
              } else {
                this.amount = (this.units * 0.91) / 0.79;

                this.rea = this.amount * 0.06;
                this.vat = this.amount * 0.15;
                this.energycharge = this.amount - this.rea - this.vat;
                this.amount = this.amount.toFixed(2);
                this.debttaken = 0;
              }

              //this.showed = true;
            } else if (
              this.usage.trfname == "173" ||
              this.usage.trfname == "174" ||
              this.usage.trfname == "175" ||
              this.usage.trfname == "176"
            ) {
              if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
                this.amount = (this.units * 2) / 0.79;

                this.rea = this.amount * 0.06;
                this.vat = this.amount * 0.15;
                this.energycharge = this.amount - this.rea - this.vat;
                this.amount = (
                  this.amount /
                  (1 - this.usage.percentage / 100)
                ).toFixed(2);
                this.debttaken =
                  this.amount - this.energycharge - this.rea - this.vat;
              } else if (
                this.usage.per_VENDAMT != 0 &&
                this.usage.debtbal != 0
              ) {
                this.amount = (this.units * 2) / 0.79;
                this.rea = this.amount * 0.06;
                this.vat = this.amount * 0.15;
                this.energycharge = this.amount - this.rea - this.vat;
                this.amount = (this.amount + this.usage.per_VENDAMT).toFixed(2);
                this.debttaken = this.usage.per_VENDAMT;
              } else if (
                this.usage.monthlyamt != 0 &&
                this.usage.debtbal != 0
              ) {
                this.amount = (this.units * 2) / 0.79;

                this.rea = this.amount * 0.06;
                this.vat = this.amount * 0.15;
                this.energycharge = this.amount - this.rea - this.vat;
                if (this.usage.token_AMOUNT == 0) {
                  this.amount = (this.amount + this.usage.monthlyamt).toFixed(
                    2
                  );
                  this.debttaken = this.usage.monthlyamt;
                } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
                  this.amount = this.amount.toFixed(2);
                  this.debttaken = 0;
                }

                //this.debttaken = this.usage.monthlyamt
              } else {
                this.amount = (this.units * 2) / 0.79;

                this.rea = this.amount * 0.06;
                this.vat = this.amount * 0.15;
                this.energycharge = this.amount - this.rea - this.vat;
                this.amount = this.amount.toFixed(2);
                this.debttaken = 0;
              }

              // this.showed = true;
            }

            //console.log(this.usage);
            this.date = new Date();
            if (this.usage == "") {
              this.showed = false;
              Swal.fire({
                title: "Invalid Meter Number...",
                type: "error",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  //this.$router.push("/");
                }
              });
            } else {
              // this.showed = true;
              this.isLoading = false;
              this.usage = response.data;
              if (this.usage.token_UNITS >= 0 && this.usage.token_UNITS <= 50) {
                this.band = "0 - 50";
              } else if (
                this.usage.token_UNITS > 50 &&
                this.usage.token_UNITS <= 200
              ) {
                this.band = "51 - 200";
              } else if (this.usage.token_UNITS > 200) {
                this.band = "200+";
              }
              //console.log(response.data);
            }

            //loader.hide()
          })
          .catch(e => {
            this.isLoading = false;
            //   console.log(e)
          });
      }
    },
    computeUnits: function() {
      if (this.$refs.form.validate()) {
        this.showedd = false;
        this.showed = false;
        var subtot = 0;
        // this.amount = this.amount - (this.amount * 0.06);

        //console.log(amount);
        this.isLoading = true;
        this.$axios
          .request({
            url: "/api/computeamount/" + API.encryptData(this.meternumber),
            method: "post",
            baseURL: process.env.baseUrl
          })
          .then(response => {
            this.isLoading = false;
            this.usage = response.data;
            this.showed = true;
            this.usage.debtbal=this.usage.debtbal * -1 ;

           if (
     this.usage.trfname == "170" ||
    this.usage.trfname == "171" ||
    this.usage.trfname == "181" ||
    this.usage.trfname == "182" ||
    this.usage.trfname == "183" ||
    this.usage.trfname == "184" ||
    this.usage.trfname == "185" ||
    this.usage.trfname == "186" ||
    this.usage.trfname == "187"
    ) {
      //this.usage.debtbal=this.usage.debtbal * -1 ;

    //console.log(this.usage.total_UNITS + Number(this.units));
    if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
    // var amount = this.amount - this.amount * 0.06;
    this.debttaken = this.amount * (this.usage.percentage / 100);

    if (this.debttaken > this.usage.debtbal) {
    var amount = this.amount - this.usage.debtbal;
    this.debttaken = this.usage.debtbal;
    } else {
    var amount = this.amount - this.debttaken;
    }
    
    this.rea = amount * 0.06;
    amount = amount - this.rea;
    this.energycharge = amount;
    } else if (
    this.usage.per_VENDAMT != 0 &&
    this.usage.debtbal != 0
    ) {
    // var amount = this.amount - this.amount * 0.06;
    this.debttaken = this.usage.per_VENDAMT;

    if (this.debttaken > this.usage.debtbal) {
    var amount = this.amount - this.usage.debtbal;
    this.debttaken = this.usage.debtbal;
    } else {
    var amount = this.amount - this.debttaken;
    }
    
    this.rea = amount * 0.06;
    amount = amount - this.rea;
    this.energycharge = amount;
    } else if (
    this.usage.monthlyamt != 0 &&
    this.usage.debtbal != 0
    ) {
    // var amount = this.amount - this.amount * 0.06;
    
    if (
    this.usage.token_AMOUNT >= 0 &&
    this.usage.token_AMOUNT < this.usage.monthlyamt
    ) {
    //this.amount=((this.amount)+this.usage.monthlyamt).toFixed(2)
    this.debttaken = this.usage.monthlyamt;
    } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
    //this.amount=((this.amount)).toFixed(2)
    this.debttaken = 0;
    }
    //this.debttaken=this.usage.per_VENDAMT
    var amount = this.amount - this.debttaken;
    this.rea = amount * 0.06;
    amount = amount - this.rea;
    this.energycharge = amount;
    } else {
    this.debttaken = 0;
    var amount = this.amount - this.debttaken;
    this.rea = amount * 0.06;
    amount = amount - this.rea;
    this.energycharge = amount;
    }
    if (this.usage.token_UNITS >= 0 && this.usage.token_UNITS <= 50) {
    var test = (50 - this.usage.token_UNITS) * 17.21;
    if (amount < test) {  
    this.units = (amount / 17.21).toFixed(2);
    
    } 
    else {
    var units = 50 - this.usage.token_UNITS;
    var bal = amount - test;
    var test2 = 50 * 34.5;
    if (bal < test2) {
    this.units = (bal / 34.5 + units).toFixed(2);
    } else {
     // var units=50 - this.usage.token_UNITS;
      var bal2=bal - test2;
      var test3=100 * 60.45 ;
      if (bal2<test3){
      this.units = (bal2 / 60.45 + units+50).toFixed(2);
      }
      else{
        //var units = 50 - this.usage.token_UNITS;
        var bal3=bal2 - test3;
        var test4=100 * 86.3;
        if (bal3<test4){
         this.units = (bal3 / 86.3 + units + 50 + 100).toFixed(2); 
        }
        else{
         var bal4 = bal3 - test4;
         var test5 = 100 * 99.17;
          if (bal4<test5){
            this.units = (bal4 / 99.17 + units + 50 + 100 + 100).toFixed(2);
          }
          else{
            var bal5 = bal4 - test5;
            //var test6= bal5 / 9.80;
            this.units = (bal5 / 103.51 + units + 50 + 100 + 100 + 100).toFixed(2);
          }
        }
      }
    }
  }
}
else if 
    (this.usage.token_UNITS > 50 && this.usage.token_UNITS <= 100) 
    {
    var test = (100 - this.usage.token_UNITS) * 34.5;
    if (amount < test) {
    this.units = (amount / 34.5).toFixed(2);
    } 
    else {
    var units = 100 - this.usage.token_UNITS;
    var bal = amount - test;
    var test2 = 100 * 60.45;
    if (bal < test2) {
    this.units = (bal / 60.45 + units).toFixed(2);
    } else {
     // var units=50 - this.usage.token_UNITS;
      var bal2=bal - test2;
      var test3=100 * 86.3 ;
      if (bal2<test3){
      this.units = (bal2 / 86.3 + units + 100).toFixed(2);
      }
      else{
        //var units = 50 - this.usage.token_UNITS;
        var bal3=bal2 - test3;
        var test4=100 * 99.17;
        if (bal3<test4){
         this.units = (bal3 / 99.17 + units + 100 + 100).toFixed(2); 
        }
        
          else{
            var bal4 = bal3 - test4;
            //var test6= bal5 / 9.80;
            this.units = (bal4 / 103.51 + units + 100+ 100 + 100 ).toFixed(2);
          }
        
      }
    }
  }
}
else if 
    (this.usage.token_UNITS > 100 && this.usage.token_UNITS <= 200) 
    {
    var test = (200 - this.usage.token_UNITS) * 60.45;
    if (amount < test) {
    this.units = (amount / 60.45).toFixed(2);
    
    } 
    else {
    var units = 200 - this.usage.token_UNITS;
    var bal = amount - test;
    var test2 = 100 * 86.3;
    if (bal < test2) {
    this.units = (bal / 86.3 + units).toFixed(2);
    } else {
     // var units=50 - this.usage.token_UNITS;
      var bal2=bal - test2;
      var test3=100 * 99.17 ;
      if (bal2<test3){
      this.units = (bal2 / 99.17 + units + 100).toFixed(2);
      }
          else{
            var bal3 = bal2 - test3;
            //var test6= bal5 / 9.80;
            this.units = (bal3 / 103.51 + units + 100+ 100).toFixed(2);
      }
    }
  }
}
else if 
    (this.usage.token_UNITS > 200 && this.usage.token_UNITS <= 300) 
    {
    var test = (300 - this.usage.token_UNITS) * 86.3;
    if (amount < test) {
    this.units = (amount / 86.3).toFixed(2);
    } 
    else {
    var units = 300 - this.usage.token_UNITS;
    var bal = amount - test;
    var test2 = 100 * 99.17;
    if (bal < test2) {
    this.units = (bal / 99.17 + units).toFixed(2);
    } 
    
          else{
            var bal2 = bal - test2;
            //var test6= bal5 / 9.80;
            this.units = (bal2 / 103.51 + units + 100).toFixed(2);
      }
    
  }
}
else if 
    (this.usage.token_UNITS > 300 && this.usage.token_UNITS <= 400) 
    {
    var test = (400 - this.usage.token_UNITS) * 99.17;
    if (amount < test) {
    this.units = (amount / 99.17).toFixed(2);
    } 
    
          else{
            var bal = amount - test;
            //var test6= bal5 / 9.80;
            this.units = (bal / 103.51 + units).toFixed(2);
  }
}
else if 
    (this.usage.token_UNITS > 400) 
    {
    this.units = (amount / 103.51).toFixed(2);
    }
     } 
            else if (this.usage.trfname == "177") {
              if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.amount * (this.usage.percentage / 100);
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.per_VENDAMT != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.usage.per_VENDAMT;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.monthlyamt != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;

                if (
                  this.usage.token_AMOUNT >= 0 ||
                  this.usage.token_AMOUNT < this.usage.monthlyamt
                ) {
                  //this.amount=((this.amount)+this.usage.monthlyamt).toFixed(2)
                  this.debttaken =
                    this.usage.monthlyamt - this.usage.token_AMOUNT;
                } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
                  //this.amount=((this.amount)).toFixed(2)
                  this.debttaken = 0;
                }
                //this.debttaken=this.usage.per_VENDAMT
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else {
                this.debttaken = 0;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              }

              // amount = amount + this.amount * 0.06
              // amount = amount - (amount * 0.21)
              // this.showedd = true;
              this.units = (amount / 38.55).toFixed(2);
            } else if (
              this.usage.trfname == "173" ||
              this.usage.trfname == "174" ||
              this.usage.trfname == "175" ||
              this.usage.trfname == "176"
            ) {
              //this.showedd = true;
              if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.amount * (this.usage.percentage / 100);
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.per_VENDAMT != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.usage.per_VENDAMT;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.monthlyamt != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;

                if (
                  this.usage.token_AMOUNT >= 0 ||
                  this.usage.token_AMOUNT < this.usage.monthlyamt
                ) {
                  //this.amount=((this.amount)+this.usage.monthlyamt).toFixed(2)
                  this.debttaken =
                    this.usage.monthlyamt - this.usage.token_AMOUNT;
                } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
                  //this.amount=((this.amount)).toFixed(2)
                  this.debttaken = 0;
                }
                //this.debttaken=this.usage.per_VENDAMT
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else {
                this.debttaken = 0;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              }

              // amount = amount + this.amount * 0.06
              // amount = amount - (amount * 0.21)
              // this.showedd = true;
              this.units = (amount / 84.76).toFixed(2);
            }
///////////////////RING FENCED//////////////////////////////////
            else if (
              this.usage.trfname == "814" ||
              this.usage.trfname == "875" ||
              this.usage.trfname == "885" ||
              this.usage.trfname == "890" ||
              this.usage.trfname == "895" ||
              this.usage.trfname == "880" 

            ) {
              //this.showedd = true;
              if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.amount * (this.usage.percentage / 100);
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.per_VENDAMT != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.usage.per_VENDAMT;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.monthlyamt != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;

                if (
                  this.usage.token_AMOUNT >= 0 ||
                  this.usage.token_AMOUNT < this.usage.monthlyamt
                ) {
                  //this.amount=((this.amount)+this.usage.monthlyamt).toFixed(2)
                  this.debttaken =
                    this.usage.monthlyamt - this.usage.token_AMOUNT;
                } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
                  //this.amount=((this.amount)).toFixed(2)
                  this.debttaken = 0;
                }
                //this.debttaken=this.usage.per_VENDAMT
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else {
                this.debttaken = 0;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              }

              // amount = amount + this.amount * 0.06
              // amount = amount - (amount * 0.21)
              // this.showedd = true;

              this.units = (amount / 0.122).toFixed(2);
            }
////////////////////////////NORMAL USD//////////////////////////////////////
else if (
              this.usage.trfname == "855" ||
              this.usage.trfname == "836" ||
              this.usage.trfname == "830" ||
              this.usage.trfname == "823" 
            ) 
            {
              //this.showedd = true;
              if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.amount * (this.usage.percentage / 100);
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.per_VENDAMT != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.usage.per_VENDAMT;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.monthlyamt != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;

                if (
                  this.usage.token_AMOUNT >= 0 ||
                  this.usage.token_AMOUNT < this.usage.monthlyamt
                ) {
                  //this.amount=((this.amount)+this.usage.monthlyamt).toFixed(2)
                  this.debttaken =
                    this.usage.monthlyamt - this.usage.token_AMOUNT;
                } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
                  //this.amount=((this.amount)).toFixed(2)
                  this.debttaken = 0;
                }
                //this.debttaken=this.usage.per_VENDAMT
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else {
                this.debttaken = 0;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              }

              // amount = amount + this.amount * 0.06
              // amount = amount - (amount * 0.21)
              // this.showedd = true;

              this.units = (amount / 0.16).toFixed(2);
            }
//////////////////////////NORMAL USD//////////////////////////////////
else if (
              this.usage.trfname == "845" ||
              this.usage.trfname == "850"           

            ) 
            {
              //this.showedd = true;
              if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.amount * (this.usage.percentage / 100);
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.per_VENDAMT != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.usage.per_VENDAMT;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else if (
                this.usage.monthlyamt != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;

                if (
                  this.usage.token_AMOUNT >= 0 ||
                  this.usage.token_AMOUNT < this.usage.monthlyamt
                ) {
                  //this.amount=((this.amount)+this.usage.monthlyamt).toFixed(2)
                  this.debttaken =
                    this.usage.monthlyamt - this.usage.token_AMOUNT;
                } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
                  //this.amount=((this.amount)).toFixed(2)
                  this.debttaken = 0;
                }
                //this.debttaken=this.usage.per_VENDAMT
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              } else {
                this.debttaken = 0;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                this.vat = amount * 0.145;
                amount = amount - this.rea - this.vat;
                this.energycharge = amount;
              }

              // amount = amount + this.amount * 0.06
              // amount = amount - (amount * 0.21)
              // this.showedd = true;

              this.units = (amount / 0.13).toFixed(2);
            }
/////////////////////RING FENCED DOMESTIC/////////////////////////////////////
else if (
     this.usage.trfname == "802"    
    ) 
                {
              //this.showedd = true;
              if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.amount * (this.usage.percentage / 100);
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                //this.vat = amount * 0.145;
                amount = amount - this.rea;
                this.energycharge = amount;
              } else if (
                this.usage.per_VENDAMT != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;
                this.debttaken = this.usage.per_VENDAMT;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                //this.vat = amount * 0.145;
                amount = amount - this.rea;
                this.energycharge = amount;
              } else if (
                this.usage.monthlyamt != 0 &&
                this.usage.debtbal != 0
              ) {
                // var amount = this.amount - this.amount * 0.06;

                if (
                  this.usage.token_AMOUNT >= 0 ||
                  this.usage.token_AMOUNT < this.usage.monthlyamt
                ) {
                  //this.amount=((this.amount)+this.usage.monthlyamt).toFixed(2)
                  this.debttaken =
                    this.usage.monthlyamt - this.usage.token_AMOUNT;
                } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
                  //this.amount=((this.amount)).toFixed(2)
                  this.debttaken = 0;
                }
                //this.debttaken=this.usage.per_VENDAMT
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                //this.vat = amount * 0.145;
                amount = amount - this.rea;
                this.energycharge = amount;
              } else {
                this.debttaken = 0;
                var amount = this.amount - this.debttaken;
                this.rea = amount * 0.06;
                //this.vat = amount * 0.145;
                amount = amount - this.rea;
                this.energycharge = amount;
              }

              // amount = amount + this.amount * 0.06
              // amount = amount - (amount * 0.21)
              // this.showedd = true;

              this.units = (amount / 0.122).toFixed(2);
            }
            if (
     this.usage.trfname == "813"    
    ) 
{
      //this.usage.debtbal=this.usage.debtbal * -1 ;

    //console.log(this.usage.total_UNITS + Number(this.units));

    if (this.usage.percentage != 0 && this.usage.debtbal != 0) {
    // var amount = this.amount - this.amount * 0.06;
    this.debttaken = this.amount * (this.usage.percentage / 100);

    if (this.debttaken > this.usage.debtbal) {
    var amount = this.amount - this.usage.debtbal;
    this.debttaken = this.usage.debtbal;
    } else {
    var amount = this.amount - this.debttaken;
    }
    
    this.rea = amount * 0.06;
    amount = amount - this.rea;
    this.energycharge = amount;
    }

     else if (
    this.usage.per_VENDAMT != 0 &&
    this.usage.debtbal != 0
    ) {
    // var amount = this.amount - this.amount * 0.06;
    this.debttaken = this.usage.per_VENDAMT;

    if (this.debttaken > this.usage.debtbal) {
    var amount = this.amount - this.usage.debtbal;
    this.debttaken = this.usage.debtbal;
    } else {
    var amount = this.amount - this.debttaken;
    }
    
    this.rea = amount * 0.06;
    amount = amount - this.rea;
    this.energycharge = amount;
    }
     else if (
    this.usage.monthlyamt != 0 &&
    this.usage.debtbal != 0
    ) {
    // var amount = this.amount - this.amount * 0.06;
    
    if (
    this.usage.token_AMOUNT >= 0 &&
    this.usage.token_AMOUNT < this.usage.monthlyamt
    ) {
    //this.amount=((this.amount)+this.usage.monthlyamt).toFixed(2)
    this.debttaken = this.usage.monthlyamt;
    } else if (this.usage.token_AMOUNT >= this.usage.monthlyamt) {
    //this.amount=((this.amount)).toFixed(2)
    this.debttaken = 0;
    }
    //this.debttaken=this.usage.per_VENDAMT
    var amount = this.amount - this.debttaken;
    this.rea = amount * 0.06;
    amount = amount - this.rea;
    this.energycharge = amount;
    }
     else {
    this.debttaken = 0;
    var amount = this.amount - this.debttaken;
    this.rea = amount * 0.06;
    amount = amount - this.rea;
    this.energycharge = amount;
    }

    if (this.usage.token_UNITS >= 0 && this.usage.token_UNITS <= 50) {
    var test = (50 - this.usage.token_UNITS) * 0.03;
    if (amount < test) {  
    this.units = (amount / 0.03).toFixed(2);
    
    } 
    else {
    var units = 50 - this.usage.token_UNITS;
    var bal = amount - test;
    var test2 = 250 * 0.12;
    if (bal < test2) {
    this.units = (bal / 0.12 + units).toFixed(2);
    }
    
          else{
            var bal2 = bal - test2;
            //var test6= bal5 / 9.80;
            this.units = (bal2 / 0.16 + units + 50 + 250).toFixed(2);
          } 
  }
}


else if 
    (this.usage.token_UNITS > 50 && this.usage.token_UNITS <= 300) 
    {
    var test = (300 - this.usage.token_UNITS) * 0.12;
    if (amount < test) {
    this.units = (amount / 0.12).toFixed(2);
    } 
    
          else{
            var bal = amount - test;
            //var test6= bal5 / 9.80;
            this.units = (bal / 0.16 + units).toFixed(2);
  }
}
else if 
    (this.usage.token_UNITS > 300) 
    {
    this.units = (amount / 0.16).toFixed(2);
    }
     } 

  

            //console.log(this.usage);
            this.date = new Date();
            if (this.usage == "") {
              this.showed = false;
              Swal.fire({
                title: "Invalid Meter Number...",
                type: "error",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  //this.$router.push("/");
                }
              });
            } else {
              // this.showed = true;
              this.isLoading = false;
              this.usage = response.data;
              if (this.usage.token_UNITS >= 0 && this.usage.token_UNITS <= 50) {
                this.band = "0 - 50";
              } else if (
                this.usage.token_UNITS > 50 && this.usage.token_UNITS <= 100
              ) {
                this.band = "51 - 100";
              } 
              else if (
                this.usage.token_UNITS > 100 && this.usage.token_UNITS <= 200
              ) {
                this.band = "100 - 200";
              }
              else if (this.usage.token_UNITS > 200 && this.usage.token_UNITS <= 300) {
                this.band = "200-300";
              }
              else if (this.usage.token_UNITS > 300 && this.usage.token_UNITS <= 400) {
                this.band = "300+";
              }
             
              else if (this.usage.token_UNITS > 400 ) {
                this.band = "400+";
              //console.log(response.data);
            }
              //console.log(response.data);
            }
            if (this.units<0){
              this.units=0;
            }
            //loader.hide()
          })
          .catch(e => {
            this.isLoading = false;
            //   console.log(e)
          });
      }
    }
  }
}; 
</script>

<style scoped>
.container {
  margin-top: 0 !important;
}

.activestate {
  color: rgb(12, 161, 45);
  cursor: pointer;
}

@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.nextstage {
  color: rgb(17, 17, 233);
  -webkit-animation: flickerAnimation 0.5s infinite;
  -moz-animation: flickerAnimation 0.5s infinite;
  -o-animation: flickerAnimation 0.5s infinite;
  animation: flickerAnimation 0.5s infinite;
}
p {
  font-size: 13px;
}
</style>
