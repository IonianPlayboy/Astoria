<template>
  <planet
		:background="'planete4'"
		:backgroundMusic="'ASTORIA_ANIMAL_TrevorSomething_ICameBackForYou_Loopable'"
		:firstAnim="'Animal1'"
		:secondAnim="'Animal2'"
		:articleBackground="'Fond-animal'"
		:character="'FourthCharacter'"
		:plot="thirdPlanetPlot"
		@playerAnswered="saveAnswer"
		@playerLeft="$store.dispatch('updatingLastVisit', 3)"
	></planet>
</template>

<script>
import Planet from "@/components/Planet";
export default {
	name: "FourthPlanet",
	data() {
		return {};
	},
	components: { Planet },
	computed: {
		thirdPlanetPlot() {
			return this.$store.state.plot.fourthPlanet;
		}
	},
	methods: {
		saveAnswer(answer) {
			let choice = {
				answer,
				planet: "thirdPlanet"
			};
			this.$store.dispatch("addingChoice", choice);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
