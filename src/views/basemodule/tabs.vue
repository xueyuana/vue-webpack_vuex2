<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
        ref='tabs'
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>

    <ul class="menu" ref="menu_id">
        <li><a href="###">复制</a></li>
        <li><a href="###">粘贴</a></li>
        <li><a href="###">剪切</a></li>
        <li><a href="###">刷新</a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
		  editableTabsValue: '2',
		  editableTabs: [],
		  tabIndex: 1,
		  winWidth:0,
		  winHeight:0
		}
    },
    mounted() {
    	this.windowOnload();
    	this.editableTabs = [{
		    title: 'Tab 1',
		    name: '1',
		    content: 'Tab 1 content'
		  }, {
		    title: 'Tab 2',
		    name: '2',
		    content: 'Tab 2 content'
		  }]
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
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab' + this.tabIndex,
            name: newTabName,
            content: 'New Tab content' + this.tabIndex
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          debugger
          this.testRight();
        }
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
      	let menu = this.$refs.menu_id;
      	event.preventDefault();
      	menu.style.display = 'block';
      	let x, y;
      	x = event.clientX;
      	y = event.clientY;
      	if( x >= (this.winWidth - menu.offsetWidth) ) {
      	    x  = this.winWidth - menu.offsetWidth;
      	} else {
      	    x = x - 40;
      	}
      	if(y > (this.winHeight - menu.offsetHeight)) {
      	    y = this.winHeight - menu.offsetHeight - 70;
      	} else {
      	    y = y - 70;
      	}      
      	menu.style.left = x + 'px';
      	menu.style.top = y + 'px';
      	return false;
      }
    },
    components: {

    }
  }
</script>

<style lang="less">
 	.menu {
 	    width: 80px;
 	    border: 1px solid #ccc;
 	    position: absolute;
 	    box-shadow: 0 0 5px rgba(0,0,0,.2);
 	    padding: 10px 0;
 	    transition: all .1s ease;    
 	    display: none;    
 	    li {
     	    list-style: none;
     	    width: 100%;
     	    a {
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
 	     	}
 	     	&:first-of-type{
		 	    border-radius: 5px 5px 0 0;
		 	}
     	}
 	}
</style>