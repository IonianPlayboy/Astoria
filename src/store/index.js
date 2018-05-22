import Vue from "vue";
import Vuex from "vuex";
import { database } from "@/firebase.config";
import countries from "./countries";
import player from "./player";
import plot from "./plot";
import results from "./ResultsStore";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentScene: "Home",
		countries: {},
		results: {},
		county: {},
		showCredits: false
	},
	getters: {
		countriesList(state) {
			return Object.values(state.countries)
				.reduce((acc, curr) => acc.concat(curr), [])
				.sort((a, b) => a.localeCompare(b));
		},
		regionsList(state) {
			return Object.keys(state.countries).sort((a, b) =>
				a.localeCompare(b)
			);
		},
		results(state) {
			return state.results;
		},
		resultsByRegion(state, getters) {
			return getters.regionsList.map(region => {
				return Object.values(state.results)
					.filter(result => result.from === region)
					.reduce((acc, result) => {
						if (acc[region] === undefined) {
							acc[region] = {
								firstPlanet: 0,
								fourthPlanet: 0,
								secondPlanet: 0,
								thirdPlanet: 0
							};
						}
						Object.keys(acc[region]).map(planet => {
							acc[region][planet] = Object.values(state.results)
								.filter(result => result.from === region)
								.reduce(
									(total, answers, index) => {
										total[0] +=
											answers.choices[planet][0] === "yes"
												? 1
												: 0;
										total[1] +=
											answers.choices[planet][1] === "yes"
												? 1
												: 0;
										return total;
									},
									[0, 0]
								);
							let numberInRegion = Object.values(
								state.results
							).filter(result => result.from === region).length;
							acc[region][planet] = acc[region][planet].map(
								number => {
									return Math.round(
										number * 100 / numberInRegion
									);
								}
							);
						});
						return acc;
					}, {});
			});
		}
	},
	mutations: {
		changeScene(state, newScene) {
			state.currentScene = newScene;
		},
		setCountries(state, countriesList) {
			state.countries = countriesList;
		},
		setResults(state, resultsList) {
			state.results = resultsList;
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
		},
		settingResults({ commit }, resultsList) {
			commit("setResults", resultsList);
		}
	},
	modules: {
		countries,
		player,
		plot
	}
});
