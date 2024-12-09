<template>
  <div id="pageDashboard">
    <v-card class="elevation-1 pa-3 login-card" style="min-width:300px">
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
        <div class="layout column align-center">
          <h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
            <i>Change Password</i>
          </h2>
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
        <v-form ref="changeform">
          <table width="100%">
            <tr>
              <td>
                <v-flex xs10>
                  <v-text-field
                    name="input-1"
                    :append-icon="visible1 ? 'visibility' : 'visibility_off'"
                    @click:append="visible1 = !visible1"
                    label="New Password"
                    :rules="[
                        v => !!v || 'Password is required',
                        v => (v && v.length >= 8) || 'Password should be at least 8 characters'
                      ]"
                    :type="visible1 ? 'text' : 'password'"
                    v-model="newpassword"
                    color="primary"
                    id="testing"
                  ></v-text-field>
                </v-flex>
              </td>
            </tr>
            <tr>
              <td>
                <v-flex xs10>
                  <v-text-field
                    name="input-1"
                    label="Confirm Password"
                    :append-icon="visible2 ? 'visibility' : 'visibility_off'"
                    @click:append="visible2 = !visible2"
                    :type="visible2 ? 'text' : 'password'"
                    :rules="[v => (v && v == newpassword) || 'Passwords do not match']"
                    color="primary"
                    v-model="confirmpassword"
                    id="testing"
                  ></v-text-field>
                </v-flex>
              </td>
            </tr>
            <tr>
              <td>
                <div class="login-btn">
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="changePassword">reset Password</v-btn>
                </div>
              </td>
            </tr>
          </table>
        </v-form>
      </v-card-text>

      <v-btn outlined small color="indigo" :href="'/register'">CREATE ACCOUNT</v-btn>
    </v-card>
  </div>
</template>
<script>
import API from "@/variables";
import Swal from "sweetalert2";
import Vue from "vue";
const Base64 = require("js-base64").Base64;
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
//const Cookie = process.client ? require("js-cookie") : undefined;
//import * as jsPDF from "jspdf/dist/jspdf.node.debug.js"
//import html2canvas from "html2canvas"

export default {
  layout: "auth",
  middleware: "notAuthenticated",
  components: {
    Loading
  },
  data: () => ({
    visible1: false,
    visible2: false,
    API: API,
    errors: [],
    success: [],
    newpassword: "",
    encNewPass:"",
    isLoading: false,
    fullPage: true,
    id: 0,
    confirmpassword: "",
    token: ""
  }),
  created() {
    API.checkContact();
    this.id = this.$route.params.id;
    this.token = this.$route.params.token;
    //this.viewBill(this.$route.params.id);
    //console.log(this.id + this.token);
  },
  methods: {
    onCancel() {
      // console.log("User cancelled the loader.")
    },
    changePassword() {
      if (this.$refs.changeform.validate()) {
        this.encNewPass = Base64.encode(this.newpassword);
        this.encNewPass = Base64.encode(this.encNewPass);
        this.isLoading = true;
        this.errors = [];
        this.success = [];
        console.log("here")
        this.$axios
          .request({
            url: "/api/resetpass",
            method: "post",
            baseURL: process.env.baseUrl,
            params: {
              password: this.encNewPass
                .split("")
                .reverse()
                .join(""),
              id: this.$route.params.id,
              token: this.$route.params.token
            }
          })
          .then(response => {
            // this.personal = response.data;
            //console.log(response.data)

            this.isLoading = false;
            if (response.data == "invalidToken") {
              this.errors.push("Invalid token...");
            } else if (response.data == "expired") {
              this.errors.push(
                "Token has expired please request for another link..."
              );
            } else if (response.data == "changed") {
              this.success.push(
                "Password reset was successfull you can now login using the new credentials..."
              );
            }
          })
          .catch(e => {
            if (process.browser) {
              this.isLoading = false;
            }
           this.errors.push(
                   "Technical error please contact system administrator"
                );
            // API.getAuth(e.response.status)
            //console.log(e)
          });
      }
    }
  }
};
</script>

<style scoped>
.a >>> * {
  margin: 0;
  padding: 0;
  border: 0;
  margin-top: 1px;

  font-size: 10;
  list-style: none;
}
#pageDashboard {
  overflow: auto;
}
#my {
  overflow: auto;
}
</style>
