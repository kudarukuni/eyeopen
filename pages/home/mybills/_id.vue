<template>
  <div style="margin-left:30px;margin-top:50px;overflow:auto">
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
    <v-btn :loading="load" color="primary" @click="createPDF($route.params.id)">
      Download PDF
      <v-icon right dark>cloud_download</v-icon>
    </v-btn>

    <div class="a" v-html="html_data" ref="formContainer"></div>
  </div>
</template>
<script>
import API from "@/variables";
import Swal from "sweetalert2";
import Vue from "vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
const Cookie = process.client ? require("js-cookie") : undefined;
//import * as jsPDF from "jspdf/dist/jspdf.node.debug.js"
//import html2canvas from "html2canvas"

export default {
  layout: "main",
  middleware: "authenticated",
  components: {
    Loading
  },
  data: () => ({
    html_data: "",
    load: false,
    API: API,
    isLoading: false,
    fullPage: true,
    bill: 0
  }),
  created() {
    API.checkContact();
    this.bill = this.$route.params.id;
    this.viewBill(this.$route.params.id);
  },
  methods: {
    onCancel() {
      // console.log("User cancelled the loader.")
    },
    createPDF(e) {
      //console.log(e)
      this.isLoading = true;
      if (process.client) {

     
        const jsPDF = require("jspdf");
        const html2canvas = require("html2canvas");
        const doc = new jsPDF("p", "pt", "a4");
        /** WITH CSS */
        
        var canvasElement = document.createElement("canvas");
        
        html2canvas(this.$refs.formContainer, { canvas: canvasElement }).then(
           
          function(canvas) {
            
            const img = canvas.toDataURL("image/png");
            doc.addImage(img, "PNG", 10, 10);
               this.isLoading=false
            doc.save(e + ".pdf");
            
          }.bind(this)
          
        );
        
      }

      
    },
    viewBill: function(billnum) {
      /*   let loader = this.$loading.show({
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
      // simulate AJAX
      this.isLoading = true;
      this.html_data = "";
      this.$axios
        .request({
          url:
            "/api/bill/view/" +
            billnum +
            "/" +
            this.$cookies.get(API.accCookie),
          method: "post",
          baseURL: process.env.baseUrl,
          headers: {
            Authorization: "Bearer " + this.$store.getters.doneAuth.access_token
          }
        })
        .then(response => {
          this.isLoading = false;
          if (response.data == "cannot") {
            loader.hide();
            Swal.fire({
              title: "Cannot View this type of Bill",
              type: "warning",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OKAY"
            }).then(result => {
              if (result.value) {
                this.$router.push("/home/mybills");
              }
            });
          } else {
            //loader.hide()
            this.html_data = response.data;
          }

          // console.log(response.data)
        })
        .catch(e => {
          this.isLoading = false;
          if (e.response.status == 401) {
            Cookie.remove("auth");
            this.$store.commit("setAuth", null);
            this.$router.push("/");
          }
          //console.log(e)
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.viewBill(to.params.bill);

    next();
  }
};
</script>

<style scoped>
.a >>> * {
  margin: 0;
  padding: 0;
  border: 0;
  margin-top: 1px;

  font-size: 10;
  list-style: none;
}
#pageDashboard {
  overflow:auto;
}
#my {
  overflow:auto;
}
</style>
