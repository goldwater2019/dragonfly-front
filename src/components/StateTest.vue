<template>
  <div>
    <button @click="handleAddClick">addN</button>
    <button @click="handleSubClick">subN</button>
    <p>vuex中的数据: {{ $store.state.num }}</p>
  </div>
</template>

<script>
export default {
  name: "StateTest",
  methods: {
    handleAddClick() {
      this.$store.commit({
        type: "addNum",
        num: 2
      });
    },
    handleSubClick() {
      this.$store.commit({
        type: "addNum",
        num: -2
      });
    }
  }
}
</script>

<style scoped>

</style>