<template>
  <div id="v-widget">
    <v-card>
      <v-toolbar color="transparent" flat dense  v-if="enableHeader">
        <v-toolbar-title
          ><h4 style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;">{{ title }}</h4></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <slot name="widget-header-action"></slot>
      </v-toolbar>
      <v-divider v-if="enableHeader"></v-divider>
      <v-card-text :class="contentBg">
        <slot name="widget-content"></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "VWidget",
  props: {
    title: {
      type: String
    },
    enableHeader: {
      type: Boolean,
      default: true
    },
    contentBg: {
      type: String,
      default: "white"
    }
  },

  data() {
    return {}
  },
  computed: {}
}
</script>
