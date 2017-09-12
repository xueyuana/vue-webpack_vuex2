const adminMenu= [
	{name: "概览", id: '1', path: "/overview",icon:'fa-dashboard',noDropdown:false,isEnabled:true, children:[]},
  {name: "资源模型", id: '2', path: "/resource-module",icon:'fa-th-large',noDropdown:false,isEnabled:true, children:[
    {name: "基础设施层", id: '21', path: "/module/21",icon:'fa-dashboard',noDropdown:false,isEnabled:true, children:[]},
    {name: "服务层", id: '22', path: "/module/22",icon:'fa-dashboard',noDropdown:true,isEnabled:true, children:[
      {name: "负载均衡", id: '221', path: "/module/221",icon:'fa-dashboard',noDropdown:false,isEnabled:true, children:[]},
    ]}
  ]},
  {name: "资源仓库", id: '3', path: "/resource-repository",icon:'fa-dashboard',noDropdown:false,isEnabled:true, children:[
    {name: "应用层", id: '31', path: "/repository/31",icon:'fa-dashboard',noDropdown:false,isEnabled:true, children:[]},
    {name: "业务层", id: '32', path: "/repository/32",icon:'fa-dashboard',noDropdown:true,isEnabled:true, children:[
      {name: "产品线", id: '321', path: "/repository/321",icon:'fa-dashboard',noDropdown:false,isEnabled:true, children:[]}
    ]}
  ]},

]
export default adminMenu
