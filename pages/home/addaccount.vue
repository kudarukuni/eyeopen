<template>
  <div id="pageDashboard">
    <loading :active.sync="isLoading" :can-cancel="false" :width=110 :height=110 backgroundColor="#ffffff" :opacity=0.5
      :zIndex=999 :color=API.getLoaderColor :loader=API.getLoader :is-full-page="fullPage"
      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></loading>
    <v-container grid-list-xl fluid>
      <v-layout row wrap class="chart-wrapper">
        <v-flex lg8 sm12 xs12 id="my">
          <v-widget title="Add Account" content-bg="white" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
            <div slot="widget-content">
              <v-card>
                <v-alert type="error" :value="errors.length > 0" :dismissible="true">
                  <b style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Please correct the following
                    error(s):</b>
                  <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                </v-alert>
                <v-alert type="success" :value="success.length > 0" :dismissible="true">
                  <p v-for="succ in success" :key="succ">{{ succ }}</p>
                </v-alert>
                <v-form ref="form">
                  <table width="100%">
                    <tr>
                      <td>
                        <v-flex xs10>
                          <v-select :items="accounts" v-model="account_type" label="Account Type" item-text="accountt"
                            item-value="abbr" @change="accType($event)" class="input-group--focused"
                            style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></v-select>
                        </v-flex>
                      </td>
                      <td>
                        <v-flex xs10>
                          <v-text-field name="input-1" :label="account_label" color="primary" v-model="model.nis_RAD"
                            required id="testing"
                            style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></v-text-field>
                        </v-flex>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <v-flex xs10>
                          <v-text-field name="input-1" :label="veri_label" color="primary" v-model="verification"
                            id="testing" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></v-text-field>
                        </v-flex>
                      </td>
                      <td>
                        <v-flex xs10>
                          <v-text-field name="input-1" :label="veri2_label" color="primary" prefix="$"
                            :rules="[v => /^-?\d+\.?\d*$/.test(v) || 'Invalid Amount']" v-model="verification2"
                            id="testing" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></v-text-field>
                        </v-flex>
                      </td>
                    </tr>
                    <tr>
                      <td><br/><br/><br/><br/>
                        <div class="login-btn">
                          <v-spacer></v-spacer>
                          <center><v-btn color="primary" @click="addAccount" :loading="loading"
                            style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Add Account</v-btn></center>
                        </div>
                      </td>
                    </tr>
                  </table>
                </v-form>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
import Account from "@/api/account";
const Cookie = process.client ? require("js-cookie") : undefined;
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
import Vue from 'vue';
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';


export default {
  layout: "main",
  components: {
    VWidget,
    Loading
  },
  data: () => ({
    color: Material,
    loading: false,
    isLoading: false,
    fullPage: true,
    API: API,
    errors: [],
    success: [],
    account_type: 0,
    account_label: "Account Number",
    veri2_label: "Previous Bill Amount",
    veri_label: "Previous Bill Number",
    verification: "",
    verification2: 0,

    accounts: Account,
    model: {
      nis_RAD: ""
    }
  }),
  methods: {
    accType: function (e) {
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
    },
    addAccount: function () {

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
        zIndex: 999})
      this.loading = true; */
      this.isLoading = true
      this.errors = [];
      this.success = [];
      this.$axios
        .request({
          url:
            "/api/accounts/add/" + this.verification + "/" + this.verification2,
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          },
          data: this.model
        })
        .then(response => {
          this.isLoading = false;
          //API.setCookie("4AFAB952496A0D3C8D9832AC327CA820",response.data.access_token,15);
          // API.setCookie("B282279E0691D6604904071109FAA073",this.model.username,15);
          // document.location.replace("/dashboard")
          // console.log(response.data)
          //loader.hide()
          if (response.data == "invalid_acc") {
            this.errors.push("Specified Account Number Does not exists");
          } else if (response.data == "acc_already") {
            this.errors.push("Account with that Account Number Already exists");
          } else if (response.data == "mtr_already") {
            this.errors.push("Account with that Meter Number Already exists");
          } else if (response.data == "invalid_mtr") {
            this.errors.push("Specified Meter Number Does not exists");
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
          } else if (response.data == "bill_not_valid") {
            this.errors.push(
              "Supplied Bill is not valid for the specified Account Number"
            );
          } else if (response.data == "account_added") {
            this.success.push("Account Added Successfully...");
            window.location.reload();
          }
        })
        .catch(e => {
          this.isLoading = false;
          if (e.response.status == 401) {
            Cookie.remove('auth')
            this.$store.commit("setAuth", null);
            this.$router.push("/");
          }
          // console.log(e)
        });
    }
  },
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
  }
};
</script>
<style scoped>
.flex.lg8 {
  flex-basis: 100%;
  flex-grow: 0;
  max-width: 100%;
}

#pageDashboard {
  overflow: auto;
}

#widgcont {
  max-width: 80%;
}

.chart-wrapper {
  width: 100%;
}
.login-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
