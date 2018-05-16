<template>
	<div>
    <div class="leftPart">
  		<img :class="{'title': planet!= 'thirdPlanet', 'title3' : planet == 'thirdPlanet'}" :src="assetPath('Surveys', planet+'/Titre')" alt="Planet name" v-if="isUniverse">
  		<img class="question" :src="assetPath('Surveys', planet+'/Question'+(question+1))" alt="Question" v-if="isUniverse">
  		<img class="barH" :src="assetPath('Surveys', 'barreHorizontale')" v-if="isUniverse">
      <input class="nextBtn" @click="nextQuestion()" v-if="isUniverse && question != 1" type="image" :src="assetPath('Surveys', nQuestion)" alt="Read the article" width="150" height="50">
      <input class="nextBtn" @click="viewArticle()" v-if="isUniverse && question == 1" type="image" :src="assetPath('Surveys', 'Read the article')" alt="Read the article" width="150" height="50">
    </div>
    <div class="topRightPart">
      <div id="nAmerica" @mouseover="changeText('NorthAmerica')">
        {{datas['NorthAmerica']}}%</br>{{(100-datas['NorthAmerica'])}}%
      </div>
      <div id="sAmerica" v-on:mouseover="changeText('SouthAmerica')">
        {{datas['SouthAmerica']}}%</br>{{(100-datas['SouthAmerica'])}}%
      </div>
      <div id="nAfrica" v-on:mouseover="changeText('NorthAfrica')">
        {{datas['NorthAfrica']}}%</br>{{(100-datas['NorthAfrica'])}}%
      </div>
      <div id="ssAfrica" v-on:mouseover="changeText('SubSaharanAfrica')">
        {{datas['SubSaharanAfrica']}}%</br>{{(100-datas['SubSaharanAfrica'])}}%
      </div>
      <div id="europe" v-on:mouseover="changeText('Europe')">
        {{datas['Europe']}}%</br>{{(100-datas['Europe'])}}%
      </div>
      <div id="mEast" v-on:mouseover="changeText('MiddleEast')">
        {{datas['MiddleEast']}}%</br>{{(100-datas['MiddleEast'])}}%
      </div>
      <div id="sAsia" v-on:mouseover="changeText('SouthAsia')">
        {{datas['SouthAsia']}}%</br>{{(100-datas['SouthAsia'])}}%
      </div>
      <div id="nAsia" v-on:mouseover="changeText('NorthAsia')">
        {{datas['NorthAsia']}}%</br>{{(100-datas['NorthAsia'])}}%
      </div>
      <div id="eAsia" v-on:mouseover="changeText('EastAsia')">
        {{datas['EastAsia']}}%</br>{{(100-datas['EastAsia'])}}%
      </div>
      <div id="oceania" v-on:mouseover="changeText('Oceania')">
        {{datas['Oceania']}}%</br>{{(100-datas['Oceania'])}}%
      </div>
    </div>
    <div class="botRightPart">
      <img class="barV" :src="assetPath('Surveys', 'barreVerticale')" v-if="isUniverse">
      <div class= "desc">
        <strong>{{playerName}}</strong>
        <br/><br/>
        In {{currentContinent}}, {{datas[currentContinent]}}% of the population would agree but {{(100-datas[currentContinent])}}% would not!
      </div>
    </div>
  </div>
</template>

<script>


import ResultsStore from "../../store/ResultsStore";
import PlayerStore from "../../store/player";
export default {
	name: "survey",
	data() {
		return {
      question: 0,
      nQuestion: "NextQuestion",
      playerName: "ULYSSE",
      currentContinent: "Europe",
      datas: {}
    };
	},
	computed: {},
	mounted : function() {
    this.datas = ResultsStore.methods.getPlanetResults(this.planet,this.question);
    this.playerName = this.$store.state.player.name;
  },
	methods: {
    nextQuestion(){
      this.question++;
      this.nQuestion = "Read the article";
      this.datas = ResultsStore.methods.getPlanetResults(this.planet,this.question);
    },
		viewArticle() {
			this.$emit("viewArticle");
		},
    changeText(newContinent){
      this.currentContinent = newContinent;
    }
	},
	props:
  ["isUniverse",
  "planet"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.title{
  position:absolute;
  width:30%;
  top: 35%;
}
.title3{
  position:absolute;
  width:30%;
  width:25%;
  top: 35%;
}
.question{
  position:absolute;
  width:30%;
  top: 48%;
}
.barH{
  position:absolute;
  width:10%;
  top: 55%;
}
.nextBtn{
  position:absolute;
  width: 15%;
  top: 60%;
  z-index:1;
}

.topRightPart{
    position:absolute;
    width: 100%;
    height: 100%;
    left: 34.4%;
    font-size:19px;
    text-align: center;
    z-index:1;
}
.topRightPart > #nAmerica{
  position:absolute;
  top: 41%;
}
.topRightPart > #sAmerica{
  position:absolute;
  top: 58%;
  left:6.1%;
}
.topRightPart > #nAfrica{
  position:absolute;
  top: 25%;
  left:17.7%;
}
.topRightPart > #ssAfrica{
  position:absolute;
  top: 55%;
  left:23.1%;
}
.topRightPart > #europe{
  position:absolute;
  top: 6.3%;
  left:23.7%;
}
.topRightPart > #mEast{
  position:absolute;
  top: 41.8%;
  left:36.3%;
}
.topRightPart > #sAsia{
  position:absolute;
  top: 48.7%;
  left:41.9%;
}
.topRightPart > #nAsia{
  position:absolute;
  top: 2.3%;
  left:47.6%;
}
.topRightPart > #eAsia{
  position:absolute;
  top: 31.7%;
  left:53.3%;
}
.topRightPart > #oceania{
  position:absolute;
  top: 42.8%;
  left:57.5%;
}

.botRightPart{
    position:absolute;
    top: 75%;
    left: 68%;
    width: 100%;
    height: 100%;
    z-index:0;
}

.botRightPart > .barV{
  position: relative;
  float: left;
  height: 10%;
  width:0.2%;
}

.botRightPart > .desc{
    height: %;
    width:30%;
    padding-left: 1%;
}
</style>
