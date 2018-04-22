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
		<transition name="fade-trans">
			<video v-show="showArticles" preload autoplay muted loop :poster="assetPath('Map', 'Fond-univers')" @ended="idle = true">
			<source :src="assetPath('Universes', articleBackground, 'webm')" type="video/webm">
			<source :src="assetPath('Universes', articleBackground, 'mp4')" type="video/mp4">
		</video>
		</transition>

		<article v-if="gameOver" :style="currentTextPos">G A M E O V E R <br> :c</article>
		<transition name="fade-trans" v-else-if="shouldShow && charactersTalking">
			<article

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
		</transition>
		<transition name="fade-trans" v-else-if="shouldShow && !showArticles">
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
		<transition v-else-if="shouldShow && showArticles">
			<article class="article">
			<!-- <img :src="assetPath('Map', 'Fond-univers')" alt="Space background">
			<img :src="assetPath('Universes', 'arme')" alt="Two characters facing with weapons">
			<img :src="assetPath('Universes', 'arme2')" alt="A character with a blade"> -->
			<div >
				<img :src="assetPath('Universes', 'Titre')" alt="Planet name">
				<div v-bar>
					<div>
					<h2>THE INVENTION OF FIREARMS</h2>
					<img :src="assetPath('Universes', 'barre')" alt="Line">
					<p>
						Weapons seem to predate any other human invention. Since the prehistoric ages, men would use wooden sticks and stones to build an arsenal. The use of weapons had a huge impact on the living conditions of men allowing them to satisfy two vital needs: food and protection.
					</p>
					<p>
						Therefore, the continuous improvement of weapons would let men hunt bigger preys that they would not normally capture and would also serve to protect themselves against predators, including their most important threat: themselves.
					</p>
					<strong>
						“A firearm is a lethal weapon that inflicts damage on targets by launching one or more projectiles driven by rapidly expanding high-pressure gas produced by exothermic combustion (deflagration) of propellant within an ammunition cartridge.”
					</strong>
					<p>
						Nowadays, firearms are used for hunting, a number of sports, crimes, and wars. They brought their lot of wounds and permanent injuries, along deeper mutations into military strategies.
					</p>
					<p>
						We list two main types of firearms:
						<ol>
							<li> Portable firearms, which use smaller calibers, are aimed by hand to the visible target; </li>
							<li> Artillery pieces, much more impressive in size and usually placed in batteries on a support, will be aimed indirectly using prior observation and geographic coordinates. </li>
						</ol>
					</p>
					<h2>{{'Firearms in the USA and in Japan'.toUpperCase()}}</h2>
					<img :src="assetPath('Universes', 'barre')" alt="Line">
					<p>
						The procurement of a rifle or a machine gun on US soil is quite simple, one could use mail order to have them delivered at their door. Even fairs frequented by families on the weekends have some on sale.
						<br/>
						Carrying a gun in the United States is a right written in the Constitution (the supreme law of the United States). This particular amendment dates back to 1791 when the first Americans were fighting for their independence and led to the birth of the United States of America.
					</p>
					<p>
						Firearms symbolize freedom to the American mind. The right to bear arms is a produce of pride, and most Americans believe everyone should be armed.
					</p>
					<p>
						Lobbying is the act of attempting to influence the actions, policies, or decisions of officials in their daily life, most often legislators or members of regulatory agencies. The United States are no stranger to this practice with powerful lobbies driving American politics. Since 2004, the National Rifle Association (NRA) spent 150-million dollars to lobby extensively on the subject of firearms. Those figures account for the expenses of lobbying as well as for the direct or indirect funding of political candidates.
						<br/>
						The NRA is 5 million members strong and reported 400-million dollars in income for the fiscal year 2016. The NRA will frequently bribe elected representatives to prevent gun-control laws to be passed.
					</p>
					<h2>
						{{'Why is Switzerland, one the most armed countries per capita, less affected by mass shootings than the United States?'.toUpperCase()}}
					</h2>
					<img :src="assetPath('Universes', 'barre')" alt="Line">
					<p>
						From 1986 to 2006, Martin Killias was a professor of Criminal Law, Criminal Procedural Law and Criminology at the University of Lausanne and Director of that University’s Institute of Criminology and Criminal Law. Killias’ response to the question of how Switzerland kept a low number of mass shootings even though the proportion of firearms is greater compared to the United States was the following: <strong>“The bottom line is not the number of firearms but the number of persons who have access to them. It is a fundamental difference. A few people do amass a lot of guns, however what is really key is the number of people who have access to at least one, which in proportion is way lower in Switzerland.</strong>
					</p>
					<p>
						In Switzerland, the majority of people bearing firearms are military or military-related individuals. The need to carry a gun to protect oneself or one’s family is almost nonexistent. Besides, Swiss criminal environment where a lot of misdemeanors happen has not escalated into an arms race. Your regular drug dealer would not normally carry a gun. On the contrary, in the US, it is customary for drug traffickers to be armed and so do their customers.
					</p>
					<p>
						Almost 1:1 ratio of guns per people in the United States
						<br/>
						The number of privately-owned firearms was around 270-million in 2011. This represents as many as the total population the same year which accounted for 312-million people. Which roughly translated to 88.8 guns per 100 residents.
					</p>
					<h2>{{'“In Japan, gun culture is rather absent”'.toUpperCase()}}</h2>
					<img :src="assetPath('Universes', 'barre')" alt="Line">
					<p>
						Japan is unquestionably the safest country in the world. They are inching close to zero crime rate and murders by firearms are rather uncommon. This has nothing to do with luck since for almost 300 years politics have been run efficiently to prevent criminality.
						<br/>
						When heated debate over gun control laws periodically arise in the United States as a new mass shooting occurs, Japan is miles away to share the same controversies. As a matter of fact, 2014 saw 6 firearms-related deaths in the land of the rising sun when Uncle Sam accounted for 33,599 lives taken the same year. A striking contrast stemming from cultural differences on the subject of firearms and especially two totally different view legally-speaking.
						<br/>
						The Second amendment to the United States Constitution protects the right of the people to keep and bear arms while Japanese Constitution bans the possession of firearms or controls the production of swords. Though a few exceptions are made, the ban has been anchored for a long time in Japanese law and society. Guns advocates will consider that crime does not come from the firearm itself rather than the one who wields it, while Japan has a practical approach: no guns, no firearms-related murders.
					</p>
					<p>
						Japan is known to be the first country in History to have written laws on the possession of firearms and made incentives to its nationals to lay down the arms. Since 1685, Japanese people were invited to exchange their weapons against a reward.
					</p>
					<p>
						Iain Overton, director of Action on Arm Violence NGO, wrote on the subject: <strong>“As soon as firearms were available on Japanse soil, the Japanese government established strict rules. It was the first country in the world to ever legislate on guns control, and this has led to a civilisation which beliefs are that firearms do not belong in the civil society.”</strong>
					</p>
					<p>
						A few centuries later, mafia thugs would rather use knives or conceal their firearms in frozen tuna. Meanwhile policemen would be unarmed until the end of the Second World War, making use of martial arts (mostly earning their black belt in judo and training into the art of kendo). Though the ban on firearms would seem a natural explanation to a low death-rate, other factors have been key to prevent criminality and preserve social stability: social cohesion, a sense of belonging to a community where everyone should play its role for the interest of all.
					</p>
					<p>
						A few statistics:
						<br/>
						The number of guns per 100 residents is 0.6 in Japan, 6.2 in the United Kingdom and a whopping 88.8 in the United States. Each year, 12 persons die of a firearms-related incident in Japan, the highest was 22 in 2007 which brought up a lot of controversy in the entire country. Quite stupendous would it be elsewhere!
					</p>
					<p>
						One on 4 American citizens possesses one or more firearms with a total of 300-million guns in the whole land of the braves.
					</p>
					<p>
						The average American will always state that: <strong>“Any citizen should have the possibility to protect oneself against armed thugs.”</strong> The death toll is up to 30,000 a year due to firearms, which equals to 60 deaths a day.
					</p>
					<h2>{{'American culture vs. French culture'.toUpperCase()}}</h2>
					<img :src="assetPath('Universes', 'barre')" alt="Line">
					<p>
						We have picked three questions on the subject of firearms and submitted to French and American individuals.
						<br/>
						The questions may differ on the account of being either French or American.
					</p>
					<ul>
						<li>
							<strong>Do you think that banning guns would lower crime?</strong>
							<br/>
							8 on 10 Americans opted that this would have no effect on criminality.
							<br/>
							On the contrary, French have agreed unanimously this would help.
						</li>
						<li>
							<strong>Do you own a gun? (US)</strong>
						</li>
						<li>
							<strong>Would you own a gun? (France)</strong>
							<br/>
							Half of the Americans polled did own a gun.
							<br/>
							Only 2 on 10 French people wish to have one.
						</li>

						<li>
							<strong>Should there a limit on the number of guns owned by a single individual?</strong>
							<br/>
							6 on 10 Americans do not see the need of setting a limit.
							<br/>
							While 9 on 10 French people think the limit is a necessity.
						</li>
					</ul>
					<p>
					Results analysis:
					<br/>
					It is clear that Americans cherish their right to own guns, an heritage of their culture. In addition, they seek to protect themselves as they do not trust their legal system. Whereas French people do not see the use of firearms as a mean of protection, but rather reserved to the law enforcement professionals.
					<br/>
					Therefore, citizens of France would not use firearms as they find them useless and dangerous because of their inexperience. Moreover, the thought of ever having to use a firearm is a deterrent to possessing one.
					<br/>
					On the subject of the quantity of firearms owned, in the American point of view, the logic behind the polls is that if an individual is to commit a murder, whatever the number of guns in one’s possession, one’s only need a single piece to reach one’s goal.
					</p>
					</div>

					<div class="dragger-back"></div>
				</div>
<button @click="quitPlanet()">NEXT UNIVERSE <span>►</span></button>
			</div>
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
	props: [
		"background",
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
		}

		.dragger-back {
			margin: 0.5% 1.5% 0.5% 5%;
			position: absolute;
			width: 1.5%;
			right: -5px;
			height: 100%;
			top: 0;
			padding: 0;
			background-color: rgba(darkgrey, 0.8);
		}

		& > div {
			width: 50%;
			right: 0;
			padding: 0.5% 5%;
			height: 75%;
			margin: auto 0 auto auto;

			> div {
				height: 90%;

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

			& > div > img {
				width: 12.5%;
				height: 0.5%;
				object-fit: contain;
				object-position: left center;
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
