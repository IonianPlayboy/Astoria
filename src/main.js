import Vue from "vue";
import App from "./App.vue";
import store from "./store/";
import Vuebar from "vuebar";

Vue.mixin({
	methods: {
		assetPath(folder, asset, format = "png") {
			return require(`@/assets/${folder}/${asset}.${format}`);
		}
	}
});

Vue.use(Vuebar);

Vue.config.productionTip = false;
Vue.config.performance = true;

new Vue({
	store,
	render: h => h(App)
}).$mount("#app");
