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
      <el-button icon="el-icon" type="primary" class="mt-5" @click="onAddTopicInfo">新增</el-button>
      <el-dialog
          title="新增topic"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <!-- dialog的数据 -->
        <el-form :model="addKafkaTopicData">
          <el-form-item label="kafka名称" :label-width="formLabelWidth">
            <el-select v-model="addKafkaTopicData.kafkaAlias" autocomplete="off">
              <el-option v-for="kafkaConfigAliasData in kafkaConfigAliasListData"
                         :key="kafkaConfigAliasData.kafkaId"
                         :label="kafkaConfigAliasData.kafkaAlias"
                         :value="kafkaConfigAliasData.kafkaAlias"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="topic名称" :label-width="formLabelWidth">
            <el-input v-model="addKafkaTopicData.topicName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分区数量" :label-width="formLabelWidth">
            <el-input v-model="addKafkaTopicData.partitionNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="副本因子" :label-width="formLabelWidth">
            <el-input v-model="addKafkaTopicData.replicationFactor" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- 内部弹窗 -->
        <el-dialog title="错误信息" :visible.sync="innerDialogVisible">
          {{ innerMessage }}
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onAddTopicInfoConfirm">确 定</el-button>
        </span>
      </el-dialog>
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
      kafkaConfigAliasSelectedList: [],  // 选中的kafkaConfigId
      kafkaConfigList: this.$store.state.kafkaConfigList,
      topicInfoList: [],
      formLabelWidth: '120px',
      dialogVisible: false,  // 新增对话框是否可见
      addKafkaTopicData: {
        kafkaAlias: "",
        topicName: "topicNameDev",
        partitionNum: 1,
        replicationFactor: 1
      },
      innerDialogVisible: false, // 错误信息弹窗不可见,
      innerMessage: "",
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
    onAddTopicInfoConfirm() {
      let addKafkaTopicData = this.addKafkaTopicData;
      for (let kafkaAliasData of this.kafkaConfigAliasListData) {
        if (kafkaAliasData.kafkaAlias === addKafkaTopicData.kafkaAlias) {
          addKafkaTopicData.kafkaId = kafkaAliasData.kafkaId;
        }
      }
      let params = {
        kafkaId: addKafkaTopicData.kafkaId,
        partitionNum: addKafkaTopicData.partitionNum,
        replicationFactor: addKafkaTopicData.replicationFactor,
        topicName: addKafkaTopicData.topicName
      };
      api.addKafkaTopic(params)
          .then(res => {
            let code = res.code;
            if (code === 0) {
              // 添加成功
              this.dialogVisible = false;
              this.onQueryData();
              this.addKafkaTopicData = {
                kafkaAlias: "",
                topicName: "topicNameDev",
                partitionNum: 1,
                replicationFactor: 1
              };
            } else {
              // 添加失败
              this.dialogVisible = true;
              // 显示错误信息窗口
              this.innerDialogVisible = true;
              this.innerMessage = res.msg;
            }
          })
          .catch(() => {
          });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {
          });
    },
    onAddTopicInfo() {
      this.dialogVisible = true;
    },
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