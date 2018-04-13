<template>
  <div>
	<img
		v-if="isStill"
		:src="assetPath(this.characterName, currentImg)"
	/>
	<video v-else >
		<source :src="assetPath(this.characterName, currentAnim, 'webm')" type="video/webm" />
		<source :src="assetPath(this.characterName, currentAnim, 'mp4')" type="video/mp4">
	</video>
  </div>
</template>

<script>
export default {
	name: "Character",
	data() {
		return {};
	},
	computed: {},
	props: ["characterName", "isStill", "currentImg", "currentAnim"],
	methods: {
		// assetPath(asset, format = "png") {
		// 	return require(`@/assets/${this.characterName}/${asset}.${format}`);
		// }
	},
	created() {
		// let test = "./Jhin/Four.png";
		// let hey = {};
		// function importAll(r) {
		// 	r.keys().forEach(r);
		// }
		// function TimportAll(r) {
		// 	r.keys().forEach(key => (hey[key] = r(key)));
		// }
		// var exp = `^\.\/${this.characterName}\/.+$`;
		// var Texp = `/^\.\/${this.characterName}\/.+$/`;
		// var regExp = new RegExp("^./" + this.characterName + "/.+$");
		// console.log(exp);
		// console.log(regExp);
		// let yolo = regExp.exec(test);
		// console.log(`test : ${yolo}`);
		// TimportAll(require.context("@/assets/", true, /^\.\/Jhin\/.+$/));
		// TimportAll(require.context("@/assets/", true, RegExp(Texp)));
		// let promise = new Promise(resolve => {
		// 	yolo = test.search(regExp);
		// 	// TimportAll(require.context("@/assets/", true, /.+/));
		// 	// resolve(importAll(require.context("@/assets/", true, /.+/)));
		// 	resolve(true);
		// });
		// promise.then(() => console.log(hey));
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
