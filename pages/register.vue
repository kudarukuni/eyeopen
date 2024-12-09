<template>
  <div id="pageDashboard" style="min-width:900px;overflow:auto">
    <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      <v-card class="elevation-1 pa-3">
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
        <v-card-text>
          <center><h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color = '#3f51b5'>
            <b>Register</b></font>
          </h2></center>
          <div class="layout column align-center">
            <p style=" text-align: justify;text-justify: inter-word;">
              By registering, existing customers will be able to access their electricity account, pay bills online, view their
              usage and payment history and more. If you do not have an electric service account, please complete a
              <nuxt-link to="/terms" style="color: primary"><b>New Connection Form</b></nuxt-link> or visit our nearest ZETDC offices for assistance.
            </p>
          </div>
          <v-alert type="error" :value="errors.length>0" :dismissible="true">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </v-alert>
          <v-alert type="success" :value="success.length>0" :dismissible="true">
            <p v-for="succ in success" :key="succ">{{ succ }}</p>
          </v-alert>
          <v-form ref="form">
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" editable step="1">My Account Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" editable step="2">My Personal Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" editable>My Authentication Information</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                
                <v-stepper-content step="1">
                  <v-card class="mb-5" height="300px">
                    <v-form ref="form1">
                      <v-flex xs12 sm4 d-flex>
                        <v-select
                          :items="accounts"
                          v-model="model.account_type"
                          label="Account Type"
                          item-text="accountt"
                          required
                          :rules="[v => !!v || 'Account Type is required']"
                          item-value="abbr"
                          @change="accType($event)"
                          class="input-group--focused"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm4 d-flex>
                        <v-text-field
                          autocomplete="off"
                          name="input-1"
                          :label="account_label"
                          color="primary"
                          :maxlength="max"
                          :rules="inputField"
                          v-model="model.account[0].nis_RAD"
                          required
                          id="testing"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 d-flex>
                        <v-text-field
                          name="input-1"
                          :label="veri_label"
                          color="primary"
                          :rules="inputField"
                          v-model="model.verification"
                          id="testing"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 d-flex>
                        <v-text-field
                          name="input-1"
                          :label="veri2_label"
                          color="primary"
                          prefix="$"
                          :rules="[v => /^-?\d+\.?\d*$/.test(v) || 'Invalid Amount']"
                          v-model="model.verification2"
                          id="testing"
                        ></v-text-field>
                      </v-flex>
                    </v-form>
                  </v-card>
                  <v-btn color="primary" @click="nextStep(1)">Continue</v-btn>
                  <v-btn text @click="cancelled">Cancel</v-btn>
                </v-stepper-content>
                
                <center><v-stepper-content step="2">
                  <v-card class="mb-5" height="350px">
                    <v-form ref="form2">
                      <v-flex xs12 sm4 d-flex>
                        <v-text-field
                          name="input-1"
                          label="Name"
                          color="primary"
                            :rules="[v => /^([a-zA-Z]+((['][a-zA-Z ])?[a-zA-Z]*)){2,30}$/.test(v) || 'Invalid Name']"
                          v-model="model.name"
                          id="testing"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 d-flex>
                        <v-text-field
                          name="input-1"
                          label="Surname"
                          color="primary"
                          :rules="[v => /^([a-zA-Z]+((['][a-zA-Z ])?[a-zA-Z]*)){2,30}$/.test(v) || 'Invalid Surname']"
                          v-model="model.surname"
                          id="testing"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 d-flex>
                        <v-autocomplete
                          :items="countries"
                          v-model="model.country"
                          label="Country"
                          :rules="[v => !!v || 'Country is required']"
                          item-text="country"
                          item-value="abbr"
                          class="input-group--focused"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex xs12 sm4 d-flex>
                        <VuePhoneNumberInput
                          v-model="cell"
                          required
                          default-country-code="ZW"
                          valid-color="green"
                          @update="onUpdate"/>
                      </v-flex>
                      <v-flex xs12 sm4 d-flex>
                        <v-text-field
                          name="input-1"
                          type="email"
                          label="Email"
                          v-model="model.email"
                          :rules="[  v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                          color="primary"
                          id="testing"
                        ></v-text-field>
                      </v-flex>
                    </v-form>
                  </v-card>
                  <v-btn color="primary" @click="nextStep(2)">Continue</v-btn>
                  <v-btn text @click="cancelled">Cancel</v-btn>
                </v-stepper-content></center>
                
                <p align="right"><v-stepper-content step="3">
                  <v-card class="mb-5" height="300px">
                    <v-form ref="form3">
                      <v-flex xs12 sm4 d-flex>
                        <v-text-field
                          autocomplete="off"
                          name="input-1"
                          label="Username"
                          :rules="[v => /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/.test(v) || 'Invalid Username, Please Avoid Spaces & Special Characters, Length Must Be Atleast 5']"
                          color="primary"
                          v-model="model.username"
                          id="testing"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 d-flex>
                        <v-text-field
                          autocomplete="off"
                          name="input-1"
                          :append-icon="visible ? 'visibility' : 'visibility_off'"
                          @click:append="visible = !visible"
                          label="Password"
                          :type="visible ? 'text' : 'password'"
                          :rules="[
                          v => !!v || 'Password is required',
                          v => (v && v.length >= 8) || 'Password should be at least 8 characters'
                        ]"
                          v-model="model.password"
                          color="primary"
                          id="testing"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 d-flex>
                        <v-text-field
                          label="Confirm Password"
                          :append-icon="visible1 ? 'visibility' : 'visibility_off'"
                          @click:append="visible1 = !visible1"
                          :type="visible1 ? 'text' : 'password'"
                          :rules="[v => (v && v == model.password) || 'Passwords do not match']"
                          v-model="confirm_password"
                          id="testing"
                          tile
                        ></v-text-field>
                      </v-flex>
                      <vue-recaptcha
                        @verify="markRecaptchaAsVerified"
                        @expired="markRecaptchaAsNotVerified"
                        sitekey="6LdbGLUUAAAAAH3ef3VKawMKVKK_kNvcJXirQGy7"
                        :loadRecaptchaScript="true"
                      ></vue-recaptcha>
                    </v-form>
                  </v-card>
                  <v-btn color="primary" @click="nextStep(3)" :loading="loading">Finish</v-btn>
                  <v-btn text @click="cancelled">Cancel</v-btn>
                </v-stepper-content></p>

              </v-stepper-items>
            </v-stepper>
          </v-form>
        </v-card-text>
        <div>
          <v-spacer></v-spacer>
          <center><v-btn style="margin-top:20px" outlined big color="indigo" :href="'/'">Already Have An Account ?</v-btn></center>
        </div>
      </v-card>
    </client-only> 
  </div>
