import Swal from "sweetalert2"
const Cookie = process.client ? require("js-cookie") : undefined;
export default function ({ $axios, redirect, store }) {
  $axios.onError(error => {
    if(error.response.status === 400) {
      redirect('/')
    }

    if(error.response.status === 503) {
      Swal.fire({
        title: "Could not process your request, Please contact the system Administrator",
        type: "warning",
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OKAY"
      }).then(result => {
        if (result.value) {
          Cookie.remove('auth')
      store.commit("setAuth", null);
          document.location.replace("/")
        }
      })
      redirect('/')
    }
  })
}