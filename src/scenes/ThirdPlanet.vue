<template>
  <planet
		:background="'planete3'"
		:surveyDisp="'survey'"
		:backgroundMusic="'ASTORIA_ROBOT_Lorn_Unraveled_Loopable'"
		:firstAnim="'Robot1'"
		:secondAnim="'Robot2'"
		:articleBackground="'Robot-fond'"
		:character="'ThirdCharacter'"
		:plot="thirdPlanetPlot"
		@playerAnswered="saveAnswer"
		@playerLeft="$store.dispatch('updatingLastVisit', 3)"
	></planet>
</template>

<script>
import Planet from "@/components/Planet";
export default {
	name: "ThirdPlanet",
	data() {
		return {};
	},
	components: { Planet },
	computed: {
		thirdPlanetPlot() {
			return this.$store.state.plot.thirdPlanet;
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
