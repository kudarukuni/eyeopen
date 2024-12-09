<template>
<div id="pageDashboard" style="min-width: 900px; overflow: auto">
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
          <center>
	  <h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif">
            <font color="#3f51b5"><b>Load Shedding Schedule</b></font>
          </h2>
	  </center>
        </div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-container fluid grid-list-xl v-if="false">
          <h1 class="flex my-4 secondary--text">
            <i>View Token temporarily unavailable.</i>
          </h1>
        </v-container>
        <v-container fluid grid-list-xl v-if="!false">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="onSubmit"
          ><center>
            <v-flex xs12 d-flex>
              <v-select
                xs6
                v-model="model.town"
                :items="sortFunc()"
                item-text="town"
                item-value="town"
                label="Town"
                required
                @change="surbubName($event)"
                :rules="[(v) => !!v || 'Town  is required']"
                class="input-group--focused"
                style="margin: 0.5em"
              ></v-select>
              <v-select
                xs6
                :items="sortSub()"
                v-model="model.name"
                label="Surbub"
                required
                :rules="[(v) => !!v || 'Surbub  is required']"
                item-text="name"
                item-value="name"
                class="input-group--focused"
                style="margin: 0.5em"
                return-object
              ></v-select>
            </v-flex>
            <v-btn color="primary" @click="getSheddingStatus"
              >View Loadshedding Schedule</v-btn
            ></center>
          </v-form>
	<marquee><font color="red" style="margin-top:5px;font-family:'Gill Sans', Arial, Helvetica, sans-serif;"><b>FOR FURTHER ENQUIRY #Chaya 704 #Tshay'u 704 #Dial 704</b></font></marquee>
        </v-container>
      </div>
    </v-card-text>
    <v-card-text>
      <v-card v-show="showed" class="layout column align-left">
        <div>
          <v-simple-table height="200px">
            <template v-slot:default>
              <tbody>
                <tr v-for="item in schedule" :key="scheduled_date">
                  <v-simple-table>
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <td>
                            <b style="color: #3f51b5;font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Day {{ item.scheduled_date }}</b
                            >
                          </td>
                          <td></td>
                          <td>
                            <b style="color: #3f51b5;font-family: 'Gill Sans', Arial, Helvetica, sans-serif">Stage {{ item.stage }}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
				<p v-if="item.period != ''" style="color:red;font-family:'Gill', Arial, Helvetica, sans-serif">You are on load shedding.</p>
				<p v-else-if="item.period == ''" style="color:green;font-family:'Gill', Arial, Helvetica, sans-serif">You are not on load shedding.
                  </p></td>
                          <td></td>
                          <td>{{ item.period }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </tr>
              </tbody>
            </template> </v-simple-table
          >
          <center>
          <v-btn color="primary" @click="getSchedule" style="margin-bottom:20px"
            >View Weekly Schedule</v-btn
          ></center>
        </div>
      </v-card>
      <v-btn style="margin-top: 10px" outlined small color="indigo" :href="'/'"
        >Back Home</v-btn
      >
    </v-card-text>
  </v-card></client-only></div>
</template>

<script>
import Swal from "sweetalert2";
import API from "@/variables";
//import moment from "moment";
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  async mounted() {
    // Initialize recaptcha instance
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.log(e);
    }
  },

  layout: "regauth",
  middleware: "notAuthenticated",
  components: {
    Loading,
  },
  data: () => ({
    towwns: [],
    ssurbub: [],
    times: [],

    date: "",
    loading: false,
    meternumber: "",
    API: API,
    isLoading: false,
    fullPage: true,
    valid: true,
    tokens: [],
    schedule: [],
    showed: false,
    model: {
      town: "",
      surbub: "",
      stage: "",
      morningPeakTimes: "",
      eveningPeakTimes: "",
      selectedSurbub: {},
    },
  }),

  created() {
    this.$axios
      .request({
        url: "/api/townall",
        method: "post",
        crossDomain: true,
        baseURL: process.env.baseUrl,
        //data: this.model
      })
      .then((response) => {
        this.towwns = response.data;
        console.log("--start all towns");
        console.log(response.data);
        console.log("--end all towns");
      })
      .catch((e) => {
        console.log(e);
      });
  },

  methods: {
    sortFunc: function () {
      return this.towwns.slice().sort(function (a, b) {
        return a.town > b.town ? 1 : -1;
      });
    },
    sortSub: function () {
      return this.ssurbub.slice().sort(function (a, b) {
        return a.name > b.name ? 1 : -1;
      });
    },
    surbubName(event) {
      this.$axios
        .request({
          url: "/api/sheddingsub/" + this.model.town,
          method: "post",
          baseURL: process.env.baseUrl,
        })
        .then((response) => {
          this.ssurbub = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async getSchedule() {
      if (this.$refs.form.validate()) {
        this.showed = false;
        this.isLoading = true;
        this.$axios
          .request({
            url: "/api/sheddingpeaks",
            method: "post",
            baseURL: process.env.baseUrl,
          })
          .then((response) => {
            if (response.data != null) {
              this.morningPeakTimes =
                response.data[0].start_TIME + " - " + response.data[0].end_TIME;
              this.eveningPeakTimes =
                response.data[1].start_TIME + " - " + response.data[1].end_TIME;
            }
          })
          .catch((e) => {
            console.log(e);
          });

        this.$axios
          .request({
            url: "/api/currentstage",
            method: "post",
            baseURL: process.env.baseUrl,
          })
          .then((response) => {
            this.stage = response.data[0].stage;
          })
          .catch((e) => {
            console.log(e);
          });

        this.$axios
          .request({
            url: "/api/shedschedule/" + this.model.name.area_code,
            method: "post",
            baseURL: process.env.baseUrl,
          })
          .then((response) => {
            this.isLoading = false;
            //console.log( "-=-=-=-=--=-=-=--=");
            console.log(response.data);
            this.schedule = response.data;
            this.date = new Date();
            if (this.schedule == "") {
              this.showed = false;
              Swal.fire({
                title: "No Data Found...",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY",
              }).then((result) => {
                if (result.value) {
                  this.$router.push("/loadshedding");
                }
              });
            } else {
              this.showed = true;
              this.isLoading = false;
              this.schedule = response.data;
              //console.log(response.data);
            }

            //loader.hide()
          })
          .catch((e) => {
            this.isLoading = false;
            //   console.log(e)
          });
      }
    },

    async getSheddingStatus() {
      if (this.$refs.form.validate()) {
        this.showed = false;
        this.isLoading = true;
        this.$axios
          .request({
            url: "/api/sheddingpeaks",
            method: "post",
            baseURL: process.env.baseUrl,
          })
          .then((response) => {
            if (response.data != null) {
              this.morningPeakTimes =
                response.data[0].start_TIME + " - " + response.data[0].end_TIME;
              this.eveningPeakTimes =
                response.data[1].start_TIME + " - " + response.data[1].end_TIME;
            }
          })
          .catch((e) => {
            console.log(e);
          });

        this.$axios
          .request({
            url: "/api/currentstage",
            method: "post",
            baseURL: process.env.baseUrl,
          })
          .then((response) => {
            this.stage = response.data[0].stage;
          })
          .catch((e) => {
            console.log(e);
          });

        this.$axios
          .request({
            url: "/api/todayshedschedule/" + this.model.name.area_code,
            method: "post",
            baseURL: process.env.baseUrl,
          })
          .then((response) => {
            this.isLoading = false;
            //console.log( "-=-=-=-=--=-=-=--=");
            console.log(response.data);
            this.schedule = response.data;
            this.date = new Date();
            if (this.schedule == "") {
              this.showed = false;
              Swal.fire({
                title: "No Data Found...",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY",
              }).then((result) => {
                if (result.value) {
                  this.$router.push("/loadshedding");
                }
              });
            } else {
              this.showed = true;
              this.isLoading = false;
              this.schedule = response.data;
              console.log("-=-=-=-=--=-=-=--=");
              console.log(response.data);
            }

            //loader.hide()
          })
          .catch((e) => {
            this.isLoading = false;
            //   console.log(e)
          });
      }
    },
  },
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

