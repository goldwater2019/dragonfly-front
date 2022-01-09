<template>
  <div>
    <h2>starRocksSchema</h2>
    <div>
      <el-select v-model="dorisConfigSelectedList"
                 multiple
                 placeholder="请选择Doris库"
                 collapse-tags
                 style="margin-left: 20px;"
                 class="w-500"
      >
        <el-option
            v-for="dorisConfig in dorisConfigList"
            :key="dorisConfig.dorisId"
            :label="dorisConfig.dorisAlias"
            :value="dorisConfig.dorisId"
        >
        </el-option>
      </el-select>
      <el-select v-model="dorisTableConfigSelectList"
                 multiple
                 placeholder="请选择表"
                 collapse-tags
                 style="margin-left: 20px;"
                 class="w-500"
      >
        <el-option
            v-for="dorisSchme in dorisTableConfigList"
            :key="dorisSchme.tableId"
            :label="dorisSchme.tableName"
            :value="dorisSchme.tableId"
        >
        </el-option>
      </el-select>
      <el-button icon="el-icon" type="primary" class="mt-5 ml-2" @click="onQueryDorisSchema">查询</el-button>
    </div>
    <div>
<!--      dorisId: 1-->
<!--      dorisSchemaId: 19-->
      <!-- 表格数据 -->
      <el-table :data="dorisSelectedSchemaList" max-height="500px" class="mt-5" stripe border style="width: 100%">
        <el-table-column align="center" prop="dorisAlias" label="StarRocks名称" width="150px" fixed="left"></el-table-column>
        <el-table-column align="center" prop="dbName" label="库名" width="150px"></el-table-column>
        <el-table-column align="center" prop="tableName" label="表名" width="150px"></el-table-column>
        <el-table-column align="center" prop="fieldName" label="字段名" width="150px"></el-table-column>
        <el-table-column align="center" prop="nullable" label="是否可空" width="150px"></el-table-column>
        <el-table-column align="center" prop="typeName" label="	字段类型" width="150px"></el-table-column>
        <el-table-column align="center" prop="columnSize" label="字段大小" width="150px"></el-table-column>
        <el-table-column align="center" prop="decimalDigits" label="小数位数" width="150px"></el-table-column>
        <el-table-column align="center" prop="remarks" label="字段描述" width="150px"></el-table-column>
        <el-table-column align="center" prop="dorisSchemaId" label="dorisSchemaId" width="150px"></el-table-column>
        <el-table-column align="center" prop="dorisId" label="dorisId" width="150px" fixed="right"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import api from "@/api";

export default {
  name: "StarRocksSchema",
  data() {
    return {
      dorisConfigSelectedList: [],
      dorisConfigList: [],
      dorisTableConfigList: [],
      dorisTableConfigSelectList: [],
      dorisSelectedSchemaList: []
    }
  },
  methods: {
    onQueryDorisSchema() {
      let selectedTableList = [];
      for (let tableId of this.dorisTableConfigSelectList) {
        let temp = tableId.split('@');
        let dorisId = temp[0] * 1;
        let tableName = temp[1];
        selectedTableList.push({
          'dorisId': dorisId,
          'tableName': tableName
        });
      }
      api.getAndRefreshDorisSchemaList(selectedTableList)
          .then(res => {
            this.dorisSelectedSchemaList = [];
            for (let dorisSchema of res.data) {
              let dorisAlias;
              for (let dorisConfig of this.dorisConfigList) {
                if (dorisConfig.dorisId == dorisSchema.dorisId) {
                  dorisAlias = dorisConfig.dorisAlias;
                  break;
                }
              }
              this.dorisSelectedSchemaList.push({
                columnSize: dorisSchema.columnSize,
                createTime: dorisSchema.createTime,
                dbName: dorisSchema.dbName,
                decimalDigits: dorisSchema.decimalDigits,
                dorisId: dorisSchema.dorisId,
                dorisSchemaId: dorisSchema.dorisSchemaId,
                fieldName: dorisSchema.fieldName,
                nullable: dorisSchema.nullable,
                remarks: dorisSchema.remarks,
                tableName: dorisSchema.tableName,
                typeName: dorisSchema.typeName,
                updateTime: dorisSchema.updateTime,
                dorisAlias: dorisAlias
              });
            }
          }).catch(err => {
        console.error(err);
      });
    },
    refreshSchema() {
      // TODO 更新schema信息
    },
    onQueryData() {
      this.$store.dispatch("fetAllDorisConfigData")
          .then(
              () => {
                this.dorisConfigList = this.$store.state.dorisConfigList;
              }
          )
    }
  },
  created() {
    this.onQueryData();
  },
  watch: {
    dorisConfigSelectedList: function (newDorisIdList) {
      this.$store.commit("clearDorisIdList");
      this.$store.commit("clearDorisTableConfigSelectedList");
      for (let dorisId of newDorisIdList) {
        this.$store.commit({
          type: "addDorisIdIntoList",
          dorisId: dorisId
        })
      }
      this.$store.dispatch("fetchTableNamesSchema").then(
          () => {
            this.dorisTableConfigList = this.$store.state.dorisTableConfigSelectedList;
          }
      )
    },
    // dorisTableConfigSelectList: function (currentDorisTableConfigSelectList) {
    // }
  }
}
</script>

<style scoped>

</style>