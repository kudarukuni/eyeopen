<template>
  <div id="pageDashboard" style="min-width:900px;overflow:auto">
    <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <v-card class="elevation-1 pa-3 login-card"  style="min-width:300px">
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
            <center><h3 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color = '#3f51b5'>
            <b>Forgot Password</b></font><br><br>
          </h3></center>
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
          <p><b><center>Enter username to reset your password.</center></b></p><br><br><br>
          <v-form ref="loginForm"><center>
            <v-text-field
              append-icon="person"
              name="login"
              :rules="[v => !!v || 'Username is required']"
              label="Username"
              type="text"
              @keyup.enter="reset"
              v-model="username"
            ></v-text-field>
          </center></v-form>
        </v-card-text>
        <div class="login-btn" style="margin-bottom:10px">
          <v-spacer></v-spacer><br><br><br>
          <v-btn block color="primary" @click="reset">Reset Password</v-btn>
        </div>
        <v-btn outlined block color ="indigo" :href="'/'">back to login</v-btn>
      </v-card>
  </client-only>
</div>
</template>

<script>
import API from "@/variables";
import Swal from "sweetalert2";
import Vue from "vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
const Base64 = require("js-base64").Base64;
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  components: {
    Loading
  },
  layout: "regauth",
  middleware: "notAuthenticated",
  data: () => ({
    isLoading: false,
    fullPage: true,
    API: API,
     errors: [],
      success: [],
      username: ""
    
  }),
  beforeCreate() {},
  mounted() {},
  computed: {},
  methods: {
    reset() {
      if (this.$refs.loginForm.validate()) {
       
        this.isLoading = true;
 this.errors = [];
      this.success = [];

        this.$axios
          .request({
            url: "/api/forgotpassword",
            method: "post",
            baseURL: process.env.baseUrl,
            
            params: {
              username: this.username
            }
          })
          .then(response => {
                this.isLoading = false;
if(response.data=="user_not_found"){
 this.errors.push(
                  "Wrong username please try again..."
                );
}else if(response.data=="done"){
  this.success.push(
                  "Password reset link was sent to your email you used to create this account..."
                );
}
              })
              .catch(e => {
                this.isLoading = false;
                
 this.errors.push(
                   "Technical error please contact system administrator"
                );

                
              });

            //  Cookie.set('auth', response.data) // saving token in cookie for server rendering
       
      }
    }
  }
};
</script>
<style scoped lang="css">
.login-card {
  border-radius: 15px;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
#pageDashboard {
  overflow:auto;
}
</style>
