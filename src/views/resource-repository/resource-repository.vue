<template>
  <div class="resource-repository resource">
    <div class="menu">
      <my-menu class="my-menu" :menuList="menu" smallMenu="true"></my-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import MyMenu from '../../components/layout/MyMenu.vue'
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'menuList'
      ]),
      menu () {
        let list = []
        this.menuList.forEach((item,index) => {
          if(item.name === '资源仓库') {
            list = item.children
          }
        })
        return list
      }
    },
    components: {
      MyMenu
    }
  }
</script>
<style lang="less" scoped>
  @import '~assets/styles/variable.less';
</style>
