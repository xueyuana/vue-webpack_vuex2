<template>
  <div class="breadcrumb">
    <span v-for="(m, index) in breadCrumbList">
      <a class="breadcrumb-z" href="javascript:void(0)" v-if="(breadCrumbList.length - 1) !== index">{{m.name}} </a>
      <span v-else class="breadcrumb-c">{{m.name}}</span>
      <span v-if="(breadCrumbList.length - 1) !== index" style="color:#6ac5fe;">&nbsp;&nbsp;>&nbsp;&nbsp;</span>
    </span>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'breadCrumbList'
      ])
    },
    mounted() {

    },
    methods: {
      breadcrumbEvent(m, index){
        if(index === 0) return;
        let _self = this;
        _self.breadCrumbList.splice(index + 1,_self.breadCrumbList.length + 1 - index);
      }
    },
    components: {
    },
    watch:{

    }
  }
</script>

<style lang="less">
  @import '~assets/styles/variable.less';
  .breadcrumb{
    display: inline-block;
    padding: 3px 0;
    .breadcrumb-z{
      color: #6ac5fe;
      font-size: 13px;
      font-weight: 700;
    }
    .breadcrumb-c{
      font-size: 16px;
      color: #fff;
      font-weight: 700;
    }
  }
</style>
