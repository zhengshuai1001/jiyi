<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld  @click="aa"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    aa() {
      alert("aaa");
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/css/global.scss";
</style>
