<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg8 sm12 xs12 id="my" style="min-width: 1000px">
          <v-widget title="Change Password" content-bg="white">
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
                style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"
              ></loading>
              <v-form ref="changeform">
                <table width="100%">
                  <tr>
                    <td>
                      <v-flex xs10>
                        <v-text-field
                          name="input-1"
                          :append-icon="visible ? 'visibility' : 'visibility_off'"
                          @click:append="visible = !visible"
                          :type="visible ? 'text' : 'password'"
                          label="Current Password"
                          v-model="password"
                          color="primary"
                          id="testing"
                          style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"
                        ></v-text-field>
                      </v-flex>
                    </td>
                  </tr>
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
                          style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"
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
                          style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"
                        ></v-text-field>
                      </v-flex>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="login-btn">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="changePassword()">Change Password</v-btn>
                      </div>
                    </td>
                  </tr>
                </table>
              </v-form>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from "@/variables";
import Swal from "sweetalert2";
const Base64 = require("js-base64").Base64;
const Cookie = process.client ? require("js-cookie") : undefined;
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  layout: "main",
  middleware: "authenticated",
  components: {
    VWidget,
    Loading
  },
  data: () => ({
    color: Material,
    visible: false,
    visible1: false,
    visible2: false,
      encPass: "",
      encNewPass: "",
    password: "",
    newpassword: "",
    confirmpassword: "",
    isLoading: false,
    fullPage: true,
    selectedTab: "tab-1",
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
  methods: {
    changePassword() {
if (this.$refs.changeform.validate()) {
         this.encPass = Base64.encode(this.password);
        this.encPass = Base64.encode(this.encPass);

           this.encNewPass = Base64.encode(this.newpassword);
        this.encNewPass = Base64.encode(this.encNewPass);
      this.isLoading = true;
      this.$axios
        .request({
          url: "/api/changepass",
          method: "post",
          baseURL: process.env.baseUrl,
          params: {
            oldpassword: this.encPass.split("")
                .reverse()
                .join(""),
            newpassword: this.encNewPass.split("")
                .reverse()
                .join("")
          },
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
         // this.personal = response.data;
          //console.log(response.data)

          this.isLoading = false;
          if(response.data == 'changed'){
 Swal.fire({
              title: "Password Changed Successfully",
              type: "success",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OKAY"
            }).then(result => {
              if (result.value) {
               // document.location.replace("/home/servicestatement");
                 this.$router.push("/home/dashboard")
              }
            });
          }else{
Swal.fire({
              title: "Wrong old Password",
              type: "warning",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OKAY"
            }).then(result => {
              if (result.value) {
               // document.location.replace("/home/servicestatement");
                 //this.$router.push("/home/dashboard")
              }
            });
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
    }
    }
  },
  created() {
    //API.checkContact()
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
    })  */
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
