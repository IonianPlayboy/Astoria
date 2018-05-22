<template>
	<div id="app">
		<transition name="fade-trans">
			<component
				:is="currentScene"
			></component>
		</transition>
		<transition name="fade-trans">
			<aside :class="{end: currentScene === 'End'}" v-if="showCredits">
				This website was made by students enrolled in the bachelor’s degree « Métiers du numérique » at Cergy-Pontoise University.
				<br/>
				Website host contact : 1&1 Internet SARL - 7, place de la Gare - BP 70109 - 57201 Sarreguemines Cedex /Tel : 0970 808 911
			</aside>
		</transition>
	</div>
</template>
<script>
// import Firebase from "firebase";

// let config = {
// 	apiKey: "AIzaSyAyeLXWj4BFuAlbmhbwy3ehVIrlg9VdozI",
// 	authDomain: "astoria-webdoc.firebaseapp.com",
// 	databaseURL: "https://astoria-webdoc.firebaseio.com",
// 	projectId: "astoria-webdoc",
// 	storageBucket: "astoria-webdoc.appspot.com",
// 	messagingSenderId: "206465159521"
// };

// let app = Firebase.initializeApp(config);
// let db = app.database();
import axios from "axios";
import Home from "@/scenes/Home";
import About from "@/scenes/About";
import Intro from "@/scenes/Intro";
import Map from "@/scenes/Map";
import FirstPlanet from "./scenes/FirstPlanet.vue";
import SecondPlanet from "./scenes/SecondPlanet.vue";
import ThirdPlanet from "./scenes/ThirdPlanet.vue";
import FourthPlanet from "./scenes/FourthPlanet.vue";
import Conclusion from "@/scenes/Conclusion";
import End from "@/scenes/End";
import ResultsStore from "./store/ResultsStore";

export default {
	name: "app",
	components: {
		Home,
		About,
		Intro,
		Map,
		FirstPlanet,
		SecondPlanet,
		ThirdPlanet,
		FourthPlanet,
		Conclusion,
		End
	},
	computed: {
		currentScene() {
			return this.$store.state.currentScene;
		},
		showCredits() {
			return this.$store.state.showCredits;
		}
	},
	created() {
		axios
			.get("https://astoria-webdoc.firebaseio.com/countriesList.json")
			.then(res => {
				let data = res.data;
				let places = [];
				for (let p in data) {
					places.push(p);
				}
				ResultsStore.methods.setPlaces(places);
				this.$store.dispatch("settingCountries", data);
			})
			.catch(err => console.log(err));
		axios
			.get("https://astoria-webdoc.firebaseio.com/resultsList.json")
			.then(res => {
				let data = res.data;
				console.log(data);
				this.$store.dispatch("settingResults", data);
			})
			.catch(err => console.log(err));

		axios
			.get("https://astoria-webdoc.firebaseio.com/resultsList.json")
			.then(res => {
				let data = res.data;
				ResultsStore.methods.setResults(data);
			})
			.catch(err => console.log(err));
	},
	mounted() {
		document.querySelector("body").click();
	}
};
</script>
<style lang="scss">
body {
	margin: 0;
	overflow: hidden;
}

#app {
	font-family: "Cantarell", "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #4f7aa5;
	background-color: #222244;
	height: 100vh;
	width: 100vw;
	position: relative;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.a-exact-active {
	color: #42b983;
}

button {
	background: none;
	border: none;
	cursor: pointer;
	font: inherit;
	color: inherit;
}

#app > aside {
	position: absolute;
	bottom: 1.5%;
	font-size: 0.6vw;
	color: rgba(white, 0.75);
	font-family: Cantarell;
	// margin: 0 auto;
	display: inline-block;
	left: 50%;
	right: 50%;
	transform: translate(-50%, 0);
	width: 45%;
	line-height: 1.25;

	&.end {
		left: 67.5%;
	}
}

.fade-trans-enter-active {
	transition: opacity 0.5s ease-out;
}
.fade-trans-enter {
	opacity: 0;
}
.fade-trans-leave-active {
	transition: opacity 0.5s ease-out;
	opacity: 0;
}
</style>
