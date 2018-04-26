<template>

	<planet
		:background="'planete2'"
		:backgroundMusic="'ASTORIA_PATRIMOINE_TrevorSomething_CloudOfThoughts_Loopable'"
		:firstAnim="'Patrimoine1'"
		:secondAnim="'Patrimoine2'"
		:articleBackground="'Fond-patrimoine'"
		:character="'SecondCharacter'"
		:plot="secondPlanetPlot"
		@playerAnswered="saveAnswer"
		@playerLeft="$store.dispatch('updatingLastVisit', 2)"
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
