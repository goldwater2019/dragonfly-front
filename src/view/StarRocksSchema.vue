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
    </div>
  </div>
</template>

<script>

export default {
  name: "StarRocksSchema",
  data() {
    return {
      dorisConfigSelectedList: [],
      dorisConfigList: [],
      dorisTableConfigList: [],
      dorisTableConfigSelectList: []
    }
  },
  methods: {
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
    dorisTableConfigSelectList: function (currentDorisTableConfigSelectList) {
      // TODO 通过按钮触发数据查询事件
      let selectedTableList = [];
      for (let tableId of currentDorisTableConfigSelectList) {
        let temp = tableId.split('@');
        let dorisId = temp[0] * 1;
        let tableName = temp[1];
        selectedTableList.push({
          'dorisId': dorisId,
          'tableName': tableName
        });
      }
      console.log(currentDorisTableConfigSelectList);
    }
  }
}
</script>

<style scoped>

</style>