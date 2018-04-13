<template>
	<div id="app">
		<!-- <div id="nav">
			<a @click="currentScene = 'Home'">Home</a> |
			<a @click="currentScene = 'About'">About</a>
		</div> -->
		<component
			:is="currentScene"
		></component>
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

import Home from "@/scenes/Home";
import About from "@/scenes/About";
import Map from "@/scenes/Map";
import FirstPlanet from "./scenes/FirstPlanet.vue";
import SecondPlanet from "./scenes/SecondPlanet.vue";
import ThirdPlanet from "./scenes/ThirdPlanet.vue";
import FourthPlanet from "./scenes/FourthPlanet.vue";
export default {
	name: "app",
	components: {
		Home,
		About,
		Map,
		FirstPlanet,
		SecondPlanet,
		ThirdPlanet,
		FourthPlanet
	},
	// firebase: {
	// 	countries: db.ref("countriesList")
	// },
	computed: {
		currentScene() {
			return this.$store.state.currentScene;
		}
	}
	// created() {
	// 	this.$store.dispatch("gettingCountries");
	// }
};
</script>
<style>
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
</style>
