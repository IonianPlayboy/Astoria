<template>
  	<video preload autoplay @ended="$store.dispatch('changingScene', 'Map')">
			<!-- <source :src="assetPath('Map', 'Fusée-fumée', 'webm')" type="video/webm"> -->
			<!-- <source :src="assetPath('Website', 'chargement', 'mp4')" type="video/mp4"> -->
			<source :src="assetPath('Website', 'chargement', 'webm')" type="video/webm">
	</video>
</template>

<script>
export default {
	name: "Intro",
	data() {
		return {};
	},
	computed: {},
	mounted() {},
	methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
video:first-of-type {
	height: 100vh;
	width: 100vw;
	object-fit: cover;
	object-position: center top;
	position: absolute;
	left: 0;
	top: 0;
}
</style>
