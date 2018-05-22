const ResultsStore = {
	data: {
		results: {},
		places: []
	},
	methods: {
		getResults() {
			return ResultsStore.results;
		},
		getPlaces() {
			return ResultsStore.places;
		},
		setPlaces(dbPlaces) {
			ResultsStore.places = dbPlaces;
		},
		setResults(dbResults) {
			ResultsStore.results = dbResults;
		},
		getPlanetResults(planet, question) {
			var pResults = {};
			// for (let i = 0; i < ResultsStore.places.length; i++) {
			// 	pResults[ResultsStore.places[i]] = this.getYesFrom(
			// 		ResultsStore.places[i],
			// 		planet,
			// 		question
			// 	);
			// }
			ResultsStore.places.map(element => {
				pResults[element] = this.getYesFrom(element, planet, question);
			});
			return pResults;
		},
		getYesFrom(from, planet, question) {
			var numYes = 0;
			// for (let d of ResultsStore.results) {
			// 	if (
			// 		d["from"] == from &&
			// 		d["choices"][planet][question] == "yes"
			// 	)
			// 		numYes++;
			// }
			Object.values(ResultsStore).map(element => {
				if (
					element.from === from &&
					element.choices[planet][question] === "yes"
				)
					numYes++;
			});
			return Math.round(numYes * 100 / this.getNumFrom(from));
		},
		getNumFrom(from) {
			var num = 0;
			Object.values(ResultsStore).map(element => {
				if (element.from === from) num++;
			});
			return num;
		}
	}
};

export default ResultsStore;
