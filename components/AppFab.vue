<template>
  <v-fab-transition>
    <v-btn
      fab="fab"
      small
      dark="dark"
      fixed="fixed"
      bottom="bottom"
      right="right"
      color="red"
      v-show="fab"
      @click="toTop"
      style="font-family: 'Gill Sans', Arial, Helvetica, sans-serif;"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: "AppFab",

  data: () => ({
    fab: false
  }),

  methods: {
    onScroll() {
      if (typeof window === "undefined") return

      const top = window.pageYOffset || document.documentElement.offsetTop || 0
      this.fab = top > 300
    },
    toTop() {
      this.$router.push({ hash: "" })
      this.$vuetify.goTo(0)
    }
  }
}
</script>
