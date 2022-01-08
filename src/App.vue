<template>
  <div id="app">
    <div class="flex w-100 left">
      <nav-bar class="w-20"/>
      <div>
        <router-view class="h-100 right flex-align-start nmt-50 ml-10" style="width: 1024px"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

import NavBar from "@/components/menu/NavBar";

export default {
  name: 'App',
  components: {
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

.left {
  width: 280px;
  height: 100vh;
}

.right {
  height: 100vh;
}
</style>
