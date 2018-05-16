<template>
  <section class="planet">
	  <!-- <img :src="assetPath('Universes', background, 'jpg')" alt="Universe background"/>
	  <img v-if="shouldShow" class="character" :src="assetPath('Characters', 'Ulysse')" alt="Ulysse, the main character"> -->
	  	<audio autoplay loop>
    		<source :src="assetPath('Sounds', backgroundMusic, 'wav')" type="audio/wav">
 		</audio>
		<video v-show="!idle && !showArticles" ref="video1" preload autoplay muted :poster="assetPath('Universes', background, 'jpg')" @ended="idle = true" @playing="initDialog">
			<source :src="assetPath('Universes', firstAnim, 'webm')" type="video/webm">
			<!-- <source :src="assetPath('Universes', firstAnim, 'mp4')" type="video/mp4"> -->
		</video>
		<video v-show="idle && !showArticles" ref="video2" preload autoplay loop muted :poster="assetPath('Universes', background, 'jpg')">
			<source :src="assetPath('Universes', secondAnim, 'webm')" type="video/webm">
			<!-- <source :src="assetPath('Universes', secondAnim, 'mp4')" type="video/mp4"> -->
		</video>
    <transition name="fade-trans">
			<img v-show="showResults" :src="assetPath('Surveys', getPlanetNum()+'/Fond')" alt="Background" style="{height:100%}">
    </transition>
		<transition name="fade-trans">
      <video v-show="showArticles" preload autoplay muted loop :poster="assetPath('Map', 'Fond-univers')">
  			<source :src="assetPath('Universes', articleBackground, 'webm')" type="video/webm">
  			<source :src="assetPath('Universes', articleBackground, 'mp4')" type="video/mp4">
	    </video>
		</transition>
		<transition v-if="gameOver" name="fade-trans">
			<img  :src="assetPath('Universes', 'gameover')" alt="Game over. :c">
		</transition>
		<transition name="fade-trans" v-else-if="shouldShow && charactersTalking">
			<article

				@click="avanceDialog(true)"
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
		</transition>
		<transition name="fade-trans" v-else-if="shouldShow && !showResults && !showArticles">
			<article class="choice" :style="currentTextPos">
			<strong>{{choices[currentChoice]}}</strong>
			<button @click="playerHasAnswered('yes')"><img :src="assetPath('Universes', 'Yes')" alt="Yes button"></button>
			<button @click="playerHasAnswered('no')"><img :src="assetPath('Universes', 'No')" alt="No button"></button>
			<aside>
				<img :src="assetPath('Universes', 'chrono')" alt="Chronometer background">
				<em>{{timeRemaining}}</em>
			</aside>
		</article>
		</transition>
    <transition v-else-if="shouldShow && showResults && !showArticles">
      <article class="survey">
        <component :is="surveyDisp" :isUniverse="true" :planet=getPlanetNum() @viewArticle="viewArticle"></component>
      </article>
    </transition>
		<transition v-else-if="shouldShow && !showResults && showArticles">
			<article class="article">
				<component :is="background" :isUniverse="true" @quittingPlanet="quitPlanet"></component>
			</article>
		</transition>


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
import planete1 from "@/components/articles/planet1";
import planete2 from "@/components/articles/planet2";
import planete3 from "@/components/articles/planet3";
import planete4 from "@/components/articles/planet4";
import survey from "@/components/surveys/survey";
export default {
	name: "Planet",
	data() {
		return {
			charactersTalking: false,
			dialogAvancement: -1, //-1
			inProgress: [],
			currentChoice: 0,
			shouldShow: false,
			currentTextPos: {},
			idle: false,
			timeRemaining: 0,
			timerRunning: false,
			intervalID: 0,
			gameOver: false,
			showArticles: false,
      showResults: false
		};
	},
	components: {
		planete1,
		planete2,
		planete3,
		planete4,
    survey
	},
	watch: {
		charactersTalking(newValue) {
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
					? "Ulysses"
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
    getPlanetNum() {
      let st = this.$options.parent._name.replace(/[^\w\s]/gi, '');
      return st && st[0].toLowerCase() + st.slice(1);
    },
		avanceDialog(isClick = false) {
			if (this.currentText !== this.newText && isClick) return;
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
			if (this.currentChoice === 1) this.showResults = true;
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
			clearInterval(this.intervalID);
			if (playerLost) this.gameOver = true;
		},
    viewArticle(){
      this.showResults = false;
      this.showArticles = true;
    },
		quitPlanet() {
			this.$emit("playerLeft");
			if (this.background === "planete4")
				return this.$store.dispatch("changingScene", "End");
			this.$store.dispatch("changingScene", "Map");
		},
		initDialog() {
			new Promise(resolve =>
				setTimeout(() => {
					resolve(true);
				}, 2000)
			).then(() => {
				this.shouldShow = true;
				this.charactersTalking = true;
				this.avanceDialog();
			});
		}
	},
	mounted() {
		this.updateTextPosition();
		window.addEventListener("resize", this.updateTextPosition);
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.updateTextPosition);
	},
	props: [
		"background",
    "surveyDisp",
		"backgroundMusic",
		"firstAnim",
		"secondAnim",
		"articleBackground",
		"character",
		"plot"
	]
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
		font-family: Roboto;
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
			color: rgba(white, 0.9);
			font-weight: normal;
			font-size: 1.4vw;
			line-height: 1.2;
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

			span {
				position: relative;
				bottom: 0.04vw;
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

  .survey {
    position: relative;
    cursor: initial;
    height: 100%;
    width: 95%;
    // color: #7b328c;
    color: rgba(225, 225, 225, 0.95);
    margin: auto 0 auto auto;
  }

	.article {
		position: relative;
		cursor: initial;
		height: 100%;
		width: 70%;
		// color: #7b328c;
		color: rgba(225, 225, 225, 0.95);
		margin: auto 0 auto auto;

		// img:first-of-type {
		// 	height: 100vh;
		// 	width: 100vw;
		// 	object-fit: cover;
		// 	object-position: center;
		// 	position: absolute;
		// 	left: 0;
		// }

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
		.vb > .vb-dragger {
			padding: 0.5% 1.5% 0.5% 5%;
			width: 1.5%;
			right: -5px;

			.vb-dragger-styler {
				background-color: rgba(white, 0.8);
				height: 100%;
			}
		}

		.dragger-back {
			margin: 0.5% 1.5% 0.5% 5%;
			position: absolute;
			width: 1.5%;
			right: -5px;
			height: 100%;
			top: 0;
			padding: 0;
			background-color: rgba(darkgrey, 0.6);
		}

		& > div {
			width: 50%;
			right: 0;
			padding: 0.5% 5%;
			height: 75%;
			margin: auto 0 auto auto;

			> div {
				height: 90%;

				div {
					padding: 0 0.15%;

					img {
						width: 12.5%;
						height: 0.5%;
						object-fit: contain;
						object-position: left center;
					}
				}

				div > * {
					padding-right: 2.5%;
				}
			}

			> img {
				width: 75%;
				height: 12.5%;
				object-fit: contain;
				object-position: left center;
				position: relative;
			}

			h2 {
				font-size: 1.15vw;
				margin: 1% 0 2% 0;
			}

			button {
				border: 2px solid rgba(225, 225, 225, 0.95);
				border-radius: 10px;
				border-radius: 1vw;
				padding: 1.5%;
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
