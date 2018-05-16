const state = {
	name: "Ulysses",
	from: "",
	choices: {
		firstPlanet: [],
		secondPlanet: [],
		thirdPlanet: [],
		fourthPlanet: []
	},
	lastVisit: 0,
	currentPosition: {
		left: "5%",
		top: "110%"
	}
};
const getters = {};
const mutations = {
	setPlayerName(state, newName) {
		state.name = newName;
	},
	setPlayerOrigin(state, newOrigin) {
		state.from = newOrigin;
	},
	addChoice(state, newChoice) {
		state.choices[newChoice.planet].push(newChoice.answer);
	},
	updateLastVisit(state, lastVisit) {
		state.lastVisit = lastVisit;
	},
	movingRocket(state, newPosition) {
		state.currentPosition = newPosition;
	}
};
const actions = {
	settingPlayerName({ commit }, newName) {
		commit("setPlayerName", newName);
	},
	settingPlayerOrigin({ commit }, newOrigin) {
		commit("setPlayerOrigin", newOrigin);
	},
	addingChoice({ commit }, newChoice) {
		commit("addChoice", newChoice);
	},
	updatingLastVisit({ commit }, lastVisit) {
		commit("updateLastVisit", lastVisit);
	},
	movingRocket({ commit }, newPosition) {
		commit("movingRocket", newPosition);
	}
};
const modules = {};

export default {
	state,
	getters,
	mutations,
	actions,
	modules
};
