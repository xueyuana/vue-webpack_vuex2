<template>
  <div>
    <ve-line :data="chartData" tooltip-visible legend-visible></ve-line>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuList:[]
      }
    },
    created() {
      this.chartData = {
        columns: ['日期', '销售额'],
        rows: [
          { '日期': '1月1日', '销售额': 123 },
          { '日期': '1月2日', '销售额': 1223 },
          { '日期': '1月3日', '销售额': 2123 },
          { '日期': '1月4日', '销售额': 4123 },
          { '日期': '1月5日', '销售额': 3123 },
          { '日期': '1月6日', '销售额': 7123 }
        ]
      }
    },
    computed: {

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {

    }
  }
</script>

<style lang="less">
  
</style>