<template>
  <div>
    <el-tabs v-model="activeName" type="card" value @tab-click="toPath">
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in tabsViews"
        :label="item.name"
        :name="item.path"
        ref='tabs'>
        <keep-alive>
    		<router-view></router-view>
    	</keep-alive>	
      </el-tab-pane>
    </el-tabs>
    
    <ul class="menu" ref="menu_id">
        <li @click="closeSelfTab">关闭当前页签</li>
        <li @click="closeOtherTab">关闭其他页签</li>
        <li @click="closeAllTab">关闭全部页签</li>
    </ul>
  </div>
</template>
<script>
	import {mapGetters, mapMutations} from 'vuex'
  export default {
    data() {
      return {
		  winWidth:0,
		  winHeight:0,
		}
    },
	computed: {
		...mapGetters([
	    	'tabsViews',
	    	'tabActiveName'
	  	]),
	  	activeName:{
	  		get:function(){
	  			return this.tabActiveName;
	  		},
	  		set:function(){
	  			return this.tabActiveName
	  		}
	  	}
	},
    mounted() {
    	this.windowOnload();
		let _self = this;
		this.$nextTick(() => {
			var tabs = document.getElementsByClassName("el-tabs__nav")[0];
			tabs.oncontextmenu = function(event){
				_self.onContextMenuClick(event);
			}
		})
    },
    created(){
    	//获取可视区宽度
    	this.winWidth = document.documentElement.clientWidth || document.body.clientWidth;
    	//获取可视区高度
    	this.winHeight = document.documentElement.clientHeight || document.body.clientHeight;
    },
    methods: {
    	toPath(path){
    		this.$router.push({path:path.name})
    	},
		windowOnload(){
			let menu = this.$refs.menu_id;
			menu.style.display = 'none';
			document.addEventListener('click', function() {
			    menu.style.display = 'none';
			})
			menu.addEventListener('click', function(event) {
			    var event = event || window.event;
			    event.cancelBubble = true;
			})
		},
		onContextMenuClick(event){
			console.log('event',event)
			console.log('event.target',event.target)
			let menu = this.$refs.menu_id;
			event.preventDefault();
			menu.style.display = 'block';
			let x, y;
			x = event.clientX;
			y = event.clientY;
			if( x >= (this.winWidth - menu.offsetWidth) ) {
			    x  = this.winWidth - menu.offsetWidth;
			} else {
			    x = x - 100;
			}
			if(y > (this.winHeight - menu.offsetHeight)) {
			    y = this.winHeight - menu.offsetHeight;
			} else {
			    y = y - 70;
			}      
			menu.style.left = x + 'px';
			menu.style.top = y + 'px';
			return false;
		},
		hideMenu(){
			let menu = this.$refs.menu_id;
			menu.style.display = 'none';
		},
		closeSelfTab(type){
			this.hideMenu();
			console.log('关闭当前页签执行---->',type)
		},
		closeOtherTab(type){
			this.hideMenu();
			console.log('关闭其他页签执行---->',type)
		},
		closeAllTab(type){
			this.hideMenu();
			console.log('关闭全部页签执行---->',type)
		},
    },
    components: {

    }
  }
</script>

<style lang="less">
	@import '~assets/styles/variable.less';
 	.menu {
 	    width: 150px;
 	    border: 1px solid #ccc;
 	    position: absolute;
 	    box-shadow: 0 0 5px rgba(0,0,0,.2);
 	    padding: 10px 0;
 	    transition: all .1s ease;
 	    background-color: @content-background;
 	    li {
     	    list-style: none;
     	    width: 100%;
     	    display: inline-block;
     	    text-decoration: none;
     	    color: #555;
     	    width: 100%;
     	    padding: 10px 0;
     	    text-align: center;
     	    &:hover,&:active{
     	    	background: #eee;
     	    	color: #0AAF88;
     	    }
 	     	&:first-of-type{
		 	    border-radius: 5px 5px 0 0;
		 	}
     	}
 	}
</style>