<template>
    <div id="pageDashboard" style="min-width:900px;overflow:auto">
        <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-card class="elevation-1 pa-3">
                <v-card-text height="200">
                    <div>
                        <loading :active.sync="isLoading" :can-cancel="false" :width="110" :height="110" backgroundColor="#ffffff" :opacity="0.5" :zIndex="999" :color="API.getLoaderColor"
                            :loader="API.getLoader" :is-full-page="fullPage"></loading>
                        <div class="layout column align-center">
                            <center>
                                <h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                    <font color='#3f51b5'>
                                        <b>Download Copy Of My Application</b>
                                    </font>
                                </h2>
                            </center>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <v-container fluid grid-list-xl>
                            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
                                <center>
                                    <v-flex xs12 sm5>
                                        <v-text-field color="primary" required outlined clearable :counter="15" label="Enter Your PJob Number"
                                            :max-length="15" :rules="pjobRules" v-model="model.pjob" @keyup.enter="getPJob"
                                            id="testing"></v-text-field>
                                    </v-flex>
                                    <v-btn color="primary" @click="displayContent">Find Application</v-btn>
                                </center>
                            </v-form>
                        </v-container>
                    </div>
                </v-card-text>

                <v-card-text height="200" v-show="showed">                                                        
                    <div ref="printContent" class="print-content">
                                      <v-form class="form">
                                            <div class="form-column">
                                              <v-text-field name="input-1" label="Title" color="primary" v-model="pstatus.gender" required readonly dense
                                                id="testing" style="margin: 0.5em; width: 50px;"></v-text-field>
                                              <v-text-field name="input-1" label="Document ID" color="primary" v-model="pstatus.document_id" required dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>                                
                                            </div>                              
                                            <div class="form-column">
                                              <v-text-field name="input-1" label="Surname" color="primary" v-model="pstatus.surname" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Email" color="primary" v-model="pstatus.email" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                            <div class="form-column">
                                              <v-text-field name="input-1" label="Firstname" color="primary" v-model="pstatus.customer_name" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Phone Number" color="primary" v-model="pstatus.owner_contact1" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                      </v-form><br/><br/>

                                      <v-form class="form">
                                            <div class="form-column">
                                              <v-text-field name="input-1" label="Physical Address" color="primary" v-model="pstatus.postal_address_a" required readonly dense
                                                id="testing" style="margin: 0.5em; width: 695px;"></v-text-field>
                                            </div>
                                      </v-form><br/><br/>

                                      <v-form class="form">
                                            <div class="form-column">
                                              <v-text-field name="input-1" label="Other Phone Number" color="primary" v-model="pstatus.owner_contact2" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-select xs6 v-model="model.street" label="Street" item-text="nom_CALLE" item-value="cod_CALLE" required readonly dense class="input-group--focused" style="margin: 0.5em"></v-select>
                                              <v-text-field name="input-1" label="Extension" color="primary" v-model="pstatus.duplicator" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Next Of Kin National ID" color="primary" v-model="pstatus.nok_national_id" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>                              
                                            <div class="form-column">
                                              <v-select item-text="nom_MUNIC" item-value="cod_MUNIC" label="Town" required @change="surbubName($event)"
                                                class="input-group--focused" style="margin: 0.5em" name="input-1" v-model="pstatus.town" readonly dense
                                                id="testing"></v-select>
                                              <v-text-field name="input-1" label="Stand Number (Plot Number)" color="primary" v-model="pstatus.standnumber" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Next Of Kin Surname" color="primary" v-model="pstatus.nok_surname" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Next Of Kin Phone Number" color="primary" v-model="pstatus.nok_contact1" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                            <div class="form-column">
                                              <v-select xs6 v-model="model.surburb" label="Suburb" required @change="streetName($event)" item-text="nom_LOCAL" item-value="cod_LOCAL" class="input-group--focused" style="margin: 0.5em" readonly dense></v-select>
                                              <v-text-field name="input-1" label="Street Number" color="primary" v-model="pstatus.door_number" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Next Of Kin Firstname" color="primary" v-model="pstatus.nok_firstname" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Next Of Kin Other Phone Number" color="primary" v-model="pstatus.nok_contact2" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                      </v-form><br/><br/>

                                      <v-form class="form">
                                            <div class="form-column">
                                              <v-text-field name="input-1" label="Next Of Kin Physical Address" color="primary" v-model="pstatus.nok_address" required readonly dense
                                                id="testing" style="margin: 0.5em; width: 695px;"></v-text-field>
                                            </div>
                                      </v-form><br/><br/>

                                      <v-form class="form">
                                            <div class="form-column">
                                              <v-autocomplete sx6 v-model="pstatus.supply_type" label="Type Of Supply" readonly dense required 
                                                item-text="purpose" item-value="abbr" class="input-group--focused" style="margin: 0.5em;">
                                                </v-autocomplete>
                                              <v-autocomplete sx6 v-model="pstatus.connection_type" label="Connection Type" item-text="meter" item-value="abbr" class="input-group--focused" style="margin: 0.5em;" required readonly dense></v-autocomplete>
                                              <v-text-field name="input-1" label="Main Switch AMP" color="primary" v-model="pstatus.main_switch_amp" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Contractor Surname" color="primary" v-model="pstatus.contractor_surname" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                            <div class="form-column">
                                              <v-text-field name="input-1" label="Duration" color="primary" v-model="pstatus.duration" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Number Of Meters" color="primary" v-model="pstatus.number_of_meter" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Main Switch OR" color="primary" v-model="pstatus.main_switch_or" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Next Of Kin National ID" color="primary" v-model="pstatus.contractor_name" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                            <div class="form-column">
                                              <v-text-field name="input-1" label="Roofing Material" color="primary" v-model="pstatus.material" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Main Switch KVA" color="primary" v-model="pstatus.main_switch_kva" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Cable Length" color="primary" v-model="pstatus.cable_length" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field name="input-1" label="Contractor Firm" color="primary" v-model="pstatus.contractor_firm" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                      </v-form><br/><br/>

                                      <v-form class="form">
                                            <div class="form-column">
                                              <v-text-field name="input-1" label="Contracting Firm's Physical Address" color="primary" v-model="pstatus.contractor_address" required readonly dense
                                                id="testing" style="margin: 0.5em; width: 695px;"></v-text-field>
                                            </div>
                                      </v-form><br/><br/>

                                      <v-form class="form">
                                            <div class="form-column">
                                              <v-text-field v-if="transfered === 'yess'" name="input-1" label="Name Of Employer" color="primary" v-model="pstatus.name_of_employer" required readonly dense
                                                id="testing" style="margin: 0.5em;" ></v-text-field>
                                              <v-text-field v-if="transfered === 'yess'" name="input-1" label="Premise Owner" color="primary" v-model="pstatus.premise_owner" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field v-if="transfered === 'yess'" name="input-1" label="Reason for Transfer Connection" color="primary" v-model="pstatus.transfer_reason2" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field v-if="transfered === 'yes'" name="input-1" label="Reason for Reconnection" color="primary" v-model="pstatus.transfer_reason" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                            <div class="form-column">
                                              <v-text-field v-if="transfered === 'yess'" name="input-1" label="Name Of Trade" color="primary" v-model="pstatus.name_of_trade" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field v-if="transfered === 'yess'" name="input-1" label="Employer Contact" color="primary" v-model="pstatus.employed_contact1" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field v-if="transfered === 'yes'" name="input-1" label="Service Point Number" color="primary" v-model="pstatus.service_point_address" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                            <div class="form-column">
                                              <v-text-field v-if="transfered === 'yess'" name="input-1" label="Roofing Material" color="primary" v-model="pstatus.premise_owner_address" required readonly dense id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field v-if="transfered === 'yess'" name="input-1" label="Other Employer Contact" color="primary" v-model="pstatus.employed_contact2" required readonly dense id="testing" style="margin: 0.5em;"></v-text-field>
                                              <v-text-field v-if="transfered === 'yes'" name="input-1" label="Account Number" color="primary" v-model="pstatus.nis_rad" required readonly dense
                                                id="testing" style="margin: 0.5em;"></v-text-field>
                                            </div>
                                      </v-form>

                                      <v-form class="form">
                                            <v-simple-table height="540px">
                                              <template>
                                                <thead>
                                                  <tr>
                                                    <th class="text-left"><font color="black">Type Of Installation</font></th>
                                                    <th class="text-left"><font color="black">Number</font></font></th>
                                                    <th class="text-left"><font color="black">Number Of Circuits</font></th>
                                                    <th class="text-left"><font color="black">Estimatted Wattage</font></th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Lighting Points</b></font></td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                                        v-model="pstatus.lighting_points_number" required id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" label="Number Of Curcuits" type="number" color="primary"
                                                        v-model="pstatus.lighting_points_circuits" required id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" label="Estimated Wattage" type="number" color="primary"
                                                        v-model="pstatus.lighting_points_wattage" required id="testing"></v-text-field>
                                                    </td>
                                                  </tr><br/>
                                                  <tr>
                                                    <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Socket outlets</b></font></td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                                        v-model="pstatus.socket_outlets_number" required id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                                        v-model="pstatus.socket_outlets_circuits" required id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                                        v-model="pstatus.socket_outlets_wattage" required id="testing"></v-text-field>
                                                    </td>
                                                  </tr><br/>
                                                  <v-alert type="error" :value="errors.length > 0" :dismissible="true">
                                                    <b>Please correct the following error(s):</b>
                                                    <ul>
                                                      <li v-for="error in errors" :key="error">{{ error }}</li>
                                                    </ul>
                                                  </v-alert>
                                                  <v-alert type="success" :value="success.length > 0" :dismissible="true">
                                                    <p v-for="succ in success" :key="succ">{{ succ }}</p>
                                                  </v-alert>
                                                  <tr>
                                                    <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Cooking points</b></font></td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Number Reqiured" color="primary"
                                                        v-model="pstatus.cooker_points_number" required id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                                        v-model="pstatus.cooker_points_circuits" required id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                                        v-model="pstatus.cooker_points_wattage" required id="testing"></v-text-field>
                                                    </td>
                                                  </tr><br/>
                                                  <tr>
                                                    <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Water heaters</b></font></td>
                                                    <td>
                                                      <v-text-field name="input-1" label="Number Required" color="primary"
                                                        v-model="pstatus.water_heaters_number" required type="number" id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                                        v-model="pstatus.water_heaters_circuits" required id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                                        v-model="pstatus.water_heaters_wattage" required id="testing"></v-text-field>
                                                    </td>
                                                  </tr><br/>
                                                  <tr>
                                                    <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Airconditioning</b></font></td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                                        v-model="pstatus.air_conditioning_number" required id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                                        v-model="pstatus.air_conditioning_circuits" required id="testing"></v-text-field>
                                                    </td>
                                                    <td>
                                                      <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                                        v-model="pstatus.air_conditioning_wattage" required id="testing"></v-text-field>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </template>
                                            </v-simple-table>
                                      </v-form>                          
                    </div>
                    <center><v-btn style="margin-right:20px" outlined big color="indigo" @click="printContent" v-show="showed">Send To Print</v-btn>&nbsp;&nbsp;&nbsp;</center>
                </v-card-text>
            </v-card>
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

  const STATUS_INITIAL  = 0, STATUS_SAVING  = 1, STATUS_SUCCESS  = 2, STATUS_FAILED  = 3, 
        STATUS_INITIAL1 = 0, STATUS_SAVING1 = 1, STATUS_SUCCESS1 = 2, STATUS_FAILED1 = 3,
        STATUS_INITIAL2 = 0, STATUS_SAVING2 = 1, STATUS_SUCCESS2 = 2, STATUS_FAILED2 = 3,
        STATUS_INITIAL3 = 0, STATUS_SAVING3 = 1, STATUS_SUCCESS3 = 2, STATUS_FAILED3 = 3;

    export default {
        layout: "regauth",
        middleware: "notAuthenticated",
        components: {
            VueRecaptcha,
            VuePhoneNumberInput,
            Loading,
        },
        data: () => ({
            clickable: false,
            load: false,
            uploadedFiles: [],
            uploadedFiles1: [],
            uploadedFiles2: [],
            uploadedFiles3: [],
            uploadFieldName: "photos",
            uploadFieldName1: "photos",
            uploadFieldName2: "photos",
            uploadFieldName3: "photos",
            uploadError: null,
            uploadError1: null,
            uploadError2: null,
            uploadError3: null,
            currentStatus: null,
            currentStatus1: null,
            currentStatus2: null,
            currentStatus3: null,
            towwns: [],
            ssurbub: [],
            sstreets: [],
            transfer: false,
            transfered: false,
            loading: false,
            visible: false,
            isLoading: false,
            fullPage: true,
            API: API,
            visible1: false,
            errors: [],
            pleaseTickRecaptchaMessage: "",
            recaptchaVerified: false,
            success: [],
            e1: 0,
            max: 12,
            inputField: [(v) => (v && v.length >= 5) || "Minimum Length is 5"],
            images: null,
            loading: false,
            pjob: "",
            API: API,
            isLoading: false,
            fullPage: true,
            valid: true,
            pjobRules: [
                v => !!v || "Job Number Is Required",
                v => (v && v.length == 15) || "Job Number Must Be 15 Characters"
            ],
            showed: false,
            pstatus: [],
            pstatus2: [],
            pstatus3: [],
            uploadedFiles: [],
            model: {
                pjob: "",
            },
            duration: duration,
            gender: gender,
            material: material,
            meter: meter,
            purpose: purpose,
            district: district,
            results: {},
            result: {},
            results1: {},
            result1: {},
            results2: {},
            result2: {},
            results3: {},
            result3: {},
        }),
        watch: {
          descEst(newValue) {
            if (newValue === '17001') {
              this.transfer = 'yes';
            } else if (newValue === 'no') {
              this.transfer = 'no';
            } else {
              this.transfer = null;
            }
          },
          transfer(newValue) {
            if (newValue === 'yes') {
              this.transfer = 'yes';
            } else if (newValue === 'no') {
              this.transfer = 'no';
            } else {
              this.transfer = null;
            }
          },
          transfered(newValue) {
            if (newValue === 'yess') {
              this.transfer = 'yess';
            } else if (newValue === 'noo') {
              this.transfer = 'noo';
            } else {
              this.transfer = null;
            }
          }
        },
        created() {
          this.$axios
            .request({
              url: "http://172.16.13.12:5050/selfservice_test/job/quotation/towns",
              method: "post",
              crossDomain: true,
              baseURL: process.env.baseUrl,
            })
            .then((response) => {
              this.towwns = response.data;
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        },
        computed: {
          uploadmodel() {
            return {
              postal_proof: this.uploadedFiles[0].id,
              owner_id_proof: this.uploadedFiles1[0].id,
              transfer_add_proof: this.uploadedFiles2[0].id,
              nok_id_proof: this.uploadedFiles3[0].id,
            };
          },
          computeLogo() {
            return "/logo.png";
          },
          isInitial() {
            return this.currentStatus === STATUS_INITIAL;
          },
          isSaving() {
            return this.currentStatus === STATUS_SAVING;
          },
          isSuccess() {
            return this.currentStatus === STATUS_SUCCESS;
          },
          isFailed() {
            return this.currentStatus === STATUS_FAILED;
          },
          isInitial1() {
            return this.currentStatus1 === STATUS_INITIAL1;
          },
          isSaving1() {
            return this.currentStatus1 === STATUS_SAVING1;
          },
          isSuccess1() {
            return this.currentStatus1 === STATUS_SUCCESS1;
          },
          isFailed1() {
            return this.currentStatus1 === STATUS_FAILED1;
          },
          isInitial2() {
            return this.currentStatus2 === STATUS_INITIAL2;
          },
          isSaving2() {
            return this.currentStatus2 === STATUS_SAVING2;
          },
          isSuccess2() {
            return this.currentStatus2 === STATUS_SUCCESS2;
          },
          isFailed2() {
            return this.currentStatus2 === STATUS_FAILED2;
          },
          isInitial3() {
            return this.currentStatus3 === STATUS_INITIAL3;
          },
          isSaving3() {
            return this.currentStatus3 === STATUS_SAVING3;
          },
          isSuccess3() {
            return this.currentStatus3 === STATUS_SUCCESS3;
          },
          isFailed3() {
            return this.currentStatus3 === STATUS_FAILED3;
          },
        },
        mounted() {
          this.reset();
          this.reset1();
          this.reset2();
          this.reset3();
        },
        methods: {
            displayContent(){
                this.getPJob();
            },
            printContent() {
              let printWindow = window.open('', '_blank');
              printWindow.document.open();
              printWindow.document.write(`
                  <html>
                  <head>
                      <title>Download Application Copy</title>
                      <style>
                          body {
                              font-family: Arial, sans-serif;
                              margin: 20px;
                          }
                          .print-content {
                              background-color: #f9f9f9;
                              padding: 20px;
                              border: 1px solid #ccc;
                              box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
                          }
                          h1 {
                              color: #333;
                              text-align: center;
                          }
                          p {
                              color: #555;
                              line-height: 1.5;
                          }
                      </style>
                  </head>
                  <body>
                    <div class="print-content">
                      <h1>Application For New Connections (Individuals)</h1>
                        <v-form class="form">
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Title" color="primary" v-model="model.gender" required readonly dense
                                      id="testing" style="margin: 0.5em; width: 50px;" :rules="[(v) => !!v || 'Title is required']">${this.pstatus.gender}</v-text-field>
                                    <v-text-field name="input-1" label="Document ID" color="primary" v-model="model.document_id" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.document_id}</v-text-field>                                
                                  </div>                              
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Surname" color="primary" v-model="model.surname" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.surname}</v-text-field>
                                    <v-text-field name="input-1" label="Email" color="primary" v-model="model.email" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.email}</v-text-field>
                                  </div>
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Firstname" color="primary" v-model="model.customer_name" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.customer_name}</v-text-field>
                                    <v-text-field name="input-1" label="Phone Number" color="primary" v-model="model.owner_contact1" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.owner_contact1}</v-text-field>
                                  </div>
                            </v-form><br/><br/>

                            <v-form class="form">
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Physical Address" color="primary" v-model="model.postal_address_a" required readonly dense
                                      id="testing" style="margin: 0.5em; width: 695px;">${this.pstatus.postal_address_a}</v-text-field>
                                  </div>
                            </v-form><br/><br/>

                            <v-form class="form">
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Other Phone Number" color="primary" v-model="model.owner_contact2" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.owner_contact2}</v-text-field>
                                    <v-text-field name="input-1" label="Street" color="primary" v-model="model.street" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.street}</v-text-field>
                                    <v-text-field name="input-1" label="Extension" color="primary" v-model="model.duplicator" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.duplicator}</v-text-field>
                                    <v-text-field name="input-1" label="Next Of Kin National ID" color="primary" v-model="model.nok_national_id" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.nok_national_id}</v-text-field>
                                  </div>                              
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Town" color="primary" v-model="model.town" required readonly dense
                                      id="testing" style="margin: 0.5em;" :rules="[(v) => !!v || 'Town is required']">${this.pstatus.town}</v-text-field>
                                    <v-text-field name="input-1" label="Stand Number (Plot Number)" color="primary" v-model="model.standnumber" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.standnumber}</v-text-field>
                                    <v-text-field name="input-1" label="Next Of Kin Surname" color="primary" v-model="model.nok_surname" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.nok_surname}</v-text-field>
                                    <v-text-field name="input-1" label="Next Of Kin Phone Number" color="primary" v-model="model.nok_contact1" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.nok_contact1}</v-text-field>
                                  </div>
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Surburb" color="primary" v-model="model.surburb" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.surburb}</v-text-field>
                                    <v-text-field name="input-1" label="Street Number" color="primary" v-model="model.door_number" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.door_number}</v-text-field>
                                    <v-text-field name="input-1" label="Next Of Kin Firstname" color="primary" v-model="model.nok_firstname" required readonly
                                      id="testing" style="margin: 0.5em;">${this.pstatus.nok_firstname}</v-text-field>
                                    <v-text-field name="input-1" label="Next Of Kin Other Phone Number" color="primary" v-model="model.nok_contact2" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.nok_contact2}</v-text-field>
                                  </div>
                            </v-form><br/><br/>

                            <v-form class="form">
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Next Of Kin Physical Address" color="primary" v-model="model.nok_address" required readonly dense
                                      id="testing" style="margin: 0.5em; width: 695px;">${this.pstatus.nok_address}</v-text-field>
                                  </div>
                            </v-form><br/><br/>

                            <v-form class="form">
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Supply Type" color="primary" v-model="model.supply_type" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.supply_type}</v-text-field>
                                    <v-text-field name="input-1" label="Connection Type" color="primary" v-model="model.connection_type" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.connection_type}</v-text-field>
                                    <v-text-field name="input-1" label="Main Switch AMP" color="primary" v-model="model.main_switch_amp" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.main_switch_amp}</v-text-field>
                                    <v-text-field name="input-1" label="Contractor Surname" color="primary" v-model="model.contractor_surname" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.contractor_surname}</v-text-field>
                                  </div>
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Duration" color="primary" v-model="model.duration" required readonly
                                      id="testing" style="margin: 0.5em;">${this.pstatus.duration}</v-text-field>
                                    <v-text-field name="input-1" label="Number Of Meters" color="primary" v-model="model.number_of_meter" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.number_of_meter}</v-text-field>
                                    <v-text-field name="input-1" label="Main Switch OR" color="primary" v-model="model.main_switch_or" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.main_switch_or}</v-text-field>
                                    <v-text-field name="input-1" label="Next Of Kin National ID" color="primary" v-model="model.contractor_name" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.contractor_name}</v-text-field>
                                  </div>
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Roofing Material" color="primary" v-model="model.material" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.material}</v-text-field>
                                    <v-text-field name="input-1" label="Main Switch KVA" color="primary" v-model="model.main_switch_kva" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.main_switch_kva}</v-text-field>
                                    <v-text-field name="input-1" label="Cable Length" color="primary" v-model="model.cable_length" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.cable_length}</v-text-field>
                                    <v-text-field name="input-1" label="Contractor Firm" color="primary" v-model="model.contractor_firm" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.contractor_firm}</v-text-field>
                                  </div>
                            </v-form><br/><br/>

                            <v-form class="form">
                                  <div class="form-column">
                                    <v-text-field name="input-1" label="Contracting Firm's Physical Address" color="primary" v-model="model.contractor_address" required readonly dense
                                      id="testing" style="margin: 0.5em; width: 695px;">${this.pstatus.contractor_address}</v-text-field>
                                  </div>
                            </v-form><br/><br/>

                            <v-form class="form">
                                  <div class="form-column">
                                    <v-text-field v-if="transfered === 'yess'" name="input-1" label="Name Of Employer" color="primary" v-model="model.name_of_employer" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.name_of_employer}</v-text-field>
                                    <v-text-field v-if="transfered === 'yess'" name="input-1" label="Premise Owner" color="primary" v-model="model.premise_owner" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.premise_owner}</v-text-field>
                                    <v-text-field v-if="transfered === 'yess'" name="input-1" label="Reason for Transfer Connection" color="primary" v-model="model.transfer_reason2" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.transfer_reason2}</v-text-field>
                                    <v-text-field v-if="transfered === 'yes'" name="input-1" label="Reason for Reconnection" color="primary" v-model="model.transfer_reason" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.transfer_reason}</v-text-field>
                                  </div>
                                  <div class="form-column">
                                    <v-text-field v-if="transfered === 'yess'" name="input-1" label="Name Of Trade" color="primary" v-model="model.name_of_trade" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.name_of_trade}</v-text-field>
                                    <v-text-field v-if="transfered === 'yess'" name="input-1" label="Employer Contact" color="primary" v-model="model.employed_contact1" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.employed_contact1}</v-text-field>
                                    <v-text-field v-if="transfered === 'yes'" name="input-1" label="Service Point Number" color="primary" v-model="model.service_point_address" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.service_point_address}</v-text-field>
                                  </div>
                                  <div class="form-column">
                                    <v-text-field v-if="transfered === 'yess'" name="input-1" label="Roofing Material" color="primary" v-model="model.premise_owner_address" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.premise_owner_address}</v-text-field>
                                    <v-text-field v-if="transfered === 'yess'" name="input-1" label="Other Employer Contact" color="primary" v-model="model.employed_contact2" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.employed_contact2}</v-text-field>
                                    <v-text-field v-if="transfered === 'yes'" name="input-1" label="Account Number" color="primary" v-model="model.nis_rad" required readonly dense
                                      id="testing" style="margin: 0.5em;">${this.pstatus.nis_rad}</v-text-field>
                                  </div>
                            </v-form>

                            <v-form class="form">
                                  <v-simple-table height="540px">
                                    <template>
                                      <thead>
                                        <tr>
                                          <th class="text-left"><font color="black">Type Of Installation</font></th>
                                          <th class="text-left"><font color="black">Number</font></font></th>
                                          <th class="text-left"><font color="black">Number Of Circuits</font></th>
                                          <th class="text-left"><font color="black">Estimatted Wattage</font></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Lighting Points</b></font></td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                              v-model="model.lighting_points_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']">${this.pstatus.lighting_points_number}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" label="Number Of Curcuits" type="number" color="primary"
                                              v-model="model.lighting_points_circuits" required id="testing" :rules="[v => !!v || '']">${this.pstatus.lighting_points_circuits}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" label="Estimated Wattage" type="number" color="primary"
                                              v-model="model.lighting_points_wattage" required id="testing" :rules="[v => !!v || '']">${this.pstatus.lighting_points_wattage}</v-text-field>
                                          </td>
                                        </tr><br/>
                                        <tr>
                                          <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Socket outlets</b></font></td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                              v-model="model.socket_outlets_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']">${this.pstatus.socket_outlets_number}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                              v-model="model.socket_outlets_circuits" required id="testing" :rules="[v => !!v || '']">${this.pstatus.socket_outlets_circuits}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                              v-model="model.socket_outlets_wattage" required id="testing" :rules="[v => !!v || '']">${this.pstatus.socket_outlets_wattage}</v-text-field>
                                          </td>
                                        </tr><br/>
                                        <v-alert type="error" :value="errors.length > 0" :dismissible="true">
                                          <b>Please correct the following error(s):</b>
                                          <ul>
                                            <li v-for="error in errors" :key="error">{{ error }}</li>
                                          </ul>
                                        </v-alert>
                                        <v-alert type="success" :value="success.length > 0" :dismissible="true">
                                          <p v-for="succ in success" :key="succ">{{ succ }}</p>
                                        </v-alert>
                                        <tr>
                                          <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Cooking points</b></font></td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Number Reqiured" color="primary"
                                              v-model="model.cooker_points_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']">${this.pstatus.cooker_points_number}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                              v-model="model.cooker_points_circuits" required id="testing" :rules="[v => !!v || '']">${this.pstatus.cooker_points_circuits}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                              v-model="model.cooker_points_wattage" required id="testing" :rules="[v => !!v || '']">${this.pstatus.cooker_points_wattage}</v-text-field>
                                          </td>
                                        </tr><br/>
                                        <tr>
                                          <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Water heaters</b></font></td>
                                          <td>
                                            <v-text-field name="input-1" label="Number Required" color="primary"
                                              v-model="model.water_heaters_number" required type="number" :rules="[v => !!v || 'Cannot be empty']"
                                              id="testing">${this.pstatus.water_heaters_number}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                              v-model="model.water_heaters_circuits" required id="testing" :rules="[v => !!v || '']">${this.pstatus.water_heaters_circuits}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                              v-model="model.water_heaters_wattage" required id="testing" :rules="[v => !!v || '']">${this.pstatus.water_heaters_wattage}</v-text-field>
                                          </td>
                                        </tr><br/>
                                        <tr>
                                          <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Airconditioning</b></font></td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                              v-model="model.air_conditioning_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']">${this.pstatus.air_conditioning_number}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                              v-model="model.air_conditioning_circuits" required id="testing" :rules="[v => !!v || '']">${this.pstatus.air_conditioning_circuits}</v-text-field>
                                          </td>
                                          <td>
                                            <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                              v-model="model.air_conditioning_wattage" required id="testing" :rules="[v => !!v || '']">${this.pstatus.air_conditioning_wattage}</v-text-field>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </template>
                                  </v-simple-table>
                            </v-form>
                      </div>
                  </body>
                </html>
              `);
              printWindow.document.close();
              printWindow.print();
            },
            getJobDoc: function () {
                this.getPJob();
                this.getPJobStatus();
                this.getPJobStatus2();
            },
            getPJob: function () {
                if (this.$refs.form.validate()) {
                    this.showed = false;
                    this.isLoading = true;
                    this.$axios
                        .request({
                            url: "http://172.16.29.12:3017/api/newnetmet4/" + this.model.pjob.toUpperCase(),
                            method: "post",
                        })
                        .then(response => {
                            this.isLoading = false;
                            this.pstatus = response.data;
                            if (this.pstatus == "") {
                                this.showed = false;
                                Swal.fire({
                                    title: "Invalid PJob Number",
                                    type: "warning",
                                    showCancelButton: false,
                                    allowOutsideClick: false,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "OKAY"
                                }).then(result => {
                                    if (result.value) {
                                        this.pjob = "";
                                        this.$router.push("/application/tracker");
                                    }
                                });
                            } else {
                                this.showed = true;
                                this.isLoading = false;
                                this.pstatus = response.data;
                                console.log(response.data)
                            }
                        })
                        .catch(e => {
                            this.isLoading = false;
                            //   console.log(e)
                        });
                }
            },
            viewQuote: function () {
                this.$router.push("/application/quotation/" + this.pjob);
            },
            getPJobStatus: function () {
                if (this.$refs.form.validate()) {
                    this.showed = false;
                    this.isLoading = true;
                    this.$axios
                        .request({
                            url: "http://172.16.29.12:3017/api/newnetmet5/" + this.model.pjob.toUpperCase(),
                            method: "post",
                        })
                        .then(response => {
                            this.isLoading = false;
                            this.pstatus2 = response.data;
                            if (this.pstatus2 == "") {
                                this.showed = false;
                                Swal.fire({
                                    title: "Invalid PJob Number",
                                    type: "warning",
                                    showCancelButton: false,
                                    allowOutsideClick: false,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "OKAY"
                                }).then(result => {
                                    if (result.value) {
                                        this.pjob = "";
                                        this.$router.push("/application/tracker");
                                    }
                                });
                            } else {
                                this.showed = true;
                                this.isLoading = false;
                                this.pstatus2 = response.data;
                                console.log(response.data)
                            }
                        })
                        .catch(e => {
                            this.isLoading = false;
                            //   console.log(e)
                        });
                }
            },
            getPJobStatus2: function () {
                if (this.$refs.form.validate()) {
                    this.showed = false;
                    this.isLoading = true;
                    this.$axios
                        .request({
                            url: "http://172.16.29.12:3017/api/newnetmet6/" + this.model.pjob.toUpperCase(),
                            method: "post",
                        })
                        .then(response => {
                            this.isLoading = false;
                            this.pstatus3 = response.data;
                            if (this.pstatus3 == "") {
                                this.showed = false;
                                Swal.fire({
                                    title: "Invalid PJob Number",
                                    type: "warning",
                                    showCancelButton: false,
                                    allowOutsideClick: false,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "OKAY"
                                }).then(result => {
                                    if (result.value) {
                                        this.pjob = "";
                                        this.$router.push("/application/tracker");
                                    }
                                });
                            } else {
                                this.showed = true;
                                this.isLoading = false;
                                this.pstatus3 = response.data;
                                console.log(response.data)
                            }
                        })
                        .catch(e => {
                            this.isLoading = false;
                            //   console.log(e)
                        });
                }
            },
            updateModel() {
                this.model.postal_proof = this.uploadedFiles[0].id;
                this.model.owner_id_proof = this.uploadedFiles1[0].id;
                this.model.transfer_add_proof = this.uploadedFiles2[0].id;
                this.model.nok_id_proof = this.uploadedFiles3[0].id;
            },
            sortFunc: function () {
                return this.towwns.slice().sort(function (a, b) {
                    return a.nom_MUNIC > b.nom_MUNIC ? 1 : -1;
                });
            },
            sortSub: function () {
                return this.ssurbub.slice().sort(function (a, b) {
                  return a.nom_LOCAL > b.nom_LOCAL ? 1 : -1;
                });
            },
            sortStr: function () {
                return this.sstreets.slice().sort(function (a, b) {
                    return a.nom_CALLE > b.nom_CALLE ? 1 : -1;
                });
            },
            cancelled: function () {
                this.e1 = 1;
                this.$refs.form1.reset();
                this.$refs.form2.reset();
                this.$refs.form3.reset();
                this.$refs.form4.reset();
                this.$refs.form5.reset();
                this.$refs.form6.reset();
                this.$refs.form7.reset();
                this.$refs.form8.reset();
            },
            showMessage() {
                Swal.fire({
                  title: 'Error',
                  text: 'An unexpected error occurred. Please Contact The System Admininstrator',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  showCancelButton: false,
                  allowOutsideClick: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                })
            },
            nextStep: function (e) {
                if (e == 1) {
                  if (this.$refs.form1.validate()) {
                    this.e1 = e + 1;
                  }
                } else if (e == 2) {
                  if (this.$refs.form2.validate()) {
                    this.e1 = e + 1;
                  }
                } else if (e == 3) {
                  if (this.$refs.form3.validate()) {
                    this.e1 = e + 1;
                  }
                } else if (e == 4) {
                  if (this.$refs.form4.validate()) {
                    this.e1 = e + 1;
                  }
                } else if (e == 5) {
                  if (this.$refs.form5.validate()) {
                    this.e1 = e + 1;
                  }
                } else if (e == 6) {
                  if (this.$refs.form6.validate()) {
                    this.e1 = e + 1;
                  }
                } else if (e == 7) {
                  if (this.$refs.form7.validate()) {
                    this.e1 = e + 1;
                  }
                } else if (e == 8) {
                  if (this.$refs.form8.validate()) {
                    this.e1 = e + 1;
                  }
                } else if (e == 9) {
                  if (this.$refs.form9.validate()) {
                    this.register();
                  }
                }
            },
            prevStep: function (e) {
                if (e == 2) {
                  this.e1 = e - 1;
                } else if (e == 3) {
                  this.e1 = e - 1;
                } else if (e == 4) {
                  this.e1 = e - 1;
                } else if (e == 5) {
                  this.e1 = e - 1;
                } else if (e == 6) {
                  this.e1 = e - 1;
                } else if (e == 7) {
                  this.e1 = e - 1;
                } else if (e == 8) {
                  this.e1 = e - 1;
                } else if (e == 9) {
                  this.e1 = e - 1;
                }
            },
            onUpdate(payload) {
                this.results = payload;
            },
            onUp(payload) {
                this.result = payload;
            },
            onUpdate1(payload) {
                this.results1 = payload;
            },
            onUp1(payload) {
                this.result1 = payload;
            },
            onUpdate2(payload) {
                this.results2 = payload;
            },
            onUp2(payload) {
                this.result2 = payload;
            },
            onUpdate3(payload) {
                this.results3 = payload;
            },
            onUp3(payload) {
                this.result3 = payload;
            },
            surbubName(event) {
                this.$axios
                  .request({
                    url:
                      "http://172.16.13.12:5050/selfservice_test/job/quotation/suburbs/" +
                      this.model.town,
                    method: "post",
                    baseURL: process.env.baseUrl,
                  })
                  .then((response) => {
                    this.ssurbub = response.data;
                    console.log(response.data);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            },
            streetName(event) {
                this.$axios
                  .request({
                    url:
                      "http://172.16.13.12:5050/selfservice_test/job/quotation/streets/" +
                      this.model.surburb,
                    method: "post",
                    baseURL: process.env.baseUrl,
                  })
                  .then((response) => {
                    this.sstreets = response.data;
                    console.log(response.data);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            },
            register() {
                this.errors = [];
                this.success = [];        
                if (this.$refs.form1.validate() & this.$refs.form2.validate() & this.$refs.form3.validate() & this.$refs.form4.validate() & this.$refs.form5.validate() & this.$refs.form6.validate() & this.$refs.form7.validate() & this.$refs.form8.validate() & this.$refs.form9.validate()) {
                  if (this.results.isValid == true) {
                    this.model.standnumber = this.model.standnumber.toUpperCase();
                    this.model.gender = this.model.gender.toUpperCase();
                    this.model.surname = this.model.surname.toUpperCase();
                    this.model.customer_name = this.model.customer_name.toUpperCase();
                    this.model.document_id = this.model.document_id.toUpperCase();
                    this.model.nok_firstname = this.model.nok_firstname.toUpperCase();
                    this.model.nok_surname = this.model.nok_surname.toUpperCase();
                    this.model.nok_national_id = this.model.nok_national_id.toUpperCase();
                    this.model.contact1 = this.results.formattedNumber;          
                    this.isLoading = true;
                    this.$axios.request({
                      url: "http://172.16.29.12:3017/api/newnetmet3",
                      method: "post", 
                      headers:{'Authorization': 'Bearer '+localStorage.getItem('token')},
                      data: this.model,
                    }).then((response) => {
                      this.isLoading = false;
                      if (response.data != "" || response.data != null) {
                        this.success.push( "Application successful. Please note, your PJOB number is " + response.data);
                        this.$router.push({ path: "/success2", query: { data: response.data },
                        });
                      } else {
                          this.showMessage();
                        }
                      }).catch((e) => {
                        this.isLoading = false;
                        this.showMessage();
                      });
                  } else {
                      this.isLoading = false;
                      this.showMessage();              
                  }
                } else {
                  if (!this.$refs.form1.validate()) {
                    this.e1 = 1;
                  } else if (!this.$refs.form2.validate()) {
                    this.e1 = 2;
                  } else if (!this.$refs.form3.validate()) {
                    this.e1 = 3;
                  } else if (!this.$refs.form4.validate()) {
                    this.e1 = 4;
                  } else if (!this.$refs.form5.validate()) {
                    this.e1 = 5;
                  } else if (!this.$refs.form6.validate()) {
                    this.e1 = 6;
                  } else if (!this.$refs.form7.validate()) {
                    this.e1 = 7;
                  } else if (!this.$refs.form8.validate()) {
                    this.e1 = 8;
                  } else if (!this.$refs.form9.validate()) {
                    this.e1 = 9;
                  }
                  this.isLoading = false;
                }
            },
            reset() {
                this.currentStatus = STATUS_INITIAL;
                this.uploadedFiles = [];
                this.uploadError = null;
            },
            reset1() {
                this.currentStatus1 = STATUS_INITIAL1;
                this.uploadedFiles1 = [];
                this.uploadError1 = null;
            },
            reset2() {
                this.currentStatus2 = STATUS_INITIAL2;
                this.uploadedFiles2 = [];
                this.uploadError2 = null;
            },
            reset3() {
                this.currentStatus3 = STATUS_INITIAL3;
                this.uploadedFiles3 = [];
                this.uploadError3 = null;
            },
            resetme() {
                this.currentStatus = STATUS_INITIAL;
                this.uploadedFiles = [];
                this.uploadError = null;
            },
            resetme1() {
                this.currentStatus1 = STATUS_INITIAL1;
                this.uploadedFiles1 = [];
                this.uploadError1 = null;
            },
            resetme2() {
                this.currentStatus2 = STATUS_INITIAL2;
                this.uploadedFiles2 = [];
                this.uploadError2 = null;
            },
            resetme3() {
                this.currentStatus3 = STATUS_INITIAL3;
                this.uploadedFiles3 = [];
                this.uploadError3 = null;
            },      
            save(formData) {
                this.currentStatus = STATUS_SAVING;
                upload(formData)
                  .then(wait(1500))
                  .then((x) => {
                    this.uploadedFiles = [].concat(x);
                    this.currentStatus = STATUS_SUCCESS;
                  })
                  .catch((err) => {
                    this.uploadError = err.response;
                    this.currentStatus = STATUS_FAILED;
                  });
            },
            filesChange(fieldName, fileList) {
                const formData = new FormData();
                if (!fileList.length) return;
                Array.from(Array(fileList.length).keys()).map((x) => {
                  formData.append(fieldName, fileList[x], fileList[x].name);
                });
                this.save(formData);
            },
            save1(formData1) {
                this.currentStatus1 = STATUS_SAVING1;
                upload1(formData1)
                  .then(wait(1500))
                  .then((x) => {
                    this.uploadedFiles1 = [].concat(x);
                    this.currentStatus1 = STATUS_SUCCESS1;
                  })
                  .catch((err) => {
                    this.uploadError1 = err.response;
                    this.currentStatus1 = STATUS_FAILED1;
                  });
            },
            filesChange1(fieldName, fileList) {
                const formData1 = new FormData();
                if (!fileList.length) return;
                Array.from(Array(fileList.length).keys()).map((x) => {
                  formData1.append(fieldName, fileList[x], fileList[x].name);
                });
                this.save1(formData1);
            },
            save2(formData2) {
                this.currentStatus2 = STATUS_SAVING2;
                upload2(formData2)
                  .then(wait(1500))
                  .then((x) => {
                    this.uploadedFiles2 = [].concat(x);
                    this.currentStatus2 = STATUS_SUCCESS2;
                  })
                  .catch((err) => {
                    this.uploadError2 = err.response;
                    this.currentStatus2 = STATUS_FAILED2;
                  });
            },
            filesChange2(fieldName, fileList) {
                const formData2 = new FormData();
                if (!fileList.length) return;
                Array.from(Array(fileList.length).keys()).map((x) => {
                  formData2.append(fieldName, fileList[x], fileList[x].name);
                });
                this.save2(formData2);
            },
            save3(formData3) {
                this.currentStatus3 = STATUS_SAVING3;
                upload3(formData3)
                  .then(wait(1500))
                  .then((x) => {
                    this.uploadedFiles3 = [].concat(x);
                    this.currentStatus3 = STATUS_SUCCESS3;
                  })
                  .catch((err) => {
                    this.uploadError3 = err.response;
                    this.currentStatus3 = STATUS_FAILED3;
                  });
            },
            filesChange3(fieldName, fileList) {
                const formData3 = new FormData();
                if (!fileList.length) return;
                Array.from(Array(fileList.length).keys()).map((x) => {
                  formData3.append(fieldName, fileList[x], fileList[x].name);
                });
                this.save3(formData3);
            },
        }
    };
</script>

<style scoped>
    .container {
        margin-top: 0 !important;
    }
    .text-red input {
    color: white !important;
    }
    #flow {
        min-width: 1024px;
        min-height: 566px;
        font-family: "Times New Roman", Times, serif;
        font-style: normal;
        background-image: url("/new_flow.png");
        background-size: 100%;
        position: sticky;
        overflow-x: auto;
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
