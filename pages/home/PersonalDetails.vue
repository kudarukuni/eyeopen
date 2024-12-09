<template>
  <div id="pageDashboard">

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg8 sm12 xs12 id="my" style="min-width: 1000px">
          <v-widget title="Personal Information" content-bg="white"
            style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
            <div slot="widget-content">
              <loading :active.sync="isLoading" :can-cancel="false" :width=110 :height=110 backgroundColor="#ffffff"
                :opacity=0.5 :zIndex=999 :color=API.getLoaderColor :loader=API.getLoader :is-full-page="fullPage">
              </loading>
              <table width="100%" style="margin-bottom:15px" cellspacing="30">
                <tr>
                  <td>
                    <v-card :hover="true" color="#e4e8ed">
                      <v-card-title primary-title>
                        <div>
                          <h6><span style="text-align:left;color:#3f51b5;">Region</span>: <b>{{ personal.region }}</b></h6>
                          <div></div>
                        </div>
                      </v-card-title>
                    </v-card>
                  </td>
                  <td> <v-card :hover="true" color="#e4e8ed">
                      <v-card-title primary-title>
                        <div>
                          <h6><span style="text-align:left;color:#3f51b5;">District</span>: <b>{{ personal.district }}</b></h6>
                          <div></div>
                        </div>
                      </v-card-title>
                    </v-card></td>
                  <td>
                    <v-card :hover="true" color="#e4e8ed">
                      <v-card-title primary-title>
                        <div>
                          <h6><span style="text-align:left;color:#3f51b5;">Depot</span>: <b>{{ personal.depot }}</b></h6>
                          <div></div>
                        </div>
                      </v-card-title>
                    </v-card>
                  </td>
                  <td></td>
                </tr>
              </table>
              <table width="100%" cellspacing="50">
                <tr>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Title</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.cualif_CLI }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>House Number</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.num_PUERTA }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>First Name</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.nom_CLI }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Street Name</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.nom_CALLE }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Last Name</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.ape1_CLI }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Surbub</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.nom_LOCAL }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Contract Start Date</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.f_ALTA }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Full Address</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.customeraddress }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Email Address</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.email }}</b>
                          <div class="tooltip"><router-link :to="'/contactsupdate'" style="margin-left:5px"
                              class="tooltip"><v-icon v>edit</v-icon></router-link><span class="tooltiptext">Edit</span>
                          </div>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Cellphone</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.tfno3_CLI }}</b>
                          <div class="tooltip"><router-link :to="'/contactsupdate'" style="margin-left:5px"
                              class="tooltip"><v-icon v>edit</v-icon></router-link><span class="tooltiptext">Edit</span>
                          </div>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Telephone</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ personal.tfno1_CLI }}</b>
                          <div class="tooltip"><router-link :to="'/contactsupdate'" style="margin-left:5px"
                              class="tooltip"><v-icon v>edit</v-icon></router-link><span class="tooltiptext">Edit</span>
                          </div>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                </tr>
              </table>
            </div>
          </v-widget>
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
    fullPage: true,
    selectedTab: "tab-1",
    personal: {},
    API: API,
    nis: ""
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

    this.isLoading = true
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
        this.personal = response.data
        //console.log(response.data)

        this.isLoading = false

      })
      .catch(e => {
        if (process.browser) {
          this.isLoading = false
        }
        if (e.response && e.response.status == 401) {
          Cookie.remove('auth')
          this.$store.commit("setAuth", null);
          this.$router.push("/");
        }
        // API.getAuth(e.response.status)
        //console.log(e)
      })

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

table tr {
  white-space: nowrap;
}

.valueText {
  margin-right: 5px;
  color: #3d405c;
  font-size: 16px;
}

td {
  padding-right: 5px;
}

.divider {
  margin-right: 5px;
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
