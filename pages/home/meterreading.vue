<template>
  <div id="pageDashboard">
    <loading :active.sync="isLoading" :can-cancel="false" :width=110 :height=110 backgroundColor="#ffffff" :opacity=0.5
      :zIndex=999 :color=API.getLoaderColor :loader=API.getLoader :is-full-page="fullPage"
      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></loading>
    <v-container grid-list-xl fluid>
      <v-layout row wrap class="chart-wrapper">
        <table width="100%" style="margin-bottom:15px">
          <tr>
            <td>
              <v-card :hover="true" color="#e4e8ed">
                <v-card-title primary-title>
                  <div>
                    <h6 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif">Service Point No:<b><font color="indigo"> {{ head.servicenum }}</font></b></h6>
                    <div></div>
                  </div>
                </v-card-title>
              </v-card>
            </td>
            <td>
              <v-card :hover="true">
                <v-card-title primary-title>
                  <div>
                    <h6 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Meter Bumber:<b><font color="indigo"> {{ head.numapa }}</font></b></h6>
                    <div></div>
                  </div>
                </v-card-title>
              </v-card>
            </td>
            <td>
              <v-card :hover="true" color="#e4e8ed">
                <v-card-title primary-title>
                  <div>
                    <h6 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Meter Installation Date:<b><font color="indigo"> {{ head.install }}</font></b></h6>
                    <div></div>
                  </div>
                </v-card-title>
              </v-card>
            </td>
          </tr>
        </table>

        <v-flex lg8 sm12 xs12 id="my">
          <v-card>
            <v-card-title>
              <b style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Meter Readings</b>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details
                style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :mobile-breakpoint="100" :items="readings" :search="search" style="font-family: 'Gill Sans', Arial, Helvetica, san-serif;">
              <template v-slot:items="props">
                <td>
                  <b>{{ props.item.meter_READING }}</b>
                </td>
                <td>
                  <b>{{ props.item.csmo }}</b>
                </td>
                <td>
                  <b>{{ props.item.f_LECT }}</b>
                </td>
                <td>
                  <b>{{ props.item.consumption_TYPE }}</b>
                </td>
                <td>
                  <b>{{ props.item.reading_TYPE }}</b>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning"
                  style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                  Your search for "{{ search }}" found no results.
                </v-alert>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from "@/variables"
const Cookie = process.client ? require("js-cookie") : undefined;
import VWidget from "@/components/VWidget"
import Material from "vuetify/es5/util/colors"
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  layout: 'main',
  middleware: 'authenticated',
  components: {
    VWidget,
    Loading
  },
  data: () => ({
    color: Material,
    isLoading: false,
    API: API,
    fullPage: true,
    search: "",
    head: {
      servicenum: '',
      numapa: '',
      install: ''
    },
    headers: [
      {
        text: "Meter Reading",
        align: "left",
        sortable: true,
        value: "meter_READING"
      },
      { text: "Consumption", value: "csmo", align: "left", sortable: true },
      { text: "Meter Reading Date", value: "f_LECT", align: "left", sortable: true },
      { text: "Consumption Type", value: "consumption_TYPE", sortable: true },
      { text: "Reading Type", value: "reading_TYPE", sortable: true }
    ],
    readings: []
  }),
  computed: {
    activity() {
      return API.getActivity()
    },
    posts() {
      return API.getPost(3)
    },
    siteTrafficData() {
      return API.getMonthVisit
    },
    locationData() {
      return API.getLocation
    }
  },
  created() {
    API.checkContact()
    if (this.$cookies.get(API.accCookie).length > 9) {
      this.$router.push("/home/meterreading")
    }
    this.isLoading = true

    this.$axios
      .request({
        url: "/api/point/" + this.$cookies.get(API.accCookie),
        method: "post",
        baseURL: process.env.baseUrl,
        headers: {
          Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
        }

      })
      .then(response => {
        //this.servicepoint = response.data

        this.getReadings(response.data.num_SUM)
        // loader.hide()
        //console.log(response.data)
      })
      .catch(e => {
        if (e.response.status == 401) {
          Cookie.remove('auth')
          this.$store.commit("setAuth", null);
          this.$router.push("/");
        }
      })
    // console.log(this.nis)



    //console.log(this.nis)

  },
  methods: {
    getReadings: function (numsum) {
      this.$axios
        .request({
          url: "/api/reading/" + numsum,
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          this.readings = response.data
          this.isLoading = false
          this.head.servicenum = response.data[0].num_SUM
          this.head.numapa = response.data[0].meter_NUMBER
          this.head.install = response.data[0].meter_INSTALATION_DATE
        })
        .catch(e => {
          this.isLoading = false
          if (e.response.status == 401) {
            Cookie.remove('auth')
            this.$store.commit("setAuth", null);
            this.$router.push("/");
          }
        })
    }
  }
}
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

#my {
  overflow: auto;
}

#widgcont {
  max-width: 80%;
}
</style>
