import Cookies from 'js-cookie'

const state = {
	asideFolded:!Boolean(Cookies.get('asideFolded')),
	menuActive:'',
	menuOpenNameList:[],
	menuList:[],
	breadCrumbList:[{name:'概览',path:'/overview'}],
	loadingFlag: false,
	isFirstLogin:true,
	isFirstUse:true,
	companyInfo:{},
  	accountPassword:{},
  	tabsViews:[],
  	tabActiveName:'',
}

export default state
