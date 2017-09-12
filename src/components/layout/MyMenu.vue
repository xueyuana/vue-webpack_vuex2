<template>
   <el-menu class="my-menu" :class="{'small-menu': smallMenu}" router :collapse="iscollapse" :default-active="$route.path"  :unique-opened="true" @select="handleSelect" @open="handleOpen" @close="handleClose" theme="dark">
     <template v-for="(item,mIndex) in menuList">
       <el-menu-item v-if="!item.noDropdown && item.children.length === 0" :index="item.path">
         <i class="fa" :class="item.icon"></i>
         <span slot="title" v-text="item.name"></span>
       </el-menu-item>
       <el-submenu class="my-submenu" :index="item.id" v-if="item.noDropdown">
         <template slot="title">
           <i class="fa" :class="item.icon"></i>
           <span slot="title" v-text="item.name"></span>
         </template>
         <template v-for="(c,cIndex) in item.children">
           <el-menu-item v-if="c.children.length === 0 && c.isEnabled" :index="c.path" v-text="c.name"></el-menu-item>
           <el-submenu v-if="c.children.length>0" :index="c.id">
             <template slot="title">
               <span slot="title" v-text="c.name"></span>
             </template>
             <el-menu-item v-for="(t,tIndex) in c.children" v-if="t.isEnabled" :key="tIndex" :index="t.path">
               <span slot="title" v-text="t.name"></span>
             </el-menu-item>
           </el-submenu>
         </template>
       </el-submenu>
     </template>
   </el-menu>
</template>
<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    props: {
      menuList: {
        required: true
      },
      iscollapse: {},
      smallMenu: {
        default: false
      }
    },
    data() {
      return {

      }
    },
    computed: {
    },
    created() {

    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleSelect(key,keyPath){

      }
    },
    components: {},
    mounted() {},
    watch: {

    }
  }
</script>

<style lang="less">
  @import '~assets/styles/variable.less';
  .my-menu:not(.el-menu--collapse) {
    width: @flex-width;
  }
  .my-menu::-webkit-scrollbar {
    display: none;
  }

  .el-menu--dark .el-submenu .el-menu {
    background-color: @submenu-menu-background;
  }
  .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
    color: #fff;
  }
  .el-menu-item.is-active {
    color: @font-active-color;
  }
  .el-menu-item, .el-submenu__title {
    font-weight: 700;
  }
  .my-menu {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 0;
  }

  .small-menu {
    .el-menu-item, .el-submenu__title {
      height: 44px;
      line-height: 44px;
      font-size: 12px;
    }
    .el-submenu__icon-arrow {
      margin-top: -4px;
    }
  }

  .fa {
    margin-right: 8px;
  }
</style>
