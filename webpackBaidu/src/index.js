import Vue from 'vue'
import App from './components/App.vue'
import router from './router/index.js'

import './plugins/Element.js'
// import './plugins/xlsx.core.min.js'
// import './plugins/baidu.js'

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
