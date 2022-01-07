<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <nav-bar/>
    <template v-if="pageKey == 1">
      <kafka-config/>
    </template>
    <!--    <state-test/>-->
  </div>
</template>

<script>
import KafkaConfig from "@/components/KafkaConfig";
import NavBar from "@/components/NavBar";
import {mapState} from "vuex";
// import StateTest from "@/components/StateTest";

export default {
  name: 'App',
  components: {
    KafkaConfig,
    NavBar
  },
  computed: {
    ...mapState({
      pageKey: state => state.pageKey
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
