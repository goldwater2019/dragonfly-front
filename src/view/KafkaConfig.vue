<template>

  <div class="flex-direction-column">
    <!-- 表格数据 -->
    <el-table :data="kafkaConfigList" max-height="500px" class="mt-5" stripe border>
      <el-table-column align="center" prop="kafkaId" label="kafka配置ID" width="150px"></el-table-column>
      <el-table-column align="center" prop="brokerList" label="	kafka服务器列表" width="150px"></el-table-column>
      <el-table-column align="center" prop="kafkaAlias" label="kafka别名" width="150px"></el-table-column>
      <el-table-column align="center" prop="createTime" label="	创建时间" width="150px"></el-table-column>
      <el-table-column align="center" prop="updateTime" label="	修改时间" width="150px"></el-table-column>
      <el-table-column label="操作" width="200px" fixed="right" align="center">
        <template slot-scope="{row}">
          <lambda-button size="mini" icon="el-icon-edit" type="warning" @click="onEditKafkaConfig(row)">修改
          </lambda-button>
          <lambda-button
              size="mini"
              icon="el-icon-delete"
              confirm
              type="danger"
              @confirm="onDeleteKafkaConfig(row)"
          >删除
          </lambda-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加按钮 -->
    <div>
      <el-button icon="el-icon-plus" type="primary" @click="onAddKafkaConfig" class="mt-5">添 加</el-button>
    </div>
  </div>
</template>

<script>

import LambdaButton from "@/components/common/LambdaButton";

// import {useState} from "@/store";
import {mapState} from "vuex";

export default {
  name: "KafkaConfig",
  components: {
    LambdaButton
  },
  computed: {
    ...mapState({
      kafkaConfigList: state => state.kafkaConfigList,
      kafkaConfigAliasList: state => state.kafkaConfigAliasList
    })
  },
  methods: {
    onEditKafkaConfig(kafkaConfig) {
      console.log(kafkaConfig);
    },
    onAddKafkaConfig() {
      // TODO 添加kafkaConfig配置项
    },
    onDeleteKafkaConfig(kafkaConfig) {
      console.log(kafkaConfig);
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
    }
  },
  data() {
    return {
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