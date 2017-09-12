<template>
  <div class="resource-module">
    <div class="menu">
      <div class="inner-create-btn">
        <el-button type="primary" size="small">创建模型</el-button>
      </div>
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
          if(item.name === '资源模型') {
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
<style lang="less">
  @import '~assets/styles/variable.less';
  .resource-module {
    width: 100%;
    height: 100%;
    display: flex;
    .menu {
      min-width: 150px;
      height: 100%;
      margin-right: 10px;
      background-color: @resource-menu-background;
      position: relative;
      .inner-create-btn {
        width: 100%;
        height: 70px;
        line-height: 70px;
        text-align: center;
        position: absolute;
        top:0;
        left: 0;
        z-index: 100;
        background-color: @resource-menu-background;
      }
      .my-menu {
        width: 150px;
        height: 100%;
        padding-top: 70px;
        box-sizing: border-box;
        background-color: @resource-menu-background;
      }
    }
    .content {
      flex: 1;
      min-width: 600px;
      background-color: @resource-menu-background
    }
  }

</style>
