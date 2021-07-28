import Vue from 'vue'
import VueRouter from 'vue-router'
import homeList from '../components/HomeList.vue'
import parkingLot from '../components/parkingLot.vue'

Vue.use(VueRouter)

const routes = [  
  { path: '/', redirect: '/parkinglot' },
  { path: '/home', component: homeList },
  { path: '/parkinglot', component: parkingLot }
]

const router = new VueRouter({
	routes
})

export default router
