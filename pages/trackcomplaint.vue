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
          :is-full-page="fullPage"
        ></loading>
        <div class="layout column align-center">
          <center><h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color = '#3f51b5'>
            <b>Track Complaint</b></font>
          </h2></center>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-container fluid grid-list-xl v-if="false">
          <h1 class="flex my-4 secondary--text">
            <b>Track Complaint Temporarily Unavailable</b>
          </h1>
        </v-container>
        <v-container fluid grid-list-xl v-if="!false">
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent><center>
            <v-select
              :items="items"
              item-text="typee"
              required
              :rules="[v => !!v || 'Search criteria is required']"
              item-value="abbr"
              @change="searchTypee($event)"
              v-model="searchtype"
              label="Search using?"
              outlined
            ></v-select>
            <v-flex xs12 sm4>
              <v-text-field
                :label="type_label"
                color="primary"
                required
                outlined
                clearable
                v-model="complaintnumber"
                @keyup.enter="getComplaint"
                id="testing"
              ></v-text-field>
            </v-flex>
            <v-btn color="primary" @click="getComplaint">Track</v-btn>
          </center></v-form>
        </v-container>
      </div>
    </v-card-text>
    <v-card-text>
      <v-card v-if="showed" class="layout column align-left">
        <div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Incident Number</th>
                  <th class="text-left">Complaint Number</th>
                  <th class="text-left">Customer Name</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Address</th>
                  <th class="text-left">Date</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in complaints" :key="item.complaint_number">
                   <td>{{ item.network_service_number }}</td>
                  <td>{{ item.complaint_number }}</td>
                  <td>{{ item.customer_name }}</td>
                  <td>{{ item.status_inc }}</td>
                  <td>{{ item.address }}</td>
                  <td>{{ item.creation_date_call }}</td>
                  <td>
                    <v-btn color="primary" @click="getDetails(item.complaint_number)">details</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-card>
 <v-dialog
      v-model="dialog"
      max-width="890"
    >
      <v-card v-show="showdetails" style="padding:10px;margin-top:10px" class="layout column align-left">
        <div>
          <fieldset style="background-color:#b1e9f7">
            <legend>
              <b>Incident</b>
            </legend>
            <table>
              <tr>
                <td>Incident Number:</td>
                <td>{{details.network_service_number}}</td>
              </tr>

              <tr>
                <td>Incident Status:</td>
                <td>{{details.status_inc}}</td>
              </tr>
              <tr>
                <td>Suburb:</td>
                <td>{{details.operational_hierarchy_inc}}</td>
              </tr>
              <tr>
                <td>Incident Type:</td>
                <td>{{details.network_service_subtype}}</td>
              </tr>
              <tr>
                <td>Incident Situation:</td>
                <td>{{details.situation}}</td>
              </tr>
              <tr>
                <td>Incident Date:</td>
                <td>{{details.creation_date_inc}}</td>
              </tr>
              <tr>
                <td>Incident End Date:</td>
                <td>{{details.ending_date_inc}}</td>
              </tr>
            </table>
          </fieldset>

          <fieldset style="margin-top:10px;background-color:#a2fafa">
            <legend>
              <b>Complaint</b>
            </legend>
            <table>
              <tr>
                <td>Complaint Number:</td>

                <td>{{details.complaint_number}}</td>
              </tr>
              <tr>
                <td>Complaint Account Number:</td>

                <td>{{details.call_customer_nis}}</td>
              </tr>
              <tr>
                <td>Complaint Name:</td>

                <td>{{details.customer_name}}</td>
              </tr>
              <tr>
                <td>Complaint Date:</td>

                <td>{{details.creation_date_call}}</td>
              </tr>
              <tr>
                <td>Complaint Type:</td>

                <td>{{details.complaint_type}}</td>
              </tr>
              <tr>
                <td>Complaint Address:</td>

                <td>{{details.address}}</td>
              </tr>
              <tr>
                <td>Complaint Status:</td>

                <td>{{details.status_comp}}</td>
              </tr>
              <tr>
                <td>Customer Class:</td>

                <td>{{details.customer_class}}</td>
              </tr>
              <tr>
                <td>Meter:</td>

                <td>{{details.meter}}</td>
              </tr>
              <tr>
                <td>Telephone:</td>

                <td>{{details.telephone}}</td>
              </tr>
            </table>
          </fieldset>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">CLOSE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     
      <v-btn style="margin-top:20px" outlined big color="indigo" :href="'/'">back home</v-btn>
    </v-card-text>
  </v-card>
  </client-only>
  </div>
