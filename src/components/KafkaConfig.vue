<template>
  <div style="margin-left: 256px">
    <!--    <button @click="testMockData">添加测试数据</button>-->
    <button @click="fetchAllKafkaConfigData">获得数据</button>
    <a-button type="primary">
      新增kafka配置
    </a-button>


    <a-table
        :columns="kafkaConfigColumns"
        :data-source="kafkaConfigData"
        :pagination="kafkaConfigPagination"
        :loading="kafkaConfigLoading"
        :row-key="record => record.kafkaId"
        @change="handleKafkaConfigTableChange"
    >

      <template slot="createTime" slot-scope="createTime"> {{ createTime }}</template>
      <span slot="action" slot-scope="kafkaConfig">
        <a-button type="primary" @click="updateKafkaConfig(kafkaConfig)">修改</a-button>
        <a-divider type="vertical"/>
        <a-button type="danger" @click="deleteKafkaConfig(kafkaConfig)">删除</a-button>
        <!--      <a-divider type="vertical" />-->
        <!--      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>-->
    </span>
    </a-table>
  </div>
</template>

<script>
// import {useState} from "@/store";
import {mapState} from "vuex";

let kafkaConfigColumns = [
  {
    title: "kafka配置ID",
    dataIndex: "kafkaId",
    sorter: true,
    width: "15%"
  },
  {
    title: "kafka服务器列表",
    dataIndex: "brokerList",
    width: "15%"
  },
  {
    title: "kafka别名",
    dataIndex: "kafkaAlias",
    width: "15%"
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    sorter: true,
    width: "15%",
    scopedSlots: {customRender: 'createTime'}
  },
  {
    title: "修改时间",
    dataIndex: "updateTime",
    sorter: true,
    width: "15%"
  },
  {
    title: "操作",
    key: "action",
    width: "15%",
    scopedSlots: {customRender: 'action'},
  }
];

export default {
  name: "KafkaConfig",
  computed: {
    ...mapState({
      kafkaConfigList: state => state.kafkaConfigList,
      kafkaConfigAliasList: state => state.kafkaConfigAliasList
    })
  },
  methods: {
    deleteKafkaConfig(kafkaConfig) {
      console.log("删除", kafkaConfig);
    },
    updateKafkaConfig(kafkaConfig) {
      console.log(kafkaConfig);
    },
    handleKafkaConfigSelect() {
      console.log("hello, select");
    },
    testMockData() {
      this.$store.commit({
        type: "mockKafkaConfigAdd"
      })
    },
    fetchAllKafkaConfigData() {
      this.kafkaConfigLoading = true;
      this.$store.dispatch("fetchAllKafkaConfigData");
      let data = this.kafkaConfigList;
      const kafkaConfigPagination = this.kafkaConfigPagination;
      kafkaConfigPagination.total = data.length;
      this.kafkaConfigLoading = false;
      this.kafkaConfigPagination = kafkaConfigPagination;
      let pageSize = data.length < 10 ? data.length : 10;
      let kafkaConfigData = [];
      for (let i = 0; i < pageSize; i++) {
        kafkaConfigData.push(data[i]);
      }
      this.kafkaConfigData = kafkaConfigData;
      let aliasList = this.kafkaConfigAliasList;
      let filterList = []
      for (let alias of aliasList) {
        filterList.push({
          text: alias,
          value: alias
        });
      }
      this.kafkaConfigColumns[2].filter = filterList;
    },
    handleKafkaConfigTableChange(kafkaConfigPagination, filters, sorter) {
      console.log(kafkaConfigPagination);
      console.log(filters);
      console.log(sorter);
      /**
       * kafkaConfigPagination: {
       *   current: 2,
       *   pageSize: 10,
       *   total: 200
       * }
       *
       * sorter: {
       *   columnKey: "name",
       *   field: "name",
       *   order: "ascend"
       * }
       *
       * filter: {
       *   gender: ["male", "female"]
       * }
       */
    },
  },
  data() {
    return {
      kafkaConfigColumns,
      kafkaConfigLoading: false,
      kafkaConfigPagination: {},
      kafkaConfigData: []
    }
  },
  created() {
    this.fetchAllKafkaConfigData();  // 通过接口获得所有的kafkaConfig数据
  },
}
</script>

<style scoped>

</style>