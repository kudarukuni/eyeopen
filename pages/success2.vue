<template>
    <div id="pageDashboard" style="min-width:900px;overflow:auto">

        <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-card class="elevation-1 pa-3">
                <v-card-text>
                    <div>
                        <div class="layout column align-center">
                            <h3 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                <font color="green">
                                    <marquee>Congratulations Your E22 Application Was Successfully !!</marquee>                                    
                                </font>
                            </h3>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <v-container fluid grid-list-xl><center>
                            <div style="border: #3636363; border-style: groove;padding: 4em;">
                                <div class="column align-left">
                                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
                                        <p style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;" color="green">
                                           Application successful. Please note your Reference Number: 
                                           <center><h1><v-text-field style="color:white; width: 143px;" name="refnum" type="text" v-model="pjob = this.$route.query.data" readonly class="blue-text"></v-text-field></h1></center>
                                        </p><br/><br/>
                                        <p style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                            Download the excel file below for a list of registered electrical contractors available to assist you on the required Job Quotation.
                                        </p>
                                        <p>
                                            <v-btn outlined big color="blue" :href="`https://docs.google.com/spreadsheets/d/1Uq0B4GAO8dbUasTajL4fxrKh2K0-PgbYvRzFQmLVvZk/edit?gid=1754391964#gid=1754391964`" target="_blank">REGISTERED ELECTRICAL CONTRACTORS</v-btn>
                                        </p>
                                        <v-btn style="float: left;" outlined big color="black" :href="'/downloadapplication'">download copy</v-btn>
                                    </v-form>
                                </div>
                            </div>
                       </center>
                   </v-container>
                    </div><br /><br />                    
                    <v-btn style="float: right;" outlined big color="red" :href="'/'">back home</v-btn>                    
                    <br /><br /><br />
                </v-card-text>
            </v-card><br /><br />
        </client-only>

    </div>
</template>
  
<script>
    import API from "@/variables";
    import district from "@/variables/districts";
    import town from "@/variables/towns";
    import surburb from "@/variables/surbubs";
    import document from "@/variables/documents";
    import meter from "@/variables/meter";
    import material from "@/variables/material";
    import duration from "@/variables/duration";
    import purpose from "@/variables/purpose";
    import street from "@/variables/streets";
    import gender from "@/variables/gender";
    import VueRecaptcha from "vue-recaptcha";
    import VuePhoneNumberInput from "vue-phone-number-input";
    import "vue-phone-number-input/dist/vue-phone-number-input.css";
    import Loading from "vue-loading-overlay";
    import "vue-loading-overlay/dist/vue-loading.css";
    import { upload } from "./file-upload.service";
    import { upload1 } from "./file-uploadpr.service";
    import { upload2 } from "./file-uploadoi.service";
    import { upload3 } from "./file-uploadptr.service";
    import Swal from "sweetalert2";
    import { wait } from "./utils";
    import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';
    export default {
        layout: "regauth",
        middleware: "notAuthenticated",
        components: {
            Loading
        },
        data: () => ({
            loading: false,            
            API: API,
            isLoading: false,
            fullPage: true,
            valid: true,
            pjob: "",
            pjobRules: [
                v => !!v || "Reference Number Is Required",
                v => (v && v.length == 13) || "Reference Number Must Be 13 Characters"
            ],
            showed: false,
            pstatus: [],
            uploadedFiles: [],
            timerCount: 300,
            model: {
                pjob: "",
            }
        }),
        watch: {
            timerCount: {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
                },
                immediate: true 
            }
        },
        created() { },
        methods: {
            getPJob: function () {
                if (this.$refs.form.validate()) {
                    this.showed = false;
                    this.isLoading = true;
                    this.$axios.request({
                      url: "http://172.16.29.12:3017/api/newnetmet4/" + this.model.pjob,
                      method: "post",
                    }).then((response) => {
                      this.isLoading = false;
                      if (response.data != "" || response.data != null) {
                        this.success.push( "Your Application Is Ready For Download. " + response.data);
                        this.$router.push({ path: "/download1", query: { data: response.data },
                        });
                      } else {
                          this.errors.push("PJOB Number Already Exists");
                        }
                      }).catch((e) => {
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
