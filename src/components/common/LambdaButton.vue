<template>
  <el-button
      v-bind="$attrs"
      :loading="loadingString"
      :prompt="prompt"
      :confirm="confirm"
      @click="handleClick"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'LambdaButton',
  props: {
    // 加载
    loading: {
      type: Boolean,
      default: false,
    },
    // 二次确认
    confirm: {
      type: Boolean,
      default: false,
    },
    // 二次确认的属性
    confirmConfig: {
      type: Object,
      default: () => ({}),
    },
    // 提交
    prompt: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadingString: false,
    }
  },
  methods: {
    // 按钮点击事件
    handleClick() {
      if (this.confirm) {
        this.messageConfirm()
        return
      }
      if (this.prompt) {
        this.onPrompt()
        return
      }
      if (this.loading) {
        this.loadingString = true
      }
      this.$emit('click', () => {
        this.loadingString = false
      })
    },
    // 二次确认事件
    messageConfirm() {
      const {
        message = '此操作将永久删除该数据, 是否继续?',
        title = '提示',
        confirmButtonText = '确认',
        cancelButtonText = '取消',
        type = 'warning',
      } = this.confirmConfig

      this.$confirm(message, title, {
        confirmButtonText,
        cancelButtonText,
        type,
      })
          .then(() => {
            this.$emit('confirm')
          })
          .catch(() => {
            this.$emit('cancel')
          })
    },
    // 提交
    onPrompt() {
      const {
        message = '请输入邮箱, 是否继续?',
        title = '提示',
        confirmButtonText = '确认',
        cancelButtonText = '取消',
        inputPattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage = '邮箱格式不正确',
      } = this.confirmConfig
      this.$prompt(message, title, {
        confirmButtonText,
        cancelButtonText,
        inputPattern,
        inputErrorMessage
      })
          .then(({value}) => {
            this.$emit('prompt', value)
          })
          .catch(() => {
            this.$emit('cancel')
          })
    },
  },
}
</script>

<style>
</style>