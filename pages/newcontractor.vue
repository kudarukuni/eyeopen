<template>
  <div id="pageDashboard" style="min-width: 900px; overflow: auto">
    <client-only
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <v-card class="elevation-1 pa-3">
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
        >
        </loading>
        <v-card-text>
          <center>
            <h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif">
              <font color="#3f51b5">
                <b>Registration Of Contractors / Suppliers</b>
              </font>
            </h2>
          </center>
          &nbsp;
          <v-alert type="error" :value="errors.length > 0" :dismissible="true">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </v-alert>
          <v-alert type="success" :value="success.length > 0" :dismissible="true">
            <p v-for="succ in success" :key="succ">{{ succ }}</p>
          </v-alert>
          <v-form ref="form">
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" editable step="1">Contractor/Supplier Details</v-stepper-step>
                <v-divider></v-divider>
                <!-- <v-stepper-step :complete="e1 > 2" editable step="2" :class="{ 'unclickable': !clickable }">Choose Discipline</v-stepper-step> -->
                <v-stepper-step :complete="e1 > 2" editable step="2">Choose Trade</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 3" editable step="3">Verification</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 4" editable step="4">Pay Now</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>

                <v-stepper-content step="1">
                  <v-card class="mb-5" height="740px">
                    <v-form ref="form1">
                      <v-flex xs12 d-flex>
                       <v-text-field sx6 name="input-1" dense label="Contractor / Supplier Name" color="primary" v-model="model.supliername" required id="testing" style="margin: 0.5em" :rules="[(v) => !!v || 'Invalid Contractor / Supplier Name']"
                        ></v-text-field>
                        <v-text-field xs6 name="input-1" dense label="Contractors Physical Address" required color="primary" v-model="model.postal_address_a" style="margin: 0.5em" :rules="[(v) => !!v || 'Your Address is required',]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 name="input-1" dense type="email" label="Email" v-model="model.email" :rules="[v => /.+@.+\..+/.test(v) || 'E-mail must be valid']" color="primary"   id="testing" style="margin: 0.5em;" required></v-text-field>
                        <VuePhoneNumberInput sx6 v-model="model.owner_contact2" label="Cell Number" required default-country-code="ZW" valid-color="green" style="margin: 0.8em; width: 110px"
                          @update="onUp" maxlength="9" required :rules="[(v) => !!v || 'Your Cell Number is required',]" dense/>
                      </v-flex>
                      <v-flex xs6 d-flex>
                        <VuePhoneNumberInput sx6 v-model="model.owner_contact1" label="Phone Number" required default-country-code="ZW" valid-color="green" style="margin: 0.8em; width: 110px" @update="onUpdate" maxlength="9" :rules="[(v) => !!v || 'Your Phone Number is required',]" dense/>                        
                      </v-flex>
                      <v-flex xs12 d-flex dense>
                        <div class="container">
                          <form enctype="multipart/form-data" novalidate v-if="isInitial1 || isSaving1">
                            <b align="center" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Upload Certificate Of Incorperation</b>&nbsp;
                            <div class="dropbox">
                              <input type="file" single :name="uploadFieldName1" :disabled="isSaving1" @change="filesChange1($event.target.name, $event.target.files);
                                fileCount = $event.target.files.length;" accept="application/pdf, image/png, image/jpeg, image/jpg" class="input-file" required/>
                              <p v-if="isInitial1">Drag & Drop Your File Here Or Click To Browse ....</p>
                              <p v-if="isSaving1">
                                Uploading Files, Please Wait ....
                              </p>
                            </div>
                          </form>
                          <div v-if="isSuccess1">
                            <font color="green" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                              Certificate Of Incorperation Uploaded Successfully</font>
                              <div v-for="(item1, index) in uploadedFiles1" style="display: flex; align-items: center;">
                                <v-text-field style="width: 10px; color: red; margin-right: 435px;" class="text-field-transparent" flat name="owner_id_proof" type="text" 
                                  autocomplete="off" v-model="model.owner_id_proof = item1.id" readonly :rules="[(v) => !!v || 'Owner ID Proof is required',]"></v-text-field>
                                <v-text-field xs11 style="color: red;" class="text-field-transparent" flat name="originalName" type="text" autocomplete="off"  :placeholder="item1.originalName" readonly></v-text-field><br/>                                
                              </div><a href="javascript:void(0)" @click="resetme1()">Edit Certificate Of Incorperation</a>
                          </div>
                          <div v-if="isFailed1">
                            <h3 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color="red">Failed To Upload Document !!</font> </h3>
                            <p><a href="javascript:void(0)" @click="reset1()" >Please Try Again ....</a></p>
                            <pre><p><strong><b>Please upload PDF documents only and try again.<br/> If the problem persists please call #704 ZETDC Call Center</b></strong></p></pre>
                          </div>
                        </div>                                               
                      </v-flex>
                      <v-flex xs12 d-flex dense>
                        <div class="container">
                          <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                            <b align="center" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Upload CR6 Document</b>&nbsp;
                            <div class="dropbox">
                              <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files);
                                fileCount = $event.target.files.length;" accept="application/pdf, image/png, image/jpeg, image/jpg" required class="input-file"/>
                              <p v-if="isInitial">Drag & Drop Your File Here Or Click To Browse ....</p>
                              <p v-if="isSaving">
                                Uploading Files, Please Wait ....
                              </p>
                            </div>
                          </form>
                          <div v-if="isSuccess">
                            <font color="green" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><center>
                              CR6 Document Uploaded Successfully
                            </center></font>
                              <div v-for="(item, index) in uploadedFiles" style="display: flex; align-items: center;">
                                <v-text-field style="width: 35px; color: red; margin-right: 435px;" class="text-field-transparent" flat name="postal_proof" type="text" autocomplete="off"
                                  v-model="model.postal_proof = item.id" readonly :rules="[(v) => !!v || 'Proof Of Residence is required',]"></v-text-field>
                                <v-text-field sx6 style="margin-right: 200px; width: 200px; color: red;" class="text-field-transparent" flat name="postal_proof" type="text" autocomplete="off" :placeholder="item.originalName" readonly></v-text-field><br/>                                
                              </div>
                              <br/><a href="javascript:void(0)" @click="resetme()">Edit CR6 Document</a>
                          </div>
                          <div v-if="isFailed">
                            <h3 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color="red">Failed To Upload Document !!</font> </h3>
                            <p><a href="javascript:void(0)" @click="reset()" >Please Try Again ....</a></p>
                            <pre><p><strong><b>Please upload PDF documents only and try again.<br/> If the problem persists please call #704 ZETDC Call Center</b></strong></p></pre>
                          </div>
                        </div>
                      </v-flex>
                      <v-flex xs12 d-flex dense>
                        <div class="container">                          
                          <form enctype="multipart/form-data" novalidate v-if="isInitial2 || isSaving2">
                            <b align="center" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">Upload CR5 Document</b>&nbsp;
                            <div class="dropbox">
                              <input type="file" multiple :name="uploadFieldName2" :disabled="isSaving2" @change="filesChange2($event.target.name, $event.target.files);
                                fileCount = $event.target.files.length;" accept="application/pdf, image/png, image/jpeg, image/jpg" class="input-file"/>
                              <p v-if="isInitial2">Drag & Drop Your File Here Or Click To Browse ....</p>
                              <p v-if="isSaving2">
                                Uploading Files, Please Wait ....
                              </p>
                            </div>
                          </form>
                          <div v-if="isSuccess2">
                            <font color="green" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><center>
                              CR5 Document Uploaded Successfully
                            </center></font>
                              <div v-for="(item2, index) in uploadedFiles2" style="display: flex; align-items: center;">
                                <v-text-field style="width: 35px; color: red; margin-right: 435px;" class="text-field-transparent" flat name="nok_id_proof" type="text" autocomplete="off"
                                  v-model="model.nok_id_proof = item2.id" readonly :rules="[(v) => !!v || 'Next Of Kin ID is required',]"></v-text-field>
                                <center><v-text-field sx6 style="width: 200px; color: red;" class="text-field-transparent" flat name="originalName" type="text" autocomplete="off" :placeholder="item2.originalName" readonly></v-text-field></center><br/>                                
                              </div>
                              <br/><a href="javascript:void(0)" @click="resetme2()">Edit CR5 Document</a>
                          </div>
                          <div v-if="isFailed2">
                            <h3 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color="red">Failed To Upload Document !!</font> </h3>
                            <p><a href="javascript:void(0)" @click="reset2()" >Please Try Again ....</a></p>
                            <pre><p><strong><b>Please upload PDF documents only and try again.<br/> If the problem persists please call #704 ZETDC Call Center</b></strong></p></pre>
                          </div>
                        </div>
                      </v-flex>
                    </v-form>
                  </v-card>
                  <v-btn color="primary" @click="nextStep(1)">Continue</v-btn>
                  <v-btn text @click="cancelled">Cancel</v-btn><br/>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card class="mb-5" height="540px">
                    <v-form ref="form2">
                      <v-flex xs12 d-flex>
                        <v-autocomplete sx6 :items="energycontractors" v-model="model.discipline" label="Trade" required item-text="energycontractors"
                          item-value="abbr" class="input-group--focused" style="margin: 0.5em" :rules="[(v) => !!v || 'Trade is required',]"
                        ></v-autocomplete>
                        <v-autocomplete sx6 :items="affiliateasoc" v-model="model.affiliassoc" label="Affiliate Association" required item-text="affiliateasoc"
                          item-value="abbr" class="input-group--focused" style="margin: 0.5em" :rules="[(v) => !!v || 'Affiliate Association is required',]"
                        ></v-autocomplete>
                      </v-flex>                        
                      <v-flex xs12 d-flex>                        
                        <v-text-field xs6 name="asocnum" label="Affiliate Association Certificate Number" color="primary" :maxlength="9" v-model="model.asocnumber" style="margin: 0.5em;" :rules="[(v) => !!v || 'Affiliate Association is required',]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        
                      </v-flex>
                    </v-form>
                  </v-card>
                  <v-btn color="primary" @click="nextStep(2)">Continue</v-btn>
                  <v-btn text @click="cancelled">Cancel</v-btn><br/>
                </v-stepper-content>                

                <v-stepper-content step="3">
                  <v-card class="mb-5" height="540px">
                    <v-card-text>
                      <div ref="printContent" class="print-content">
                        <v-form class="form">
                              <div class="form-column">
                                <v-text-field name="input-1" label="Title" color="primary" v-model="model.gender" required readonly dense
                                  id="testing" style="margin: 0.5em; width: 50px;" :rules="[(v) => !!v || 'Title is required']"></v-text-field>
                                <v-text-field name="input-1" label="Document ID" color="primary" v-model="model.document_id" required readonly dense
                                  id="testing" style="margin: 0.5em;"></v-text-field>
                                <v-text-field name="input-1" label="Other Phone Number" color="primary" v-model="model.owner_contact2" required readonly dense
                                  id="testing" style="margin: 0.5em;"></v-text-field>
                              </div>                              
                              <div class="form-column">
                                <v-text-field name="input-1" label="Surname" color="primary" v-model="model.surname" required readonly dense
                                  id="testing" style="margin: 0.5em;"></v-text-field>
                                <v-text-field name="input-1" label="Email" color="primary" v-model="model.email" required readonly dense
                                  id="testing" style="margin: 0.5em;"></v-text-field>
                                <v-text-field name="input-1" label="Discipline" color="primary" v-model="model.discipline" required readonly dense
                                  id="testing" style="margin: 0.5em;"></v-text-field>
                              </div>
                              <div class="form-column">
                                <v-text-field name="input-1" label="Firstname" color="primary" v-model="model.customer_name" required readonly dense
                                  id="testing" style="margin: 0.5em;"></v-text-field>
                                <v-text-field name="input-1" label="Phone Number" color="primary" v-model="model.owner_contact1" required readonly dense
                                  id="testing" style="margin: 0.5em;"></v-text-field>
                                <v-text-field name="input-1" label="Association Reg Number" color="primary" v-model="model.asocnumber" required readonly dense
                                  id="testing" style="margin: 0.5em;"></v-text-field>                                
                              </div>
                        </v-form><br/><br/>

                        <v-form class="form">
                              <div class="form-column">
                                <v-text-field name="input-1" label="Physical Address" color="primary" v-model="model.postal_address_a" required readonly dense
                                  id="testing" style="margin: 0.5em; width: 695px;"></v-text-field>
                              </div>
                        </v-form>
                        
                      </div>
                    </v-card-text>
                  </v-card>

                  
                  <v-btn color="primary" @click="nextStep(3)" :loading="loading">Countinue</v-btn>
                  <v-btn text @click="cancelled">Cancel</v-btn><br/>
                </v-stepper-content>

                <v-stepper-content step="4">
                  <v-card class="mb-5" height="540px">
                    <v-card-text>
                      
                    </v-card-text>
                  </v-card>                  
                  <v-btn color="primary" @click="nextStep(4)" :loading="loading">Countinue</v-btn>
                  <v-btn text @click="cancelled">Cancel</v-btn><br/>
                </v-stepper-content>

              </v-stepper-items>
            </v-stepper> 
          </v-form>
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
    import affiliateasoc from "@/variables/affiliateasoc";
    import energycontractors from "@/variables/energycontractors";
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
      e1: 1,

      model: {
        town: "",//town
        surburb: "",//surburb
        street: "",//street
        standnumber: "",//standnumber
        door_number: "",//street number
        duplicator: "", //extension number
        postal_proof: "",//proof of rez documents attached
        gender: "",//applicants gender
        surname: "",//applicants last name
        customer_name: "",//applicants first name        
        postal_address_a: "",//applicants address
        nok_address: "",//next of kin address
        nok_firstname: "",//next of kin first name
        nok_surname: "",//next of kin surname
        nok_national_id: "",//next of kin national id
        owner_id_proof: "",//owner ID proof documents attached
        nok_id_proof: "",//next of kin id attached
        document_type: "TD003",//document type
        document_id: "",//applicant national ID
        cable_length: "",//cable length
        email: "",//email
        name_of_employer: "",//name of employer
        name_of_trade: "",//name of trade
        premise_owner_address: "",//premise owner address
        premise_owner: "",//premise owner
        transfer_reason2: "",//connection_reason
        transfer_address: "",//transfer to address
        nis_rad: "",//account number
        transfer_reason: "",//transfer reasons
        transfer_add_proof: "",//proof of rez to transfer to documents attached
        supply_type: "",//type of supply
        duration: "",//duration
        material: "",//material
        connection_type: "",//connection type
        number_of_meter: "",//number of meter
        main_switch_kva: "",//main_switch kva
        main_switch_amp: "",//main_switch amp
        main_switch_or: "",//main_switch amp
        contractor_name: "",//contractor name
        contractor_surname: "",//contractor surname
        contractor_firm: "",//contractor firm
        contractor_address: "",//contractor address
        lighting_points_number: "",//lighting_points_number
        lighting_points_circuits: "",//lighting_points_circuits
        lighting_points_wattage: "",//lighting_points_wattage
        socket_outlets_number: "",//socket_outlets_number
        socket_outlets_circuits: "",//socket_outlets_circuits
        socket_outlets_wattage: "",//socket_outlets_wattage
        cooker_points_number: "",//cooker_points_number
        cooker_points_circuits: "",//cooker_points_circuits
        cooker_points_wattage: "",//cooker_points_wattage
        water_heaters_number: "",//water_heaters_number
        water_heaters_circuits: "",//water_heaters_circuits
        water_heaters_wattage: "",//water_heaters_wattage
        air_conditioning_number: "",//air_conditioning_number
        air_conditioning_circuits: "",//air_conditioning_circuits
        air_conditioning_wattage: "",//air_conditioning_wattage
        owner_contact1: "",
        owner_contact2: "",
        nok_contact1: "",
        nok_contact2: "",
        employed_contact1: "",
        employed_contact2: "",
        contractor_contact1: "",
        contractor_contact2: ""
      },
      duration: duration,
      gender: gender,
      affiliateasoc: affiliateasoc,
      energycontractors: energycontractors,
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
    methods: {      
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
          if (this.$refs.form2.validate()) {
            this.e1 = e + 1;
          }
        } else if (e == 4) {
          if (this.$refs.form2.validate()) {
            this.register();
          }
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
        if (this.$refs.form1.validate() & this.$refs.form2.validate() & this.$refs.form3.validate() & this.$refs.form4.validate() & this.$refs.form5.validate() & this.$refs.form6.validate() & this.$refs.form7.validate() & this.$refs.form8.validate()) {
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
                  this.errors.push("Account with that Account Number Already exists");
                }
              }).catch((e) => {
                this.isLoading = false;
              });
          } else {
            this.errors.push("Invalid Phone Number Please Confirm");
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
      this.e1 = 1;
    },
  };
</script>

<style scoped lang="css">
  h1 {
    font-size: 28px !important;
  }

  .print-content {
    /* Styles for the print content */
  }

  .layout {
    margin-top: 30px !important;
  }

  .inputPrice input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  .inputPrice input::-webkit-outer-spin-button,
  .inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  #pageDashboard {
    overflow: auto;
  }

  .dropbox {
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    max-height: 50px;
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0;
    width: 80%;
    height: 50px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue;
  }

  .dropbox p {
    font-size: 0.8em;
    text-align: center;
    padding: 10px 0;
  }

  h1 {
    font-size: 28px !important;
  }

  .layout {
    margin-top: 30px !important;
  }

  .inputPrice input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  .inputPrice input::-webkit-outer-spin-button,
  .inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  #pageDashboard {
    overflow: auto;
  }

  .text-field-transparent .v-input__slot {
    opacity: 0.5;
  }

  .unclickable {
    pointer-events: none;
  }
  .form-column {
    flex: 1;
    margin-right: 20px;
  }

  .form {
    display: flex;
  }
</style>
