<template>

	<planet
		:background="'planete1'"
		:firstAnim="'Armes1'"
		:secondAnim="'Armes2'"
		:character="'FirstCharacter'"
		:plot="firstPlanetPlot"
		@playerAnswered="saveAnswer"
		@playerLeft="$store.dispatch('updatingLastVisit', 1)"
	></planet>


</template>

<script>
import Planet from "@/components/Planet";
export default {
	name: "FirstPlanet",
	data() {
		return {};
	},
	components: { Planet },
	computed: {
		firstPlanetPlot() {
			return this.$store.state.plot.firstPlanet;
		}
	},
	methods: {
		saveAnswer(answer) {
			let choice = {
				answer,
				planet: "firstPlanet"
			};
			this.$store.dispatch("addingChoice", choice);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
