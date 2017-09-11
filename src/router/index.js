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

const buttons = (resolve) => {
  import('views/basemodule/buttons').then((module) => {
    resolve(module)
  })
}

const icons = (resolve) => {
  import('views/basemodule/icons').then((module) => {
    resolve(module)
  })
}

const tabs = (resolve) => {
  import('views/basemodule/tabs').then((module) => {
    resolve(module)
  })
}


const input = (resolve) => {
  import('views/forms/input').then((module) => {
    resolve(module)
  })
}

const select = (resolve) => {
  import('views/forms/select').then((module) => {
    resolve(module)
  })
}

const transfer = (resolve) => {
  import('views/forms/transfer').then((module) => {
    resolve(module)
  })
}

const table = (resolve) => {
  import('views/datas/table').then((module) => {
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
      component: layout
    },
    {
      path: '/overview',
      component: layout,
      children: [{name:'概览', path: '/overview/overview', component: overview,alias:'/overview'}]
    },
    {
      path: '/buttons',
      name:'Button按钮',
      component: layout,
      children: [
          {name:'按钮', path: '/buttons/buttons', component: buttons,alias:'/buttons'},
          {name:'Icon图标', path: '/buttons/icons', component: icons,alias:'/icons'},
          {name:'Tabs页签', path: '/buttons/tabs', component: tabs,alias:'/tabs'}
        ]
    },
    {
      path: '/forms',
      name:'Form组件',
      component: layout,
      children: [
          {name:'Input 输入框', path: '/forms/input', component: input,alias:'/input'},
          {name:'Select 选择框', path: '/forms/select', component: select,alias:'/select'},
          {name:'Transfer 穿梭框', path: '/forms/transfer', component: transfer,alias:'/transfer'}
        ]
    },
    {
      path: '/datas',
      name:'Data',
      component: layout,
      children: [
          {name:'Table 表格', path: '/datas/table', component: table,alias:'/table'}
        ]
    },
    {
      path: '/errors',
      name:'Errors',
      component: layout,
      children: [
          {name:'401错误页', path: '/errors/401', component: err401,alias:'/401'},
          {name:'404错误页', path: '/errors/404', component: err404,alias:'/404'}
        ]
    },
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