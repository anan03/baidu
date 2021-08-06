import Vue from 'vue'
import VueRouter from 'vue-router'
import homeList from '../components/HomeList.vue'
import parkingLot from '../components/table/parkingLot.vue'
import deviceLoaction from '../components/table/deviceLoaction.vue'
import roadLocation from '../components/table/roadLocation.vue'
import systemLocation from '../components/table/systemLocation.vue'
import BjjtList from '../components/bjjt/BjjtList.vue'



Vue.use(VueRouter)

const routes = [  
  { path: '/', redirect: '/home' },//首页模版列表
  { path: '/home', component: homeList },//首页模版列表
  { path: '/parkinglot', component: parkingLot },//车位导入模版
  { path: '/device', component: deviceLoaction },//车位导入模版
  { path: '/road', component: roadLocation },//车位导入模版
  { path: '/system', component: systemLocation },//系统导出的模版
  { path: '/bjjt/bjjtlist', component: BjjtList },//北京交通模块
]

const router = new VueRouter({
	routes
})

export default router
