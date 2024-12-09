<template>
  <Slide right :closeOnNavigation="true" noOverlay>
    <span v-scroll-to="{el:'#equipment'}">Equipment</span>
    <span v-scroll-to="{el:'#service', offset: -150}">Service</span>
    <span v-scroll-to="{el:'#rent'}">Rent</span>
    <span v-scroll-to="{el:'#about'}">About</span>
    <span v-scroll-to="{el:'#contacts'}">Contact Us</span>
  </Slide>
</template>

<script>
    import { Slide } from 'vue-burger-menu'
    export default {
        name: "BurgerMenu",
        components: {
            Slide // Register your component
        }
    }
</script>

<style>
  .bm-burger-button {
    width: 36px;
    height: 30px;
    right: 70px;
    top: 70px;
    cursor: pointer;
  }
  .bm-burger-bars {
    background-color: #ffffff;
  }
  .line-style {
    position: absolute;
    height: 15%;
    left: 0;
    right: 0;
  }
  .cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
    cursor: pointer;
  }
  .bm-cross {
    background: #e76c1e;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #ffffff; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
  }
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  .bm-item-list {
    color: #b8b7ad;
    margin-left: 10%;
    font-size: 20px;
  }
  .bm-item-list > * {
    display: flex;
    text-decoration: none;
    padding: 0.7em;
  }
  .bm-item-list > span {
    width: 300px;
    font-size: 14px;
    margin-left: 10px;
    font-weight: normal;
    color: #333333;
    margin-top: 15px;
  }
  @media only screen and (max-width : 533px) {
    .bm-burger-button {
      top: 80px;
    }
  }
</style>