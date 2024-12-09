import Swal from "sweetalert2"
import API from "@/variables"
const base_url = "http://172.16.29.12:5050/selfservice"
const client_id = "my-client"
const Base64 = require("js-base64").Base64;
const client_pass = "secret"
const tokenCookie = "4AFAB952496A0D3C8D9832AC327CA820" //whatie token
const userCookie = "B282279E0691D6604904071109FAA073" //musah username

const accCookie = "C13367945D5D4C91047B3B50234AA7AB" //code nisrad

const numsumCookie = "DEDE375F07CA956E4DF01649C171AAE4" //num_sum numsum

const showPayment = true

var loaderStyle = "bars" //spinner, bars, dots
var loaderColor = "blue" //#42aaf5
function getCookie(name) {



 
}
function getAuth(e) {
  if (e == 401) {
    Swal.fire({
      title: "Authentication Failed Please Login Again",
      type: "warning",
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OKAY"
    }).then(result => {
      if (result.value) {
        deleteCookie(tokenCookie)
        deleteCookie(userCookie)
        deleteCookie(accCookie)
        deleteCookie(numsumCookie)
        document.location.replace("/")
        //$router.push("/auth/login")
      }
    })
  }
} 
function encryptData(enctext){
return Base64.encode(Base64.encode(enctext)).split("")
.reverse()
.join("")
}
function setCookie(name, value, days) {
  var d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString()
}
function deleteCookie(name) {
  setCookie(name, "", -1)
}
function checkContact() {

}


export {
  base_url,
  client_id,
  client_pass,
  getCookie,
  setCookie,
  deleteCookie,
  tokenCookie,
  numsumCookie,
  loaderColor,
  userCookie,
  accCookie,
  showPayment,
  loaderStyle,
  getAuth,
  checkContact,
  encryptData
}
