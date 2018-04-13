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
		currentScene: "Home",
		db: database.ref(),
		countries: database.ref("countriesList"),
		results: database.ref("resultsList")
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
		}
	},
	modules: {
		countries,
		player,
		plot
	}
});
