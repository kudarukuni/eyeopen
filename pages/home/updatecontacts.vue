<template>
  <div id="pageDashboard">
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
    <v-container grid-list-sm fluid>
      <v-layout row wrap>
        <v-flex lg6 sm12 xs12 id="my" style="align:center">
          <v-widget title="Update Contact Information" content-bg="white">
            <div slot="widget-content">
              <v-alert type="error" :value="phonenum">Invalid Phone Number...</v-alert>
              <v-form>
                <v-text-field
                  append-icon="email"
                  name="email"
                  :rules="[  v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                  label="Email"
                  type="text"
                  v-model="email"
                ></v-text-field>
                <VuePhoneNumberInput
                  v-model="cell"
                  required
                  :default-country-code="selected"
                  valid-color="green"
                  @update="onUpdate"
                  append-icon="smartphone"
                />
                <v-text-field
                  append-icon="phone"
                  name="cell"
                  label="Landline Number"
                  v-model="landline"
                ></v-text-field>
              </v-form>
              <div class="login-btn">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="updateContact" :loading="loading">Update</v-btn>
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
import Swal from "sweetalert2";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
const Cookie = process.client ? require("js-cookie") : undefined;
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  layout: "main",
  components: {
    VWidget,
    VuePhoneNumberInput,
    Loading
  },
  data: () => ({
    color: Material,
    loading: false,
    landline: "",
    selected: "Z",
    isLoading: false,
    fullPage: true,
    API: API,
    email: "",
    results: {},
    cell: "",
    phonenum: false,
    selectedTab: "tab-1"
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
  beforeCreate() {
    if (this.$cookies.get(API.accCookie).length <= 9) {
      this.isLoading = true;
      this.$axios
        .request({
          url: "/api/clientcontact/" + this.$cookies.get(API.accCookie),
          method: "post",
          baseURL: process.env.baseUrl
        })
        .then(response => {
          // console.log(response.data)
          //this.contact = response.data
          this.isLoading = false;
          this.email = response.data.email;
          this.landline = response.data.landline;
          this.cell = response.data.cellphone;
          this.selected = response.data.countryiso;
          if (response.data.countryiso == null) {
            this.selected = "ZW";
          }
          //console.log(this.selected )
          //this.$router.push("/dashboard")
        })
        .catch(e => {
          this.isLoading = false;
          //console.log(e)
        });
    } else {
      this.isLoading = true;
      this.$axios
        .request({
          url: "/api/client/" + this.$cookies.get(API.accCookie),
          method: "post",
          baseURL: process.env.baseUrl,

          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          //this.personal = response.data
          //  console.log(response.data.nis_RAD)
          //loader.hide()
          this.$axios
            .request({
              url: "/api/clientcontact/" + response.data.nis_RAD,
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              this.email = response.data.email;
              this.landline = response.data.landline;
              this.cell = response.data.cellphone;
              this.selected = response.data.countryiso;
              if (response.data.countryiso == null) {
                this.selected = "ZW";
              }
            })
            .catch(e => {
              this.isLoading = false;
              //console.log(e)
            });
        });
    }
  },
  methods: {
    onUpdate(payload) {
      this.results = payload;
    },
    updateContact: function() {
      if (this.results.isValid == true) {
        //console.log(this.contact)
        //this.contact.cellphone = this.results.formattedNumber
        //console.log(this.results)
        if (this.$cookies.get(API.accCookie).length <= 9) {
          this.loading = true;
          var fullnum = this.results.formattedNumber;
          var countrycode = fullnum.split(this.results.nationalNumber);
          //console.log(this.results.countryCode)
          this.isLoading = true;
          this.$axios
            .request({
              url: "/api/updatecontact",
              method: "post",
              baseURL: process.env.baseUrl,
              data: {
                email: this.email,
                cellphone: this.results.nationalNumber,
                countrycode: countrycode[0],
                countryiso: this.results.countryCode,
                nis_RAD: this.$cookies.get(API.accCookie),
                landline: this.landline
              }
            })
            .then(response => {
              //console.log(response.data)
              this.isLoading = false;
              this.loading = false;
              Swal.fire({
                title: "You have successfully Updated your contact Information",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  this.$router.push("/home/dashboard");
                }
              });
            })
            .catch(e => {
              this.isLoading = false;
              if (e.response.status == 401) {
                Cookie.remove("auth");
                this.$store.commit("setAuth", null);
                this.$router.push("/");
              }
            });
        } else {
          this.isLoading = true;
          this.$axios
            .request({
              url: "/api/client/" + this.$cookies.get(API.accCookie),
              method: "post",
              baseURL: process.env.baseUrl,

              headers: {
                Authorization:
                  "Bearer " + this.$store.getters.doneAuth.access_token
              }
            })
            .then(response => {
              //this.loading = true
              //this.contact.nis_RAD = response.data.nis_RAD

              var fullnum = this.results.formattedNumber;
              var countrycode = fullnum.split(this.results.nationalNumber);
              this.$axios
                .request({
                  url: "/api/updatecontact",
                  method: "post",
                  baseURL: process.env.baseUrl,
                  data: {
                    email: this.email,
                    cellphone: this.results.nationalNumber,
                    countrycode: countrycode[0],
                    countryiso: this.results.countryCode,
                    nis_RAD: response.data.nis_RAD,
                    landline: this.landline
                  }
                })
                .then(response => {
                  //console.log(response.data)
                  this.isLoading = false;
                  this.loading = false;
                  Swal.fire({
                    title:
                      "You have successfully Updated your contact Information",
                    type: "warning",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OKAY"
                  }).then(result => {
                    if (result.value) {
                      this.$router.push("/home/dashboard");
                    }
                  });
                })
                .catch(e => {
                  this.isLoading = false;
                  if (e.response.status == 401) {
                    Cookie.remove("auth");
                    this.$store.commit("setAuth", null);
                    this.$router.push("/");
                  }
                });
            })
            .catch(e => {
              this.isLoading = false;
              if (e.response.status == 401) {
                Cookie.remove("auth");
                this.$store.commit("setAuth", null);
                this.$router.push("/");
              }
            });
        }
      } else {
        //alert('invalid')
        this.phonenum = true;
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
</style>
