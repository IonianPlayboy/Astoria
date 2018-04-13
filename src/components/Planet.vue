<template>
  <section class="planet">
	  <!-- <img :src="assetPath('Universes', background, 'jpg')" alt="Universe background"/>
	  <img v-if="shouldShow" class="character" :src="assetPath('Characters', 'Ulysse')" alt="Ulysse, the main character"> -->
		<video v-show="!idle && !showArticles" ref="video1" preload autoplay muted :poster="assetPath('Universes', background, 'jpg')" @ended="idle = true">
			<source :src="assetPath('Universes', firstAnim, 'webm')" type="video/webm">
			<source :src="assetPath('Universes', firstAnim, 'mp4')" type="video/mp4">
		</video>
		<video v-show="idle && !showArticles" ref="video2" preload autoplay loop muted :poster="assetPath('Universes', background, 'jpg')">
			<source :src="assetPath('Universes', secondAnim, 'webm')" type="video/webm">
			<source :src="assetPath('Universes', secondAnim, 'mp4')" type="video/mp4">
		</video>
			<article v-if="gameOver" :style="currentTextPos">G A M E O V E R <br> :c</article>
		<article
			v-else-if="shouldShow && charactersTalking"
			@click="avanceDialog()"
			:style="currentTextPos"
		>
			<span>
				<span :class="plot.dialog[this.dialogAvancement].speaker">
					<strong>{{currentSpeaker.toUpperCase()}}</strong> - «
				</span>
				{{newText}}
				<span :class="plot.dialog[this.dialogAvancement].speaker">»</span>
			</span>
		</article>
		<article class="choice" v-else-if="shouldShow && !showArticles" :style="currentTextPos">
			<strong>{{choices[currentChoice]}}</strong>
			<button @click="playerHasAnswered('yes')"><img :src="assetPath('Universes', 'Yes')" alt="Yes button"></button>
			<button @click="playerHasAnswered('no')"><img :src="assetPath('Universes', 'No')" alt="No button"></button>
			<aside>
				<img :src="assetPath('Universes', 'chrono')" alt="Chronometer background">
				<em>{{timeRemaining}}</em>
			</aside>
		</article>
		<article v-else-if="shouldShow && showArticles" class="article">
			<img :src="assetPath('Map', 'Fond-univers')" alt="Space background">
			<img :src="assetPath('Universes', 'arme')" alt="Two characters facing with weapons">
			<img :src="assetPath('Universes', 'arme2')" alt="A character with a blade">
			<div>
				<h1>WIPONIA</h1>
				<h2>THE INVENTION OF FIREARMS</h2>
				<hr>
				<p>
					Weapons seem to predate any other human invention. Since the prehistoric ages, men would use wooden sticks and stones to build an arsenal. The use of weapons had a huge impact on the living conditions of men allowing them to satisfy two vital needs: food and protection.
				</p>
				<p>
					Therefore, the continuous improvement of weapons would let men hunt bigger preys that they would not normally capture and would also serve to protect themselves against predators, including their most important threat: themselves.
				</p>
				<p>
					“A ﬁrearm is a lethal weapon that inflicts damage on targets by launching one or more projectiles driven by rapidly expanding high-pressure gas produced by exothermic combustion (deflagration) of propellant within an ammunition cartridge.”
				</p>
				<p>
					Nowadays, ﬁrearms are used for hunting, a number of sports, crimes, and wars. They brought their lot of wounds and permanent injuries, along deeper mutations into military strategies.
				</p>
				<p>
					We list two main types of ﬁrearms: <br> - Portable ﬁrearms, which use smaller calibers, are aimed by hand to the visible target; <br> - Artillery pieces, much more impressive in size and usually placed in batteries on a support, will be aimed indirectly using prior observation and geographic coordinates.
				</p>
				<button @click="quitPlanet()">NEXT UNIVERSE</button>
			</div>
		</article>

	  <!-- <img v-if="shouldShow" class="character" :src="assetPath('Characters', character)" alt="The guard of that planet"> -->
  </section>
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
	name: "Planet",
	data() {
		return {
			charactersTalking: false,
			dialogAvancement: -1,
			inProgress: [],
			currentChoice: 0,
			shouldShow: false,
			currentTextPos: {},
			idle: false,
			timeRemaining: 0,
			timerRunning: false,
			intervalID: 0,
			gameOver: false,
			showArticles: false
		};
	},
	watch: {
		charactersTalking(newValue) {
			console.log("hey");
			if (newValue) return;
			this.startTimer(25);
		}
	},
	computed: {
		playerName() {
			return this.$store.state.player.name;
		},
		currentSpeaker() {
			return this.plot.dialog[this.dialogAvancement] === undefined
				? ""
				: this.plot.dialog[this.dialogAvancement].speaker === "player"
					? this.playerName
					: "guard";
		},
		currentText() {
			return this.plot.dialog[this.dialogAvancement] !== undefined
				? this.plot.dialog[this.dialogAvancement].text
				: "";
		},
		newText() {
			return this.inProgress.join("");
		},
		choices() {
			return this.plot.choices;
		}
	},
	methods: {
		avanceDialog() {
			this.dialogAvancement++;
			if (this.plot.dialog[this.dialogAvancement] === undefined)
				return (this.charactersTalking = false);
			this.inProgress = [];
			let speed = 0;
			this.$nextTick().then(() => {
				let sentencesList = this.plot.dialog[
					this.dialogAvancement
				].text.split(/[.!?] /);
				let currentLength = 0;
				sentencesList = sentencesList.map((sentence, index) => {
					sentence = sentence.split("");
					if (
						sentence.length !== 0 &&
						index !== sentencesList.length - 1
					)
						sentence.push(
							`${
								this.plot.dialog[this.dialogAvancement].text[
									currentLength === 0
										? sentence.length
										: currentLength + sentence.length
								]
							} `
						);
					currentLength += sentence.length + 1;
					return sentence;
				});
				function pushNewLetter() {
					return new Promise(resolve =>
						setTimeout(() => {
							resolve(true);
						}, 30)
					);
				}
				let vm = this;
				async function pushNewSentence(sentence) {
					let length = sentence.length;
					let promiseList = [true];
					for (let i = 0; i < length; i++) {
						await promiseList[i];
						let letter = sentence[i];
						vm.inProgress.push(letter);
						let currentPromise = pushNewLetter();
						promiseList.push(currentPromise);
					}
					return new Promise(resolve => {
						Promise.all(promiseList).then(() => {
							resolve(true);
						});
					});
				}
				async function pushText(list, index) {
					let sentencePromises = pushNewSentence(list[index]);
					sentencePromises.then(() => {
						if (list[index + 1] !== undefined)
							setTimeout(() => {
								pushText(list, index + 1);
							}, 75);
					});
				}
				pushText(sentencesList, 0);
			});
		},
		playerHasAnswered(answer) {
			this.$emit("playerAnswered", answer);
			this.stopTimer();
			if (this.currentChoice === 1) this.showArticles = true;
			else {
				// this.$store.dispatch("changingScene", "Map");
				this.currentChoice = 1;
				this.startTimer(35);
			}
		},
		updateTextPosition() {
			let currentVideo = this.idle ? "video2" : "video1";
			if (this.$refs[currentVideo] === undefined) return;
			let positionInfo = getObjectFitSize(
				false,
				this.$refs[currentVideo].clientWidth * 29.4 / 100,
				this.$refs[currentVideo].clientHeight * 14.3 / 100,
				1920 * 36.4 / 100,
				1080 * 17.8 / 100
			);
			this.currentTextPos = {
				width: `${positionInfo.width}px`,
				height: `${positionInfo.height}px`,
				bottom: `calc( 7vh - ${positionInfo.y}px)`,
				right: `calc(36vw + ${positionInfo.x}px)`
			};
		},
		startTimer(duration) {
			this.timeRemaining = duration;
			this.intervalID = setInterval(() => {
				this.timeRemaining = this.timeRemaining - 1;
				this.$nextTick().then(() => {
					if (this.timeRemaining === 0) this.stopTimer(true);
				});
			}, 1000);
		},
		stopTimer(playerLost = false) {
			console.log("oui " + playerLost);
			clearInterval(this.intervalID);
			if (playerLost) this.gameOver = true;
		},
		quitPlanet() {
			this.$emit("playerLeft");
			this.$store.dispatch("changingScene", "Map");
		}
	},
	created() {
		new Promise(resolve =>
			setTimeout(() => {
				resolve(true);
			}, 2000)
		).then(() => {
			this.shouldShow = true;
			this.charactersTalking = true;
			this.avanceDialog();
		});
	},
	mounted() {
		this.updateTextPosition();
		window.addEventListener("resize", this.updateTextPosition);
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.updateTextPosition);
	},
	props: ["background", "firstAnim", "secondAnim", "character", "plot"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.planet {
	height: 100%;
	display: flex;
	justify-content: center;
	position: relative;

	& > img:first-of-type {
		height: 100vh;
		width: 100vw;
		object-fit: cover;
		object-position: center;
		position: absolute;
		left: 0;
	}

	& > video {
		height: 100vh;
		width: 100vw;
		object-fit: cover;
		object-position: center bottom;
		position: absolute;
		left: 0;
	}

	.character {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		height: 45vh;
		width: 25vw;
		object-fit: contain;
		object-position: center;
	}

	& > img:nth-of-type(2) {
		left: 5vw;
		z-index: 1;
	}

	& > img:nth-of-type(3) {
		right: 5vw;
	}

	article {
		// position: relative;
		position: absolute;
		margin: auto 0;
		display: flex;
		cursor: pointer;
		// width: 60%;
		text-align: left;
		color: lighten(#7b328c, 35%);
		// background-color: rgba(white, 0.9);
		// border-radius: 25px;
		// height: 20vh;
		// padding: 2%;
		font-size: 1.05vw;
		// width: 30vw;
		// right: 36vw;
		// bottom: 6vh;
		// height: 18vh;

		& > span {
			display: inline-block;
			width: 100%;
			margin: 2.5% auto;
			// line-height: 1.25;
			font-size: 1.3vw;
			color: lighten(#7b328c, 55%);
		}
	}

	.choice {
		display: grid;
		grid-template-areas:
			"a a a a a"
			". b . c .";
		cursor: initial;
		grid-template-rows: 60% 35%;

		& > * {
			margin: auto;
		}

		strong {
			grid-area: a;
			color: #d2cece;
			font-weight: normal;
			font-size: 1.5vw;
			display: inline-block;
			width: 90%;
			text-align: center;
		}
		button {
			// width: 75%;
			width: 100%;
			display: flex;
			padding: 0;
			align-items: center;
			justify-content: center;
			height: 50%;
			font-size: 1.5vw;
			outline: none;

			img {
				width: 15vw;
				height: 150%;
				object-fit: contain;
				object-position: center;
			}
		}

		button:first-of-type {
			grid-area: b;
		}
		button:last-of-type {
			grid-area: c;
		}

		aside {
			position: absolute;
			right: -10%;
			top: 55%;
			display: flex;
			justify-content: center;
			width: 13%;
			height: 45%;
			align-items: center;
			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				object-position: center;
				opacity: 0.8;
			}
			em {
				font-style: normal;
				position: absolute;
				margin: auto;
				font-size: 1.25vw;
				color: lighten(#7b328c, 55%);
				color: #53d7fd;
			}
		}
	}

	.article {
		position: relative;
		cursor: initial;
		height: 100%;
		width: 100%;
		color: #7b328c;

		img:first-of-type {
			height: 100vh;
			width: 100vw;
			object-fit: cover;
			object-position: center;
			position: absolute;
			left: 0;
		}

		img + img {
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
			height: 45vh;
			width: 25vw;
			object-fit: contain;
			object-position: center;
		}

		img:nth-of-type(2) {
			top: 25%;
			left: 5vw;
			z-index: 1;
		}

		img:nth-of-type(3) {
			left: 5vw;
			top: 75%;
		}

		& > div {
			position: absolute;
			width: 50%;
			right: 0;
			padding: 0.5% 5%;
			background-color: white;
			height: 100%;
			overflow: scroll;

			h1 {
				&::first-letter {
					font-weight: 900;
				}
				font-weight: 100;
				font-size: 8.05vw;
				margin: 0;
				line-height: 100%;
			}
			h2 {
				font-size: 1.15vw;
			}

			hr {
				width: 10%;
				margin: 0 50% 0 0;
				color: inherit;
			}
		}
	}

	.player {
		color: #f35793;
	}

	.guard {
		color: #53affa;
	}
}
</style>
