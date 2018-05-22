<template>
	<div>
		<div class="leftPart">
			<img :class="{'title': planet !== 'thirdPlanet', 'title3' : planet === 'thirdPlanet'}" :src="assetPath('Surveys', planet+'/Titre')" alt="Planet name" v-if="isUniverse">
			<img class="question" :src="assetPath('Surveys', planet+'/Question'+(question+1))" alt="Question" v-if="isUniverse">
			<img class="barH" :src="assetPath('Surveys', 'barreHorizontale')" v-if="isUniverse">
			<button class="nextBtn" @click="nextQuestion()" v-if="isUniverse && question !== 1">
				<img :src="assetPath('Surveys', nQuestion)" alt="Read the article">
			</button>
			<button class="nextBtn" @click="viewArticle()" v-else-if="isUniverse && question === 1">
				<img :src="assetPath('Surveys', 'Read the article')" alt="Read the article">
			</button>
		</div>
		<transition  name="fading">
			<div  v-if="imgLoaded" class="topRightPart">
			<div  :id="region" v-for="(region, index) in regions" :key="region"  @mouseover="changeText(region)" :style="regionsPosition[index]">
				{{result.find(res => Object.keys(res)[0] === region)[region][planet][question]}}%<br/>{{(100 - result.find(res => Object.keys(res)[0] === region)[region][planet][question])}}%
			</div>
		</div>
		</transition>

		<div class="botRightPart" v-if="isUniverse" :style="bottomPos">
			<div class= "desc">
				<h6><strong>{{playerName}}</strong></h6>
				<p>
					In {{currentContinent}}, {{result.find(res => Object.keys(res)[0] === currentContinent)[currentContinent][planet][question]}}% of the population would agree but {{(100 - result.find(res => Object.keys(res)[0] === currentContinent)[currentContinent][planet][question])}}% would not!
				</p>
			</div>
   	 </div>
		<transition name="fading">
		<div v-if="!isUniverse && imgLoaded" class="questions">
			<nav>
				<button :class="{'active' : question === 0}" @click="question = 0">{{questions[0]}}</button>
				<button :class="{'active' : question === 1}" @click="question = 1">{{questions[1]}}</button>
			</nav>
		</div>
		</transition>
  </div>
</template>

<script>
function getObjectFitSize(
	contains /* true = contain, false = cover */,
	containerWidth,
	containerHeight,
	width,
	height
) {
	var doRatio = width / height;
	var cRatio = containerWidth / containerHeight;
	var targetWidth = 0;
	var targetHeight = 0;
	var test = contains ? doRatio > cRatio : doRatio < cRatio;

	if (test) {
		targetWidth = containerWidth;
		targetHeight = targetWidth / doRatio;
	} else {
		targetHeight = containerHeight;
		targetWidth = targetHeight * doRatio;
	}

	return {
		width: targetWidth,
		height: targetHeight,
		x: (containerWidth - targetWidth) / 2,
		y: (containerHeight - targetHeight) / 2
	};
}

