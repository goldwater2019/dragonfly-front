<template>
  <div>

    <el-form :model="form" label-width="120px" label-position='right'>
      <el-form-item label="StarRocks连接">
        <el-select v-model="form.starRocksId" placeholder="请选择StarRocks连接">
          <el-option
              v-for="starRocks in starRocksConfigData"
              :key="starRocks.dorisId"
              :value="starRocks.dorisId"
              :label="starRocks.dorisAlias"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表名">
        <el-select v-model="form.tableName" placeholder="请选择表名">
          <el-option
              v-for="tableName in starRocksTableNameList"
              :key="tableName"
              :value="tableName"
              :label="tableName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="kafka连接">
        <el-select v-model="form.kafkaId" placeholder="请选择Kafka连接">
          <el-option
              v-for="kafkaConfig in kafkaConfigData"
              :key="kafkaConfig.kafkaId"
              :value="kafkaConfig.kafkaId"
              :label="kafkaConfig.kafkaAlias"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="topic">
        <el-select v-model="form.topicId" placeholder="请选择topic">
          <el-option
              v-for="topicInfo in kafkaTopicData"
              :key="topicInfo.topicId"
              :value="topicInfo.topicId"
              :label="topicInfo.topicName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="驼峰命名">
        <el-switch v-model="form.isCamel"></el-switch>
      </el-form-item>
      <el-form-item label="数值对冲">
        <el-switch v-model="form.isNumericalCover"></el-switch>
      </el-form-item>
      <el-form-item label="默认数值置0">
        <el-switch v-model="form.isNumericalZero"></el-switch>
      </el-form-item>
      <el-form-item label="默认字符置空">
        <el-switch v-model="form.isStringEmpty"></el-switch>
      </el-form-item>
      <el-form-item label="是否覆盖">
        <el-switch v-model="form.isOverWrite"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="initData">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "Kafka2starRocksSchemaConfig",
  watch: {
    form: {
      handler: function (newVal, oldVal) {
        let isStarRocksNeedFetch = false;
        if (!this.isStarRocksInit) {
          isStarRocksNeedFetch = true;
        } else if (newVal.starRocksId !== oldVal.starRocksId) {
          isStarRocksNeedFetch = true;
        }
        if (isStarRocksNeedFetch) {
          if (newVal.starRocksId !== "") {
            this.isStarRocksInit = true;
            this.refreshStarRocksTableNameList();
          }
        }
        let isKafkaNeedFetch = false;
        if (!this.isKafkaInit) {
          isKafkaNeedFetch = true;
        } else if (newVal.kafkaId !== oldVal.kafkaId) {
          isKafkaNeedFetch = true;
        }
        if (isKafkaNeedFetch) {
          if (newVal.kafkaId !== "") {
            this.isKafkaInit = true;
            this.refreshKafkaTopicList();
          }
        }

        this.isInit = true;
      },
      deep: true
    }
  },
  data() {
    return {
      starRocksConfigData: [], // sr 连接数据
      starRocksTableNameList: [], // sr 表名数据
      kafkaConfigData: [], // kafka连接config信息
      kafkaTopicData: [], // kafka topic数据
      isStarRocksInit: false, // 初始化标记
      isKafkaInit: false,
      form: {
        starRocksId: "",  // 连接ID
        tableName: "", // 表名
        kafkaId: "", // kafka连接ID
        topicId: "", // kafkaTopic ID
        isCamel: false,
        isNumericalCover: false,
        isNumericalZero: false,
        isStringEmpty: false,
        isOverWrite: false
      }
    }
  },
  methods: {
    initData() {
      this.starRocksConfigData = [] // sr 连接数据
      this.starRocksTableNameList = []; // sr 表名数据
      this.kafkaConfigData = []; // kafka连接config信息
      this.kafkaTopicData = []; // kafka topic数据
      this.isStarRocksInit = false; // 初始化标记
      this.isKafkaInit = false;
      this.form = {
        starRocksId: "",  // 连接ID
        tableName: "", // 表名
        kafkaId: "", // kafka连接ID
        topicId: "", // kafkaTopic ID
        isCamel: false,
        isNumericalCover: false,
        isNumericalZero: false,
        isStringEmpty: false
      }
    },
    onSubmit() {
      let params = {
        dorisId: this.form.starRocksId,
        isCamel: this.form.isCamel,
        isNumericalCover: this.form.isNumericalCover,
        isNumericalZero: this.form.isNumericalZero,
        isStringEmpty: this.form.isStringEmpty,
        tableName: this.form.tableName,
        topicId: this.form.topicId,
        isOverWrite: this.form.isOverWrite
      };
      api.generateK2DSchema(params).then(
          res => {
            console.log(res);
          }
      );
    },
    fetchAllStarRocksConfigData() {
      this.$store.dispatch("fetAllDorisConfigData").then(
          () => {
            let starRocksConfigList = this.$store.state.dorisConfigList;
            this.starRocksConfigData = starRocksConfigList;
          }
      );
    },
    refreshStarRocksTableNameList() {
      console.log("fetch starRocks tableNames data");
      let params = {
        dorisId: this.form.starRocksId
      };
      api.getStarRocksTableNameList(params)
          .then(res => {
            let data = res.data;
            let tableNameList = []
            for (let tableName of data) {
              tableNameList.push(tableName);
            }
            this.starRocksTableNameList = tableNameList;
          })
    },
    fetchAllKafkaConfigData() {
      api.getAllKafkaConfig()
          .then(res => {
            let kafkaConfigData = [];
            let data = res.data;
            for (let kafkaConfig of data) {
              kafkaConfigData.push(kafkaConfig);
            }
            this.kafkaConfigData = kafkaConfigData;
          })
    },
    refreshKafkaTopicList() {
      console.log("fetch kafka topic data");
      let params = [];
      params.push({
        kafkaId: this.form.kafkaId
      });
      api.getRichTopicInfo(params).then(res => {
        let data = res.data;
        let topicInfoList = [];
        for (let topicInfo of data) {
          topicInfoList.push(topicInfo);
        }
        this.kafkaTopicData = topicInfoList;
      });
    }
  },
  created() {
    this.fetchAllStarRocksConfigData();
    this.fetchAllKafkaConfigData();
  }
}
</script>

<style scoped>

</style>