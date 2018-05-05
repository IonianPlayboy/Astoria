import Vue from "vue";
import Vuex from "vuex";
import { database } from "@/firebase.config";
import countries from "./countries";
import player from "./player";
import plot from "./plot";

Vue.use(Vuex);

// let yolo;
// function getCountries() {
// 	yolo = database.ref("countriesList");
// }

// async function oui() {
// 	await getCountries();
// 	console.log(yolo);
// }

// oui();

export default new Vuex.Store({
	state: {
		currentScene: "End",
		countries: database.ref("countriesList"),
		results: database.ref("resultsList"),
		showCredits: false
	},
	getters: {
		countriesList(state) {
			return Object.values(state.countries.countriesList)
				.reduce((acc, curr) => acc.concat(curr), [])
				.sort((a, b) => a.localeCompare(b));
		},
		countries(state) {
			return state.countries.countriesList;
		}
	},
	mutations: {
		changeScene(state, newScene) {
			state.currentScene = newScene;
		},
		setCountries(state, countriesList) {
			console.log(countriesList);
			state.countries = countriesList;
		},
		toggleCredits(state, shouldShow) {
			state.showCredits = shouldShow;
		}
	},
	actions: {
		changingScene({ commit }, newScene) {
			if (!Number.isInteger(newScene)) commit("changeScene", newScene);
			else {
				let planetList = [
					"FirstPlanet",
					"SecondPlanet",
					"ThirdPlanet",
					"FourthPlanet"
				];
				commit("changeScene", planetList[newScene - 1]);
			}
		},
		settingCountries({ commit }, countriesList) {
			commit("setCountries", countriesList);
		}
	},
	modules: {
		countries,
		player,
		plot
	}
});
