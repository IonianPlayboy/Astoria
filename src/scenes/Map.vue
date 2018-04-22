<template>
  <div class="map">
	  <transition name="fade-button">
	  	<video v-show="show3D[0]" @ended="$store.dispatch('changingScene', 1)" ref="planet1" preload :poster="assetPath('Map', 'Fond-univers')">
			<source :src="assetPath('Map', 'Armes3D', 'webm')" type="video/webm">
			<source :src="assetPath('Map', 'Armes3D', 'mp4')" type="video/mp4">
		</video>
		</transition>
		<transition name="fade-button">
		<video v-show="show3D.every(element => element === false)"  @click="moveRocket($event)" ref="background" preload autoplay muted loop :poster="assetPath('Map', 'Fond-univers')">
			<source :src="assetPath('Map', 'Final', 'webm')" type="video/webm">
			<source :src="assetPath('Map', 'Final', 'mp4')" type="video/mp4">
		</video>
		</transition>
		<!-- <video class="rocket" ref="rocket" preload autoplay muted loop :poster="assetPath('Map', 'Fusée')">
			<source :src="assetPath('Map', 'Fusée-flamme', 'webm')" type="video/webm">
			<source :src="assetPath('Map', 'Fusée-flamme', 'mp4')" type="video/mp4">
		</video> -->
		<div v-for="(planet, index) in planets" :key="index" @click="landOn(index, $event)" :style="planet">
		</div>
		<transition name="fade-button">
		<video v-if="landed" ref="fog" preload autoplay muted loop>
			<source :src="assetPath('Map', 'Fusée-fumée', 'webm')" type="video/webm">
			<source :src="assetPath('Map', 'Fusée-fumée', 'mp4')" type="video/mp4">
		</video>
		</transition>
		<!-- <img :src="assetPath('Map', 'Fond-univers')" alt="Fond étoilé"/>
		<img
			v-for="n in 4"
			:key="n"
			:src="assetPath('Planets', `Planete${n}`)"
			@click="goToPlanet(n)"
			class="planet"
			alt="A planet."
		/> -->
		<transition name="fade-button">
		<img v-show="show3D.every(element => element === false)" :style="currentPosition" :class="currentLocation" class="rocket" ref="rocket" :src="assetPath('Map', 'Fusée')" alt="Fusée"/>
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
export default {
	name: "Map",
	data() {
		return {
			currentLocation: "start",
			landed: false,
			currentPosition: {},
			on: 0,
			planets: [],
			show3D: [false, false, false, false],
			landOn1: false
		};
	},
	computed: {
		lastVisit() {
			return this.$store.state.player.lastVisit;
		}
	},
	mounted() {},
	methods: {
		goToPlanet(n) {
			console.log(`Planet ${n} was clicked !`);
			this.currentLocation = `on${n}`;
			this.$nextTick().then(() =>
				setTimeout(() => {
					console.log(`landed on Planet ${n} !`);
					// console.log(Number.isInteger(n));
					this.$store.dispatch("changingScene", n);
				}, 750)
			);
		},
		moveRocket(event) {
			this.currentLocation = "moving";
			this.currentPosition = {
				left: `${event.clientX - this.$refs.rocket.clientWidth / 2}px`,
				top: `${event.clientY -
					this.$refs.rocket.clientHeight * 3 / 4}px`
			};
		},
		landOn(n, event) {
			if (this.lastVisit < n)
				return alert("You can't go to this planet yet !");
			this.moveRocket(event);
			// this.landOn1 = true;
			setTimeout(() => {
				this.show3D.splice(n, 1, true);
				this.$refs[`planet${n + 1}`].play();
				this.$nextTick().then(() => console.log(this.show3D[0]));
			}, 2500);
			// setTimeout(() => {
			// 	this.$store.dispatch("changingScene", n + 1);
			// }, 4000);
		},
		updatePlanetsPosition() {
			if (this.$refs.background === undefined) return;
			let ratio = getObjectFitSize(
				false,
				this.$refs.background.clientWidth,
				this.$refs.background.clientHeight,
				1920,
				1080
			);
			let planetsDims = [
				{
					width: 530,
					height: 328,
					x: 206,
					y: 523
				},
				{
					width: 487,
					height: 363,
					x: 443,
					y: 73
				},
				{
					width: 477,
					height: 314,
					x: 899,
					y: 602
				},
				{
					width: 626,
					height: 374,
					x: 1161,
					y: 209
				}
			];
			this.planets = planetsDims.map(planet => {
				return {
					width: `${planet.width * ratio.width / 1920}px`,
					height: `${planet.height * ratio.height / 1080}px`,
					top: `${planet.y * ratio.height / 1080 + ratio.y}px`,
					left: `${planet.x * ratio.width / 1920 + ratio.x}px`
				};
			});
		}
	},
	mounted() {
		this.updatePlanetsPosition();
		window.addEventListener("resize", this.updatePlanetsPosition);
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.updatePlanetsPosition);
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.map {
	height: 100%;
	position: relative;

	// & > img:first-of-type {
	// 	height: 100vh;
	// 	width: 100vw;
	// 	object-fit: cover;
	// 	object-position: center;
	// 	position: absolute;
	// 	left: 0;
	// }

	& > video:first-of-type {
		height: 100vh;
		width: 100vw;
		object-fit: cover;
		object-position: center top;
		position: absolute;
		left: 0;
		top: 0;
	}

	.planet {
		position: absolute;
		height: 25vh;
		width: 30vw;
		object-fit: contain;
		object-position: center;
	}

	img:nth-of-type(2) {
		top: 50%;
		left: 12.5%;
	}

	img:nth-of-type(3) {
		top: 7.5%;
		left: 22.5%;
	}
	img:nth-of-type(4) {
		top: 52.5%;
		left: 50%;
	}
	img:nth-of-type(5) {
		top: 12.5%;
		left: 60%;
	}

	div {
		position: absolute;
		// background-color: rgba(100, 0, 0, 0.3);
	}

	.rocket {
		position: absolute;
		height: 5vh;
		width: 2.5vw;
		object-fit: contain;
		object-position: center;
		transition: top 1.5s ease-out, left 1.5s ease-out,
			transform 1.5s ease-out;

		&.start {
			left: 5%;
			top: 50%;
			bottom: 50%;
			transform: translate(0, -50%) rotate(90deg);
		}

		// &.on1 {
		// 	animation: landOn1 2s ease-out forwards;
		// }
		// animation: landOn1 2s ease-out forwards;
		// @keyframes landOn1 {
		// 	0% {
		// 		left: 5%;
		// 		top: 110%;
		// 	}

		// 	50% {
		// 		left: 13.75%;
		// 		top: 43.15%;
		// 		transform: rotate(45deg);
		// 	}
		// 	75% {
		// 		left: 31.2%;
		// 		top: 22.4%;
		// 		transform: rotate(0);
		// 	}
		// 	100% {
		// 		left: 31.2%;
		// 		top: 24.9%;
		// 		transform: rotate(0);
		// 	}
		// }

		&.on2 {
			top: 14%;
			left: 35.5%;
		}

		&.on3 {
			top: 61.5%;
			left: 65%;
		}

		&.on4 {
			top: 23%;
			left: 70%;
		}
	}
}
</style>
