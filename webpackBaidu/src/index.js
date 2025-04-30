import Vue from "vue";
import App from "./components/App.vue";
import router from "./router/index.js";
import "./plugins/Element.js";
import "amfe-flexible";

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
