eter<template>
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
                                        <b>Track Application</b>
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
                                    <v-btn color="primary" @click="getJobDoc">Track Your Application</v-btn>
                                </center>
                            </v-form>
                        </v-container>
                    </div>
                </v-card-text>

                <v-card-text>
                    <v-card v-show="showed" width="1024" class="layout column align-left"><br>                        
                        <div class="layout align-right">
                            <fieldset style="min-width:1024px;style:'Gill Sans', Arial, Helvetica, sans-serif;">
                                <legend>
                                    <center><b>
                                            <font color="#3f51b5"
                                                style="font-family:'Gill Sans', Arial, Helvetica, sans-serif">
                                                <h3>Job Details</h3>
                                            </font>
                                        </b></center>
                                </legend>
                                <table>
                                    <font style="font-family:'Gill Sans', Arial, Helvetica, sans-serif">
                                        <tr>
                                            <td>Customer Name:</td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <td><b>{{ pstatus.gender }}. {{ pstatus.customer_name }} {{ pstatus.surname }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>National ID:</td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <td><b>{{ pstatus.document_id }}</b></td>
                                        </tr>                                        
                                        <tr>
                                            <td>PJob Number:</td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <td><b>{{ pstatus.num_exp }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Connection Type:</td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <td><b>{{ pstatus3.desc_tipo }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Customer Address:</td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <td><b>{{ pstatus.postal_address_a }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Region:</td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <td><b>{{ pstatus3.region }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>District:</td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <td><b>{{ pstatus3.district }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Depot:</td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <td><b>{{ pstatus3.depot }}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Contacts:</td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <td><b>{{ pstatus.owner_contact1 }}, {{ pstatus.owner_contact2 }}<br/></b></td>
                                        </tr>
                                    </font>
                                </table>
                            </fieldset>
                        </div>

                        <v-card-title primary-title><br /><br /><br /><br />
                            <h4>
                                <font style="font-family:'Gill Sans', Arial, Helvetica, sans-serif;">Current Job Status
                                </font>
                                <span style="color:#3f51b5;font-family:'Gill Sans', Arial, Helvetica, sans-serif;">({{ pstatus3.desc_est }})</span>
                            </h4>
                            <div style="align:left">
                                <table width="100%">
                                    <tr>
                                        <td align="right" width="980">
                                            <div class="login-btn" v-show="true">
                                                <v-spacer></v-spacer>
                                                <v-btn color="primary" @click="viewQuote" :loading="loading"
                                                    v-show="pstatus.estado == '17004' || pstatus.estado == '17013' || pstatus.estado == '17020' || pstatus.estado == '17006' || pstatus.estado == '17007' || pstatus.estado == '17018'"><v-icon right dark>remove_red_eye</v-icon>&nbsp;&nbsp;View Quotation
                                                </v-btn>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </v-card-title>


                        <div id="flow" style="padding-top:85px;padding-left:7px;">
                            <table border="0" width="980">
                                <tr>
                                    <td width="80px" align="center" style="font-size:12px;"
                                        :class="{ activestate: pstatus2.estado == '17001' }">
                                        <v-tooltip top :disabled="pstatus2.estado != '17001'" color="#00000000">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Application Created</p>
                                            </template>
                                            <span>
                                                <img src="/marker.jpg" height="70" alt="You are Here" />
                                            </span>
                                        </v-tooltip>
                                    </td>
                                    <td width="130px" align="right" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17016', nextstage: pstatus2.estado == '17001' || pstatus2.estado == '17022'}">
                                        <v-tooltip top :disabled="pstatus2.estado != '17016'" color="#00000000">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Pending<br />Inspection</p>
                                            </template>
                                            <img src="/static/marker.jpg" height="70" alt="You are Here" />
                                        </v-tooltip>
                                    </td>
                                    <td width="180px" align="right" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17009', nextstage: pstatus2.estado == '17016' }">
                                        <v-tooltip right :disabled="pstatus2.estado != '17009'">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Inspection <br />Passed</p>
                                            </template>
                                            <img src="/marker.jpg" height="70" alt="You are Here" />
                                        </v-tooltip>
                                    </td>
                                    <td width="130px" align="right" style="font-size:12px"
                                        :class="{activestate: pstatus2.estado == '17012'||pstatus2.estado == '17002'|| pstatus2.estado == '17003', nextstage: pstatus2.estado == '17009'}">
                                        <v-tooltip right :disabled="pstatus2.estado != '17012'">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Processing<br />Quotation</p>
                                            </template>
                                            <img src="/static/marker.jpg" height="70" alt="You are Here" />
                                        </v-tooltip>
                                    </td>



                                    <td width="330px" align="right" style="font-size:12px">
                                        <!--<v-tooltip right :disabled="pstatus2.estado != '17015'">
                                          <template v-slot:activator="{ on } ">
                                            <p v-on="on">Application<br/>Closed</p>
                                          </template>
                                          <span>The Job Has Been Closed</span>
                                        </v-tooltip>-->
                                    </td>
                                    <td width="110px" align="right" style="font-size:12px">
                                        <!-- <v-tooltip right :disabled="pstatus2.estado != '17010'">
                                          <template v-slot:activator="{ on } ">
                                            <p v-on="on">Project<br/>Terminated</p>
                                          </template>
                                          <span>The Job Has Been Terminated</span>
                                        </v-tooltip>-->
                                    </td>



                                    <td width="120px" align="right" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17015', nextstage: pstatus2.estado == '17007' || pstatus2.estado == '17018' }">
                                        <v-tooltip right :disabled="pstatus2.estado != '17015'">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Meter <br />Installed</p>
                                            </template>
                                            <img src="/marker.jpg" height="70" alt="You are Here" />
                                        </v-tooltip>
                                    </td>
                                </tr>
                            </table>
                            <table style="margin-top:30px" border="0" width="960">
                                <tr>
                                    <td width="80px" align="center" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17008' }">
                                        <v-tooltip right :disabled="pstatus2.estado != '17008'">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Application<br />Rejected</p>
                                            </template>
                                            <span style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">The
                                                Job Application Has Been Rejected</span>
                                        </v-tooltip>
                                    </td>
                                    <td width="260px" align="right" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17022', nextstage: pstatus2.estado == '17011' }">
                                        <v-tooltip right :disabled="pstatus2.estado != '17022'">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Re-Inspection</p>
                                            </template>
                                            <span style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">The
                                                Job is pending re-inspection</span>
                                        </v-tooltip>
                                    </td>
                                    <td width="160px" align="right" style="font-size:12px">
                                        <!--  <v-tooltip right :disabled="pstatus2.estado != '17002'">
                                          <template v-slot:activator="{ on } ">
                                            <p v-on="on"> Quotation <br/>Ready</p>
                                          </template>
                                          <span>The Job's Quotation Is Now Ready</span>
                                        </v-tooltip> -->
                                    </td>
                                    <td width="170px" align="right" style="font-size:12px">
                                        <!--  <v-tooltip right :disabled="pstatus2.estado != '17020'">
                                          <template v-slot:activator="{ on } ">
                                            <p v-on="on">In-Installment<br/>Agreement</p>
                                          </template>
                                          <span>The Job Is In An Installment Agreement</span>
                                        </v-tooltip>-->
                                    </td>
                                    <td width="460px" align="right" style="font-size:12px">
                                        <!--   <v-tooltip right :disabled="pstatus2.estado != '17015'">
                                          <template v-slot:activator="{ on } ">
                                            <p v-on="on">Supply Point<br/>Created</p>
                                          </template>
                                          <span>The Meter Has Been Installed On The Premise</span>
                                        </v-tooltip>-->
                                    </td>
                                </tr>
                            </table>
                            <table style="margin-top:13px" border="0" width="1010">
                                <tr>
                                    <td width="160px" align="right" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17011', nextstage: pstatus2.estado == '17016' }">
                                        <v-tooltip right :disabled="pstatus2.estado != '17011'">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Inspection<br />Failed</p>
                                            </template>
                                            <span style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">The
                                                Job Has Failed The Inspection Process</span>
                                        </v-tooltip>
                                    </td>
                                    <!--
                                    <td width="130px" align="right" style="font-size:12px" :class="{ activestate: pstatus2.estado == '17003', nextstage: (pstatus2.desc_TIPO != 'NON-STD. NEW SUPPLY' && pstatus2.estado == '17009') || pstatus2.estado == '17002' }">
                                        <v-tooltip right :disabled="pstatus2.estado != '17003'">
                                          <template v-slot:activator="{ on } ">
                                            <p v-on="on">Quotation<br/>Prepared</p>
                                          </template>
                                          <span>The Quotation Has Been Prepared</span>
                                        </v-tooltip>
                                    </td> -->
                                    <td width="230px" align="right" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17004', nextstage: pstatus2.estado == '17012'||pstatus2.estado == '17002'|| pstatus2.estado == '17003' }">
                                        <v-tooltip right :disabled="pstatus2.estado != '17004'">
                                            <template v-slot:activator="{ on }">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Quotation<br />Sent</p>
                                            </template>
                                            <span style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">The
                                                Quotation Was Sent, You Can Now Download</span>
                                        </v-tooltip>
                                    </td>
                                    <td width="120px" align="right" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17013', nextstage: pstatus2.estado == '17004' }">
                                        <v-tooltip right :disabled="pstatus2.estado != '17013'">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on">Paid</p>
                                            </template>
                                            <span>The Job Has Been Paid</span>
                                        </v-tooltip>
                                    </td>
                                    <td width="210px" align="right" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17006', nextstage: pstatus2.estado == '17013' || pstatus2.estado == '17020'}">
                                        <v-tooltip right :disabled="pstatus2.estado != '17006'">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">In
                                                    Construction</p>
                                            </template>
                                            <span style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">The
                                                Job Is In Construction</span>
                                        </v-tooltip>
                                        <br />
                                    </td>
                                    <td width="120px" align="center" style="font-size:12px"
                                        :class="{ activestate: pstatus2.estado == '17007' || pstatus2.estado == '17018', nextstage: pstatus2.estado == '17006'}">
                                        <v-tooltip right
                                            :disabled="pstatus2.estado != '17007' || pstatus2.estado != '17018'">
                                            <template v-slot:activator="{ on } ">
                                                <p v-on="on"
                                                    style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                                    Commisioned</p>
                                            </template>
                                            <span style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">The
                                                Job Has Been Commisioned</span>
                                        </v-tooltip>
                                        <br />
                                    </td>
                                    <!--<td width="110px" align="right" style="font-size:12px" :class="{ activestate: pstatus2.estado == '17018', nextstage: pstatus2.estado == '17006' }">
                                            <v-tooltip right :disabled="pstatus2.estado != '17018'">
                                              <template v-slot:activator="{ on } ">
                                                <p v-on="on">Partially<br/>Commisioned</p>
                                              </template>
                                              <span>The Job is Partially Commisioned</span>
                                            </v-tooltip>
                                        </td> -->
                                </tr>
                            </table>
                        </div>
                    </v-card><br>
                    <center>
                        <v-btn style="margin-right:20px" outlined big color="indigo" :href="'/'">Back Home</v-btn>
                    </center>
                </v-card-text>
            </v-card>
        </client-only>
    </div>
</template>

<script>
import Swal from "sweetalert2";
    import API from "@/variables";
    import Loading from "vue-loading-overlay";
    import "vue-loading-overlay/dist/vue-loading.css";

    export default {
        layout: "regauth",
        middleware: "notAuthenticated",
        components: {
            Loading
        },
        data: () => ({
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
            }
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
          }
        },
        created() { },

        methods: {
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
                            url: "http://172.16.2.62:8182/api/newnetmet4/" + this.model.pjob.toUpperCase(),
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
                            url: "http://172.16.2.62:8182/api/newnetmet5/" + this.model.pjob.toUpperCase(),
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
                            url: "http://172.16.2.62:8182/api/newnetmet6/" + this.model.pjob.toUpperCase(),
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
