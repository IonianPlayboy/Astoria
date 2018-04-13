<template>
  <div class="map">
	  	<video v-show="show3D[0]" ref="planet1" preload autoplay muted loop :poster="assetPath('Map', 'Fond-univers')">
			<source :src="assetPath('Map', 'Armes3D', 'webm')" type="video/webm">
			<source :src="assetPath('Map', 'Armes3D', 'mp4')" type="video/mp4">
		</video>
		<video v-show="show3D.every(element => element === false)"  @click="moveRocket($event)" ref="background" preload autoplay muted loop :poster="assetPath('Map', 'Fond-univers')">
			<source :src="assetPath('Map', 'Final', 'webm')" type="video/webm">
			<source :src="assetPath('Map', 'Final', 'mp4')" type="video/mp4">
		</video>
		<!-- <video class="rocket" ref="rocket" preload autoplay muted loop :poster="assetPath('Map', 'Fusée')">
			<source :src="assetPath('Map', 'Fusée-flamme', 'webm')" type="video/webm">
			<source :src="assetPath('Map', 'Fusée-flamme', 'mp4')" type="video/mp4">
		</video> -->
		<div v-for="(planet, index) in planets" :key="index" @click="landOn(index, $event)" :style="planet">
		</div>
		<video v-if="landed" ref="fog" preload autoplay muted loop>
			<source :src="assetPath('Map', 'Fusée-fumée', 'webm')" type="video/webm">
			<source :src="assetPath('Map', 'Fusée-fumée', 'mp4')" type="video/mp4">
		</video>
		<!-- <img :src="assetPath('Map', 'Fond-univers')" alt="Fond étoilé"/>
		<img
			v-for="n in 4"
			:key="n"
			:src="assetPath('Planets', `Planete${n}`)"
			@click="goToPlanet(n)"
			class="planet"
			alt="A planet."
		/> -->
		<img v-show="show3D.every(element => element === false)" :style="currentPosition" class="rocket" ref="rocket"  :class="currentLocation" :src="assetPath('Map', 'Fusée')" alt="Fusée"/>
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
			show3D: [false, false, false, false]
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
			console.log(event);
			this.currentPosition = {
				left: `${event.clientX - this.$refs.rocket.clientWidth / 2}px`,
				top: `${event.clientY -
					this.$refs.rocket.clientHeight * 3 / 4}px`
			};
			// setTimeout(() => {
			// 	this.$store.dispatch("changingScene", 1);
			// }, 750);
		},
		landOn(n, event) {
			if (this.lastVisit < n)
				return alert("You can't go to this planet yet !");
			this.moveRocket(event);
			setTimeout(() => {
				this.show3D.splice(n, 1, true);
				this.$nextTick().then(() => console.log(this.show3D[0]));
			}, 1000);
			setTimeout(() => {
				this.$store.dispatch("changingScene", n + 1);
			}, 3000);
		},
		updatePlanetsPosition() {
			if (this.$refs.background === undefined) return;
			let planeteRatios = [
				{
					width: 27.4,
					height: 31.9,
					inWidth: 27.3,
					inHeight: 27.6,
					planetX: 61.75,
					planetY: 15
				},
				{
					width: 27.2,
					height: 36.4,
					inWidth: 25,
					inHeight: 33.5,
					planetX: 52.5,
					planetY: 51
				},
				{
					width: 24.0,
					height: 30.8,
					inWidth: 23.2,
					inHeight: 28.0,
					planetX: 29,
					planetY: 4
				},
				{
					width: 28.9,
					height: 38.4,
					inWidth: 29.8,
					inHeight: 35.3,
					planetX: 7,
					planetY: 37.5
				}
			];
			this.planets = planeteRatios
				.map(element => {
					let planetInfos = getObjectFitSize(
						false,
						this.$refs.background.clientWidth * element.width / 100,
						this.$refs.background.clientHeight *
							element.height /
							100,
						1920 * element.inWidth / 100,
						1080 * element.inHeight / 100
					);
					planetInfos.planetX = element.planetX;
					planetInfos.planetY = element.planetY;
					return planetInfos;
				})
				.map(element => {
					return {
						width: `${element.width}px`,
						height: `${element.height}px`,
						bottom: `calc( ${element.planetY}% + ${element.y}px)`,
						right: `calc(${element.planetX}% + ${element.x}px)`
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
		transition: all 0.75s ease-out;

		&.start {
			left: 5%;
			top: 50%;
			bottom: 50%;
			transform: translate(0, -50%) rotate(90deg);
		}

		&.on1 {
			top: 60%;
			left: 25.5%;
		}

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
