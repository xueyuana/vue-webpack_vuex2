import Cookies from 'js-cookie'
import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import adminMenu from 'menus/adminMenu'
import * as utils from 'utils/comm'

Vue.use(Router)

// window.onbeforeunload = onbeforeunload_handler;
//    function onbeforeunload_handler(){
//        var warning="确认退出1111111?";
//        console.log(11111111111111111)
//        return warning;
// }

const err401 = (resolve) => {
  import('components/errorpages/401').then((module) => {
    resolve(module)
  })
}

const err404 = (resolve) => {
  import('components/errorpages/404').then((module) => {
    resolve(module)
  })
}

const login = (resolve) => {
  import('views/login/login').then((module) => {
    resolve(module)
  })
}

const layout = (resolve) => {
  import('views/layout/layout').then((module) => {
    resolve(module)
  })
}

const overview = (resolve) => {
  import('views/overview/overview').then((module) => {
    resolve(module)
  })
}


const resourceModule = (resolve) => {
  import('views/resource-module/resource-module').then((module) => {
    resolve(module)
  })
}

const resourceResponse = (resolve) => {
  import('views/resource-repository/resource-repository').then((module) => {
    resolve(module)
  })
}
const base = (resolve) => {
  import('views/resource-module/views/base').then((module) => {
    resolve(module)
  })
}
const repository = (resolve) => {
  import('views/resource-repository/views/repository').then((module) => {
    resolve(module)
  })
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name:'登录',
      component: login
    },
    {
      path: '/layout',
      name:'布局',
      component: layout,
      children: [
        {name: '概览',path: '', component: overview,alias: '/overview'},
        {name: '资源模型',path: 'resource-module',component: resourceModule, alias: '/resource-module',
          children: [
          {name: '基础设施层',path: '/module/:id', component: base},
          ]
        },
        {name: '资源仓库',path: 'resource-repository',component: resourceResponse, alias: '/resource-repository',
          children: [
            {name: '基础设施层',path: '/repository/:id', component: repository},
          ]
        }
      ]
    },
    {
      path: '/404',
      name:'404',
      component: err404
    },
    {
      path: '/401',
      name:'401',
      component: err401
    },
    {
      path: '*',
      name: '404',
      component: err404
    }
  ]
})


router.beforeEach((to, from, next) => {
  let breadCrumbArray = [], bcObj = new Object();
  let bcLists = utils.checkMenuToBreadCrumb(adminMenu,to.path,breadCrumbArray,bcObj);
  store.commit('SET_BREADCRUMB_LIST', bcLists.breadCrumbList);
  let checkMenu = bcLists.breadCrumbList.slice(bcLists.breadCrumbList.length-1,bcLists.breadCrumbList.length)[0];

  if(checkMenu !== undefined){
    store.commit('ADD_TABS_VIEWS',checkMenu);
    store.commit('TAB_ACTIVE_NAME',checkMenu.path)
  }else{
    store.commit('TABS_VIEWS',[]);
    store.commit('TAB_ACTIVE_NAME','')
  }
  let role = localStorage.getItem('role');
  let urole = to.meta && to.meta.role;
  if(role && role === urole || to.path === '/login' || !urole){
    next()
  }else{
    alert("没有权限")
    next(false)
  }
})

export default router
