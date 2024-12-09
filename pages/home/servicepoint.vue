<template>
  <div id="pageDashboard">
    <loading :active.sync="isLoading" :can-cancel="false" :width="110" :height="110" backgroundColor="#ffffff"
      :opacity="0.5" :zIndex="999" :color="API.getLoaderColor" :loader="API.getLoader" :is-full-page="fullPage"
      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"></loading>
    <v-container grid-list-xl fluid>
      <v-layout row wrap class="chart-wrapper">
        <v-flex lg8 sm12 xs12 id="my">
          <v-widget title="Service Point Details" content-bg="white"
            style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
            <div slot="widget-content">
              <table width="100%" cellspacing="10">
                <tr>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Account Number</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.nis_RAD }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Meter Number</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.num_APA }}</b>
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
                          <span>Service Point Number</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.num_SUM }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Meter Make</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.meter_Make }}</b>
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
                          <span>Service Point Type</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.service_point_type }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Meter Model</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.meter_Model }}</b>
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
                          <span>Service Point Phase</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.service_point_Phase }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Meter Type</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.meter_Type }}</b>
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
                          <span>Service Point Status</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.service_Point_Status }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="titleText">
                          <span>Connection Type</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.connection_Type }}</b>
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
                          <span>Service Point Tariff</span>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="valueText">
                          <b style="color:#000000">{{ servicepoint.service_Point_Tariff }}</b>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider class="divider"></v-divider>
                  </td>
                </tr>
              </table>
              <br /><br /><br /><br /><br /><br /><br />
              <div v-show="point != [0, 0]">
                <h1 style="margin-top:-90px">
                  <center><b>Location</b></center><br />
                </h1>
                <div>
                  <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                    data-projection="EPSG:4326" style="height: 400px">
                    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

                    <vl-geoloc @update:position="geolocPosition = $event">
                      <template slot-scope="geoloc">
                        <vl-feature v-if="geoloc.position" id="position-feature">
                          <vl-geom-point :coordinates="point"></vl-geom-point>
                          <vl-style-box>
                            <vl-style-icon src="/flag.png" :scale="0.5" :anchor="[0.1, 0.95]"
                              :size="[128, 128]"></vl-style-icon>
                          </vl-style-box>
                        </vl-feature>
                      </template>
                    </vl-geoloc>

                    <vl-layer-tile id="osm">
                      <vl-source-osm></vl-source-osm>
                    </vl-layer-tile>
                  </vl-map>
                </div>
              </div>
              <div v-show="point == [0, 0]">
                <h1 style="margin-top:-100px">
                  <b>No Location data found...</b>
                </h1>
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
import Vue from "vue";
const Cookie = process.client ? require("js-cookie") : undefined;
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
import "vuelayers/lib/style.css"; // needs css-loader
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
    url: "http://{s}.item.osm.org/{z}/{x}/{y}.png",
    zoom: 12,
    center: [0, 0],
    point: [0, 0],
    rotation: 0,
    geolocPosition: [0, 0],
    API: API,
    isLoading: false,
    fullPage: true,
    lat: 0,
    long: 0,
    center: [-17.9182850504472, 30.9623327513414],

    servicepoint: {},
    nis: ""
  }),
  mounted() { },
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
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  },
  created() {
    API.checkContact();
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
    }) */
    this.isLoading = true;
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
        // console.clear()
        this.isLoading = false;
        this.servicepoint = response.data;
        //console.log(response.data.gps_CORD)
        if (response.data.gps_CORD.length > 6) {
          var gpscord = response.data.gps_CORD.split("@");
          this.center = [parseFloat(gpscord[0]), parseFloat(gpscord[1])];
          this.point = [parseFloat(gpscord[0]), parseFloat(gpscord[1])];
        }

        //loader.hide()
      })
      .catch(e => {
        this.isLoading = false;
        if (e.response.status == 401) {
          Cookie.remove("auth");
          this.$store.commit("setAuth", null);
          this.$router.push("/");
        }
      });
    //console.log(this.nis)

    // console.log(this.nis)
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

#pageDashboard {
  overflow: auto;
}

#my {
  overflow: auto;
}

table tr {
  white-space: nowrap;
}

.valueText {
  margin-right: 10px;
  color: #3d405c;
  font-size: 12px;
}

.chart-wrapper {
  width: 100%;
}

.divider {
  margin-right: 10px;
}

.titleText {
  color: #979ba1;
}
</style>