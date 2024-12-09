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
                <b>View Token</b></font>
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
                    @keyup.enter="getToken"
                    id="testing"
                  ></v-text-field>
                </v-flex>
                <v-btn color="primary" @click="getToken">View token</v-btn>
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
                      <th class="text-left">Meter Number</th>
                      <th class="text-left">Token Number</th>
                      <th class="text-left">Token Units</th>
                      <th class="text-left">Token Amount</th>
                      <th class="text-left">Transaction Date</th>
                      <th class="text-left">Transaction Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in tokens" :key="item.token">
                      <td>{{ item.msno }}</td>
                      <td>{{ item.token }}</td>
                      <td>{{ item.token_UNITS }}</td>
                      <td>${{ item.token_AMOUNT.toFixed(2) }}</td>
                      <td>{{ item.trn_TIMESTAMP }}</td>
                      <td>{{ item.time_BOUGHT }}</td>
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
export default {
  layout: "regauth",
  middleware: "notAuthenticated",
  components: {
    Loading
  },
  data: () => ({
    date: "",
    loading: false,
    meternumber: "",
    API: API,
    isLoading: false,
    fullPage: true,
    valid: true,
    tokens: [],
    showed: false
  }),
  created() {},
  methods: {
    getToken: function() {
      if (this.$refs.form.validate()) {
        this.showed = false;
        this.isLoading = true;
        this.$axios
          .request({
            url: "/api/viewtoken/" + API.encryptData(this.meternumber),
            method: "post",
            baseURL: process.env.baseUrl
          })
          .then(response => {
            this.isLoading = false;
            this.tokens = response.data;
            this.date = new Date();
            if (this.tokens == "") {
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
                  this.$router.push("/viewtoken");
                }
              });
            } else {
              this.showed = true;
              this.isLoading = false;
              this.tokens = response.data;
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
