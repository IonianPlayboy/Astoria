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
					"Hello ! Welcome to Mnimeyo. Here, We have the most beautiful heritage of all Astoria. We are also particularly attentive to the cultural legacy of our planet. That’s why our planet is considered the one to host the most exquisite monuments and with the most well preserved cultural and natural heritage."
			},
			{
				speaker: "player",
				text: "It’s really awesome to have such a wonderful planet."
			},
			{
				speaker: "guard",
				text:
					"The country’s economy relies on the many travellers who come here to contemplate Mnimeyo. Unfortunately Our planet is deteriorating year after year as a result of the flock of visitors who don’t respect our fragile lands. For example, our places of worship are being damaged and our heritage is being threatened due to the construction of new buildings to host the travellers. Furthermore, they take so many selfies in front of our memorials… That’s why, to preserve our wealth, our leader is willing to forbid the access to our planet to visitors. "
			}
		],
		choices: [
			"Should natural and cultural resources be protected in order to maintain them ?",
			"Do you think it is relevant to visit a place where crimes against humanity occured for educational purposes ?"
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
