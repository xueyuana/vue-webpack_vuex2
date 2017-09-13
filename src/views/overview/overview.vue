<template>
  <div class="overview">
    <div class="chart" ref="chart" oncontextmenu="return false">

    </div>

    <ul class="menu" id="menu">
      <li><a href="javascript:void(0)" @click="onEdit">编辑</a></li>
      <li><a href="javascript:void(0)" @click="onDelete">删除</a></li>
    </ul>

    <my-dialog :visible.sync="visible"></my-dialog>
  </div>
</template>
<script>
  // 引入 ECharts 主模块
  let echarts = require('echarts/lib/echarts');
  // 引入关系图
  require('echarts/lib/chart/graph');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  import MyDialog from 'components/dialog/dialog.vue'

  export default {
    data() {
      return {
        menuList: [],
        chartData: [
          {
            name: '北京',
            children: [{
              name: '顺义'
            }, {
              name: '通州'
            }, {
              name: '朝阳'
            }, {
              name: '昌平'
            }, {
              name: '海淀'
            }, {
              name: '丰台'
            }, {
              name: '石景山'
            }, {
              name: '11'
            }, {
              name: '22'
            }]
          }, {
            name: '哈哈',
            children: [{
              name: '顺义'
            }, {
              name: '通州'
            }, {
              name: '海淀'
            }, {
              name: '丰台'
            }, {
              name: '石景山'
            }]
          }, {
            name: '嘻嘻',
            children: [{
              name: '11'
            }, {
              name: '22'
            }, {
              name: '33'
            }, {
              name: '4'
            }, {
              name: '石景山'
            }]
          }, {
            name: '呵呵',
            children: [{
              name: '25'
            }, {
              name: '1'
            }, {
              name: '2'
            }, {
              name: '3'
            }, {
              name: '4'
            }]
          }, {
            name: '呵呵2',
            children: [{
              name: '5'
            }, {
              name: '2'
            }, {
              name: '6'
            }, {
              name: '1'
            }, {
              name: '8'
            }]
          }, {
            name: '呵呵3',
            children: [{
              name: '9'
            }, {
              name: '2'
            }, {
              name: '4'
            }, {
              name: '10'
            }, {
              name: '11'
            }]
          }, {
            name: '呵呵4',
            children: [{
              name: '33'
            }, {
              name: '2'
            }, {
              name: '13'
            }, {
              name: '15'
            }, {
              name: '18'
            }]
          }, {
            name: '呵呵5',
            children: [{
              name: 'a'
            }, {
              name: 'b'
            }, {
              name: 'c'
            }, {
              name: 'd'
            }, {
              name: '说的'
            }]
          }, {
            name: '呵呵6',
            children: [{
              name: 'q'
            }, {
              name: '2'
            }, {
              name: 'w'
            }, {
              name: 'e'
            }, {
              name: 'r'
            }]
          }, {
            name: '呵呵7',
            children: [{
              name: 't'
            }, {
              name: '2'
            }, {
              name: 'y'
            }, {
              name: 'u'
            }, {
              name: 'u'
            }]
          }, {
            name: '呵呵8',
            children: [{
              name: 'a'
            }, {
              name: 's'
            }, {
              name: 'd'
            }, {
              name: 'f'
            }, {
              name: 'g'
            }]
          }
        ],
        link: [],
        visible: false
      }
    },
    created() {

    },
    mounted() {
      let lineColorNor = '#000';
      let lineColorEmp = '#fff';

      let myChart = echarts.init(this.$refs.chart)
      this.handleChartData();
      let option = {
        title: {
          text: "测试",
          subtext: "哈哈哈哈"
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        toolbox: {
          feature: {
            magicType: {
              type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        series: [{
          type: "graph",
          layout: "none",
          symbol: "rect",
          symbolSize: [50, 25],
          nodeScaleRatio: 1,
          focusNodeAdjacency: true,
          roam: 'scale',
          label: {
            normal: {
              show: true
            }
          },

          data: this.chartData,
          links: this.link,
          lineStyle: {
            normal: {
              color: lineColorNor,
              opacity: 0.5,
              width: 0.5,
              curveness: 0.2
            },
            emphasis: {
              color: lineColorEmp,
              width: 1,
              opacity: 0.9
            }
          }
        }]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }

      //获取可视区宽度
      let winWidth = function() {
        return document.documentElement.clientWidth || document.body.clientWidth;
      }
      //获取可视区高度
      let winHeight = function() {
        return document.documentElement.clientHeight || document.body.clientHeight;
      }
      let parentOffsetLeft = document.getElementsByClassName('overview')[0].offsetLeft;
      let parentOffsetTop = document.getElementsByClassName('overview')[0].offsetTop;
      let menu = document.getElementById('menu');
      menu.style.display = 'none';

      document.addEventListener('click', function() {
        menu.style.display = 'none';
        menu.style.left = 0;
        menu.style.top = 0;
      })

      myChart.on('mousedown', function (params) {
        if (params.event.event.which === 3) {

          let event = params.event.event;
          menu.style.display = 'block';
          let l, t;
          l = event.clientX;
          t = event.clientY;
          if( l >= (winWidth() - menu.offsetWidth) ) {
            l  = winWidth() - menu.offsetWidth;
          } else {
            l = l
          }
          if(t > winHeight() - menu.offsetHeight  ) {
            t = winHeight() - menu.offsetHeight;
          } else {
            t = t;
          }
          menu.style.left = l - parentOffsetLeft + 2 + 'px';
          menu.style.top = t - parentOffsetTop + 2 + 'px';
        }
      })

    },
    computed: {},
    methods: {
      handleChartData() {
        let itemCenterColorNor = '#0083ce';
        let itemCenterColorEmp = '#66dc6b';
        let itemCircleColorNor = '#fff';
        let itemCircleColorEmp = '#fff';
        let labelColorNor = '#fff';
        let labelColorEmp = '#66dc6b';

        let allChildren = [];
        let r = this.chartData.length;

        // 梳理节点关系
        this.chartData.forEach((item, index) => {
          item.children.forEach(chil => {
            this.link.push({
              source: item.name,
              target: chil.name
            })
          })
          item.x = 0;
          item.y =  r / (r + 1) * (index + 1) - r / 2;
          item.symbolSize = [150, 25]
          item.itemStyle = {
            normal: {
              color: itemCenterColorNor
            },
            emphasis: {
              color: itemCenterColorEmp
            }
          }
          allChildren = allChildren.concat(item.children);
        })

        // 节点去重
        let allName = [];
        let unrepeatChildren = [];
        allChildren.forEach(item => {
          if (!allName.includes(item.name)) {
            allName.push(item.name);
            unrepeatChildren.push(item)
          }
        })

        // 外圈节点位置计算
        unrepeatChildren.sort((a, b) => {
          return Math.random() - 0.5
        })
        unrepeatChildren.forEach(item => {
          item.symbol = 'circle'
          item.symbolSize = [15, 15]
          item.itemStyle = {
            normal: {
              color: itemCircleColorNor,
              borderColor: '#000',
              borderWidth: 2
            },
            emphasis: {
              color: itemCircleColorEmp,
              borderColor: '#1e96c4',
              borderWidth: 3
            }
          };
          item.label = {
            normal: {
              color: labelColorNor,
              fontSize: 14
            },
            emphasis: {
              color: labelColorEmp
            }
          }
        })

        let len = Math.floor(unrepeatChildren.length / 2)
        let chilLeft = unrepeatChildren.slice(0, len)
        let chilRight = unrepeatChildren.slice(len)
        let rightName = chilRight.map(item => {
          return item.name
        })

        this.link.forEach((item, index) => {
          if (rightName.includes(item.target)) {
            let temp = item.source
            item.source = item.target
            item.target = temp
          }
        })

        chilLeft.forEach((item, index) => {
          let s = (Math.PI * 2 / 3) / (chilLeft.length + 1) * (index + 1) + (Math.PI * 2 / 3);
          item.x = Math.cos(s) * (r / 2);
          item.y = Math.sin(s) * (r / 2);

          item.label.normal.position = 'left'
        })

        chilRight.forEach((item, index) => {
          let s = (Math.PI * 2 / 3) / (chilRight.length + 1) * (index + 1) - (Math.PI * 1 / 3);
          item.x = Math.cos(s) * (r / 2);
          item.y = Math.sin(s) * (r / 2);

          item.label.normal.position = 'right'
        })

        this.chartData = this.chartData.concat(chilLeft, chilRight);
      },
      onEdit () {
        console.log('edit')
        this.visible = true
      },
      onDelete () {
        console.log('delete')
      }
    },
    components: {
      MyDialog
    }
  }
</script>

<style lang="less" scoped>
  .overview {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .chart {
    width: 800px;
    height: 780px;
    margin: 0 auto;
  }

  .menu {
    width: 100px;
    border: 1px solid #ccc;
    position: absolute;
    box-shadow: 0 0 5px rgba(0,0,0,.2);
    padding: 10px 0;
    background-color: #fff;
  }
  .menu li {
    list-style: none;
    width: 100%;
  }
  .menu li a {
    display: inline-block;
    text-decoration: none;
    color: #555;
    width: 100%;
    padding: 10px 0;
    text-align: center;
  }
  .menu li:first-of-type{
    border-radius: 5px 5px 0 0;
  }
  .menu li a:hover,
  .menu li a:active {
    background: #eee;
    color: #0AAF88;
  }
</style>