</template>

<!--THIS IS JUSTICE GARIRA CHANGES-->
<!--<script>
import Swal from "sweetalert2";
import API from "@/variables";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
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
    type_label: "",
    dialog:false,
    searchtype: 0,
    complaintnumber: "",
    items: [
      {
        typee: "Account Number",
        abbr: 1
      },
      {
        typee: "Name",
        abbr: 2
      },
      {
        typee: "Complaint Number",
        abbr: 3
      },
      {
        typee: "Incident Number",
        abbr: 4
      },
      {
        typee: "Meter Number",
        abbr: 5
      }
    ],
    API: API,
    isLoading: false,
    fullPage: true,
    valid: true,
    complaints: [],
    details: {},
    showdetails: false,
    showed: false
  }),
  created() {},
  methods: {
    searchTypee: function(e) {
      if (e == 1) {
        this.type_label = "Account Number";
      } else if (e == 2) {
        this.type_label = "Name";
      } else if (e == 3) {
        this.type_label = "Complaint Number";
      } else if (e == 4) {
        this.type_label = "Incident Number";
      }else if (e == 5) {
        this.type_label = "Meter Number";
      }
      //console.log(e)
    },
    getDetails: function(cnum) {
      this.isLoading = true;
      this.$axios
        .request({
          url: "/api/trackcomplaint/3/" + API.encryptData(cnum),
          method: "post",
          baseURL: process.env.baseUrl
        })
        .then(response => {
          this.isLoading = false;
          this.details = response.data;
          this.showed = true;
          this.showdetails = true;
          this.date = new Date();
          if (this.details == "") {
            this.showdetails = false;
            Swal.fire({
              title: "No Data Found...",
              type: "warning",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OKAY"
            }).then(result => {
              if (result.value) {
                this.$router.push("/trackcomplaint");
              }
            });
          } else {
            this.dialog=true
            this.isLoading = false;
            this.details = response.data;
            //console.log(response.data);
          }

          //loader.hide()
        })
        .catch(e => {
          this.isLoading = false;
          //   console.log(e)
        });
    },
    getComplaint: function() {
      if (this.$refs.form.validate()) {
        this.showdetails = false;
        this.showed = true;
        this.isLoading = true;
        if (this.type_label == "Account Number") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/1/" +
                API.encryptData(this.complaintnumber),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              this.complaints = response.data;
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                this.complaints = response.data;
                //console.log(response.data);
              }

              //loader.hide()
            })
            .catch(e => {
              this.isLoading = false;
              //   console.log(e)
            });
        } else if (this.type_label == "Name") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/2/" +
                API.encryptData(this.complaintnumber.toUpperCase()),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              this.complaints = response.data;
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                this.complaints = response.data;
                //console.log(response.data);
              }

              //loader.hide()
            })
            .catch(e => {
              this.isLoading = false;
              //   console.log(e)
            });
        } else if (this.type_label == "Complaint Number") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/3/" +
                API.encryptData(this.complaintnumber),
              method: "post",
              baseURL: process.env.baseUrl
            }) 
            .then(response => {
              this.isLoading = false;
              this.complaints = response.data;
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                this.complaints = response.data;
                //console.log(response.data);
              }

              //loader.hide()
            })
            .catch(e => {
              this.isLoading = false;
              //   console.log(e)
            });
        } else if (this.type_label == "Incident Number") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/4/" +
                API.encryptData(this.complaintnumber),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              this.complaints = response.data;
              this.showed = true;
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                this.complaints = response.data;
                //console.log(response.data);
              }

              //loader.hide()
            })
            .catch(e => {
              this.isLoading = false;
              //   console.log(e)
            });
        } else if (this.type_label == "Meter Number") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/5/" +
                API.encryptData(this.complaintnumber),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              this.complaints = response.data;
              this.showed = true;
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                this.complaints = response.data;
                //console.log(response.data);
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
  }
};
</script>-->

