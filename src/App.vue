<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <kafka-config/>
<!--    <state-test/>-->
  </div>
</template>

<script>
import KafkaConfig from "@/components/KafkaConfig";
// import StateTest from "@/components/StateTest";

export default {
  name: 'App',
  components: {
    KafkaConfig
    // StateTest
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
