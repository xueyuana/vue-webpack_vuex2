<template>
	<div class="app-header" :class="{'header-fold':asideFolded}">
		<div class="header-left">
			<span class="fa fa-html5"></span>
			<span v-show="!asideFolded" v-text="appName"></span>
		</div>
		<div class="header-right">
			<div class="left">
				<dl @click="_setAsideFolded">
					<dd><span class="fa" :class="{'fa-outdent':!asideFolded,'fa-indent':asideFolded}"></span></dd>
				</dl>
			</div>
			<div class="right">
				<dl>
					<dd><span>当前用户:</span><span v-text="userInfo.accName"></span></dd>
					<dd class="icon-bell"><span class="fa fa-bell"></span></dd>
					<dd>修改密码</dd>
					<dd @click="signOut">
						<span class="fa fa-sign-out"></span>
						<span>退出</span>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<script>
	import Cookies from 'js-cookie'
	import {mapGetters,mapMutations} from 'vuex'
	import * as utils from 'utils/comm'
	export default {
		data() {
			return {
				appName:'',
				userInfo:{
					accName:Cookies.get('accName')
				}
			}
		},
		created(){
			this.appName = utils.appName;
		},
    computed: {
      ...mapGetters([
        'asideFolded'
      ])
    },
		methods: {
			_setAsideFolded(){
				let tempAsideFolded = false;
				if(Cookies.get('asideFolded') === undefined){
					tempAsideFolded = false;
				}else if(Cookies.get('asideFolded') === 'true'){
					tempAsideFolded = false;
				}else if(Cookies.get('asideFolded') === 'false'){
					tempAsideFolded = true;
				}
				Cookies.set('asideFolded',tempAsideFolded);
				this.setAsideFolded(tempAsideFolded);
			},
			...mapMutations({
				'setAsideFolded':'ASIDE_FOLDED'
			}),
			signOut(){
				Cookies.remove('accName')
				this.$router.push({path: '/'})
			}
		},
		components: {

		},
		watch:{
			asideFolded:function(newVal,oldVal){
				console.log('asideFolded',this.asideFolded)
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import '~assets/styles/variable.less';
	.app-header{
    position: fixed;
    top: 0;
		display: flex;
		width: 100%;
		background-color: @header-right-background;
		height: @header-height;
		line-height: @header-height;
    box-shadow:  0px 0px 15px rgb(28, 56, 94);
		.header-left{
			flex:0 0 @flex-width;
			color:@header-text-color;
			text-align: center;
			cursor: pointer;
		}
		.header-right{
			flex:1;
			padding: 0 15px;
			color:@header-text-color;
			height: 100%;
			display: flex;
			.left,.right{
				flex:1;
			}
			.left{
				dl{
					dd{
						display: inline-block;
						cursor: pointer;
					}
				}
			}
			.right{
				text-align: right;
				dl{
					dd{
						display: inline-block;
						cursor: pointer;
						padding: 0 15px;
					}
				}
			}

		}
	}
</style>
