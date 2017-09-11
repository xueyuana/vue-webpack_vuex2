 <template>
  <div class="layout">
    <my-header></my-header>
    <div class="content">
      <my-menu></my-menu>
      <div class="app-content">
        <div class="breadcrumb-tabsview">
          <bread-crumb><span class="fa fa-home"></span></bread-crumb>
          <tabs-views-link></tabs-views-link>
        </div>
    	  <div class="app-content-body">
    		  <tabs-views><router-view></router-view></tabs-views>
    	  </div>
      </div>
    </div>
    <!-- <footer><my-footer></my-footer></footer> -->
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import MyHeader from 'components/layout/MyHeader'
  import MyMenu from 'components/layout/MyMenu'
  // import MyFooter from 'views/layout/footer'
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
        'asideFolded'
      ])
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

<style lang="less">
	@import '~assets/styles/variable.less';
  	.layout{
  		height: 100%;
  		padding-top: @header-height;
      box-sizing: border-box;
      .content {
          display: flex;
          height: 100%;
    		.app-content{
          flex:1;
	        position: relative;
	        height: 100%;
    			background-color: @content-background;
    			overflow-x: hidden;
    			.breadcrumb-tabsview{
    			  position: fixed;
    			  width: 100%;
    			  z-index: 10;
    			  padding: 6px 15px;
    			  background-color: @bread-crumb-background;
    			}
    			.app-content-body{
    			  position: relative;
        	  padding: 15px 15px 60px;
            top: @bread-crumb-height;
    			}
    		}
      }
  	}
</style>
