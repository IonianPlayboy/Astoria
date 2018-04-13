<template>

	<planet
		:background="'planete2'"
		:character="'SecondCharacter'"
		:plot="secondPlanetPlot"
		@playerAnswered="saveAnswer"
	></planet>


</template>

<script>
import Planet from "@/components/Planet";
export default {
	name: "SecondPlanet",
	data() {
		return {};
	},
	components: { Planet },
	computed: {
		secondPlanetPlot() {
			return this.$store.state.plot.secondPlanet;
		}
	},
	methods: {
		saveAnswer(answer) {
			let choice = {
				answer,
				planet: "secondPlanet"
			};
			this.$store.dispatch("addingChoice", choice);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
