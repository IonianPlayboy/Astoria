<template>
  <main class="home">
	  	<img :src="assetPath('Website', 'fond_accueil', 'jpg')" alt="Home page background">
		<transition-group  name="fade">
			<video @ended="loadingEnded()" key="video" v-if="loading" autoplay :src="assetPath('Intro', 'Intro Astoria', 'mp4')" :poster="assetPath('Intro', 'Intro')" alt="Loading animation"></video>
			<section key="home" class="home" v-else-if="!enteringInfos">
				<div class="accueil">
					<img class="logo" :src="assetPath('Website', 'AstoriaLogo4')" alt="Astoria Logo">
					<button @click="enteringInfos = true" class="bouton1">START THE JOURNEY</button>
				</div>
			</section>
			<section key="form" v-else-if="showRules === false">
				<div class="accueil">
					<img class="logo" :src="assetPath('Website', 'AstoriaLogo4')" alt="Astoria Logo">
					<form>
						<input type="text" v-model="currentUsername" placeholder="USERNAME" @enter.prevent="loading = loading">
						<tol-dropdown
						:dropdownName="'COUNTRY'"
						:dropdownList="countriesList"
						:text-only="true"
						:currently-selected="currentCountry"
						@selectingItem="selectCountry"
					>
					</tol-dropdown>
					</form>
					<transition name="fade-button">
						<button @click="showRules = true" class="next" v-if="currentUsername !== '' && currentCountry !== '' ">
							<img :src="assetPath('Website', 'bouton suivant')" alt="Next button">
						</button>
					</transition>
				</div>
			</section>
			<section key="rules" class="rules" v-else>
				<div class="accueil">
					<img class="logo" :src="assetPath('Website', 'AstoriaLogo4')" alt="Astoria Logo">

					<h2>RULES :</h2>
					<p>
						You are Ulysses, your planet has just died ! You’re crossing the galaxy in search of a new home. Each planet you’ll visit is authentic and have different cultural characteristics. Guards are posted at the entrance of each of them. Answer their questions with honesty in the allocated time to choose at the end, your favorite planet to live in.
					</p>
					<p>
						Be careful, the clock is ticking!
						<br/>
						You only have a few seconds to answer their questions. If you don’t, you have to restart the game.
					</p>
					<button @click="startAdventure()" class="next" v-if="currentUsername !== '' && currentCountry !== '' ">
						<img :src="assetPath('Website', 'bouton suivant')" alt="Next button">
					</button>
				</div>
			</section>
		</transition-group>


  </main>
</template>
<script>
import tolDropdown from "@/components/toolBox/dropdown";
export default {
	name: "home",
	data() {
		return {
			loading: true,
			enteringInfos: false,
			currentUsername: "",
			currentCountry: "",
			showRules: false
		};
	},
	components: {
		tolDropdown
	},
	computed: {
		countriesList() {
			return this.$store.getters.countriesList;
		},
		countries() {
			return this.$store.state.countries;
		}
	},
	methods: {
		selectCountry(item) {
			this.currentCountry = item;
		},
		startAdventure() {
			this.$store.dispatch("settingPlayerName", this.currentUsername);
			let playerOrigin;
			Object.entries(this.countries).forEach(element => {
				if (element[1].some(country => country === this.currentCountry))
					playerOrigin = element[0];
			});
			this.$store.dispatch("settingPlayerOrigin", playerOrigin);
			this.$store.commit("toggleCredits", false);
			this.$store.dispatch("changingScene", "Intro");
		},
		loadingEnded() {
			this.loading = false;
			this.$store.commit("toggleCredits", true);
		}
	}
};
</script>

<style lang="scss">
video {
	height: 100vh;
	width: 100vw;
	object-fit: cover;
	object-position: center;
	position: absolute;
	left: 0;
}

main {
	height: 100%;
	text-shadow: 1px 1px 35px #fefefe;

	// & > button {
	// 	position: absolute;
	// 	z-index: 1;
	// 	top: 0;
	// 	margin: 0 auto;
	// }

	& > span {
		display: flex;
		height: 100%;
		width: 100%;
	}

	& > img {
		height: 100vh;
		width: 100vw;
		object-fit: cover;
		object-position: center;
		position: absolute;
		left: 0;
	}
}

.home section {
	font-family: "Quicksand", sans-serif;
	font-size: 0.975vw;
	height: 70%;
	width: 70%;
	position: relative;
	// bottom: 6.5%;
	display: grid;
	grid-template-columns: 25% 50% 25%;
	grid-template-areas: "left center right";
	margin: auto;
	bottom: 2.5%;

	button {
		border-radius: 4px;
		border: none;
		text-align: center;
		transition: background-color 0.5s, box-shadow 0.5s, transform 0.5s;
		cursor: pointer;
	}

	&.home button:hover {
		background-color: #9d2fdc;
	}

	&.home button:active {
		background-color: #fefefe;
		box-shadow: 0 5px #9d2fdc;
		transform: translateY(4px);
	}
}

