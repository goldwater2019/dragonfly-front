<template>
  <div>
    <button @click="testMockData">添加测试数据</button>
    <button @click="fetchAllKafkaConfigData">获得数据</button>
    <ul>
      <template v-for="kafkaConfig in kafkaConfigList">
        <li :key="kafkaConfig.kafkaId">{{kafkaConfig.kafkaId}} -- {{kafkaConfig.brokerList}}
         -- {{kafkaConfig.kafkaAlias}} -- {{kafkaConfig.createTime}}</li>
      </template>
    </ul>
  </div>
</template>

<script>
// import {useState} from "@/store";
import {mapState} from "vuex";

export default {
  name: "KafkaConfig",
  computed: {
    ...mapState({
      kafkaConfigList: state => state.kafkaConfigList
    })
  },
  methods: {
    testMockData() {
      this.$store.commit({
        type: "mockKafkaConfigAdd"
      })
    },
    fetchAllKafkaConfigData() {
      // TODO 获得所有数据
      this.$store.dispatch("fetchAllKafkaConfigData");
    }
  }
  // created() {
  //   const stateMapper = ["kafkaConfigList"];
  //   const state = useState(stateMapper);
  //   return {
  //     ...state
  //   }
  // }
}
</script>

<style scoped>

</style>