<template>
  <div class="endScreen">
	  	<img :src="assetPath('End', 'illu-final', 'jpg')" alt="End screen Background"/>
	  	<img class="logo" :src="assetPath('Website', 'AstoriaLogo4')" alt="Astoria Logo">
	   	<section v-if="currentlyShowing ==='history'">
			   <img ref="historyTitle" :src="assetPath('End', 'BOUTON-HISTORY')"  alt="History title"/>
			 <article :style="articleSize" class="creators">
				<div v-bar>
					<div>
						<h2>How the game was made </h2>
						<p>
							Though Astoria looks like a simple interactive game, it really is a web documentary addressing the clash of cultures. It was made by a group of students enrolled in the Bachelor’s degree of “Métiers du Numérique” at the University of Cergy-Pontoise. We looked into the cultural differences and how people react to someone having a different cultural lifestyle. In this web documentary, each item was designed to challenge your open-mindedness with cultural diversity.
						</p>
						<p>
							The name “Astoria” is the addition of the letter “A”, that comes from the word “asteroid”,  to the word “Storia”. Asteroids are minor planets no bigger than a hundred kilometers in length which you can find in the web documentary. “Storia” means “History” in Italian, and a few other languages like Corsican or Latin. The name was chosen to reflect the journey which the player will undertake through this universe. A journey full of twists and turns that the player needs to overcome to reach the end goal. We also bring forward how cultures transform with time, the succession of events that affect the evolution of a group of individuals. Through the medium of an interactive video game, the player lives the struggle as well as being entertained.
						</p>
						<p>
							The player will take on the role of Ulysses, named after the great hero of the Greek epic poet Homer. The character is an hybrid who embodies the mix of cultures of planet Earth. He follows a quest to find a new adoptive home where he can live in peace after the annihilation of his own world. The player will be drawn into various original worlds with vibrant colours and futuristic undertones which more or less remind us of our own reality.
						</p>
						<p>
							Each world is centered around a controversial point up to debate in our current society. The player will have to answer spontaneously to a couple of questions with the constraint of time. If the player takes too long to answer, then the game will start again. During this limited time, the player is confronted to individual thoughts built from own experiences, but also to the collective mind coming from the player’s own environment. What will prevail? The player’s individual thoughts or the collective mind?
						</p>
						<p>
							Any choice made is accounted for in the game’s database. At the end of the game, the player will be able to see the outcome of the choices made, the results will be displayed in the form of poll answers gathered from previous players’ games of various nationalities. The deal is that there is no good or bad answer as any opinion is viable through the scope of any culture. To come up with the poll results, we have collected opinions from different cultures based on news articles from worldwide press.
						</p>
						<p>
							<strong>Are we only a reflection of our culture? Through our conclusion we demonstrate that it’s not an obligation to choose only one planet at the end of the game. We make the choice to associate a piece of these different universes to create a new form of culture. Indeed, we explain that we have a cultural identity but also a personal one that allows us to free ourselves from our social group. A culture alone doesn’t make man since we now have an opening throughout the world particularly by travel, media and art. By our exchanges, we are moving more and more towards a common culture, also engendered by globalization: threat or opportunity?</strong>
						</p>
					</div>
					<div class="dragger-back"></div>
				</div>
				 <button @click="currentlyShowing=''">
					 <img :src="assetPath('End', 'close')"  alt="Closing button"/>
				 </button>
			 </article>
		   </section>
	    <section v-else-if="currentlyShowing ==='creators'">
			 <img ref="creatorsTitle" :src="assetPath('End', 'BOUTON-CREATORS')"  alt="Creators title"/>
			 <article :style="articleSize" class="creators">
				<div v-bar>
					<div>
						<p>
							Astoria is a web documentary created by students enrolled in the bachelor’s degree “Métiers du numérique”, at Cergy-Pontoise university on the topic of the clash of cultures. This program has allowed six students enrolled in different majors to team up in order to carry out this project : 4 designers and 2 communication managers.
						</p>
						<div>
							<div>
								<img :src="assetPath('End', 'marion')"  alt="Placeholder"/>
							</div>
							<p>
								<strong>Marion, Project manager/ art direction.</strong>
								<br/>
								The tattooed goth girl of the team, influenced by Japanese culture but also queer trends. She enjoys listening to alternative music like witch House or synthwave. Her favorite artists are Ryohei Hase, Ogure Ito, Magritte and Orlan. She chose to undertake this project because she grew in a multicultural household with a Guyanese father and a mother from Italian and German descent. She spent an entire year living in Japan where she found out more about herself and her own heritage.
							</p>
						</div>

						<div>
							<div>
								<img :src="assetPath('End', 'fanny')"  alt="Placeholder"/>
							</div>
							<p>
								<strong>Fanny, motion design/animation.</strong>
								<br/>
								Our favorite translator when we can’t understand each other. Big fan of Hayao Miyazaki and Ghibli studio, She also likes the hungarian studio Digic Pictures, as well as Glen Keane and Richard Wiliams, you get it, Fanny loves animation ! Her primary interest in this project is that she sees travelling as a mean to be in touch with another culture in addition to being a blend of excitation, emotion, awe, fatigue and struggles that make our life rich with memories. She still wonders if we are programmed to welcome the “other” or not.
							</p>
						</div>

						<div>
							<div>
								<img :src="assetPath('End', 'nono')"  alt="Placeholder"/>
							</div>
							<p>
								<strong>Noémie, vectorial drawing/ digital painting.</strong>
								<br/>
								She vectorises swifter than her shadow. Her primary source of inspiration is street art. The size of the format and the numerous colors represent a certain type of freedom that gives her opportunities to always reinvent herself. Her favorite artists ?Jo Di Bona, Noe Two, Brain Mash. She is in our team because of her numerous experiences that gave her the chance to discuss with foreigners and discover how one’s point of view can differ around the world.
							</p>
						</div>

						<div>
							<div>
								<img :src="assetPath('End', 'juju')"  alt="Placeholder"/>
							</div>
							<p>
								<strong>Juliette, scripting / storyboard </strong>
								<br/>
								Our magician who transforms our drawings in storyboard. Passionate about art and travels. She is interesting in the culture of different civilisations of our planet. Juliette chose this web documentary because it was an occasion to combine her two passions through a challenging and inspiring collaborative work. To find ideas concerning animation and music that fit with our project, she drew inspiration from electronic music video clips, very prominent in 2018, namely noticeable with the “Stranger Things” series.
							</p>
						</div>

						<div>
							<div>
								<img :src="assetPath('End', 'nassim')"  alt="Placeholder"/>
							</div>
							<p>
								<strong>Nassim, scripting</strong>
								<br/>
								Our wordsmith, huge music and American culture fan, in particular Rap and hip hop music. He is a lot into street art, precisely Banksy for his engaged works and his mysterious figure as well. He is fascinated by the clash of cultures topic, his dual culture, franco-maghrebian, gives him a direct connection to our project. He dreams of going around the world to learn about all the civilisations around the planet.
							</p>
						</div>

						<div>
								<div>
									<img :src="assetPath('End', 'lelia')"  alt="Placeholder"/>
								</div>

							<p>
								<strong>Lélia, scripting / web development.</strong>
								<br/>
								The versatile person of the team whose skillset goes from scripting to web development.  Adorer of Queen and Niki de Saint Phalle, Lelia is influenced by rock culture. She also grew up in a bicultural family with multiple origins, Polish and Italian. Graduate in Art history, she understands how exchanges and cultural diversity are important in the perception of what surrounds us.
							</p>
						</div>

						<p>
							We would like to thank profusely the following people who helped us on this project :
							<ul>
								<li>Noemie’s father : 3D</li>
								<li>Lauren/Maelle/Cyrielle : Planet 3D modelling</li>
								<li>Anthony Blanc-Nguyen: Translations</li>
								<li>Alex Lafeuille/David Sabatier: Web development</li>
								<li>Lucas Vauthier : Sound design</li>
								<li>Luc Marcenac/Nicolas Priniotakis/Brigitte Skiavi : Advice and support concerning our webdoc.</li>
							</ul>
						</p>
					</div>
					<div class="dragger-back"></div>
				</div>
				 <button @click="currentlyShowing=''">
					 <img :src="assetPath('End', 'close')"  alt="Closing button"/>
				 </button>
			 </article>
		</section>
		<section v-else-if="currentlyShowing ==='survey'">
      		<img ref="surveyTitle" :src="assetPath('End', 'BOUTON-SURVEY')"  alt="Surveys title"/>
      		<article :style="articleSize" class="surveys">
		 		<nav>
					<button :class="{'active' : currentSurvey === 'firstPlanet'}" @click="currentSurvey='firstPlanet'">Wiponia</button>
					<button :class="{'active' : currentSurvey === 'secondPlanet'}" @click="currentSurvey='secondPlanet'">Mnimeyo</button>
					<button :class="{'active' : currentSurvey === 'thirdPlanet'}" @click="currentSurvey='thirdPlanet'">Rōbaṭa</button>
					<button :class="{'active' : currentSurvey === 'fourthPlanet'}" @click="currentSurvey='fourthPlanet'">Hayawan</button>
				</nav>
				<img ref="results" class="results" :src="assetPath('End', `${currentSurvey}_map`)" alt="Background">
       			<survey v-if="imgLoaded" :isUniverse="false" :results="results" :planet="currentSurvey" ></survey>
        		<button @click="currentlyShowing=''">
         			<img :src="assetPath('End', 'close')"  alt="Closing button"/>
        		</button>
      		</article>
		</section>
	 	<section v-else-if="currentlyShowing ==='articles'">
			 <img ref="articlesTitle" :src="assetPath('End', 'BOUTON-ARTICLES')"  alt="Articles title"/>
			 <article :style="articleSize" class="articles">
				 <nav>
					<button :class="{'active' : currentArticle === 'Wiponia'}" @click="currentArticle='Wiponia'">Wiponia</button>
					<button :class="{'active' : currentArticle === 'Mnimeyo'}" @click="currentArticle='Mnimeyo'">Mnimeyo</button>
					<button :class="{'active' : currentArticle === 'Rōbaṭa'}" @click="currentArticle='Rōbaṭa'">Rōbaṭa</button>
					<button :class="{'active' : currentArticle === 'Hayawan'}" @click="currentArticle='Hayawan'">Hayawan</button>
				 </nav>
				 <component :is="currentArticle"></component>
				 <button @click="currentlyShowing=''">
					 <img :src="assetPath('End', 'close')"  alt="Closing button"/>
				 </button>
			 </article>
		 </section>

	  <nav class="menu" v-else>
		  	<button @click="currentlyShowing ='history'">
				<div :style="buttonSize"></div>
				<img :src="assetPath('End', 'BOUTON-HISTORY')" ref="buttonImg" alt="End screen Button"/>
			</button>
			<button @click="currentlyShowing ='creators'">
				<div :style="buttonSize"></div>
				<img :src="assetPath('End', 'BOUTON-CREATORS')" alt="End screen Button"/>
			</button>
			<button @click="currentlyShowing ='survey'">
				<div :style="buttonSize"></div>
				<img :src="assetPath('End', 'BOUTON-SURVEY')" alt="End screen Button"/>
			</button>
			<button @click="currentlyShowing ='articles'">
				<div :style="buttonSize"></div>
				<img :src="assetPath('End', 'BOUTON-ARTICLES')"  alt="End screen Button"/>
			</button>
	  </nav>
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