nav {
	grid-area: right;
	margin-top: 0;
	font-size: 0.7vw;
}

nav a {
	color: #ffffff;
	border-right: 1px solid white;
	padding: 0 0.65vw;
}

a {
	text-decoration: none;
	color: #fefefe;
	cursor: pointer;
}
// .createurs {
// 	padding-left: 0;
// }

.university {
	border-right: none;
}

.accueil {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	grid-area: center;
	height: 90%;
}

.logo {
	// width: 35vw;
	// height: calc(25vw * 0.8);
	margin-top: -5%;
	height: 40vh;
	width: 35vw;
	object-fit: contain;
	object-position: center;
}

.bouton1 {
	position: relative;
	bottom: 10%;
	background: none;
	font-size: inherit;
	border: 2px #fefefe solid !important;
	text-shadow: 1px 1px 35px #fefefe;
	text-align: center;
	color: #fefefe;
	width: 15vw;
	padding: 0.8vw;
	font-weight: bold;
}

form {
	position: relative;
	bottom: 10%;
	display: flex;
	width: 20vw;
	justify-content: space-between;

	input {
		background: none;
		font-size: inherit;
		border: 2px #fefefe solid;
		text-shadow: 1px 1px 35px #fefefe;
		text-align: center;
		color: #fefefe;
		width: 7vw;
		padding: 0.8vw;
		border-radius: 4px;

		&::placeholder {
			color: #fefefe;
			opacity: 0.75;
		}
	}
}

.rules {
	.accueil {
		height: 70%;
	}
	.logo {
		margin-top: 0;
		height: 30vh;
		width: 27vw;
	}
	h2,
	p {
		position: relative;
		bottom: 5%;
	}
	h2 {
		margin: 0 0 1.5% 0;
	}
	p {
		margin: 0.5% 0;
	}
	font-weight: bold;
	color: #fefefe;
}

.dropdown {
	width: 7vw;
	border: 2px solid #fefefe !important;
	text-shadow: 1px 1px 35px #fefefe;
	color: #fefefe;
	padding: 0.8vw;
	border-radius: 4px;

	.dropdownMenu {
		left: 0;
		border: 2px solid rgba(#fefefe, 0.75) !important;
		background-color: rgba(149, 173, 190, 0.3);
		text-shadow: 5px 5px 25px white;

		& > div {
			height: 25vh;
			background: linear-gradient(
				to right,
				rgba(64, 64, 191, 0) 0%,
				rgba(74, 134, 150, 0.46) 50%,
				rgba(64, 64, 191, 0) 100%
			);
		}
	}
}

.next {
	position: absolute;
	right: 1%;
	bottom: 11%;

	img {
		height: 4.5vh;
		width: 3vw;
		object-fit: contain;
		object-position: center;
	}
}
.fade-button-enter-active {
	transition: opacity 0.3s ease-out;
}
.fade-button-enter {
	opacity: 0;
}
.fade-button-leave-active {
	transition: opacity 0.3s ease-out;
	opacity: 0;
}

.fade-enter-active {
	transition: opacity 0.3s ease-out;
	position: absolute !important;
	right: 0;
	overflow: hidden;
}

section.fade-enter-active {
	height: 70%;
	width: 70%;
	left: 50%;
	transform: translate(-50%);
	top: -2.5%;
}

.fade-enter {
	opacity: 0;
}

.fade-leave-active {
	transition: opacity 0.3s ease-out;
	opacity: 0;
	position: absolute !important;
	right: 0;
	overflow: hidden;
}

section.fade-leave-active {
	height: 70%;
	width: 70%;
	left: 50%;
	transform: translate(-50%);
	top: -2.5%;
}

.vb > .vb-dragger {
	z-index: 5;
	width: 12px;
	right: -5px;
	will-change: top, height;
}

$scrollbarColor: #fefefe;

.vb-dragger .vb-dragger-styler {
	backface-visibility: hidden;
	transform: rotate3d(0, 0, 0, 0);
	transition: background-color 100ms ease-out, height 100ms ease-out;
	background-color: rgba($scrollbarColor, 0.55);
	margin: 0;
	height: 100%;
	display: block;
}

.vb-dragger:hover .vb-dragger-styler {
	background-color: rgba($scrollbarColor, 1);
	height: 100%;
}

.vb-dragging .vb-dragger-styler {
	background-color: rgba($scrollbarColor, 0.9);
	height: 100%;
}

.vb-dragging-phantom .vb-dragger .vb-dragger-styler {
	background-color: rgba($scrollbarColor, 1);
}
</style>

