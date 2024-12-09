<template>
    <div id="pageDashboard" style="min-width:900px;overflow:auto">
        <client-only>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-card class="elevation-1 pa-3">
                <v-card-text>
                    <div>
                        <div class="layout column align-center">
                            <h3 align="right" style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
                                <font color="green">
                                    <marquee>Congratulations Your E21 Application Was Successfully !!</marquee>                                    
                                </font>
                            </h3>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <v-container fluid grid-list-xl><center>
                            <div style="border: #3636363; border-style: groove;padding: 1em;">
                                <div class="column align-left">
                                    <p style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">
					                   Application successful. Please note your Reference Number: <h1><font color="green">{{ this.$route.query.data }}</font></h1>
                                    </p>
                                </div>
                            </div>
                       </center></v-container>
                    </div><br /><br />

                    <v-btn style="float: right;" outlined small color="red" :href="'/'">back home</v-btn>
                    
                    <br /><br /><br />
                </v-card-text>
            </v-card><br /><br />
        </client-only>
    </div>
</template>
  
<script>

export default {
    layout: "regauth",
    middleware: "notAuthenticated",
    components: {
    },
    data: () => ({
    }),
    created() { },
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
