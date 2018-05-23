<template>
  <div>
	   <!-- @ended="$store.dispatch('changingScene', 'End')" -->
	  	<video v-if="animationOn" ref="video" preload @ended="animationOn = false">
			<source :src="assetPath('Conclusion', 'Conclusion', 'webm')" type="video/webm">
			<source :src="assetPath('Conclusion', 'Conclusion', 'mp4')" type="video/mp4">
		</video>
		<section class="conclusion" v-else>
			<img :src="assetPath('Conclusion', 'Fond')" alt="Background">
			<div>
				<img :src="assetPath('Conclusion', 'astoria-titre')" alt="Astoria title">
				<div v-bar>
					<div>
						<p>
							You think only culture define our choices?
							<br/>
							Think again ! Through the Astoria polls, haven’t you noticed that in a culture each person has a personal identity?

						</p>
						<p>
							Aristotle, a Greek philosopher from ancient times, demonstrates that the faculties of men can develop only within a city. History continues to show that nothing is less unstable and problematic than living together. The English philosopher Hobbes explains that in order to keep what we possess we must beware of everyone and fight against others. This is what happens when two cultures clash: each of them may want to privilege and overestimate its own culture leading to a refusal of opening to other cultures. This is what we call ethnocentrism. Claude Levi Strauss, a French anthropologist and ethnologist, affirms that the oldest behaviour is to reject any culture that does not comply with the norm we live by.
						</p>
							The place of culture is important, so are we prisoners of it?
						<p>
							From birth, we receive one or more cultures as heritage. However, each person benefits from collective identity, but also builds a personal identity on top when one is free from the rules and values of this collective consciousness. So we can have a divergence within the same culture.
						</p>
						<p>
							The modern world has allowed more exchanges between continents, especially through media that allow for a greater openness to other cultures. But also through travels, education, art, etc...
						</p>
						<p>
							Even if we create our own personal identity, we remain conscious of our cultural identity. To leave one’s culture is not necessarily a voluntary, conscious and thoughtful act. It is not enough to decide to no longer be ourselves to become someone else. We define ourselves and redefine our history and actions as we move forward.
						</p>
						<p>
							With globalization, mankind tends to open up to the world, and therefore encourage the emergence of a global culture.
						</p>
						<div class="dragger-back"></div>
					</div>

			</div>
			<button @click="$store.dispatch('changingScene', 'End')">NEXT <span>►</span></button>
			</div>

		</section>
		<audio ref="audio">
    	<source ref="audio" :src="assetPath('Sounds', 'ASTORIA_Conclusion', 'mp3')" type="audio/mp3">
 	 </audio>
  </div>
</template>

<script>
import axios from "axios";
export default {
	name: "Conclusion",
	data() {
		return {
			animationOn: true
		};
	},
	computed: {
		player() {
			return this.$store.state.player;
		}
	},
	mounted() {
		this.$refs.video.play();
		this.$refs.audio.play();
		// console.log(this.$refs.audio);
	},
	created() {
		let data = {
			choices: this.player.choices,
			from: this.player.from
		};
		axios
			.post(
				"https://astoria-webdoc.firebaseio.com/resultsList.json",
				data
			)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	},
	methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
video:first-of-type {
	height: 100vh;
	width: 100vw;
	object-fit: cover;
	object-position: center bottom;
	position: absolute;
	left: 0;
	top: 0;
}

section.conclusion {
	color: rgba(225, 225, 225, 0.95);
	position: relative;
	height: 80%;
	font-family: Roboto;
	text-align: left;
	font-size: 1.05vw;
	display: grid;

	button {
		border: 2px solid rgba(225, 225, 225, 0.95);
		border-radius: 10px;
		border-radius: 1vw;
		padding: 1.5%;
		position: relative;
		display: flex;
		justify-content: space-between;
		width: 14%;
	}
	& > img:first-of-type {
		height: 100vh;
		width: 100vw;
		object-fit: cover;
		object-position: center;
		position: absolute;
		left: 0;
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
		width: 40%;
		right: 0;
		padding: 0.5% 2.5%;
		height: 65%;
		margin: 5% 0 auto auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;

		> img {
			width: 75%;
			height: 12.5%;
			object-fit: contain;
			object-position: left center;
			position: relative;
		}

		> div {
			height: 75%;

			div {
				padding: 0 0.15%;
			}

			div > * {
				padding-right: 2.5%;
			}
		}
	}
}
</style>