import ResultsStore from "../../store/ResultsStore";
import PlayerStore from "../../store/player";
export default {
	name: "survey",
	data() {
		return {
			question: 0,
			nQuestion: "NextQuestion",
			playerName: "ULYSSE",
			currentContinent: "Europe",
			datas: {},
			regionsPosition: [],
			bottomPos: {},
			imgLoaded: false
		};
	},
	computed: {
		regions() {
			return this.$store.getters.regionsList;
		},
		questions() {
			return this.$store.state.plot[this.planet].choices;
		},
		result() {
			return this.$store.getters.resultsByRegion;
		}
	},
	watch: {
		question(newValue) {
			if (this.isUniverse) return;
			this.datas = ResultsStore.methods.getPlanetResults(
				this.planet,
				this.question
			);
		},
		planet(newValue) {
			if (this.isUniverse) return;
			this.datas = ResultsStore.methods.getPlanetResults(
				this.planet,
				this.question
			);
		}
	},
	methods: {
		nextQuestion() {
			this.question++;
			this.nQuestion = "Read the article";
			this.datas = ResultsStore.methods.getPlanetResults(
				this.planet,
				this.question
			);
		},
		viewArticle() {
			this.$emit("viewArticle");
		},
		changeText(newContinent) {
			this.currentContinent = newContinent;
		},
		updateRegionsPosition() {
			if (this.results === undefined)
				setTimeout(() => {
					this.updateRegionsPosition();
				}, 500);
			else {
				let ratio = getObjectFitSize(
					!this.isUniverse,
					this.results.clientWidth,
					this.results.clientHeight,
					this.isUniverse ? 1920 : 1304,
					this.isUniverse ? 1080 : 695
				);
				let width = 55;
				let height = 60;
				let bottomPos = {
					x: 1348,
					y: 782
				};
				let regionsDims;
				if (this.isUniverse) {
					regionsDims = [
						{
							x: 1690,
							y: 363
						},
						{
							x: 1155,
							y: 109
						},
						{
							x: 1380,
							y: 464
						},
						{
							x: 1044,
							y: 295
						},
						{
							x: 721,
							y: 455
						},
						{
							x: 1590,
							y: 70
						},
						{
							x: 1765,
							y: 474
						},
						{
							x: 832,
							y: 623
						},
						{
							x: 1485,
							y: 532
						},
						{
							x: 1142,
							y: 594
						}
					];
				} else {
					regionsDims = [
						{
							x: 1670,
							y: 730
						},
						{
							x: 880,
							y: 335
						},
						{
							x: 1210,
							y: 885
						},
						{
							x: 715,
							y: 625
						},
						{
							x: 235,
							y: 875
						},
						{
							x: 1522,
							y: 273
						},
						{
							x: 1780,
							y: 905
						},
						{
							x: 408,
							y: 1135
						},
						{
							x: 1365,
							y: 995
						},
						{
							x: 855,
							y: 1090
						}
					];
				}
				let oui;
				this.regionsPosition = regionsDims.map(region => {
					return {
						width: this.isUniverse
							? `${width * ratio.width / 1920}px`
							: "auto",
						// height: `${height * ratio.height / 1080}px`,
						top: `${region.y * ratio.height / 1080 - 5}px`,
						left: `${region.x * ratio.width / 1920 + ratio.x}px`
					};
				});
				this.bottomPos = {
					top: `${bottomPos.y * ratio.height / 1080 - 5}px`,
					left: `${bottomPos.x * ratio.width / 1920 + ratio.x}px`
				};
				this.imgLoaded = true;
			}
		}
	},
	mounted() {
		this.datas = ResultsStore.methods.getPlanetResults(
			this.planet,
			this.question
		);
		// this.playerName = this.$store.state.player.name;
		this.updateRegionsPosition();
		window.addEventListener("resize", this.updateRegionsPosition);
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.updateRegionsPosition);
	},
	props: ["isUniverse", "results", "planet"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.title {
	width: 100%;
	object-fit: contain;
	height: 30%;
}
.title3 {
	position: absolute;
	width: 30%;
	width: 25%;
	top: 35%;
}
.question {
	width: 100%;
	object-fit: contain;
	height: 15%;
}
.barH {
	width: 33%;
	object-fit: contain;
	height: 3%;
}

.topRightPart {
	width: 100%;
	height: 100%;
	font-size: 19px;
	text-align: center;
	z-index: 1;

	div {
		position: absolute;
	}
}

.botRightPart {
	position: absolute;
	bottom: 10%;
	width: 25%;
	z-index: 0;
	right: 5%;
	display: flex;
	justify-content: space-around;
	border-left: solid 3px white;
	max-height: 11%;
}

.botRightPart > .barV {
	position: relative;
	height: 100%;
	width: 0.7%;
	object-fit: contain;
	margin-top: auto;
}

.botRightPart > .desc {
	width: 95%;
	padding-left: 1%;
}

h6 {
	font-size: inherit;
	margin: 0;
}

.leftPart {
	position: absolute;
	width: 30%;
	top: 35%;
	display: flex;
	flex-direction: column;
	height: 30%;
	justify-content: space-around;
	align-items: flex-start;
	margin-left: 2.5%;

	> * {
		object-position: left;
	}
}

.leftPart button {
	z-index: 1;
	width: 50%;
	height: 16%;
	padding: 0;
	margin: 0;

	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
		object-position: left;
	}
}
.fading-enter-active {
	transition: opacity 0.25s ease-out;
}
.fading-enter {
	opacity: 0;
}
.fading-leave-active {
	transition: opacity 0.25s ease-out;
	opacity: 0;
}
</style>