</template>

<script>
import Account from "@/variables/account";
import API from "@/variables";
import Country from "@/variables/country";
import VueRecaptcha from "vue-recaptcha";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  layout: "regauth",
  components: {
    VueRecaptcha,
    VuePhoneNumberInput,
    Loading
  },
  data: () => ({
    loading: false,
    visible: false,
    isLoading: false,
    fullPage: true,
    API: API,
    cell: "",
    visible1: false,
    confirm_password: "",
    account_type: 0,
    errors: [],
    pleaseTickRecaptchaMessage: "",
    recaptchaVerified: false,
    success: [],
    e1: 0,
    max: 12,
    inputField: [v => (v && v.length >= 5) || "Minimum Length is 5"],
    account_label: "Account Number",
    veri_label: "Previous Bill Number",
    veri2_label: "Previous Bill Amount",
    model: {
      username: "",
      password: "",
      name: "",
      verification: "",
      verification2: 0,
      surname: "",
      phone: "",
      email: "",
      country: "",
      account_type: 0,
      roles: [
        {
          name: "USER"
        }
      ],
      account: [
        {
          nis_RAD: ""
        }
      ]
    },
    accounts: Account,
    countries: Country,
    results: {},
    country: ""
  }),

  methods: {
    onUpdate(payload) {
      this.results = payload;
    },
    cancelled: function() {
      this.e1 = 1;
      this.$refs.form1.reset();
      this.$refs.form2.reset();
      this.$refs.form3.reset();
      //this.$refs.form1.resetValidation()
    },
    nextStep: function(e) {
      if (e == 1) {
        if (this.$refs.form1.validate()) {
          this.e1 = e + 1;
        }
      } else if (e == 2) {
        if (this.$refs.form2.validate()) {
          this.e1 = e + 1;
        }
      } else if (e == 3) {
        if (this.$refs.form3.validate()) {
          this.register();
        }
      }
    },
    markRecaptchaAsNotVerified(response) {
      this.recaptchaVerified = false;
    },
    markRecaptchaAsVerified(response) {
      // this.pleaseTickRecaptchaMessage = "";
      this.recaptchaVerified = true;
    },
    register() {
      //this.loading = true
      /*     let loader = this.$loading.show({
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
      //console.log(this.results.formattedNumber)
      this.errors = [];
      this.success = [];
      if (!this.recaptchaVerified) {
        this.errors.push("Please tick the recaptcha...");
        return true; // prevent form from submitting
      }

      if (
        this.$refs.form1.validate() &
        this.$refs.form2.validate() &
        this.$refs.form3.validate()
      ) {
        if (this.results.isValid == true) {
          this.model.phone = this.results.formattedNumber;

         this.model.username =  this.model.username.toLowerCase()
          // console.log(this.model)
          this.isLoading = true;
          this.$axios
            .request({
              url: "/api/signup",
              method: "post",
              baseURL: process.env.baseUrl,
              data: this.model
            })
            .then(response => {
              //loader.hide()
              //API.setCookie("4AFAB952496A0D3C8D9832AC327CA820",response.data.access_token,15);
              // API.setCookie("B282279E0691D6604904071109FAA073",this.model.username,15);
              // document.location.replace("/dashboard")
              //console.log(response.data)
              this.isLoading = false;
              if (response.data == "acc_already") {
                this.errors.push(
                  "Account with that Account Number Already exists"
                );
              } else if (response.data == "mtr_already") {
                this.errors.push(
                  "Account with that Meter Number Already exists"
                );
              } else if (response.data == "invalid_acc") {
                this.errors.push("Specified Account Number Does not exists");
              } else if (response.data == "invalid_mtr") {
                this.errors.push("Specified Meter Number Does not exists");
              } else if (response.data == "username_inuse") {
                this.errors.push(
                  "The specified username is already taken by another user..."
                );
              } else if (response.data == "bill_not_valid") {
                this.errors.push(
                  "Supplied Bill is not valid for the specified Account Number"
                );
              } else if (response.data == "bill_not_rec") {
                this.errors.push("Supplied Bill is not the previous bill");
              } else if (response.data == "bill_not_valid_amnt") {
                this.errors.push(
                  "Supplied Bill amount for the specified Bill is not valid"
                );
              } else if (response.data == "token_not_valid") {
                this.errors.push(
                  "Supplied Token is not valid for the specified Meter Number"
                );
              } else if (response.data == "token_not_rec") {
                this.errors.push("Please enter latest Token Number...");
              } else if (response.data == "token_not_valid_amnt") {
                this.errors.push(
                  "Token amount for the specified token is invalid..."
                );
              } else if (response.data == "invalid_number") {
                this.errors.push("Supplied Account Number is not valid");
              } else if (response.data == "invalid_bill_number") {
                this.errors.push("Supplied Bill Number is not valid");
              } else if (response.data == "Registered") {
                this.success.push(
                  "Registered Successfully. Please login to access your account..."
                );
              }
            })
            .catch(e => {
              //loader.hide()
              // console.log(e)
              this.isLoading = false;
            });
        } else {
          // loader.hide()
          this.errors.push("Invalid Phone Number");
        }
      } else {
        if (!this.$refs.form1.validate()) {
          this.e1 = 1;
        } else if (!this.$refs.form2.validate()) {
          this.e1 = 2;
        }
        this.isLoading = false;
      }
    },
    accType: function(e) {
      if (e == 1) {
        this.account_label = "Account Number";
        this.veri_label = "Previous Bill Number";
        this.veri2_label = "Previous Bill Amount";
      } else {
        this.account_label = "Meter Number";
        this.veri_label = "Previous Token Number";
        this.veri2_label = "Previous Token Amount";
      }
      //console.log(e)
    }
  }
};
</script>
<style scoped lang="css">
h1 {
  font-size: 28px !important;
}
.layout {
  margin-top: 30px !important;
}
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
#pageDashboard {
  overflow:auto;
}
</style>