//articles import
import Wiponia from "@/components/articles/planet1";
import Mnimeyo from "@/components/articles/planet2";
import Rōbaṭa from "@/components/articles/planet3";
import Hayawan from "@/components/articles/planet4";

//surveys import
import Survey from "@/components/surveys/survey";
export default {
	name: "End",
	data() {
		return {
			currentlyShowing: "",
			currentArticle: "Wiponia",
			currentSurvey: "firstPlanet",
			buttonSize: {},
			articleSize: {},
			results: {},
			imgLoaded: false
		};
	},
	components: {
		Wiponia,
		Mnimeyo,
		Rōbaṭa,
		Hayawan,
		Survey
	},
	computed: {},
	methods: {
		updateSize() {
			this.results = this.$refs.results;
			if (this.currentlyShowing === "") {
				let ratio = getObjectFitSize(
					false,
					this.$refs.buttonImg.clientWidth,
					this.$refs.buttonImg.clientHeight,
					4651,
					388
				);
				this.buttonSize = {
					width: `${ratio.width}px`,
					height: `${ratio.height}px`
				};
			} else {
				let ratio = getObjectFitSize(
					true,
					this.$refs[`${this.currentlyShowing}Title`].clientWidth,
					this.$refs[`${this.currentlyShowing}Title`].clientHeight,
					4651,
					388
				);
				this.articleSize = {
					width: `calc(${ratio.width}px - 1%)`,
					// height: `${6 * ratio.height}px`,
					// top: `${ratio.y}px`,
					left: `${ratio.x}px`
				};
			}
		}
	},
	watch: {
		currentlyShowing(newValue) {
			this.$nextTick().then(() => this.updateSize());
		}
	},
	created() {
		let promise = new Promise(resolve => {
			let img = new Image();
			img.onload = () =>
				resolve(this.assetPath("End", `${this.currentSurvey}_map`));
			img.src = this.assetPath("End", `${this.currentSurvey}_map`);
		});
		promise.then(() => {
			this.imgLoaded = true;
		});
	},
	mounted() {
		this.updateSize();
		window.addEventListener("resize", this.updateSize);
		this.$store.commit("toggleCredits", true);
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.updateSize);
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.endScreen {
	// display: grid;
	// grid-template-columns: 1fr;
	// grid-template-rows: 25% 75%;
	width: 100vw;
	height: 100vh;

	> img:first-of-type {
		height: 100vh;
		width: 100vw;
		object-fit: cover;
		object-position: center;
		position: absolute;
		left: 0;
		top: 0;
	}

	> img:nth-of-type(2) {
		height: 27vh;
		width: 24vw;
		margin: 2.5% 25% auto 55%;
		object-fit: contain;
		object-position: center;
		position: relative;
	}

	section {
		margin: auto 0 auto auto;
		width: 60%;
		position: relative;
		display: flex;
		height: 61%;
		flex-direction: column;
		justify-content: space-around;

		& > img {
			height: 13.9%;
			width: 90%;
			object-fit: contain;
			object-position: center;
		}

		article {
			border: 4px solid rgba(white, 0.4);
			color: rgba(225, 225, 225, 0.95);
			position: relative;
			height: 80%;
			font-family: Roboto;
			text-align: left;
			font-size: 1.05vw;
			display: flex;
			flex-direction: column;

			&.creators {
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
					right: 0;
					padding: 0.5% 0;
					height: 87%;
					margin: auto 0 auto auto;

					> div {
						height: 90%;
						padding: 0.5% 1%;

						& > * {
							// padding-right: 2.5%;
							padding: 0 3.5% 0 1%;
						}

						> div {
							// display: flex;
							// align-items: center;
							// width: 100%;
							display: grid;
							grid-template-columns: 30% 70%;

							p {
								display: flex;
								flex-direction: column;
								justify-content: center;
							}

							div {
								display: flex;
								height: 56%;
								width: 85%;
								// border: 4px solid rgba(white, 0.4);
								border: 4px solid rgba(white, 0.2);
								margin: auto;
								background-color: rgba(#1a1a39, 0.9);

								img {
									height: 90%;
									width: 100%;
									object-fit: contain;
									object-position: center;
									margin: auto;
									opacity: 0.9;
								}
							}
						}
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

			& > button {
				width: 7.5%;
				height: 7.5%;
				margin: auto 0 0.75% auto;
				z-index: 4;

				img {
					height: 100%;
					width: 100%;
					object-fit: contain;
					object-position: center;
				}
			}

			h3 {
				font-size: 1.05vw;
				margin: 0;
				height: 12.5%;
				display: flex;
				align-items: center;
			}

			nav {
				display: flex;
				height: 12.5%;

				button {
					width: 25%;
					color: rgba(white, 0.9);
					font-weight: bold;
					transition: background-color 0.25s ease-out;
					font-size: 1.05vw;

					&.active {
						background-color: #9700c7;
					}
				}
			}
			&.articles > div {
				height: 75%;

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
					right: 0;
					padding: 0.5% 1.5%;
					height: 100%;
					margin: auto 0 auto auto;

					> div {
						height: 90%;
						padding: 0.5% 1%;

						img {
							width: 12.5%;
							height: 1.5%;
							object-fit: contain;
							object-position: left center;
						}

						& > * {
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

			& > button {
				width: 7.5%;
				height: 7.5%;
				margin: auto 0 0.75% auto;

				img {
					height: 100%;
					width: 100%;
					object-fit: contain;
					object-position: center;
				}
			}
		}
	}

	.surveys {
		// width: 90%;
		> img {
			height: 67.5%;
			width: 100%;
			object-fit: contain;
		}

		.topRightPart {
			font-size: 10px;
		}

		.questions {
			position: relative;
			// bottom: 50%;

			nav {
				width: 87.5%;
				margin: 0 auto;
			}

			button {
				width: auto !important;
				font-size: 0.95vw;
			}
		}
	}

	nav.menu {
		margin: 5% 0 auto auto;
		width: 65%;
		position: relative;

		button {
			width: 80%;
			height: 16%;
			margin: 0 auto 0.6% 0;
			position: relative;
			box-sizing: border-box;

			div {
				position: absolute;
			}

			&:hover div {
				background-color: rgba(#ad42ac, 0.25);
			}

			img {
				height: 100%;
				width: 100%;
				object-fit: contain;
				object-position: center;
			}
		}
	}
}
</style>
