<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view" v-for="tag in Array.from(tabsViewsLinks)" :to="tag.path" :key="tag.path">
      <el-tag :closable="true" type="primary" @close='closeViewTabs(tag,$event)'>
        {{tag.name}}
      </el-tag>
    </router-link>
    </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        
      }
    },
    computed: {
      tabsViewsLinks:function(){
        return this.tabsViews.slice(-6)
      },
      ...mapGetters([
        'tabsViews'
      ])
    },
    created(){
     
    },
    methods: {
      test(){

      },
      closeViewTabs(view, $event) {
        this.$store.dispatch('delTabsViews', view)
        $event.preventDefault()
      }
    }
  }
</script>

<style lang="less">
  .tabs-view-container{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    .tabs-view{
      margin-left: 10px;
    }
  }
</style>