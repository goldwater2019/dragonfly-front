<template>
  <div>
    <h2>
      KafkaConfigEdit
    </h2>
    <h2>
      {{ kafkaId }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "KafkaEdit",
  data() {
    return {
      kafkaId: this.$route.params.kafkaId
    }
  }
}
</script>

<style scoped>

</style>