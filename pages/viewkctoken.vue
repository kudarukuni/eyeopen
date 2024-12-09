<template>
    <div id="pageDashboard" style="min-width:900px;overflow:auto">
      <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <v-card class="elevation-1 pa-3">
  
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
                  <b>View Key Change Token</b></font>
                </h2></center>
              </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-container fluid grid-list-xl v-if="false">
                <h1 class="flex my-4 secondary--text">
                  <b>View Token temporarily unavailable.</b>
                </h1>
              </v-container>
              <v-container fluid grid-list-xl v-if="!false">
                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent><center>
                  <v-flex xs12 sm6>
                    <v-text-field
                      label="Meter Number"
                      color="primary"
                      required
                      outlined
                      clearable
                      v-model="meternumber"
                      @keyup.enter="getKCToken"
                      id="testing"
                    ></v-text-field>
                  </v-flex>
                  <v-btn color="primary" @click="getKCToken">View Key-Change Token</v-btn>
                </center></v-form>
              </v-container>
            </div>
          </v-card-text>
          <!-- END OF DEFAULT RENDER PAGE -->
  
          <!-- SEARCH RESULT RENDER PAGE -->
          <v-card-text>
            <v-card v-show="showed" class="layout column align-left">
              <center><u><b style="color:#e43d34"><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Generated on: {{ date }}</h4></b></u></center><br/>
              <div>
                
                <v-simple-table height="300px">
                    <template v-slot:default>
                
                  <thead>
                    <tr>
                      <th>DATE GENERATED</th>
                      <th>METER NUMBER</th>
                      <th>KEY CHANGE TOKEN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in kctoken" :key="item.meterNum">
                      <td>{{ item.TRANS_TIME }}</td>
                      <td>{{ item.meterNum }}</td>
                      <td>{{ item.format_KCT }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
             
            
            </div>
            </v-card>
            <!-- BACK HOME BUTTON CODE SNIPPET -->
            <v-btn style="margin-right:20px" outlined big color="indigo" :href="'/'">Back Home</v-btn>
            <!-- END OF BACK HOME BUTTON CODE SNIPPET -->
          </v-card-text>
          <!-- END OF SEARCH RESULT RENDER PAGE -->
  
        </v-card>
      </client-only>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  import API from "@/variables";
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";
  import axios from 'axios';
  export default {
    layout: "regauth",
    middleware: "notAuthenticated",
    components: {
      Loading
    },
    data (){
      return {
        date: "",
        loading: false,
        meternumber: "",
        API: API,
        isLoading: false,
        fullPage: true,
        valid: true,
        kctoken: [],
        showed: false,
        showTable: false,
        showPopup: false,
        is_COMPATIBLE: null,
        is_PILOT:null,
        format_KCT: null,
        krn: null,
        title: null,
        activity_ID: null
      };
    },
    created() {},
    methods: {
      getKCToken: function(){
        if (this.$refs.form.validate()) {
          this.showed = false;
          this.isLoading = true;
          this.$axios
            .request({
              url: "/api/viewkctoken/" + API.encryptData(this.meternumber),
              method: "post",
              baseURL: process.env.baseUrl
            })
            .then(response => {
  
              this.isLoading = false;
              this.kctoken = response.data;
              this.date = new Date();
  
              if (this.kctoken == "") {
                this.showed = false;
                Swal.fire({
                  title: "Meter Not Found.",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                }).then(result => {
                  if (result.value) {
                    this.$router.push("/viewkctoken");
                  }
                });

                this.$axios
                  .request({
                    url: "/api/savekctrequests",
                    method: "post",
                    baseURL: process.env.baseUrl,
                    // data: this.model,
                    data: {
                      meter_Number: this.meternumber,
                      // request_Time: this.date,
                      request_Time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                      response: "Meter Not Found",
                      activity_ID: ""
                    }
                  })
              }
              else if (this.kctoken[0].is_COMPATIBLE === "YES" && this.kctoken[0].is_PILOT === "YES" && this.kctoken[0].krn === "2" && this.kctoken[0].format_KCT === null) {
                Swal.fire({
                  title: "Meter is already upgraded. No further action required",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                  }).then(result => {
                    if (result.value) {
                      this.$router.push("/viewkctoken");
                    }
                  });

                  this.$axios
                  .request({
                    url: "/api/savekctrequests",
                    method: "post",
                    baseURL: process.env.baseUrl,
                    // data: this.model,
                    data: {
                      meter_Number: this.meternumber,
                      // request_Time: this.date,
                      request_Time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                      response: "Meter is already upgraded. No further action required",
                      activity_ID: ""
                    }
                  })
              }
              else if (this.kctoken[0].is_COMPATIBLE === "YES" && this.kctoken[0].is_PILOT === "YES" && this.kctoken[0].krn === "1" && this.kctoken[0].format_KCT === null) {
          Swal.fire({
            title: "Please purchase electricity to access your Key Change Token",
            type: "warning",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OKAY"
          }).then(result => {
            if (result.value) {
              this.$router.push("/viewkctoken");
            }
          });

          this.$axios
            .request({
              url: "/api/savekctrequests",
              method: "post",
              baseURL: process.env.baseUrl,
              // data: this.model,
              data: {
                meter_Number: this.meternumber,
                // request_Time: this.date,
                request_Time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                response: "Please purchase electricity to access your Key Change Token",
                activity_ID: ""
              }
            })

  
              } else if (this.kctoken[0].is_COMPATIBLE === "YES" && this.kctoken[0].is_PILOT === "NO") {
                Swal.fire({
                  title: "TID Rollover is currently not available in your region. You shall be advised soon.",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                  }).then(result => {
                    if (result.value) {
                      this.$router.push("/viewkctoken");
                    }
                  });

                  this.$axios
                  .request({
                    url: "/api/savekctrequests",
                    method: "post",
                    baseURL: process.env.baseUrl,
                    // data: this.model,
                    data: {
                      meter_Number: this.meternumber,
                      // request_Time: this.date,
                      request_Time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                      response: "TID Rollover is currently not available in your region. You shall be advised soon.",
                      activity_ID: ""
                    }
                  })
              
              } else if (this.kctoken[0].is_COMPATIBLE === "YES" && this.kctoken[0].is_PILOT === "YES" && this.kctoken[0].format_KCT !== null) {
                this.showed = true;
                this.isLoading = false;
                this.kctoken = response.data;

                this.$axios
                  .request({
                    url: "/api/savekctrequests",
                    method: "post",
                    baseURL: process.env.baseUrl,
                    // data: this.model,
                    data: {
                      meter_Number: this.meternumber,
                      // request_Time: this.date,
                      request_Time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                      response: "Key Change Token Successfully Generated",
                      activity_ID: ""
                    }
                  })
                
              } else if (this.kctoken[0].is_COMPATIBLE === "NO") {
                Swal.fire({
                  title: "The meter is not compliant and will be replaced by ZETDC at no cost.",
                  type: "warning",
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "OKAY"
                  }).then(result => {
                    if (result.value) {
                      this.$router.push("/viewkctoken");
                    }
                  });

                  this.$axios
                  .request({
                    url: "/api/savekctrequests",
                    method: "post",
                    baseURL: process.env.baseUrl,
                    // data: this.model,
                    data: {
                      meter_Number: this.meternumber,
                      // request_Time: this.date,
                      request_Time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                      response: "The meter is not compliant and will be replaced by ZETDC at no cost.",
                      activity_ID: ""
                    }
                  })
              }
          })
            .catch(e => {
              this.isLoading = false;
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
  
