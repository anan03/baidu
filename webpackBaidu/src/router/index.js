import Vue from 'vue'
import VueRouter from 'vue-router'
import homeList from '../components/HomeList.vue'
import parkingLot from '../components/table/parkingLot.vue'
import parkingSort from '../components/table/parkingSort.vue'
import deviceLoaction from '../components/table/deviceLoaction.vue'
import roadLocation from '../components/table/roadLocation.vue'
import systemLocation from '../components/table/systemLocation.vue'
import BjjtList from '../components/bjjt/BjjtList.vue'
import rectificationLocation from "../components/table/rectificationLocation.vue"

Vue.use(VueRouter)

const routes = [  
  { path: '/', redirect: '/home' },//首页模版列表
  { path: '/home', component: homeList },//首页模版列表
  { path: '/parkinglot', component: parkingLot },//泊位导入模版
  { path: '/device', component: deviceLoaction },//设备导入模版
  { path: '/road', component: roadLocation },//基础信息模版
  { path: '/system', component: systemLocation },//停车系统车位导出模版，查看坐标
  { path: '/bjjt/bjjtlist', component: BjjtList },//北京交通模块，原型
  { path: '/parkingSort', component: parkingSort },//泊位编号排序纠偏导出
  { path: '/rectificationLocation', component: rectificationLocation },//泊位纠偏导出
]

const router = new VueRouter({
	routes
})

export default router
