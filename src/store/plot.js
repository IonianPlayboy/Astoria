const state = {
	firstPlanet: {
		dialog: [
			{
				speaker: "guard",
				text: "Stop right there, stranger ! Show me your gun !"
			},
			{
				speaker: "player",
				text:
					"What gun ? I don’t have any ! Why are you asking me that ?"
			},
			{
				speaker: "guard",
				text:
					"On this planet, guns are used as ID by their owners. How could I know who you are without it ?"
			},
			{
				speaker: "player",
				text:
					"I’m sorry, i’m just a visitor. Can you tell me the name of this planet ?"
			},
			{
				speaker: "guard",
				text:
					"You’re on Wiponia. Since a century ago, everyone owns a gun here, it’s your identity, it proves that you come from this planet."
			},
			{
				speaker: "guard",
				text:
					"Our legal system is based on self-defense, and when you are born, we give you an arm."
			},
			{
				speaker: "guard",
				text:
					"Everyone knows how to defend oneself against strangers like you. It’s the law if you wish to live here, it’s quite simple !"
			},
			{
				speaker: "guard",
				text:
					"But a lot of protests have been happening lately. Some people do not agree with our politics, they are regarding firearms as a threat to their safety."
			},
			{
				speaker: "guard",
				text:
					"We’re in the middle of a big crisis right now. Our system has never been criticized by anyone before."
			}
		],
		choices: [
			"Would you allow the possession/use of firearms for self defense ?",
			"Should all means of self-defense be legalized ?"
		]
	},
	secondPlanet: {
		dialog: [
			{
				speaker: "guard",
				text:
					"Hello ! Welcome to Mnimeyo. Here, We have the most beautiful heritage of all Astoria."
			},
			{
				speaker: "guard",
				text:
					"We are also particularly attentive to the cultural legacy of our planet."
			},
			{
				speaker: "guard",
				text:
					"That’s why our planet is considered the one to host the most exquisite monuments and with the most well preserved cultural and natural heritage."
			},
			{
				speaker: "player",
				text: "It’s really awesome to have such a wonderful planet."
			},
			{
				speaker: "guard",
				text:
					"The country’s economy relies on the many travellers who come here to contemplate Mnimeyo."
			},
			{
				speaker: "guard",
				text:
					"Unfortunately our planet is deteriorating year after year as a result of the flock of visitors who don’t respect our fragile lands."
			},
			{
				speaker: "guard",
				text:
					"For example, our places of worship are being damaged and our heritage is being threatened due to the construction of new buildings to host the travellers."
			},
			{
				speaker: "guard",
				text:
					"Furthermore, they take so many selfies in front of our memorials…"
			},
			{
				speaker: "guard",
				text:
					"That’s why, to preserve our wealth, our leader is willing to forbid the access to our planet to visitors."
			}
		],
		choices: [
			"Should natural and cultural resources be protected in order to maintain them ?",
			"Do you think it is relevant to visit a place where crimes against humanity occured for educational purposes ?"
		]
	},
	thirdPlanet: {
		dialog: [
			{
				speaker: "guard",
				text:
					"Hi ! Welcome to Rōbaṭa. What a surprise! It’s been a long time since we have seen the last of your kind."
			},
			{
				speaker: "guard",
				text:
					"Here, there are only robots, the other species have gone extinct and we run our world with an iron hand."
			},
			{
				speaker: "player",
				text: "You never see any other species?"
			},
			{
				speaker: "guard",
				text:
					"Not anymore. We were once created a long ago because infertility increased among women."
			},
			{
				speaker: "guard",
				text:
					"Our creators wanted to save their species from extinction so, they created us and transplanted female reproductive organs in our bodies."
			},
			{
				speaker: "guard",
				text:
					"But all the other species disappeared and over time we were the only one left."
			},
			{
				speaker: "player",
				text:
					"So, this is what we call natural selection. What are you going to do concerning your own evolution?"
			},
			{
				speaker: "guard",
				text:
					"At the moment, we are experimenting on live animals to be able to evolve. For example, we are researching how to gain infrared vision or an animal’s sixth sense."
			}
		],
		choices: [
			"Would you breed with a robot if it was the only way to perpetuate human kind ?",
			"Would you remove organs from animals in order to save human beings ?"
		]
	},
	fourthPlanet: {
		dialog: [
			{
				speaker: "guard",
				text:
					"Hello ! Welcome to Hayawan. Did you come to watch our big arena game? You'll have a front-row seat to watch the big tournament !"
			},
			{
				speaker: "player",
				text: "Your big arena game?"
			},
			{
				speaker: "guard",
				text:
					"Yes, It’s a big tournament deeply rooted in our cultural tradition ! Everyone comes here precisely on every 5 of the month to attend this mythic game !"
			},
			{
				speaker: "player",
				text: "How do you play this game ?"
			},
			{
				speaker: "guard",
				text:
					"There are two types of players :  the oppressors and the oppressed. Each player is equipped with a spear to fight and must put down the opponent."
			},
			{
				speaker: "guard",
				text: "The victory is always on the side of the oppressors."
			},
			{
				speaker: "player",
				text: "What happens to the winners and the losers ?"
			},
			{
				speaker: "guard",
				text:
					"The winners are placed in captivity and have the right to live in absolute comfort and security."
			},
			{
				speaker: "guard",
				text:
					"They represent the future of our civilisation and they will perpetuate our species in an ideal environment."
			},
			{
				speaker: "guard",
				text: "On the contrary, the losers are isolated and exploited."
			},
			{
				speaker: "player",
				text: "But why the oppressed don’t try to insurrect ?"
			},
			{
				speaker: "guard",
				text:
					"They represent a small portion of our population, therefore, they would be crushed by the oppressors."
			}
		],
		choices: [
			"Should we allow bullfighting in the name of tradition ?",
			"Should we keep animals in captivity to preserve their species ?"
		]
	}
};
const getters = {};
const mutations = {};
const actions = {};
const modules = {};

export default {
	state,
	getters,
	mutations,
	actions,
	modules
};
