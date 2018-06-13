<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->
    <Unit/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Unit from "./components/Unit";

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Unit
  }
}
</script>

<style lang="scss">
  @import "./assets/css/global.scss";
</style>
