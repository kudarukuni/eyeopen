<template>
  <div id="pageDashboard">
    <loading :active.sync="isLoading" :can-cancel="false" :width=110 :height=110 backgroundColor="#ffffff" :opacity=0.5
      :zIndex=999 :color=API.getLoaderColor :loader=API.getLoader :is-full-page="fullPage"
      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></loading>
    <v-container grid-list-xl style="min-width:1000px">
      <v-layout row wrap>
        <v-flex lg8 sm12 xs12 id="my">
          <v-card>
            <v-card-title>
              <b>My Bills</b>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details
                style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :mobile-breakpoint="100" :items="bills" :search="search" click:row=""
              :loading="load" loading-text="Loading Data, Please wait..."
              style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
              <template v-slot:items="props">

                <td>
                  <b>{{ props.item.num_REC }}</b>
                </td>
                <td>
                  <b>{{ props.item.f_FACT }}</b>
                </td>
                <td>
                  <b>{{ props.item.f_PREV_PUESTA }}</b>
                </td>
                <td>
                  <b>{{ props.item.f_VCTO_FAC }}</b>
                </td>
                <td>
                  <b>{{ props.item.desc_TIPO }}</b>
                </td>
                <td>
                  <b dark>${{ props.item.imp_TOT_REC }}</b>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning"
                  style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Your search for "{{ search }}" found no
                  results.</v-alert>
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn color="primary" @click="viewBill(item.num_REC)" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">View</v-btn>
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
import Vue from 'vue';
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
    loading: false,
    myapi: API,
    API: API,
    isLoading: false,
    fullPage: true,
    selected: [],
    load: true,
    search: "",
    headers: [

      { text: "Bill Number", value: "num_REC", align: "left", sortable: true },
      { text: "Meter Reading Date", value: "f_FACT", sortable: true },
      { text: "Billing Date", value: "f_PREV_PUESTA", sortable: true },
      { text: "Bill Due Date", value: "f_VCTO_FAC", sortable: true },
      { text: "Bill Type", value: "desc_TIPO", sortable: true },
      { text: "Bill Amount($)", value: "imp_TOT_REC", sortable: true },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    bills: [],
    color: Material
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
    //API.checkContact()
    if (this.$cookies.get(API.accCookie).length <= 9) {
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
      */
      this.isLoading = true
      //console.log(API.getCookie(API.accCookie))
      this.$axios
        .request({
          url: "/api/bill/" + this.$cookies.get(API.accCookie),
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          this.bills = response.data
          //  console.log(response.data)
          this.isLoading = false
          this.load = false
        })
        .catch(e => {
          this.isLoading = false
          if (e.response.status == 401) {
            Cookie.remove('auth')
            this.$store.commit("setAuth", null);
            this.$router.push("/");
          }
        })
    } else {
      this.$router.push("/home/mytokens")
    }
  },
  methods: {
    editItem(item) {
      console.log(item.num_REC)
    },

    showAlert(a) {
      console.log(a)
    },
    switchacc: function (e) {
      this.loading = true
      API.setCookie(API.accCookie, e, 15)
      // console.log(e)
      this.loading = false
    },
    viewBill: function (billnum) {
      //console.log(billnum)
      this.$router.push("/home/mybills/" + billnum)
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

#widgcont {
  max-width: 80%;
}

#pageDashboard {
  overflow: auto;
}

#my {
  overflow: auto;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
