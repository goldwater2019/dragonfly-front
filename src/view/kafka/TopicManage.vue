<template>
  <div>
    <div>
      <el-select v-model="kafkaConfigAliasSelectedList"
                 multiple
                 placeholder="请选择kafka"
                 collapse-tags
                 style="margin-left: 20px;"
                 class="w-500"
      >
        <el-option
            v-for="kafkaConfigAliasData in kafkaConfigAliasListData"
            :key="kafkaConfigAliasData.kafkaId"
            :label="kafkaConfigAliasData.kafkaAlias"
            :value="kafkaConfigAliasData.kafkaId"
        >
        </el-option>
      </el-select>
      <el-button icon="el-icon" type="primary" class="mt-5" @click="onQueryData">查询</el-button>
      <el-button icon="el-icon" type="primary" class="mt-5" @click="onQueryData">新增</el-button>
    </div>
    <div>
      <!-- 表格数据 -->
      <el-table :data="topicInfoList" max-height="500px" class="mt-5" :span-method="arraySpanMethod" stripe border>
        <el-table-column align="center" prop="topicId" label="topicId" width="150px"></el-table-column>
        <el-table-column align="center" prop="topicName" label="	topic名称" width="150px"></el-table-column>
        <el-table-column align="center" prop="kafkaConfigId" label="	kafkaId" width="150px"></el-table-column>
        <el-table-column align="center" prop="kafkaAlias" label="kafka别名" width="150px"></el-table-column>
        <el-table-column align="center" prop="brokerList" label="	kafka服务器列表" width="150px"></el-table-column>
        <el-table-column label="操作" width="200px" fixed="right" align="center">
          <template slot-scope="{row}">
            <lambda-button
                size="mini"
                icon="el-icon-delete"
                confirm
                type="danger"
                @confirm="onDeleteKafkaTopic(row)"
            >删除
            </lambda-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import LambdaButton from "@/components/common/LambdaButton";
import api from "@/api";

export default {
  name: "TopicManage",
  components: {
    LambdaButton
  },
  data() {
    return {
      kafkaConfigAliasSelectedList: [],
      kafkaConfigList: this.$store.state.kafkaConfigList,
      topicInfoList: []
    }
  },
  computed: {
    kafkaConfigAliasListData: function () {
      let data = [];
      let kafkaConfigList = this.$store.state.kafkaConfigList;
      for (let kafkaConfig of kafkaConfigList) {
        data.push({
          ...kafkaConfig
        });
      }
      return data;
    },
  },
  methods: {
    arraySpanMethod() {
      /**
       * { row, column, rowIndex, columnIndex }
       */
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
      // console.log(content);
    },
    onDeleteKafkaTopic(topicInfo) {
      let kafkaId = topicInfo.kafkaConfigId;
      let topicName = topicInfo.topicName;
      api.deleteTopic({
        kafkaId,
        topicName
      }).then(() => {
        this.onQueryData();
      }).catch(error => {
        console.error("删除topic失败");
        console.error(error);
      })
    },
    onQueryData() {
      this.$store.commit("clearKafkaSelectedConfig");
      for (let selectItemId of this.kafkaConfigAliasSelectedList) {
        for (let kafkaConfig of this.$store.state.kafkaConfigList) {
          if (kafkaConfig.kafkaId === selectItemId) {
            this.$store.commit({
              type: "addKafkaSelectedConfig",
              kafkaConfigId: kafkaConfig.kafkaId,
              kafkaAlias: kafkaConfig.kafkaAlias
            })
          }
        }
      }
      this.$store.dispatch("queryTopicInfo").then(
          () => {
            this.topicInfoList = this.$store.state.topicInfoList;
          }
      );
    },
    fetchKafkaConfigData() {
      this.$store.dispatch("fetchAllKafkaConfigData");
    },
  },
  watch: {
    topicInfoList: (newVal, oldVal) => {
      console.log("new:", newVal, ", old:", oldVal);
    }
  },
  created() {
    this.fetchKafkaConfigData();
  }
}
</script>

<style scoped>
.center_div {
  margin-top: 300px;
}

.w-500 {
  width: 500px;
}
</style>