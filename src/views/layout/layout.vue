 <template>
  <div class="layout">
    <my-header></my-header>
    <div class="content">
      <my-menu :menuList="menu" :iscollapse="asideFolded" class="my-menu"></my-menu>
      <div class="app-content">
        <div class="breadcrumb-tabsview">
          <bread-crumb></bread-crumb>
        </div>
    	  <div class="app-content-body">
          <router-view></router-view>
    	  </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import MyHeader from 'components/layout/MyHeader'
  import MyMenu from 'components/layout/MyMenu'
  import BreadCrumb from 'components/layout/BreadCrumb'
  import TabsViewsLink from 'components/layout/TabsViewsLink'
  import TabsViews from 'components/layout/TabsViews'
  import adminMenu from 'menus/adminMenu'
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    data() {
      return {

      }
    },
    created() {
      this.getUserMenu();
    },
    computed: {
      ...mapGetters([
        'menuList',
        'asideFolded'
      ]),
      menu () {
        let list = []
        this.menuList.forEach((item) => {
          list.push({
            name: item.name,
            id: item.id,
            path: item.path,
            icon:item.icon,
            noDropdown:false,
            isEnabled:true,
            children:[]
          })
        })
        return list
      }
    },
    methods: {
  		getUserMenu(){
  			this.setMenu(adminMenu);
  		},
  		...mapMutations({
  			'setMenu':'SET_MENU_LIST'
  		}),
    },
    components: {
  		MyHeader,
  		MyMenu,
  		BreadCrumb,
      TabsViewsLink,
  		TabsViews,
    }
  }
</script>

<style lang="less" scoped>
	@import '~assets/styles/variable.less';
  	.layout{
  		height: 100%;
  		padding-top: @header-height;
      box-sizing: border-box;
      .content {
          display: flex;
          height: 100%;
        .my-menu {
          box-sizing: border-box;
          background-color: @my-menu-background;
        }
    		.app-content{
          flex:1;
	        height: 100%;
    			background-color: @bread-crumb-background;
    			overflow-x: hidden;
          padding: 15px 20px 0;
    			.breadcrumb-tabsview{
    			  width: 100%;
            margin: 12px 0;
    			}
    			.app-content-body{
            height: 90%;
    			}
    		}
      }
  	}
</style>
