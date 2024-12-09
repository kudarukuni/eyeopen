<template>
  <div id="pageDashboard" style="min-width:900px;overflow:auto">
    <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <v-carousel
        cycle
        height="100"
        style="margin-top:20px;border-radius:20px;margin-bottom:20px"
        hide-delimiter-background
        :hide-delimiters="true"
        show-arrows-on-hover>
        
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colorful[i]" height="200%">
            <v-row justify="center">
              <div style="padding:40px">
                <b>
                  <h3 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">{{ slide }}</h3>
                </b>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

      </v-carousel>
      <v-card class="elevation-1 pa-3 login-card" style="min-width:300px">
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
        <v-card-text>
          <div class="layout column align-center">
            <h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
              <b><font color="#3f51b5">Login</font></b></h2><a href="https://portfolio-kudarukuni.vercel.app" style="font-color=#3f51b5" target="_blank">.</a>
          </div>
          <v-form ref="loginForm">
            <v-text-field
              append-icon="person"
              name="login"
              :rules="[v => !!v || 'Username is required']"
              label="Username"
              type="text"
              autocomplete="off"
              @keyup.enter="login"
              v-model="model.username"
            ></v-text-field>
            <v-text-field
              append-icon="lock"
              name="password"
              label="Password"
              id="password"
              :rules="[v => !!v || 'Password is required']"
              required
              type="password"
              @keyup.enter="login"
              v-model="model.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <div class="login-btn" style="margin-bottom:10px">
          <v-spacer></v-spacer>
          <center><v-btn block color="primary" @click="login">Login</v-btn></center>
        </div>
        <center><v-btn style="margin-top:20px" outlined big color="indigo" :href="'/register'">Register</v-btn></center>
        <br/><nuxt-link to="/forgotpassword"><center>Forgot Password ?</center></nuxt-link>
      </v-card>
    </client-only>
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
const Base64 = require("js-base64").Base64;
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  components: {
    Loading
  },
  layout: "regauth",
  middleware: "notAuthenticated",
  data: () => ({
     colorful: [
          'rgb(233,103,68)',  // pink
          'rgb(255,248,175)', // yellow
          
	  'rgb(65,130,180)',  // blue
	  'rgb(255,248,175)',  // yellow

          'rgb(233,103,68)', // pink
          'rgb(255,248,175)',  // yellow
          
	  'rgb(65,130,180)', // blue
          'rgb(255,248,175)',  // yellow

          'rgb(233,103,68)', // pink	  
	  'rgb(255,248,175)',  // yellow
        ],
        slides: [
          'Chat with Getsi, our new Artificial Intelligence ChatBot',
          'Track a reported fault on this Self Service Portal',
          'Pay your Postpaid bills online today',
          'Access your electricity account online',
          'Press the register button below to create an account',
          'Once signed in you will be able to view your electricity bills',
          'Access all your tokens online, both new and old easily',
          'Generate a service statement for your account today',
	  'Taurai naGetsi ...... Click the green messaging icon on your bottom left corner',
          'And so much more ......',
        ],
        colors: [
        "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg",
      ],
        accountType: 0,
        isLoading: false,
        fullPage: true,
        API: API,
        smallest: 10000000,
        y: 0,
        encPass: "",
        access: "",
        model: {
          username: "",
          password: ""
        }
  }),
  beforeCreate() {},
  mounted() {},
  computed: {},
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.isLoading = true;

     

        this.$root.$loading.start();

        this.$axios
          .request({
            url: "/api/getmein",
            method: "post",
            baseURL: process.env.baseUrl,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            params: {
              grant_type: "password",
              username: this.model.username.toLowerCase(),
              password: API.encryptData(this.model.password)
            }
          })
          .then(response => {
            this.access = response.data;

            this.$axios
              .request({
                url: "/api/user",
                method: "post",
                baseURL: process.env.baseUrl,
                headers: {
                  Authorization: "Bearer " + response.data.access_token
                }
              })
              .then(response => {
                //console.log(response.data);

                for (var i = 0; i < response.data["account"].length; i++) {
                  if (response.data["account"][i].id < this.smallest) {
                    this.smallest = response.data["account"][i].id;
                    this.y = i;
                  }
                }
                this.$cookies.set(
                  API.accCookie,
                  response.data["account"][this.y].nis_RAD,
                  {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7
                  }
                );
                this.$store.commit("setAuth", this.access); // mutating to store for client rendering
                Cookie.set("auth", this.access); // saving token in cookie for server rendering
                // console.log(this.$store.getters.doneAuth.access_token);
                this.isLoading = false;
                this.$router.push("/home/meterreading");
              })
              .catch(e => {
                this.isLoading = false;
                //loader.hide();
                //console.log(e);
              });

            //  Cookie.set('auth', response.data) // saving token in cookie for server rendering
          })
          .catch(e => {
            this.isLoading = false;
           // console.log(e.response.data)
            if (
              e.response.status == 400 &&
              e.response.data.error_description == "Bad credentials"
            ) {
              //this.$router.push("/")
              Swal.fire({
                title: "Wrong Username or Password",
                type: "warning",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  //this.$router.push("/bills/all")
                }
              });
            } else if (
              e.response.status == 400 &&
              e.response.data.error_description == "User account is locked"
            ) {
              //this.$router.push("/")
              Swal.fire({
                title:
                  "Your account is locked, Please contact the system administrator.",
                type: "error",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  //this.$router.push("/bills/all")
                }
              });
            }else  if (
              e.response.status == 400 &&
              e.response.data.error_description == null
            ){
               Swal.fire({
                title:
                  "The specified Username does not exist, Please create an account.",
                type: "error",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OKAY"
              }).then(result => {
                if (result.value) {
                  //this.$router.push("/bills/all")
                }
              });
            }
          });
      }
    }
  }
};
</script>

<style scoped lang="css">
  .login-card {
    border-radius: 15px;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
  }
  .scrolling-wrapper {
    -webkit-overflow-scrolling: touch;
  }
</style>
