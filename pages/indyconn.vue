<template>
  <div id="pageDashboard" style="min-width: 900px; overflow: auto">
    <client-only
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <v-card class="elevation-1 pa-3">
        <loading :active.sync="isLoading" :can-cancel="false" :width="110" :height="110" backgroundColor="#ffffff" :opacity="0.5" :zIndex="999" :color="API.getLoaderColor" :loader="API.getLoader" :is-full-page="fullPage"></loading>
        <v-card-text>
          <center><h2 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Application For New Connections</b></font></h2></center>&nbsp;
          <v-alert type="error" :value="errors.length > 0" :dismissible="true"><b>Please correct the following error(s):</b>
            <ul><li v-for="error in errors" :key="error">{{ error }}</li></ul>
          </v-alert>
          <v-alert type="success" :value="success.length > 0" :dismissible="true">
            <p v-for="succ in success" :key="succ">{{ succ }}</p>
          </v-alert>
          
          <v-form ref="form">
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" editable step="1" :class="{ 'unclickable': !clickable }"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" editable step="2"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 3" editable step="3"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 4" editable step="4"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 5" editable step="5"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 6" editable step="6"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 7" editable step="7"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 8" editable step="8"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 9" editable step="9"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 10" editable step="10"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 11" editable step="11"></v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card class="mb-5" height="270px">
                    <v-form ref="form1" lazy-validation @submit.prevent>
                      <center><h4><p dense style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="primary">Would you like to start a new application or continue with an existing one ?</font></p></h4></center>
                      <center>
                        <div class="row justify-content-center">
                          <span class="col-3"></span>
                          <span class="col-3 mb-1 mt-1 modern-checkbox">
                            <input v-model="newconapp" class="ms-1" type="radio" id="newa" value="newa" name="newconapp"/>
                            <label for="newa"><strong> <font color="#434343">New Application</font></strong><font color="#e96844">*</font></label>
                          </span>
                          <span class="col-3 ms-1 mb-1 mt-1 modern-checkbox">
			                      <input v-model="newconapp" class="ms-1" type="radio" id="conta" value="conta" name="newconapp2"/>
                            <label for="conta"><strong> <font color="#434343">Continue Application</font></strong><font color="#e96844">*</font></label>
                  			  </span><br>
			                    <span class="col-3"></span>
                        </div>
                      </center><br><br><br>

                      <center v-if="newconapp === 'conta'">
		                  <h4 v-if="newconapp === 'conta'">
		                  <p v-if="newconapp === 'conta'" dense style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font v-if="newconapp === 'conta'" color="#fc5457">Enter Reference Number To Continue Where You Left:</font></p></h4></center>
                      <div v-if="newconapp === 'conta'" class="row justify-content-center">
                        <div v-if="newconapp === 'conta'" class="col-auto d-flex align-items-center">
			                    <v-text-field v-if="newconapp === 'conta'" dense color="primary" required outlined clearable label="Reference Number" :max-length="15" v-model="model.pjob" @keyup.enter="getApp" id="testing" class="mr-3" style="margin-left: 270px"></v-text-field>
                          <v-btn v-if="newconapp === 'conta'" dense color="primary" @click="getAppAll"><v-icon v-if="newconapp === 'conta'" light>mdi-magnify</v-icon></v-btn>
                        </div>
                      </div>
            		      <center v-if="newconapp === 'newa'">
		                  <h4 v-if="newconapp === 'newa'">
	                    <p v-if="newconapp === 'newa'" dense style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif">
		                  <font v-if="newconapp === 'newa'" color="#fc5457">Please Choose A Customer Type:</font></p></h4></center>
                      <center v-if="newconapp === 'newa'">
                        <div v-if="newconapp === 'newa'" class="row justify-content-center">
                          <span v-if="newconapp === 'newa'" class="col-3"></span>
                          <span v-if="newconapp === 'newa'" class="col-3 mb-1 mt-1 modern-checkbox">
                            <input v-if="newconapp === 'newa'" v-model="custype" @click="nextStep(1)" class="ms-1" type="radio" id="indi" value="indi" name="custype"/>
                            <label v-if="newconapp === 'newa'" for="indi"><strong> <font color="#434343">Individuals</font></strong><font color="#e96844">*</font></label>
                          </span>
                          <span v-if="newconapp === 'newa'" class="col-3 ms-1 mb-1 mt-1 modern-checkbox">
                            <input v-if="newconapp === 'newa'" v-model="custype" @click="nextStep(1)" class="ms-1" type="radio" id="org" value="org" name="custype2"/>
                            <label v-if="newconapp === 'newa'" for="org"><strong> <font color="#434343">Organisations</font></strong><font color="#e96844">*</font></label>
                          </span>
                          <span v-if="newconapp === 'newa'" class="col-3"></span>
                        </div>
                      </center>
                    </v-form>                    
                  </v-card>
                  <center><v-btn style="margin-top: 20px" outlined big color="red" @click="cancelo2">Cancel</v-btn></center>
                </v-stepper-content>
                
                <v-stepper-content step="2">
                  <v-card class="mb-5" height="475px">
                    <v-form ref="form2">
                      <v-flex xs12 d-flex>
                        <v-autocomplete sx6 dense v-if="custype === 'indi'" :items="gender" v-model="model.gender" label="Title" required item-text="gender" item-value="abbr" class="input-group--focused" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Title is required']"></v-autocomplete>
                        <v-text-field sx6 dense v-if="custype === 'indi'" name="input-1" label="Surname" color="primary" v-model="model.surname" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Surname is required']"></v-text-field>
                        <v-autocomplete sx6 dense v-if="custype === 'org'" :items="trade" v-model="model.trade" label="Trade" required item-text="trade" item-value="abbr" class="input-group--focused" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Company Trade is required']"></v-autocomplete>
                        <v-text-field sx6 dense v-if="custype === 'org'" name="input-1" label="Name Of Company" color="primary" v-model="model.company_name" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Name Of Company is required']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 dense v-if="custype === 'indi'" name="input_1" label="Firstname" color="primary" v-model="model.customer_name" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Firstname is required']"></v-text-field>
                        <v-text-field sx6 dense v-if="custype === 'indi'" name="input_1" placeholder="e.g 12-345678-A-90" label="National ID" color="primary" v-model="model.document_id" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'National ID is required', (v) => /^[0-9]{2}-[0-9]{6,7}-[a-zA-Z]-[0-9]{2}$/.test(v) || 'National ID e.g 12-345678-A-90']" maxlength="15"></v-text-field>
                        <v-text-field sx6 dense v-if="custype === 'org'" name="input-1" label="Certification Of Incorporation No." color="primary" v-model="model.cert_of_inc_number" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Certification Of Incorporation No. is required']"></v-text-field>
                        <v-text-field sx6 dense v-if="custype === 'org'" name="input-1" type="email" label="Company Email Address" v-model="model.email" :rules="[v => /.+@.+\..+/.test(v) || 'E-mail must be valid']" color="primary" id="testing" style="margin: 1em; width: 10px;"></v-text-field>                        
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field xs6 dense v-if="custype === 'org'" name="input-1" label="Company Postal Address" required color="primary" v-model="model.cpostal_address_a" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Company Postal Address is required']"></v-text-field>                        
                        <v-text-field xs12 dense v-if="custype === 'indi'" name="input-1" label="Postal Address" required color="primary" v-model="model.postal_address_a" style="margin: 1em" :rules="[(v) => !!v || 'Postal Address is required']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <VuePhoneNumberInput sx6 v-if="custype === 'indi'" dense v-model="model.owner_contact1" required default-country-code="ZW" valid-color="green" style="margin: 1em; width: 10px" @update="onUpdate" maxlength="9"/>
                        <v-text-field sx6 v-if="custype === 'indi'" dense v-model="model.owner_contact2" label="Landline Number" valid-color="green" style="margin: 1em; width: 10px" @update="onUp" :rules="[(v) => !!v || 'Landline Number is required', (v) => v !== model.owner_contact1 || 'Landline Number Must Differ From Owner Cellphone Number', (v) => isValidLandlineNumber(v) || 'Please enter a valid landline number']"></v-text-field>
                        <VuePhoneNumberInput sx6 v-if="custype === 'org'" dense v-model="model.company_phone1" required default-country-code="ZW" valid-color="green" style="margin: 1em; width: 10px" @update="onUpdate" maxlength="9"/>
                        <v-text-field sx6 v-if="custype === 'org'" dense v-model="model.company_phone2" label="Landline Number" default-country-code="ZW" valid-color="green" style="margin: 1em; width: 10px" @update="onUp" :rules="[(v) => !!v || 'Landline Number is required', (v) => v !== model.company_phone1 || 'Landline Number Must Differ From Company Cellphone Number', (v) => isValidLandlineNumber(v) || 'Please enter a valid landline number']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field readonly sx6 v-if="custype === 'indi'" dense v-model="model.owner_contact1" label="Owner's Cellphone Number" required style="margin: 1em; width: 2px; text-align: left;" outlined @update="onUpdate" maxlength="9" :rules="[(v) => (v && v.length === 9) || 'Cellphone Number must be 9 characters long', (v) => !!v || 'Cellphone Number is required', (v) => (v && v.startsWith('7')) || 'Cellphone Number must start with 7', (v) => v !== model.owner_contact2 || 'Cellphone Number Must Differ From Owner Landline Number']"></v-text-field>
                        <v-text-field readonly sx6 v-if="custype === 'org'" dense v-model="model.company_phone1" label="Company's Cellphone Number" required style="margin: 1em; width: 2px; text-align: left;" outlined @update="onUpdate" maxlength="9" :rules="[(v) => (v && v.length === 9) || 'Cellphone Number must be 9 characters long', (v) => !!v || 'Cellphone Number is required', (v) => (v && v.startsWith('7')) || 'Your Phone Number must start with 7', (v) => v !== model.company_phone2 || 'Cellphone Number Must Differ From Company Landline Number']"></v-text-field>
                       
                        <div sx6 v-if="custype === 'indi'" class="container" dense style="margin: 0.20em; width: 49.5%">
                          <form enctype="multipart/form-data" novalidate v-if="isInitial1 || isSaving1">
                            <h5 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                              <b>Upload Your ID</b>
                            </h5>
                            <div class="dropbox">                              
                              <input type="file" single :name="uploadFieldName1" :disabled="isSaving1" @change="filesChange1($event.target.name, $event.target.files);
                                fileCount = $event.target.files.length;" accept="application/pdf, image/*" class="input-file" required/>
                              <p v-if="isInitial1">Drag & Drop Your File Here<br/>Or<br/>Click To Browse ....</p>
                              <p v-if="isSaving1">
                                Uploading Files, Please Wait ....
                              </p>
                            </div>
                            <p>                              
                              <b>
                                <li style="text-align: right;">
                                  <i>Zimbabwean National ID <font color="red">*</font></i>
                                </li>
                              </b>
                            </p>
                          </form>
                          <div v-if="isSuccess1">
                            <font color="green" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                              <p align="right">Premise Owner ID Uploaded Successfully</p>
                            </font>
                            <div v-for="(item1, index) in uploadedFiles1" style="display: flex;">
                              <!--The hiding effect can be achived using this piece of code please keep me safe i cannt die -->
                              <!--<v-text-field style="width: 35px; color: red; margin-right: 435px; text-align: right;" class="text-field-transparent" flat name="originalName" type="text" autocomplete="off" :placeholder="item1.originalName" readonly></v-text-field><br/>-->
                              <v-text-field style="width: 400px; text-align: right;" name="originalName" type="text" autocomplete="off" readonly :placeholder="item1.originalName"></v-text-field>
                              <v-text-field style="width: 1px; color: red; margin-right: 10px; text-align: right;" class="text-field-transparent" flat v-model="model.owner_id_proof = item1.id" name="owner_id_proof" type="text" autocomplete="off" readonly :rules="[(v) => !!v || 'Owner ID Proof is required',]"></v-text-field>
                              <!--<v-text-field style="width: 75px; text-align: right;" name="owner_id_proof" type="text" autocomplete="off" v-model="model.owner_id_proof = item1.id" readonly :rules="[(v) => !!v || 'Owner ID Proof is required',]"></v-text-field>
                              <v-text-field style="width: 100px; color: red; margin-right: 10px; text-align: right;" class="text-field-transparent" flat name="originalName" type="text" autocomplete="off" :placeholder="item1.originalName" readonly></v-text-field><br/>-->
                            </div>
                            <br/><a href="javascript:void(0)" @click="resetme1()" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><p align="right">Reupload Document</p></a>
                          </div>
                          <div v-if="isFailed1">
                            <h3 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color="red">Failed To Upload Document !!</font> </h3>
                            <p><a href="javascript:void(0)" @click="reset1()" >Please Try Again ....</a></p>
                            <pre><p><strong><b>Please upload PDF documents only and try again.<br/> If the problem persists please call #704 ZETDC Call Center</b></strong></p></pre>
                          </div>
                        </div>
                        <div sx6 v-if="custype === 'org'" class="container" dense style="margin: 0.20em; width: 49.5%">
                          <form enctype="multipart/form-data" novalidate v-if="isInitial1 || isSaving1">
                            <h5 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                              <b>Upload Your Company Documents</b>
                            </h5>
                            <div class="dropbox">
                              <input type="file" single :name="uploadFieldName1" :disabled="isSaving1" @change="filesChange1($event.target.name, $event.target.files);
                                fileCount = $event.target.files.length;" accept="application/pdf, image/png, image/jpeg, image/jpg" class="input-file" required/>
                              <p v-if="isInitial1">Drag & Drop Your File Here<br/>Or<br/>Click To Browse ....</p>
                              <p v-if="isSaving1">
                                Uploading Files, Please Wait ....
                              </p>
                            </div>
                            <p>                              
                              <b>
                                <li style="text-align: right;">
                                  <i>CR5 Documents <font color="red">*</font></i>
                                </li>
                              </b>
                            </p>
                          </form>
                          <div v-if="isSuccess1">
                            <font color="green" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                              <p align="right">Company Documents Uploaded Successfully</p>
                            </font>
                            <div v-for="(item1, index) in uploadedFiles1" style="display: flex;">
                              <!--The hiding effect can be achived using this piece of code please keep me safe i cannt die -->
                              <!--<v-text-field style="width: 35px; color: red; margin-right: 435px; text-align: right;" class="text-field-transparent" flat name="originalName" type="text" autocomplete="off" :placeholder="item1.originalName" readonly></v-text-field><br/>-->
            		              <v-text-field style="width: 400px; text-align: right;" name="originalName" type="text" autocomplete="off" readonly :placeholder="item1.originalName"></v-text-field>
                              <v-text-field style="width: 1px; color: red; margin-right: 10px; text-align: right;" class="text-field-transparent" flat v-model="model.owner_id_proof = item1.id" name="owner_id_proof" type="text" autocomplete="off" readonly :rules="[(v) => !!v || 'Owner ID Proof is required',]"></v-text-field>
                              <!--<v-text-field style="width: 75px; text-align: right;" name="owner_id_proof" type="text" autocomplete="off" v-model="model.owner_id_proof = item1.id" readonly :rules="[(v) => !!v || 'Owner ID Proof is required',]"></v-text-field>
                              <v-text-field style="width: 100px; color: red; margin-right: 10px; text-align: right;" class="text-field-transparent" flat name="originalName" type="text" autocomplete="off" :placeholder="item1.originalName" readonly></v-text-field><br/>-->
                            </div>
                            <br/><a href="javascript:void(0)" @click="resetme1()" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><p align="right">Reupload</p></a>
                          </div>
                          <div v-if="isFailed1">
                            <h3 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color="red">Failed To Upload Document !!</font> </h3>
                            <p><a href="javascript:void(0)" @click="reset1()" >Please Try Again ....</a></p>
                            <pre><p><strong><b>Please upload PDF documents only and try again.<br/> If the problem persists please call #704 ZETDC Call Center</b></strong></p></pre>
                          </div>
                        </div>
                      </v-flex>
                    </v-form>
                  </v-card>
                  <v-btn color="primary" @click="prevStep(2)">Back</v-btn>
                  <v-btn color="primary" outlined @click="saveStep(2)">Save</v-btn>
                  <v-btn color="green" style="margin-left: 69%" @click="nextStep(2)">Next</v-btn>
                  <center><v-btn style="margin-top: 20px" @click="cancelo2" outlined big color="red">Cancel</v-btn></center>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card class="mb-5" height="410px">
                    <v-form ref="form3">
                      <center><h4><p dense style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#fc5457">Please choose your requested service</font></p></h4></center>
                      <center><div class="row justify-content-center">
                        <span class="col-3"></span>
                        <span class="col-3 mb-1 mt-1 modern-checkbox">
                          <input v-model="rservice" class="ms-1" type="radio" id="connect" value="connect" name="rservice"/>
                          <label for="yes"><strong><font color="#434343">Connection</font></strong><font color="#e96844">*</font></label>
                        </span>
                        <span class="col-3 ms-1 mb-1 mt-1 modern-checkbox">
                          <input v-model="rservice" class="ms-1" type="radio" id="disconnect" value="disconnect" name="rservice2"/>
                          <label for="no"><strong><font color="#434343">Disconnection</font></strong><font color="#e96844">*</font></label>
                        </span>
                        <span class="col-3"></span>
                      </div></center>
                      <v-flex xs12 d-flex>
                        <v-select xs6 dense v-model="model.town" v-if="rservice === 'connect'" :items=sortFunc() item-text="nom_MUNIC" item-value="cod_MUNIC" label="Town" required @change="surbubName($event)" :rules="[v => !!v || 'Town  is required']" class="input-group--focused" style="margin: 1em; width: 10px;"></v-select>
                        <v-select xs6 dense v-model="model.town" v-if="rservice === 'disconnect'" :items=sortFunc() item-text="nom_MUNIC" item-value="cod_MUNIC" label="Town" required @change="surbubName($event)" :rules="[v => !!v || 'Town  is required']" class="input-group--focused" style="margin: 1em; width: 10px;"></v-select>
                        <v-select xs6 dense :items=sortSub() v-if="rservice === 'connect'" v-model="model.surbub" label="Suburb/Township" required @change="streetName($event)" :rules="[v => !!v || 'Surbub  is required']" item-text="nom_LOCAL" item-value="cod_LOCAL" class="input-group--focused" style="margin: 1em; width: 10px;"></v-select>
                        <v-select xs6 dense :items=sortSub() v-if="rservice === 'disconnect'" v-model="model.surbub" label="Suburb/Township" required @change="streetName($event)" :rules="[v => !!v || 'Surbub  is required']" item-text="nom_LOCAL" item-value="cod_LOCAL" class="input-group--focused" style="margin: 1em; width: 10px;"></v-select>
                      </v-flex>
                      <v-flex xs12 d-flex>                        
                        <v-select xs6 dense v-if="rservice === 'connect'" v-model="model.street" label="Farm/Street Name" item-text="nom_CALLE" item-value="cod_CALLE" class="input-group--focused" style="margin: 1em; width: 10px;"></v-select>
                        <v-text-field sx6 dense v-if="rservice === 'disconnect'" name="input-1" label="Physical Address" color="primary" v-model="model.d_physical_address" id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Physical Address is required',]"></v-text-field>
                        <v-autocomplete dense sx6 v-if="rservice === 'connect'" :items="nonstarnd" v-model="model.nonstarnd" label="Application Type" :rules="[v => !!v || 'Application Type is required']" item-text="nonstarnd" item-value="abbr" class="input-group--focused" style="margin: 1em; width: 10px;" required></v-autocomplete>
                        <v-autocomplete dense sx6 v-if="rservice === 'disconnect'" :items="nonstarnd" v-model="model.nonstarnd" label="Application Type" :rules="[v => !!v || 'Application Type is required']" item-text="nonstarnd" item-value="abbr" class="input-group--focused" style="margin: 1em; width: 10px;" required></v-autocomplete>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field xs6 v-if="rservice === 'connect'" dense name="standnumber" type="number" label="Stand/Plot Number" color="primary" :maxlength="max" v-model="model.standnumber" required style="margin: 1em; width: 10px;" :rules="[v => !!v || 'Stand Number  is required']"></v-text-field>
                        <v-text-field xs6 v-if="rservice === 'disconnect'" dense name="standnumber" type="number" label="Stand/Plot Number" color="primary" :maxlength="max" v-model="model.standnumber" required style="margin: 1em; width: 10px;" :rules="[v => !!v || 'Stand Number  is required']"></v-text-field>
                        <v-text-field xs6 v-if="rservice === 'connect'" dense name="door_number" type="number" label="Street Number" color="primary" :maxlength="max" v-model="model.door_number" style="margin: 1em; width: 10px;" required @input="validateDoorNumber"></v-text-field>
                        <v-text-field xs6 v-if="rservice === 'disconnect'" dense name="door_number" type="number" label="Street Number" color="primary" :maxlength="max" v-model="model.door_number" style="margin: 1em; width: 10px;" required @input="validateDoorNumber"></v-text-field>
                      </v-flex>                      
                      <v-flex xs12 d-flex>
                        <v-text-field xs6 dense v-if="rservice === 'connect'" name="duplicator" label="Extension" color="primary" :maxlength="max" v-model="model.duplicator" style="margin: 1em; width: 10px;" required @input="validateDoorNumber"></v-text-field>
                        <v-text-field xs6 dense v-if="rservice === 'disconnect'" name="duplicator" label="Extension" color="primary" :maxlength="max" v-model="model.duplicator" style="margin: 1em; width: 10px;" required @input="validateDoorNumber"></v-text-field>
                        <v-text-field sx6 v-if="rservice === 'connect'" name="input-1" type="email" label="Email Address" v-model="model.email" dense :rules="[v => /.+@.+\..+/.test(v) || 'E-mail must be valid']" color="primary" id="testing" style="margin: 1em; width: 10px;"></v-text-field>
                        <v-text-field sx6 v-if="rservice === 'disconnect'" name="input-1" type="email" label="Email Address" v-model="model.email" dense :rules="[v => /.+@.+\..+/.test(v) || 'E-mail must be valid']" color="primary" id="testing" style="margin: 1em; width: 10px;"></v-text-field>
                      </v-flex>
                    </v-form>
                  </v-card>
                  <v-btn color="primary" @click="prevStep(3)">Back</v-btn>
                  <v-btn color="primary" outlined @click="saveStep(3)">Save</v-btn>
                  <v-btn color="green" big style="margin-left: 69%" @click="nextStep(3)">Next</v-btn>
                  <center><v-btn style="margin-top: 20px" @click="cancelo2" outlined big color="red">Cancel</v-btn></center>
                </v-stepper-content>                

                <v-stepper-content step="4">
                  <v-card class="mb-5" height="414px">
                    <v-form ref="form4">
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 v-if="custype === 'indi'" name="input-1" label="Next of Kin Firstname" required color="primary" v-model="model.nok_firstname" style="margin: 1em; width: 10px;" :rules="[v => /^([a-zA-Z]+((['][a-zA-Z ])?[a-zA-Z]*)){2,30}$/.test(v) || 'Invalid Firstname']"></v-text-field>
                        <v-text-field sx6 v-if="custype === 'indi'" name="input-1" label="Next of Kin Surname" required color="primary" v-model="model.nok_surname" style="margin: 1em; width: 10px;" :rules="[v => /^([a-zA-Z]+((['][a-zA-Z ])?[a-zA-Z]*)){2,30}$/.test(v) || 'Invalid Surname']"></v-text-field>
                        <v-text-field sx6 v-if="custype === 'org'" dense name="input-1" label="Shareholders Surname" color="primary" v-model="model.rep_surname" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Shareholders Surname is required']"></v-text-field>
                        <v-text-field sx6 v-if="custype === 'org'" dense name="input-1" label="Shareholders Firstname" color="primary" v-model="model.rep_firstname" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Shareholders Firstname is required']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 v-if="custype === 'indi'" name="input_1" placeholder="e.g 12-345678-A-90" label="Next of Kin National ID" color="primary" v-model="model.nok_national_id" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Next of Kin National ID is required', (v) => /^[0-9]{2}-[0-9]{6,7}-[a-zA-Z]-[0-9]{2}$/.test(v) || 'Match Document ID with 12-345678-A-90', (v) => v !== model.document_id || 'National ID Number Must Differ From Owners National ID']" maxlength="15"></v-text-field>
                        <VuePhoneNumberInput sx6 v-if="custype === 'indi'" v-model="model.nok_contact1" required default-country-code="ZW" valid-color="green" style="margin: 1em; width: 10px" @update="onUpdate" maxlength="9" :rules="[(v) => (v && v.length === 9) || 'Your Phone Number must be 9 characters long', (v) => !!v || 'Your Phone Number is required', (v) => (v && v.startsWith('7')) || 'Your Phone Number must start with 7']"/>
                        <v-text-field sx6 v-if="custype === 'org'" dense name="input-1" label="Shareholders National ID" color="primary" v-model="model.rep_national_id" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Shareholders National ID is required', (v) => /^[0-9]{2}-[0-9]{6,7}-[a-zA-Z]-[0-9]{2}$/.test(v) || 'Match Document ID with 12-345678-A-90']" maxlength="15"></v-text-field>
                        <v-text-field sx6 v-if="custype === 'org'" dense name="input-1" label="Shareholders Postal Address" color="primary" v-model="model.rep_postal_address" required id="testing" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Shareholders Postal Address is required']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field dense sx6 v-if="custype === 'indi'" v-model="model.nok_contact2" label="Landline Number" style="margin: 1em; width: 10px" @update="onUp"></v-text-field>
                        <v-text-field readonly dense sx6 v-if="custype === 'indi'" v-model="model.nok_contact1" label="Next of Kin's Cellphone Number" required style="margin: 1em; width: 10px; text-align: center;" outlined @update="onUpdate" :rules="[(v) => (v && v.length === 9) || 'Your Phone Number must be 9 characters long', (v) => !!v || 'Owner Cellphone Number is required', (v) => (v && v.startsWith('7')) || 'Your Phone Number must start with 7', (v) => v !== model.nok_contact2 || 'Cellphone Number Must be Different From Next of Kin Landline Number', (v) => v !== model.owner_contact1 || 'Cellphone Number Must be Different From Owner Cellphone Number', (v) => v !== model.owner_contact2 || 'Cellphone Number Must be Different From Owner Landline Number']"></v-text-field>
                        <VuePhoneNumberInput sx6 v-if="custype === 'org'" dense v-model="model.rep_contact1" required default-country-code="ZW" valid-color="green" style="margin: 1em; width: 10px" @update="onUpdate" maxlength="9" :rules="[(v) => (v && v.length === 9) || 'Your Phone Number must be 9 characters long', (v) => !!v || 'Your Phone Number is required', (v) => (v && v.startsWith('7')) || 'Your Phone Number must start with 7']"/>
                        <v-text-field sx6 v-if="custype === 'org'" dense v-model="model.rep_contact2" label="Landline Number" style="margin: 1em; width: 10px" @update="onUp" :rules="[(v) => !!v || 'Your Phone Number is required', (v) => v !== model.rep_contact1 || 'Landline Number Must be Different From Representative Cellphone', (v) => v !== model.company_phone1 || 'Landline Number Must be Different From Company Cellphone Number', (v) => v !== model.company_phone2 || 'Landline Number Must be Different From Company Landline Number', (v) => isValidLandlineNumber(v) || 'Please enter a valid landline number']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 v-if="custype === 'indi'" dense name="input-1" label="Next of Kin Physical Address" required color="primary" v-model="model.nok_address" style="margin: 1em; width: 10px;" :rules="[(v) => !!v || 'Next Of Kin Address is required',]"></v-text-field>
                        <v-text-field readonly sx6 v-if="custype === 'org'" dense v-model.trim="model.rep_contact1" label="Authorised Rep's Cellphone Number" :label-style="{ color: 'white !important' }" required style="margin: 1em; text-align: center;" outlined @update="onUpdate" :rules="[(v) => (v && v.length === 9) || 'Your Phone Number must be 9 characters long', (v) => !!v || 'Company Cellphone Number is required', (v) => (v && v.startsWith('7')) || 'Your Phone Number must start with 7', (v) => v !== model.rep_contact2 || 'Cellphone Number Must be Different From Rep Landline Number', (v) => v !== model.company_phone1 || 'Cellphone Number Must be Different From Company Cellphone Number', (v) => v !== model.company_phone2 || 'Cellphone Number Must be Different From Company Landline Number']"></v-text-field>
                        
                        <div sx6 v-if="custype === 'org'" class="container" dense style="margin: 0.20em; width: 49.5%">
                          <form enctype="multipart/form-data" novalidate v-if="isInitial2 || isSaving2">
                            <h5 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                              <br/><b>Upload Shareholders National ID</b>
                            </h5>
                            <div class="dropbox">
                              <input type="file" dense multiple :name="uploadFieldName2" :disabled="isSaving2" @change="filesChange2($event.target.name, $event.target.files);
                                fileCount = $event.target.files.length;" accept="application/pdf, image/png, image/jpeg, image/jpg" class="input-file"/>
                              <p v-if="isInitial2">Drag & Drop Your File Here<br/>Or<br/>Click To Browse ....</p>
                              <p v-if="isSaving2">
                                Uploading Files, Please Wait ....
                              </p>
                            </div>
                            <p>                              
                              <b>
                                <li style="text-align: right;">
                                  <i>Zimbabwean National ID <font color="red">*</font></i>
                                </li>
                              </b>
                            </p>
                          </form>
                          <div v-if="isSuccess2">
                            <font color="green" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><center>
                              Shareholders National ID Uploaded Successfully
                            </center></font>
                              <div v-for="(item2, index) in uploadedFiles2" style="display: flex;">
                                <v-text-field dense style="width: 400px; text-align: right;" name="originalName" type="text" autocomplete="off" readonly :placeholder="item2.originalName"></v-text-field>
                                <v-text-field dense style="width: 1px; color: red; margin-right: 10px; text-align: right;" class="text-field-transparent" flat name="owner_id_proof" type="text" autocomplete="off" readonly :rules="[(v) => !!v || 'Owner ID Proof is required',]" v-model="model.owner_id_proof = item1.id"></v-text-field>
                              </div>
                              <br/><a href="javascript:void(0)" @click="resetme2()">Made A Mistake ??</a>
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
                  <v-btn color="primary" @click="prevStep(3)">Back</v-btn>
                  <v-btn color="primary" outlined v-if="custype === 'indi'" @click="saveStep(4)">Save</v-btn>
                  <v-btn color="primary" outlined v-if="custype === 'org'" @click="saveStep(4)">Save</v-btn>
                  <v-btn color="green" big style="margin-left: 69%" v-if="custype === 'indi'" @click="nextStep(4)">Next</v-btn>
                  <v-btn color="green" big style="margin-left: 69%" v-if="custype === 'org'" @click="nextStep(4)">Next</v-btn>
                  <center><v-btn style="margin-top: 20px" outlined big color="red" :href="'/indyconn'">Cancel</v-btn></center>
                </v-stepper-content>

                <v-stepper-content step="5">
                  <v-card class="mb-5" height="530px">
                    <v-form ref="form5">
                      <center><h4><p dense style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#fc5457">Please Tell Us If You Are Employed</font></p></h4>
                      </center>
                      <center><div class="row justify-content-center">
                        <span class="col-3"></span>
                        <span class="col-3 mb-1 mt-1 modern-checkbox">
                          <input v-model="employed" class="ms-1" type="radio" id="work" value="work" name="employed"/>
                          <label for="yes"><strong> <font color="#434343">Yes</font></strong><font color="#e96844">*</font></label>
                        </span>
                        <span class="col-3 ms-1 mb-1 mt-1 modern-checkbox">
                         <input v-model="employed" @click="nextStep(5)" class="ms-1" type="radio" id="home" value="home" name="employed2"/>
                         <label for="no"><strong> <font color="#434343">No</font></strong><font color="#e96844">*</font></label>
                        </span>
                        <span class="col-3"></span>
                      </div></center>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 dense name="input-1" label="Name of Employer" color="primary" v-model="model.name_of_employer" v-if="employed === 'work'" id="testing" style="margin: 1em; width: 10px" :rules="[(v) => !!v || 'Name of Employer is required',]"></v-text-field>
                        <VuePhoneNumberInput sx6 dense v-model="model.employed_contact1" required default-country-code="ZW" valid-color="green" v-if="employed === 'work'" style="margin: 1em; width: 10px"  @update="onUpdate2" maxlength="9" :rules="[(v) => (v && v.length === 9) || 'Your Phone Number must be 9 characters long', (v) => !!v || 'Your Phone Number is required', (v) => (v && v.startsWith('7')) || 'Your Phone Number must start with 7']"/>
                        </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 v-if="employed === 'work'" dense v-model="model.employed_contact2" label="Employer Landline" valid-color="green" style="margin: 1em; width: 10px" @update="onUp2" :rules="[(v) => !!v || 'Your Phone Number is required', (v) => v !== model.employed_contact1 || 'Landline Number Must Differ From Employer Cellphone Number', (v) => v !== model.nok_contact2 || 'Landline Number Must Differ From Next of Kin Landline Number', (v) => v !== model.nok_contact1 || 'Landline Number Must Differ From Next of Kin Cellphone Number', (v) => v !== model.owner_contact2 || 'Landline Number Must Differ From Owner Landline Number', (v) => v !== model.owner_contact1 || 'Landline Number Must Differ From Owner Cellphone Number']"></v-text-field>
                        <v-text-field readonly sx6 v-if="employed === 'work'" outlined dense v-model="model.employed_contact1" label="Employer's Cellphone Number" required style="margin: 1em; width: 10px" @update="onUpdate2" maxlength="9" :rules="[(v) => (v && v.length === 9) || 'Your Phone Number must be 9 characters long', (v) => !!v || 'Your Phone Number is required', (v) => (v && v.startsWith('7')) || 'Your Phone Number must start with 7', (v) => v !== model.employed_contact2 || 'Cellphone Number Must Differ From Employer Landline Number', (v) => v !== model.nok_contact2 || 'Cellphone Number Must Differ From Next of Kin Landline Number', (v) => v !== model.nok_contact1 || 'Cellphone Number Must Differ From Next of Kin Cellphone Number', (v) => v !== model.owner_contact2 || 'Cellphone Number Must Differ From Owner Landline Number', (v) => v !== model.owner_contact1 || 'Cellphone Number Must Differ From Owner Cellphone Number']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx12 dense name="input-1" label="Address Of Employer" color="primary" v-model="model.employer_address" v-if="employed === 'work'" id="testing" style="margin: 1em; width: 10px" :rules="[(v) => !!v || 'Employers Address is required',]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>                        
                        <v-text-field sx6 name="input-1" dense label="Premise Owner / Landlord Name" color="primary" v-model="model.premise_owner_name" id="testing" style="margin: 1em; width: 10px" :rules="[(v) => !!v || 'Premise Owner / Landlord Name is required',]"></v-text-field>
                        <v-text-field sx6 name="input-1" dense label="Premise Owner / Landlord Surname" color="primary" v-model="model.premise_owner_surname" id="testing" style="margin: 1em; width: 10px" :rules="[(v) => !!v || 'Premise Owner / Landlord Surname is required',]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx12 name="input-1" dense label="Premise Owner / Landlord Address" color="primary" v-model="model.premise_owner_address" required id="testing" style="margin: 1em; width: 10px" :rules="[(v) => !!v || 'Premise Owner / Landlord Address is required']"></v-text-field>
                      </v-flex>
                    </v-form>
                  </v-card>
		  <v-btn color="primary" @click="prevStep(5)">Back</v-btn>
                  <v-btn color="primary" outlined @click="saveStep(5)">Save</v-btn>
                  <v-btn color="green" big style="margin-left: 69%" @click="nextStep(5)">Next</v-btn>
                  <center><v-btn style="margin-top: 20px" outlined big color="red" :href="'/indyconn'">Cancel</v-btn></center>
                </v-stepper-content>

                <v-stepper-content step="6">
                  <v-card class="mb-5" height="430px">
                    <v-form ref="form6">
                      <center><h4><p style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"> <font color="#fc5457">Is This A Reconnection To Another Account?</font></p></h4></center>
                      <center><div class="row justify-content-center">
                        <span class="col-3"></span>
                        <span class="col-3 mb-1 mt-1 modern-checkbox">
                          <input v-model="newaccount" class="ms-1" type="radio" id="allow" value="allow" name="newaccount"/>
                          <label for="yes"><strong> <font color="#434343">Yes</font></strong><font color="#e96844">*</font></label>
                        </span>
                        <span class="col-2 ms-1 mb-1 mt-1 modern-checkbox">
                          <input v-model="newaccount" class="ms-1" type="radio" id="disallow" value="disallow" name="transfer2" @click="nextStep(6)"/>
                          <label for="no"><strong> <font color="#434343">No</font></strong><font color="#e96844">*</font></label>
                        </span>
                        <span class="col-3"></span>
                      </div></center>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 name="input-1" placeholder="e.g 25 Samora Machel Ave, Harare" dense label="Address To Which Account Must Be Sent" color="primary"
                          v-model="model.service_point_address" required id="testing" style="margin: 1em" v-if="newaccount === 'allow'" :rules="[(v) => !!v || 'Address To Which Account Must Be Sent is required',]"
                        ></v-text-field>
                        <v-text-field sx6 name="input-1" label="Old Account Number" color="primary" dense v-model="model.nis_rad" v-if="newaccount === 'allow'" required
                          id="testing" style="margin: 1em" :rules="[(v) => !!v || 'Old Account Number is required',]"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 name="input-1" placeholder="Enter text (Limit: 254 characters)" dense maxlength="254" label="Reason For Reconnection" color="primary"
                          v-model="model.transfer_reason" v-if="newaccount === 'allow'" required id="testing" style="margin: 1em" :rules="[(v) => !!v || 'Please tell us why you need Connection',]"></v-text-field>                        
                      </v-flex>
                      <v-flex xs12 d-flex v-if="newaccount === 'allow'">
                        <div class="container">
                          <form enctype="multipart/form-data" novalidate v-if="isInitial3 || isSaving3">
                            <h4 align="center" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                              <b>Upload Proof Of Residence</b>
                            </h4>&nbsp;
                            <div class="dropbox">
                              <input type="file" multiple :name="uploadFieldName3" :disabled="isSaving3" @change="filesChange3($event.target.name, $event.target.files);
                                fileCount = $event.target.files.length;" accept="application/pdf, image/png, image/jpeg, image/jpg" class="input-file"/>
                              <p v-if="isInitial3">Drag & Drop Your File Here<br/>Or<br/>Click To Browse ....</p>
                              <p v-if="isSaving3">
                                Uploading Files, Please Wait ....
                              </p>
                            </div>
                            <p>                              
                              <b>
                                <li>
                                  <i>Proof Of Transfer Residence <font color="red">*</font> Leese Agreement <font color="red"><a href="https://portfolio-kudarukuni.vercel.app" target="_blank"><b>*</b></a></font> Affidavit <font color="red">*</font></i>
                                </li>
                              </b>
                            </p>
                          </form>
                          <div v-if="isSuccess3">
                            <font color="green" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><center>
                              Premise Owner ID Uploaded Successfully
                            </center></font>
                              <div v-for="(item3, index) in uploadedFiles3" style="display: flex; align-items: center;">
                                <v-text-field style="width: 35px; color: red; margin-right: 435px;" class="text-field-transparent" flat name="transfer_add_proof" type="text" autocomplete="off" readonly :rules="[(v) => !!v || 'Proof Of Transfer Residence is required',]" v-model="model.transfer_add_proof = item3.id"></v-text-field>
                                <v-text-field sx6 style="width: 200px; color: red;" class="text-field-transparent" flat name="originalName" type="text" autocomplete="off" :placeholder="item3.originalName" readonly></v-text-field><br/>                                
                              </div>
                              <br/><a href="javascript:void(0)" @click="resetme1()">Reupload Document</a>
                          </div>
                          <div v-if="isFailed3">
                            <h3 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"><font color="red">Failed To Upload Document !!</font> </h3>
                            <p><a href="javascript:void(0)" @click="reset3()" >Please Try Again ....</a></p>
                            <pre><p><strong><b>Please upload PDF documents only and try again.<br/> If the problem persists please call #704 ZETDC Call Center</b></strong></p></pre>
                          </div>
                        </div> 
                      </v-flex>
                    </v-form>
                  </v-card>
		  <v-btn color="primary" @click="prevStep(6)">Back</v-btn>
                  <v-btn color="primary" outlined @click="saveStep(6)">Save</v-btn>
                  <v-btn color="green" big style="margin-left: 69%" @click="nextStep(6)">Next</v-btn>
                  <center><v-btn style="margin-top: 20px" @click="cancelled" outlined big color="red" :href="'/indyconn'">Cancel</v-btn></center>
                </v-stepper-content>
                
                <v-stepper-content step="7">
                  <v-card class="mb-5" height="250px">
                    <v-form ref="form7">
                      <center><p style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="black"><h3>PLEASE NOTE</h3><br></font><font color="#fc5457"><h4>
                        Completion of the following section requires specialized technical<br>
                        knowledge and expertise. This section is intended for qualified electricians or <br>
                        licensed contractors only. Applicants lacking the necessary qualifications should <br>
                        not attempt to complete this section. Incomplete or inaccurate submissions from <br>
                        unqualified individuals will not be considered.</h4></font></p></center>
                      <center><div class="row justify-content-center">
                        <span class="col-3"></span>
                        <span class="col-3 mb-1 mt-1 modern-checkbox">
                          <input v-model="complet" class="ms-1" type="radio" id="complete" value="complete" name="complet" @click="nextStep(7)"/>
                          <label for="complete"><strong> <font color="#434343">Continue</font></strong><font color="#e96844">*</font></label>
                        </span>
                        <span class="col-3 ms-1 mb-1 mt-1 modern-checkbox">
                          <input v-model="complet" class="ms-1" type="radio" id="later" value="later" name="complet2"/>
                          <label for="no"><strong> <font color="#434343">Finish Later</font></strong><font color="#e96844">*</font></label>
                        </span>
                        <span class="col-3"></span>
                      </div></center>
                    </v-form>
                  </v-card>
		  <v-btn color="primary" @click="prevStep(7)">Back</v-btn>
                  <!--<v-btn color="primary" outlined @click="saveStep(7)">Save</v-btn>-->
                  <!--<v-btn color="green" big style="margin-left: 69%" @click="nextStep(7)">Next</v-btn>-->
                  <center><v-btn style="margin-top: 20px" @click="cancelled" outlined big color="red" :href="'/indyconn'">Cancel</v-btn></center>
                </v-stepper-content>

                <v-stepper-content step="8">
                  <v-card class="mb-5" height="410px">
                    <v-form ref="form8">
                      <v-flex xs12 d-flex>
                        <v-autocomplete sx6 :items="purpose" v-model="model.supply_type" label="Type Of Supply" dense
                          :rules="[v => !!v || 'Type of supply is required']" item-text="purpose" item-value="abbr"
                          class="input-group--focused" style="margin: 1em; width: 10px;"></v-autocomplete>
                        <v-autocomplete sx6 :items="duration" v-model="model.duration" label="Duration Of Supply" dense
                          :rules="[v => !!v || 'Duration of supply is required']" item-text="duration" item-value="abbr"
                          class="input-group--focused" style="margin: 1em; width: 10px;"></v-autocomplete>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-autocomplete sx6 :items="material" v-model="model.material" label="Roofing Material Used"
                          :rules="[v => !!v || 'Material used is required']" item-text="material" item-value="abbr" dense
                          class="input-group--focused" style="margin: 1em; width: 10px;"></v-autocomplete>
                        <v-autocomplete sx6 :items="meter" v-model="model.connection_type" label="Connection Type"
                          :rules="[v => !!v || 'Connection type is required']" item-text="meter" item-value="abbr" dense
                          class="input-group--focused" style="margin: 1em; width: 10px;"></v-autocomplete>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 name="input-1" type="number" label="Number Of Meters Required" color="primary" dense
                          v-model="model.number_of_meter" id="testing" style="margin: 1em; width: 10px;" required :rules="[v => !!v || 'Number Of Meters is required']"></v-text-field>
                        <v-text-field sx6 name="input-1" type="number" label="Proposed Main Switch KVA" color="primary" style="margin: 1em; width: 10px;" dense
                          v-model="model.main_switch_kva" id="testing" required :rules="[v => !!v || 'Proposed Main Switch KVA is required']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 name="input-1" label="Proposed Main Switch Amperes" dense color="primary"
                          type="number" v-model="model.main_switch_amp" required id="testing" :rules="[v => !!v || 'Proposed Main Switch Amperes is required']"
                          style="margin: 1em; width: 10px;"></v-text-field>
                        <v-text-field sx6 name="input-1" label="Proposed Main Switch OR" type="number" dense color="primary"
                          v-model="model.main_switch_or" id="testing" style="margin: 1em; width: 10px;" required :rules="[v => !!v || 'Proposed Main Switch OR is required']"></v-text-field>
                      </v-flex>
                      <v-flex xs6 d-flex>
                        <v-text-field sx6 name="cable_length" type="number" dense label="Meter Box to Pole Distance" color="primary" :maxlength="max" v-model="model.cable_length" style="margin: 1em; width: 10px;" required :rules="[(v) => !!v || 'Meter Box to Pole Distance is required',]"></v-text-field>
                      </v-flex>
                    </v-form>
                  </v-card>
		  <v-btn color="primary" @click="prevStep(8)">Back</v-btn>
                  <v-btn color="primary" outlined @click="saveStep(8)">Save</v-btn>
                  <v-btn color="green" big style="margin-left: 69%" @click="nextStep(8)">Next</v-btn>
                  <center><v-btn style="margin-top: 20px" @click="cancelled" outlined big color="red" :href="'/indyconn'">Cancel</v-btn></center>
                </v-stepper-content>

                <v-stepper-content step="9">
                  <v-card class="mb-5" height="370px">
                    <v-form ref="form9">
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 name="input-1" label="Contractor's Name" color="primary" dense
                          v-model="model.contractor_name" id="testing" style="margin: 1em; width: 10px;" required :rules="[v => /^([a-zA-Z]+((['][a-zA-Z ])?[a-zA-Z]*)){2,30}$/.test(v) || 'Invalid Name']"></v-text-field>
                        <v-text-field sx6 name="input-1" label="Contractor's Surname" color="primary" dense
                          v-model="model.contractor_surname" id="testing" style="margin: 1em; width: 10px;" required :rules="[v => /^([a-zA-Z]+((['][a-zA-Z ])?[a-zA-Z]*)){2,30}$/.test(v) || 'Invalid Surame']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 name="input-1" label="Name Of Contracting Firm" color="primary" dense
                          v-model="model.contractor_firm" required id="testing" style="margin: 1em; width: 10px;" :rules="[v => !!v || 'Contractors Firm is required']"></v-text-field>
                        <VuePhoneNumberInput sx6 v-model="model.contractor_contact1" required default-country-code="ZW" dense valid-color="green" style="margin: 1em; width: 10px" @update="onUpdate2" maxlength="9" :rules="[(v) => v.length === 9 || 'Contractors Phone Number must be 9 characters long', (v) => !!v || 'Contractors Phone Number is required', (v) => v.startsWith('7') || 'Contractors Phone Number must start with 7',]"/>
                      </v-flex>
                      <v-flex xs12 d-flex>
                        <v-text-field sx6 v-model="model.contractor_contact2" label = "Landline Number" default-country-code="ZW" valid-color="green" style="margin: 1em; width: 10px" dense @update="onUpdate2"></v-text-field>
			                  <v-text-field readonly sx6 dense v-model="model.contractor_contact1" label="Contractors Cellphone Number" required style="margin: 1em; width: 10px; text-align: left;" dense outlined @update="onUpdate2" maxlength="9" :rules="[(v) => (v && v.length === 9) || 'Cellphone Number must be 9 characters long', (v) => !!v || 'Cellphone Number is required', (v) => (v && v.startsWith('7')) || 'Cellphone Number must start with 7', (v) => v !== model.owner_contact2 || 'Cellphone Number Must Differ From Owner Landline Number']"></v-text-field>
                      </v-flex>
                      <v-flex xs12 d-flex>
			                  <v-text-field sx6 name="input-1" label="Contracting Firm's Address" color="primary" v-model="model.contractor_address" required id="testing" dense style="margin: 1em; width: 10px;" :rules="[v => !!v || 'Contracting Firm Address is required']"></v-text-field>
                      </v-flex>
                    </v-form>
                  </v-card>
		              <v-btn color="primary" @click="prevStep(9)">Back</v-btn>
                  <v-btn color="primary" outlined @click="saveStep(9)">Save</v-btn>
                  <v-btn color="green" big style="margin-left: 69%" @click="nextStep(9)">Next</v-btn>
                  <center><v-btn style="margin-top: 20px" @click="cancelled" outlined big color="red" :href="'/indyconn'">Cancel</v-btn></center>
                </v-stepper-content>

                <v-stepper-content step="10">
                  <v-card class="mb-5" height="540px">
                    <v-form ref="form10">
                      <div>
                        <v-simple-table height="540px">
                          <template>
                            <thead>
                              <tr>
                                <th class="text-left"><font color="black">Type Of Installation</font></th>
                                <th class="text-left"><font color="black">Number</font></th>
                                <th class="text-left"><font color="black">Number Of Circuits</font></th>
                                <th class="text-left"><font color="black">Estimatted Wattage</font></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Lighting Points</b></font></td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                    v-model="model.lighting_points_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" label="Number Of Curcuits" type="number" color="primary"
                                    v-model="model.lighting_points_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" label="Estimated Wattage" type="number" color="primary"
                                    v-model="model.lighting_points_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                </td>
                              </tr><br/>
                              <tr>
                                <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Socket outlets</b></font></td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                    v-model="model.socket_outlets_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                    v-model="model.socket_outlets_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                    v-model="model.socket_outlets_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
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
                                    v-model="model.cooker_points_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                    v-model="model.cooker_points_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                    v-model="model.cooker_points_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                </td>
                              </tr><br/>
                              <tr>
                                <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Water heaters</b></font></td>
                                <td>
                                  <v-text-field name="input-1" label="Number Required" color="primary"
                                    v-model="model.water_heaters_number" required type="number" :rules="[v => !!v || 'Cannot be empty']"
                                    id="testing"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                    v-model="model.water_heaters_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                    v-model="model.water_heaters_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                </td>
                              </tr><br/>
                              <tr>
                                <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Airconditioning</b></font></td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                    v-model="model.air_conditioning_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                    v-model="model.air_conditioning_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                </td>
                                <td>
                                  <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                    v-model="model.air_conditioning_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </div>
                    </v-form>
                  </v-card>
		              <v-btn color="primary" @click="prevStep(10)">Back</v-btn>
                  <v-btn color="primary" outlined @click="saveStep(10)">Save</v-btn>
                  <v-btn color="green" big style="margin-left: 69%" @click="nextStep(10)">Next</v-btn>
                  <center><v-btn style="margin-top: 20px" @click="cancelled" outlined big color="red" :href="'/indyconn'">Cancel</v-btn></center>
                </v-stepper-content>

                <v-stepper-content step="11">
                  <v-card class="mb-5" width="800px" height="1500px">
                    <v-form ref="form9">
                      <v-card-text>
                        <div ref="printContent" class="print-content">
                          <v-form class="form">
                                <div class="form-column">
                                  <v-text-field name="input-1" label="Title" color="primary" v-model="model.gender" required readonly dense
                                    id="testing" style="margin: 0.5em; width: 50px;" :rules="[(v) => !!v || 'Title is required']"></v-text-field>
                                  <v-text-field name="input-1" label="Document ID" color="primary" v-model="model.document_id" required dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>                                
                                </div>                              
                                <div class="form-column">
                                  <v-text-field name="input-1" label="Surname" color="primary" v-model="model.surname" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Email" color="primary" v-model="model.email" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                </div>
                                <div class="form-column">
                                  <v-text-field name="input-1" label="Firstname" color="primary" v-model="model.customer_name" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Phone Number" color="primary" v-model="model.owner_contact1" required readonly dense
                                    id="testing" style="margin: 0.5em;" :rules="[(v) => v.length === 9 || 'Your Phone Number must be 9 characters long', (v) => !!v || 'Your Phone Number is required', (v) => v.startsWith('7') || 'Your Phone Number must start with 7',]"></v-text-field>
                                </div>
                          </v-form><br/><br/>

                          <v-form class="form">
                                <div class="form-column">
                                  <v-text-field name="input-1" label="Physical Address" color="primary" v-model="model.postal_address_a" required readonly dense
                                    id="testing" style="margin: 0.5em; width: 695px;"></v-text-field>
                                </div>
                          </v-form><br/><br/>

                          <v-form class="form">
                                <div class="form-column">
                                  <v-text-field name="input-1" label="Other Phone Number" color="primary" v-model="model.owner_contact2" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-select xs6 :items="sortStr()" v-model="model.street" label="Street" item-text="nom_CALLE" item-value="cod_CALLE" required readonly dense :rules="[(v) => !!v || 'Street  is required']" class="input-group--focused" style="margin: 0.5em"></v-select>
                                  <v-text-field name="input-1" label="Extension" color="primary" v-model="model.duplicator" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Next Of Kin National ID" color="primary" v-model="model.nok_national_id" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                </div>                              
                                <div class="form-column">
                                  <v-select :items="sortFunc()" item-text="nom_MUNIC" item-value="cod_MUNIC" label="Town" required @change="surbubName($event)"
                                    :rules="[(v) => !!v || 'Town  is required']" class="input-group--focused" style="margin: 0.5em" name="input-1" v-model="model.town" readonly dense
                                    id="testing"></v-select>
                                  <v-text-field name="input-1" label="Stand Number (Plot Number)" color="primary" v-model="model.standnumber" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Next Of Kin Surname" color="primary" v-model="model.nok_surname" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Next Of Kin Phone Number" color="primary" v-model="model.nok_contact1" required readonly dense
                                    id="testing" style="margin: 0.5em;" :rules="[(v) => v.length === 9 || 'Next Of Kin Phone Number must be 9 characters long', (v) => !!v || 'Next Of Kin Phone Number is required', (v) => v.startsWith('7') || 'Next Of Kin Phone Number must start with 7',]"></v-text-field>
                                </div>
                                <div class="form-column">
                                  <v-select xs6 :items="sortSub()" v-model="model.surburb" label="Suburb" required @change="streetName($event)" :rules="[(v) => !!v || 'Surbub  is required']"
                                    item-text="nom_LOCAL" item-value="cod_LOCAL" class="input-group--focused" style="margin: 0.5em" readonly dense></v-select>
                                  <v-text-field name="input-1" label="Street Number" color="primary" v-model="model.door_number" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Next Of Kin Firstname" color="primary" v-model="model.nok_firstname" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Next Of Kin Other Phone Number" color="primary" v-model="model.nok_contact2" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                </div>
                          </v-form><br/><br/>

                          <v-form class="form">
                                <div class="form-column">
                                  <v-text-field name="input-1" label="Next Of Kin Physical Address" color="primary" v-model="model.nok_address" required readonly dense
                                    id="testing" style="margin: 0.5em; width: 695px;"></v-text-field>
                                </div>
                          </v-form><br/><br/>

                          <v-form class="form">
                                <div class="form-column">
                                  <v-autocomplete sx6 :items="purpose" v-model="model.supply_type" label="Type Of Supply" readonly dense required 
                                    :rules="[v => !!v || 'Type of supply is required']" item-text="purpose" item-value="abbr" class="input-group--focused" style="margin: 0.5em;">
                                    </v-autocomplete>
                                  <v-autocomplete sx6 :items="meter" v-model="model.connection_type" label="Connection Type" :rules="[v => !!v || 'Connection type is required']" item-text="meter" item-value="abbr" class="input-group--focused" style="margin: 0.5em;" required readonly dense></v-autocomplete>
                                  <v-text-field name="input-1" label="Main Switch AMP" color="primary" v-model="model.main_switch_amp" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Contractor Surname" color="primary" v-model="model.contractor_surname" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                </div>
                                <div class="form-column">
                                  <v-text-field name="input-1" label="Duration" color="primary" v-model="model.duration" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Number Of Meters" color="primary" v-model="model.number_of_meter" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Main Switch OR" color="primary" v-model="model.main_switch_or" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Next Of Kin National ID" color="primary" v-model="model.contractor_name" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                </div>
                                <div class="form-column">
                                  <v-text-field name="input-1" label="Roofing Material" color="primary" v-model="model.material" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Main Switch KVA" color="primary" v-model="model.main_switch_kva" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Cable Length" color="primary" v-model="model.cable_length" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field name="input-1" label="Contractor Firm" color="primary" v-model="model.contractor_firm" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                </div>
                          </v-form><br/><br/>

                          <v-form class="form">
                                <div class="form-column">
                                  <v-text-field name="input-1" label="Contracting Firm's Physical Address" color="primary" v-model="model.contractor_address" required readonly dense
                                    id="testing" style="margin: 0.5em; width: 695px;"></v-text-field>
                                </div>
                          </v-form><br/><br/>

                          <v-form class="form">
                                <div class="form-column">
                                  <v-text-field v-if="transfered === 'yess'" name="input-1" label="Name Of Employer" color="primary" v-model="model.name_of_employer" required readonly dense
                                    id="testing" style="margin: 0.5em;" ></v-text-field>
                                  <v-text-field v-if="transfered === 'yess'" name="input-1" label="Premise Owner" color="primary" v-model="model.premise_owner" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field v-if="transfered === 'yess'" name="input-1" label="Reason for Transfer Connection" color="primary" v-model="model.transfer_reason2" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field v-if="transfered === 'yes'" name="input-1" label="Reason for Reconnection" color="primary" v-model="model.transfer_reason" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                </div>
                                <div class="form-column">
                                  <v-text-field v-if="transfered === 'yess'" name="input-1" label="Name Of Trade" color="primary" v-model="model.name_of_trade" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field v-if="transfered === 'yess'" name="input-1" label="Employer Contact" color="primary" v-model="model.employed_contact1" required readonly dense
                                    id="testing" style="margin: 0.5em;" :rules="[(v) => v.length === 9 || 'Employer Phone Number must be 9 characters long', (v) => !!v || 'Employer Your Phone Number is required', (v) => v.startsWith('7') || 'Employer Phone Number must start with 7',]"></v-text-field>
                                  <v-text-field v-if="transfered === 'yes'" name="input-1" label="Service Point Number" color="primary" v-model="model.service_point_address" required readonly dense
                                    id="testing" style="margin: 0.5em;"></v-text-field>
                                </div>
                                <div class="form-column">
                                  <v-text-field v-if="transfered === 'yess'" name="input-1" label="Roofing Material" color="primary" v-model="model.premise_owner_address" required readonly dense id="testing" style="margin: 0.5em;"></v-text-field>
                                  <v-text-field v-if="transfered === 'yess'" name="input-1" label="Other Employer Contact" color="primary" v-model="model.employed_contact2" required readonly dense id="testing" style="margin: 0.5em;" :rules="[(v) => v.length === 9 || 'Employer Cell Number must be 9 characters long', (v) => !!v || 'Employer Your Cell Number is required', (v) => v.startsWith('7') || 'Employer Cell Number must start with 7',]"></v-text-field>
                                  <v-text-field v-if="transfered === 'yes'" name="input-1" label="Account Number" color="primary" v-model="model.nis_rad" required readonly dense
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
                                            v-model="model.lighting_points_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" label="Number Of Curcuits" type="number" color="primary"
                                            v-model="model.lighting_points_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" label="Estimated Wattage" type="number" color="primary"
                                            v-model="model.lighting_points_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                        </td>
                                      </tr><br/>
                                      <tr>
                                        <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Socket outlets</b></font></td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                            v-model="model.socket_outlets_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                            v-model="model.socket_outlets_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                            v-model="model.socket_outlets_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
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
                                            v-model="model.cooker_points_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                            v-model="model.cooker_points_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                            v-model="model.cooker_points_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                        </td>
                                      </tr><br/>
                                      <tr>
                                        <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Water heaters</b></font></td>
                                        <td>
                                          <v-text-field name="input-1" label="Number Required" color="primary"
                                            v-model="model.water_heaters_number" required type="number" :rules="[v => !!v || 'Cannot be empty']"
                                            id="testing"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                            v-model="model.water_heaters_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                            v-model="model.water_heaters_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                        </td>
                                      </tr><br/>
                                      <tr>
                                        <td style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif"><font color="#3f51b5"><b>Airconditioning</b></font></td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Number Required" color="primary"
                                            v-model="model.air_conditioning_number" required id="testing" :rules="[v => !!v || 'Cannot be empty']"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Number Of Circuits" color="primary"
                                            v-model="model.air_conditioning_circuits" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                        </td>
                                        <td>
                                          <v-text-field name="input-1" type="number" label="Estimated Wattage" color="primary"
                                            v-model="model.air_conditioning_wattage" required id="testing" :rules="[v => !!v || '']"></v-text-field>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </template>
                                </v-simple-table>
                          </v-form>                          
                        </div>
                      </v-card-text>
                    </v-form>
                  </v-card>
		              <v-btn color="primary" @click="prevStep(11)">Back</v-btn>
                  <v-btn color="primary" outlined @click="saveStep(11)">Save</v-btn>
                  <v-btn color="green" big style="margin-left: 69%" @click="nextStep(11)">Next</v-btn>
                  <center><v-btn style="margin-top: 20px" @click="cancelled" outlined big color="red" :href="'/indyconn'">Cancel</v-btn></center>
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
    import trade from "@/variables/trade";
    import nonstarnd from "@/variables/nonstarnd";
    import reasonforconn from "@/variables/reasonforconn";
    import reasonfordisconn from "@/variables/reasonfordisconn";
    import applicationfor from "@/variables/applicationfor";
    import supplypurpose from "@/variables/supplypurpose";
    import customertype from "@/variables/customertype";
    import existingsupplies from "@/variables/existingsupplies";
    import servpointchang from "@/variables/servpointchang";
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

  const STATUS_INITIAL  = 0, STATUS_SAVING  = 1, STATUS_SUCCESS  = 2, STATUS_FAILED  = 3, STATUS_INITIAL1 = 0, STATUS_SAVING1 = 1, STATUS_SUCCESS1 = 2, STATUS_FAILED1 = 3, STATUS_INITIAL2 = 0, STATUS_SAVING2 = 1, STATUS_SUCCESS2 = 2, STATUS_FAILED2 = 3, STATUS_INITIAL3 = 0, STATUS_SAVING3 = 1, STATUS_SUCCESS3 = 2, STATUS_FAILED3 = 3;

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

      custype: "",
      employed: "",
      rservice: "",
      newaccount: "",
      complet: "",
      newconapp: "",

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
      e1: 1,
      max: 12,
      inputField: [(v) => (v && v.length >= 5) || "Minimum Length is 5"],
      images: null,
      cell: "",
      contractor_cell: "",

      model: {
        custype: "",//indi or org
        employed: "",//employed or not
        rservice: "",//requested service	
        newaccount: "",//new acc or transfer
        complet: "",//cont or save for constractor
        newconapp: "",//new app or cont app
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
        d_physical_address: "", //disconnection address
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
      nonstarnd: nonstarnd,
      reasonforconn: reasonforconn,
      gender: gender,    
      trade: trade,    
      applicationfor: applicationfor,
      supplypurpose: supplypurpose,
      customertype: customertype,
      existingsupplies: existingsupplies,
      material: material,
      servpointchang: servpointchang,
      reasonfordisconn: reasonfordisconn,
      meter: meter,
      purpose: purpose,
      document: document,
      district: district,
      results: {},
      result: {},
    }),

    watch: {        
      custype(newValue) {
        if (newValue === 'indi') {
          this.custype = 'indi';
        } else if (newValue === 'org') {
          this.custype = 'org';
        } else {
          this.custype = null;
        }
      },

      employed(newValue) {
        if (newValue === 'work') {
          this.employed = 'work';
        } else if (newValue === 'home') {
          this.employed = 'home';
        } else {
          this.employed = null;
        }
      },

      rservice(newValue) {
        if (newValue === 'connect') {
          this.rservice = 'connect';
        } else if (newValue === 'disconnect') {
          this.rservice = 'disconnect';
        } else {
          this.rservice = null;
        }
      },

      newaccount(newValue) {
        if (newValue === 'allow') {
          this.newaccount = 'allow';
        } else if (newValue === 'disallow') {
          this.newaccount = 'disallow';
        } else {
          this.newaccount = null;
        }
      },

      newconapp(newValue) {
        if (newValue === 'newa') {
          this.newconapp = 'newa';
        } else if (newValue === 'conta') {
          this.newconapp = 'conta';
        } else {
          this.newconapp = null;
        }
      },

      complet(newValue) {
        if (newValue === 'complete') {
          this.complet = 'complete';
        } else if (newValue === 'later') {
          this.complet = 'later';
        } else {
          this.complet = null;
        }
      }
    },

    methods: {
      cancelo2() {
        if (window.confirm('Are you sure you want to cancel? This will take you back to the begining.')) {
          window.location.href = '/indyconn';
        }
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
        this.$refs.form9.reset();
        this.$refs.form10.reset();
        this.$refs.form11.reset();
      },

      getAppAll: function () {
        this.getApp();
        this.nextStep(1);
      },

      getApp: function () {
        if (this.$refs.form1.validate()) {
          this.showed = false;
          this.isLoading = true;
          this.$axios
          .request({
            url: "http://172.16.29.12:3017/api/newnetmet8/" + this.model.pjob.toUpperCase(),
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
                  this.$router.push("/indyconn");
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
            //console.log(e)
          });
        }
      },

      onUpdateContact1(value) {
        console.log('First phone number updated:', value)
      },

      isValidLandlineNumber(value) {
        const landlineRegex = /^\d{3}\d{2}\d{4}$/;
          return landlineRegex.test(value);
      },

      onUpdateContact2(value) {
        console.log('Second phone number updated:', value)
      },

      updateModel() {
        this.model.postal_proof = this.uploadedFiles[0].id;
        this.model.owner_id_proof = this.uploadedFiles1[0].id;
        this.model.transfer_add_proof = this.uploadedFiles2[0].id;
        this.model.nok_id_proof = this.uploadedFiles3[0].id;
      },

      validateDoorNumber() {
        if (this.model.door_number < 0) {
         this.model.door_number = 0;
        }
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

      /*sortStr: function () {
        return this.sstreets.slice().sort(function (a, b) {
          return a.nom_CALLE > b.nom_CALLE ? 1 : -1;
        });
      },*/

      showMessage() {
        Swal.fire({
          title: 'Error',
          text: 'An unexpected error occurred. Please Contact Rukuni',
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
            this.e1 = e + 1;
          }
        } else if (e == 10) {
          if (this.$refs.form10.validate()) {
            this.e1 = e + 1;
          }
        } else if (e == 11) {
          if (this.$refs.form11.validate()) {
            this.register();
          }
        }
      },

      saveStep: function (e) {
	      if (e == 2) {
          if (this.$refs.form2.validate()) {
	          this.model.newconapp = this.newconapp;
	          this.model.custype = this.custype;
            this.register2();
          }
        } else if (e == 3) {
          if (this.$refs.form2.validate() & this.$refs.form3.validate()) {
            this.model.rservice = this.rservice;
	          this.model.custype = this.custype;
            this.model.newconapp = this.newconapp;
            this.register3();
          }
        } else if (e == 4) {
          if (this.$refs.form2.validate() & this.$refs.form3.validate() & this.$refs.form4.validate()) {
            this.register4();
          }
        } else if (e == 5) {
          if (this.$refs.form5.validate()) {
            this.model.rservice = this.rservice;
	          this.model.custype = this.custype;
            this.model.newconapp = this.newconapp;
            this.model.employed = this.employed;
            this.register5();
          }
        } else if (e == 6) {
          if (this.$refs.form6.validate()) {
            this.model.rservice = this.rservice;
	          this.model.custype = this.custype;
            this.model.newconapp = this.newconapp;
            this.model.employed = this.employed;
            this.model.newaccount = this.newaccount;
            this.register6();
          }
        } else if (e == 7) {
          if (this.$refs.form7.validate()) {
            this.model.rservice = this.rservice;
	          this.model.custype = this.custype;
            this.model.newconapp = this.newconapp;
            this.model.employed = this.employed;
            this.model.newaccount = this.newaccount;
            this.model.complet = this.complet;
            this.register7();
          }
        } else if (e == 8) {
          if (this.$refs.form8.validate()) {
            this.register8();
          }
        } else if (e == 9) {
          if (this.$refs.form9.validate()) {
            this.register9();
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
        } else if (e == 10) {
          this.e1 = e - 1;
        } else if (e == 11) {
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

      /*streetName(event) {
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
      },*/

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
              url: "http://172.16.29.12:3017/api/newnetmet8",
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

      register2() {
        this.errors = [];
        this.success = [];
        if (this.$refs.form2.validate()) {
            this.model.gender = this.model.gender.toUpperCase();
            this.model.surname = this.model.surname.toUpperCase();
            this.model.customer_name = this.model.customer_name.toUpperCase();
            this.model.document_id = this.model.document_id.toUpperCase();
            this.model.contact1 = this.results.formattedNumber;
	    this.isLoading = true;
            this.$axios.request({
              url: "http://172.16.29.12:3017/api/newnetmet8",
              method: "post", 
              headers:{'Authorization': 'Bearer '+localStorage.getItem('token')},
              data: this.model,
            }).then((response) => {
              this.isLoading = false;
              if (response.data != "" || response.data != null) {
                this.success.push( "Your application has been saved successfully. Your unique Application Number, " + response.data );
                this.$router.push({ path: "/success2", query: { data: response.data }, });
              } else {
                  this.showMessage();
                }
              }).catch((e) => {
                this.isLoading = false;
                this.showMessage();
              });
        } else {
          if (!this.$refs.form2.validate()) {
            this.e1 = 2;
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
    },

  };
</script>

<style scoped lang="css">
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
  .dropbox {
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    max-height: 120px;
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