<script>
import Swal from "sweetalert2";
import API from "@/variables";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
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
    type_label: "",
    dialog: false,
    searchtype: 0,
    complaintnumber: "",
    items: [
      {
        typee: "Account Number",
        abbr: 1
      },
      {
        typee: "Complaint Number",
        abbr: 3
      },

      {
        typee: "Meter Number",
        abbr: 5
      }
    ],
    API: API,
    isLoading: false,
    fullPage: true,
    valid: true,
    complaints: [],
    details: {},
    showdetails: false,
    showed: false
  }),
  created() { },
  methods: {
    searchTypee: function (e) {
      if (e == 1) {
        this.type_label = "Account Number";
      } else if (e == 3) {
        this.type_label = "Complaint Number";
      } else if (e == 5) {
        this.type_label = "Meter Number";
      }
      //console.log(e)
    },
    getDetails: function (cnum) {
      this.isLoading = true;
      this.$axios
        .request({
          url: "/api/trackcomplaint/3/" + API.encryptData(cnum),
          method: "post",
          baseURL: process.env.baseUrl
        })
        .then(response => {
          this.isLoading = false;
          this.details = response.data.complaints;
          this.showed = true;
          this.showdetails = true;
          this.date = new Date();
          if (this.details == "") {
            this.showdetails = false;
            Swal.fire({
              title: "No Data Found...",
              type: "warning",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OKAY"
            }).then(result => {
              if (result.value) {
                this.$router.push("/trackcomplaint");
              }
            });
          } else {
            this.dialog = true
            this.isLoading = false;
            this.details = response.data.complaints;
            //console.log(response.data);
          }

          //loader.hide()
        })
        .catch(e => {
          this.isLoading = false;
          //   console.log(e)
        });
    },
    getComplaint: function () {
      if (this.$refs.form.validate()) {
        this.showdetails = false;
        this.showed = true;
        this.isLoading = true;
        if (this.type_label == "Account Number") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/1/" +
                API.encryptData(this.complaintnumber),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              console.log("this.complaints");
              this.complaints = response.data.complaints;
              console.log(this.complaints[0]);
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                // this.complaints = response.data;
                //console.log(response.data);
              }

              //loader.hide()
            })
            .catch(e => {
              this.isLoading = false;
              //   console.log(e)
            });
        }
        /*else if (this.type_label == "Name") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/2/" +
                API.encryptData(this.complaintnumber.toUpperCase()),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              this.complaints = response.data;
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                this.complaints = response.data;
                //console.log(response.data);
              }

              //loader.hide()
            })
            .catch(e => {
              this.isLoading = false;
              //   console.log(e)
            });
        }*/ else if (this.type_label == "Complaint Number") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/3/" +
                API.encryptData(this.complaintnumber),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              this.complaints = response.data;
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                // this.complaints = response.data;
                //console.log(response.data);
              }

              //loader.hide()
            })
            .catch(e => {
              this.isLoading = false;
              //   console.log(e)
            });
        } /*else if (this.type_label == "Incident Number") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/4/" +
                API.encryptData(this.complaintnumber),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              this.complaints = response.data;
              this.showed = true;
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                this.complaints = response.data;
                //console.log(response.data);
              }

              //loader.hide()
            })
            .catch(e => {
              this.isLoading = false;
              //   console.log(e)
            });
        }*/ else if (this.type_label == "Meter Number") {
          this.$axios
            .request({
              url:
                "/api/trackcomplaint/5/" +
                API.encryptData(this.complaintnumber),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
              this.isLoading = false;
              this.complaints = response.data;
              this.showed = true;
              this.date = new Date();
              if (this.complaints == "") {
                this.showed = false;
                Swal.fire({
                  title: "No Data Found...",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/trackcomplaint");
                  }
                });
              } else {
                this.showed = true;
                this.isLoading = false;
                this.complaints = response.data;
                //console.log(response.data);
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
