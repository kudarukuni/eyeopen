<template>
  <div class="themeSetting">
    <v-toolbar color="blue">
      <v-toolbar-title>
        Theme Settings
      </v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout column>
        <v-flex>
          <v-subheader class="px-1 my-2">
            Colour Option
          </v-subheader>
          <div class="color-option">
            <v-layout wrap>
              <label
                class="color-option--label flex xs6 pa-1"
                v-for="(option, index) in themeColorOptions"
                :key="index"
              >
                <input type="radio" name="color" :value="option.key" v-model="themeColor" />
                <span class="color-option--item bg">
                  <span class="overlay">
                    <span class="material-icons">check</span>
                  </span>
                  <span class="color-option--item--header sideNav" :class="option.value.sideNav"></span>
                  <span class="color-option--item--header mainNav" :class="option.value.mainNav"></span>
                  <span class="sideMenu" :class="option.value.sideMenu"></span>
                </span>
              </label>
            </v-layout>
          </div>
          <div class="theme-options">
            <v-subheader class="px-1 my-2">
              Sidebar Option
            </v-subheader>
            <v-divider></v-divider>
            <div class="my-3">
              <v-btn-toggle v-model="sideBarOption">
                <v-btn flat value="dark">
                  Dark
                </v-btn>
                <v-btn flat value="light">
                  Light
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import colors from "vuetify/es5/util/colors"
import { SideEventBus } from "../event-bus.js"
export default {
  data() {
    return {
      themeColor: "indigo",
      sideBarOption: "light",
      colors: colors
    }
  },
  computed: {
    themeColorOptions() {
      return [
        {
          key: "blue",
          value: {
            sideNav: "blue",
            mainNav: "blue",
            sideMenu: "white"
          }
        },
        {
          key: "teal",
          value: {
            sideNav: "teal",
            mainNav: "teal",
            sideMenu: "white"
          }
        },
        {
          key: "red",
          value: {
            sideNav: "red",
            mainNav: "red",
            sideMenu: "white"
          }
        },
        {
          key: "orange",
          value: {
            sideNav: "orange",
            mainNav: "orange",
            sideMenu: "white"
          }
        },
        {
          key: "purple",
          value: {
            sideNav: "purple",
            mainNav: "purple",
            sideMenu: "white"
          }
        },
        {
          key: "indigo",
          value: {
            sideNav: "indigo",
            mainNav: "indigo",
            sideMenu: "white"
          }
        },
        {
          key: "cyan",
          value: {
            sideNav: "cyan",
            mainNav: "cyan",
            sideMenu: "white"
          }
        },
        {
          key: "pink",
          value: {
            sideNav: "pink",
            mainNav: "pink",
            sideMenu: "white"
          }
        },
        {
          key: "green",
          value: {
            sideNav: "green",
            mainNav: "green",
            sideMenu: "white"
          }
        }
      ]
    }
  },
  methods: {
    emitGlobalSideClickEvent() {
      // Send the event on a channel (i-got-clicked) with a payload (the click count.)
      SideEventBus.$emit("change", this.sideBarOption)
    }
  },
  watch: {
    themeColor: {
      handler(val) {
        this.$vuetify.theme.primary = this.colors[val].base
      },
      immediate: true
    },
    sideBarOption: {
      handler(val) {
        //console.log(val)
        this.emitGlobalSideClickEvent()
        // this.$vuetify.dark = val === "dark"
      },
      immediate: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.color-option
  &--label
    position: relative
    display: block
    cursor: pointer
    & input[type="radio"]
      display:none
      &+span
        position: relative
        &>.overlay
          display: none;
          position: absolute
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.3);
          text-align: center;
          line-height: 30px;
          color: #fff;
      &:checked+span>.overlay
        display:block
    & .bg
      background-color: #f1f1f1
  &--item
    overflow: hidden;
    display: block;
    box-shadow: 0 0 2px rgba(0,0,0,.1);
    margin-bottom: 15px;
    &--header
      height: 10px
    &>span
      display: block;
      float: left;
      width: 50%;
      height: 20px;
</style>
