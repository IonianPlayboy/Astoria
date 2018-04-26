<template>
  <section class="planet">
	  <!-- <img :src="assetPath('Universes', background, 'jpg')" alt="Universe background"/>
	  <img v-if="shouldShow" class="character" :src="assetPath('Characters', 'Ulysse')" alt="Ulysse, the main character"> -->
	  	<audio autoplay loop>
    		<source :src="assetPath('Sounds', backgroundMusic, 'wav')" type="audio/wav">
 		</audio>
		<video v-show="!idle && !showArticles" ref="video1" preload autoplay muted :poster="assetPath('Universes', background, 'jpg')" @ended="idle = true" @playing="initDialog">
			<source :src="assetPath('Universes', firstAnim, 'webm')" type="video/webm">
			<!-- <source :src="assetPath('Universes', firstAnim, 'mp4')" type="video/mp4"> -->
		</video>
		<video v-show="idle && !showArticles" ref="video2" preload autoplay loop muted :poster="assetPath('Universes', background, 'jpg')">
			<source :src="assetPath('Universes', secondAnim, 'webm')" type="video/webm">
			<!-- <source :src="assetPath('Universes', secondAnim, 'mp4')" type="video/mp4"> -->
		</video>
		<transition name="fade-trans">
			<video v-show="showArticles" preload autoplay muted loop :poster="assetPath('Map', 'Fond-univers')">
			<source :src="assetPath('Universes', articleBackground, 'webm')" type="video/webm">
			<source :src="assetPath('Universes', articleBackground, 'mp4')" type="video/mp4">
		</video>
		</transition>
		<transition v-if="gameOver" name="fade-trans">
			<img  :src="assetPath('Universes', 'gameover')" alt="Game over. :c">
		</transition>
		<transition name="fade-trans" v-else-if="shouldShow && charactersTalking">
			<article

				@click="avanceDialog()"
				:style="currentTextPos"
			>
				<span>
					<span :class="plot.dialog[this.dialogAvancement].speaker">
						<strong>{{currentSpeaker.toUpperCase()}}</strong> - «
					</span>
					{{newText}}
					<span :class="plot.dialog[this.dialogAvancement].speaker">»</span>
				</span>
			</article>
		</transition>
		<transition name="fade-trans" v-else-if="shouldShow && !showArticles">
			<article class="choice" :style="currentTextPos">
			<strong>{{choices[currentChoice]}}</strong>
			<button @click="playerHasAnswered('yes')"><img :src="assetPath('Universes', 'Yes')" alt="Yes button"></button>
			<button @click="playerHasAnswered('no')"><img :src="assetPath('Universes', 'No')" alt="No button"></button>
			<aside>
				<img :src="assetPath('Universes', 'chrono')" alt="Chronometer background">
				<em>{{timeRemaining}}</em>
			</aside>
		</article>
		</transition>
		<transition v-else-if="shouldShow && showArticles">
			<article class="article">
			<!-- <img :src="assetPath('Map', 'Fond-univers')" alt="Space background">
			<img :src="assetPath('Universes', 'arme')" alt="Two characters facing with weapons">
			<img :src="assetPath('Universes', 'arme2')" alt="A character with a blade"> -->
			<div v-if="character === 'FirstCharacter'">
				<img :src="assetPath('Universes', 'TitreWiponia')" alt="Planet name">
				<div v-bar>
					<div>
						<h2>THE INVENTION OF FIREARMS</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>
							Weapons seem to predate any other human invention. Since the prehistoric ages, men would use wooden sticks and stones to build an arsenal. The use of weapons had a huge impact on the living conditions of men allowing them to satisfy two vital needs: food and protection.
						</p>
						<p>
							Therefore, the continuous improvement of weapons would let men hunt bigger preys that they would not normally capture and would also serve to protect themselves against predators, including their most important threat: themselves.
						</p>
						<strong>
							“A firearm is a lethal weapon that inflicts damage on targets by launching one or more projectiles driven by rapidly expanding high-pressure gas produced by exothermic combustion (deflagration) of propellant within an ammunition cartridge.”
						</strong>
						<p>
							Nowadays, firearms are used for hunting, a number of sports, crimes, and wars. They brought their lot of wounds and permanent injuries, along deeper mutations into military strategies.
						</p>
						<p>
							We list two main types of firearms:
							<ol>
								<li> Portable firearms, which use smaller calibers, are aimed by hand to the visible target; </li>
								<li> Artillery pieces, much more impressive in size and usually placed in batteries on a support, will be aimed indirectly using prior observation and geographic coordinates. </li>
							</ol>
						</p>
						<h2>{{'Firearms in the USA and in Japan'.toUpperCase()}}</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>
							The procurement of a rifle or a machine gun on US soil is quite simple, one could use mail order to have them delivered at their door. Even fairs frequented by families on the weekends have some on sale.
							<br/>
							Carrying a gun in the United States is a right written in the Constitution (the supreme law of the United States). This particular amendment dates back to 1791 when the first Americans were fighting for their independence and led to the birth of the United States of America.
						</p>
						<p>
							Firearms symbolize freedom to the American mind. The right to bear arms is a produce of pride, and most Americans believe everyone should be armed.
						</p>
						<p>
							Lobbying is the act of attempting to influence the actions, policies, or decisions of officials in their daily life, most often legislators or members of regulatory agencies. The United States are no stranger to this practice with powerful lobbies driving American politics. Since 2004, the National Rifle Association (NRA) spent 150-million dollars to lobby extensively on the subject of firearms. Those figures account for the expenses of lobbying as well as for the direct or indirect funding of political candidates.
							<br/>
							The NRA is 5 million members strong and reported 400-million dollars in income for the fiscal year 2016. The NRA will frequently bribe elected representatives to prevent gun-control laws to be passed.
						</p>
						<h2>
							{{'Why is Switzerland, one the most armed countries per capita, less affected by mass shootings than the United States?'.toUpperCase()}}
						</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>
							From 1986 to 2006, Martin Killias was a professor of Criminal Law, Criminal Procedural Law and Criminology at the University of Lausanne and Director of that University’s Institute of Criminology and Criminal Law. Killias’ response to the question of how Switzerland kept a low number of mass shootings even though the proportion of firearms is greater compared to the United States was the following: <strong>“The bottom line is not the number of firearms but the number of persons who have access to them. It is a fundamental difference. A few people do amass a lot of guns, however what is really key is the number of people who have access to at least one, which in proportion is way lower in Switzerland.</strong>
						</p>
						<p>
							In Switzerland, the majority of people bearing firearms are military or military-related individuals. The need to carry a gun to protect oneself or one’s family is almost nonexistent. Besides, Swiss criminal environment where a lot of misdemeanors happen has not escalated into an arms race. Your regular drug dealer would not normally carry a gun. On the contrary, in the US, it is customary for drug traffickers to be armed and so do their customers.
						</p>
						<p>
							Almost 1:1 ratio of guns per people in the United States
							<br/>
							The number of privately-owned firearms was around 270-million in 2011. This represents as many as the total population the same year which accounted for 312-million people. Which roughly translated to 88.8 guns per 100 residents.
						</p>
						<h2>{{'“In Japan, gun culture is rather absent”'.toUpperCase()}}</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>
							Japan is unquestionably the safest country in the world. They are inching close to zero crime rate and murders by firearms are rather uncommon. This has nothing to do with luck since for almost 300 years politics have been run efficiently to prevent criminality.
							<br/>
							When heated debate over gun control laws periodically arise in the United States as a new mass shooting occurs, Japan is miles away to share the same controversies. As a matter of fact, 2014 saw 6 firearms-related deaths in the land of the rising sun when Uncle Sam accounted for 33,599 lives taken the same year. A striking contrast stemming from cultural differences on the subject of firearms and especially two totally different view legally-speaking.
							<br/>
							The Second amendment to the United States Constitution protects the right of the people to keep and bear arms while Japanese Constitution bans the possession of firearms or controls the production of swords. Though a few exceptions are made, the ban has been anchored for a long time in Japanese law and society. Guns advocates will consider that crime does not come from the firearm itself rather than the one who wields it, while Japan has a practical approach: no guns, no firearms-related murders.
						</p>
						<p>
							Japan is known to be the first country in History to have written laws on the possession of firearms and made incentives to its nationals to lay down the arms. Since 1685, Japanese people were invited to exchange their weapons against a reward.
						</p>
						<p>
							Iain Overton, director of Action on Arm Violence NGO, wrote on the subject: <strong>“As soon as firearms were available on Japanse soil, the Japanese government established strict rules. It was the first country in the world to ever legislate on guns control, and this has led to a civilisation which beliefs are that firearms do not belong in the civil society.”</strong>
						</p>
						<p>
							A few centuries later, mafia thugs would rather use knives or conceal their firearms in frozen tuna. Meanwhile policemen would be unarmed until the end of the Second World War, making use of martial arts (mostly earning their black belt in judo and training into the art of kendo). Though the ban on firearms would seem a natural explanation to a low death-rate, other factors have been key to prevent criminality and preserve social stability: social cohesion, a sense of belonging to a community where everyone should play its role for the interest of all.
						</p>
						<p>
							A few statistics:
							<br/>
							The number of guns per 100 residents is 0.6 in Japan, 6.2 in the United Kingdom and a whopping 88.8 in the United States. Each year, 12 persons die of a firearms-related incident in Japan, the highest was 22 in 2007 which brought up a lot of controversy in the entire country. Quite stupendous would it be elsewhere!
						</p>
						<p>
							One on 4 American citizens possesses one or more firearms with a total of 300-million guns in the whole land of the braves.
						</p>
						<p>
							The average American will always state that: <strong>“Any citizen should have the possibility to protect oneself against armed thugs.”</strong> The death toll is up to 30,000 a year due to firearms, which equals to 60 deaths a day.
						</p>
						<h2>{{'American culture vs. French culture'.toUpperCase()}}</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>
							We have picked three questions on the subject of firearms and submitted to French and American individuals.
							<br/>
							The questions may differ on the account of being either French or American.
						</p>
						<ul>
							<li>
								<strong>Do you think that banning guns would lower crime?</strong>
								<br/>
								8 on 10 Americans opted that this would have no effect on criminality.
								<br/>
								On the contrary, French have agreed unanimously this would help.
							</li>
							<li>
								<strong>Do you own a gun? (US)</strong>
							</li>
							<li>
								<strong>Would you own a gun? (France)</strong>
								<br/>
								Half of the Americans polled did own a gun.
								<br/>
								Only 2 on 10 French people wish to have one.
							</li>

							<li>
								<strong>Should there a limit on the number of guns owned by a single individual?</strong>
								<br/>
								6 on 10 Americans do not see the need of setting a limit.
								<br/>
								While 9 on 10 French people think the limit is a necessity.
							</li>
						</ul>
						<p>
						Results analysis:
						<br/>
						It is clear that Americans cherish their right to own guns, an heritage of their culture. In addition, they seek to protect themselves as they do not trust their legal system. Whereas French people do not see the use of firearms as a mean of protection, but rather reserved to the law enforcement professionals.
						<br/>
						Therefore, citizens of France would not use firearms as they find them useless and dangerous because of their inexperience. Moreover, the thought of ever having to use a firearm is a deterrent to possessing one.
						<br/>
						On the subject of the quantity of firearms owned, in the American point of view, the logic behind the polls is that if an individual is to commit a murder, whatever the number of guns in one’s possession, one’s only need a single piece to reach one’s goal.
						</p>
					</div>

					<div class="dragger-back"></div>
				</div>
				<button @click="quitPlanet()">NEXT UNIVERSE <span>►</span></button>
			</div>
			<div v-else-if="character === 'SecondCharacter'">
			<img :src="assetPath('Universes', 'TitreMnimeyo')" alt="Planet name">
				<div v-bar>
					<div>
						<p>
							Tourism is a phenomenon that implies the moving of persons to a foreign location. If at the beginning, travelling was reserved for the most privileged, it became over time democratized. The 21st century has brought us into mass tourism, in particular with increasingly attractive offers and more destinations. On the opposite of its economic benefits, other effects have emerged that countries consider negative. For instance, touristic destinations are experiencing an increase in pollution due to increased waste or means of transportation such as boats affect biodiversity. We also talk of overbuilding when tourist-related constructions impinge on green areas.
						</p>
						<h2>{{"Making the tourists accountable".toUpperCase()}}</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">

						<p>
							A news article of Inrocks explains that in Europe, several demonstrations took place against the inconvenience implied by having too many tourists. The term <strong>tourismophobia</strong> is used to define these anti-tourist protests, a word which made its way in a Spanish article of <em>20minutos</em>. Indeed, an activist group in Spain is campaigning not against tourism nor tourists but rather against the massification of it. In Palma de Mallorca, the walls have been painted with some graffiti <em>“Stop tourism”, “Refugees welcome, Tourists go home”</em>. Another demonstration was held in Barcelona where tourism is certainly an economic pillar for the city, but it also raises housing prices, locals are feeling scammed by hotels and other tourist traps. For example, rents have increased between 9 and 18% in Barcelona. We are talking about "Folklorization", tourists think they are experiencing the traditional culture of the country but in truth, they are given a staged entertainment rather than the reality experienced by the locals. This is also the case in Thailand, where too many tourists cause a degradation of the local environment. In 2016, the government banned the use of fast boats around Phuket to avoid the destruction of coral reefs. In fact, a news article from Thailand asserts that 77% of coral reefs have been damaged.
							<br/>
							In Europe, we try to change things with sustainable tourism : they are trying to make tourists aware of their harmful behavior during their travels, make them responsible. For example, the tourist site of Venice encourages "detourism", that is to say discovering the city like the Venetians and going beyond the very tourist sites. The British newspaper <em>The Guardian</em> explains that countries should also stop seeing their own land as a source of operations but rather as a sacred land that needs to be protected.
						</p>
						<p>
							Yet, countries are still trying to develop their tourism sector. An <em>RFI</em> article presents tourism as an engine of growth for West and North African countries. <em>L'Echos</em> explains that tourists come from 65% of sub-Saharan Africa and 40% of the whole continent. Senegal has lowered hotel and airport taxes and removed the fee-paying visa in 2015. Senegal's goal is to attract 3 million travelers by 2023. However, it still take 9 visas to visit the African continent from North to South, by car. Not to mention that there is still a great lack of infrastructure that makes the hosting potential quite difficult. At the same time, Morocco was the leading tourist destination in Africa in 2016. French people represent 30% of travelers. In an Afrik.com article, it is explained that even if southern Africa manages to attract tourists, the Sahelian zone is affected by a climate of insecurity. This region is shaken by insecurity generated by armed gangs and terrorism but also political instability. It suffers a crisis of governance, meaning that the State which should serve the people is non existent. The population is simply abandoned. In 2016, Northern Mali suffered more than 385 attacks, an increase of 92% compared to 2015.
						</p>
						<h2>{{"Places of crimes against humanity open to visitors".toUpperCase()}}</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>
							In the United States, some old plantations are open to visitors. For example, Whitney plantation is dedicated to the memory of the slaves. It’s a first because other plantations put more emphasis on the beauty of the places and buildings. In an article by Slate.fr, a Yale historian, Jonathan Holloway explains:
						</p>
						<p>
							<em>"Traditionally, planting tours were opportunities to celebrate the refined lives of the owners and the culture of the South. And then people started to ask, but who built all that? "</em>
						</p>
						<p>
							He adds that, at Whitney, the historical axis is completely different because it is centered on slaves:
						</p>
						<p>
							<em>"(...) we start with the memorials with the names of slaves, then the huts and we end up in the big house. It completely reverses the meaning of the story. We start in a black space to arrive in a white space. It's a very strong reorientation. "</em>
						</p>
						<p>
							The context of the country explains this change, including the Charleston massacre of June 17 which claimed 9 African-American victims. Ibrahima Seck, Research Director of Whitney Plantation, says:
						</p>
						<p>
							<em>"The supremacist ideas of the Charleston killer have been peddled since the time of slavery. We must educate people, both the descendants of the masters and the descendants of the slaves."</em>
						</p>
						<p>
							Here it is more about memory, education and lesson through History. In Brazil, in the region of Rio, Paraiba Valley, another former slave property promises to immerse you in the colonial era. However, this plantation has been sharply criticized because visitors are greeted by black people dressed as slaves. An article from <em>The Intercept</em> has dug up the controversy: the author criticizes the fact that tourists cannot have a critical perspective on the violence and horror of slavery when they are invited to listen to an intimate concert, while being served by people dressed as slaves.
						</p>
						<p>
							Another example is the former Auschwitz-Birkenau concentration camp, located in Poland, which has welcome millions of visitors from all over the world since 1955. The camp almost closed due to the high costs needed to maintain the site. Donald Tusk, head of the Polish government, asked for donations in 2009:
						</p>
						<p>
							<em>"To save Auschwitz-Birkenau is to save the memory of millions of people who suffered and were brutally murdered. It is the responsibility and the duty of the whole Europe"</em>
						</p>
						<p>
							In answer to this request, 100,000,000 euros were raised by more than 28 countries. Since then, attendance has increased and is becoming more and more harmful to buildings. Some visitors do not respect the place and are seen engraving their names on the walls. Beyond that, the locals are asking to not dwell on the past and move on as assistant Director-General for culture at UNESCO, Francesco Bandarin mentions:
						</p>
						<p>
							<em>"The management issue concerning the surroundings remains intact: the inhabitants would like to have a normal life, they don’t understand why everything should be rigid, the young people want a night club. The philosophical debate on the triviality of evil is relentless. We have to study things closely, those of the living, not just those of the dead."</em>
						</p>
						<p>
							Robert Jan Van Pelt, a Dutch historian and author, also referred to Auschwitz as <em>"a sanitized theme park for tourists"</em> in a 2009 BBC article. He added that the camp should disappear along with the last survivor. He considers that  a ground-zero would be more striking than showing its reconstruction, as faithful but contrived.
						</p>
					</div>

					<div class="dragger-back"></div>
				</div>



			<button @click="quitPlanet()">NEXT UNIVERSE <span>►</span></button>
			</div>
		<div v-else-if="character === 'ThirdCharacter'">
			<img :src="assetPath('Universes', 'TitreRobata')" alt="Planet name">
				<div v-bar>
					<div>
						<h2>{{"Robots, simple machines?".toUpperCase()}}</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>
							Robots programmed and developed by humans are subject to debate in many societies nowadays. Robots appeared in the early 70s and were originally created to perform repetitive tasks and / or those considered too difficult to be handled by human beings. They have evolved considerably since that time. Their status is questioned today, especially with the progress of artificial intelligence. Will robots remain forever a mere machines in the eye of humans, or could they be improved to the point to equal, or even exceed humans?
						</p>
						<p>
							<em>"Humans, limited by slow biological evolution, could not compete and would be left behind“</em>
						</p>
						<p>
							Hence opinions are shared amongst men, they are also shared amongst cultures. According to Karyn Poupee, author of the book <em>"Les Japonais"</em>, the Japanese society considers that robots have souls: this is related to historical, cultural and religious causes. The newspaper Le Monde also claims that robotics is deeply rooted in Japanese culture. In fact, Japanese have been passionate about what is manufactured or artificial for a long time. For them, robots are living things and made to serve. There is also an economic dynamic behind their obsession The Japanese population is aging and the labor force is becoming scarce (25% of Japanese people are over 65), but robots could remedy this. The late Stephen Hawking, a world-renowned astrophysicist, said in November 2017, at the Lisbon Web Summit, that AI could become <em>"the worst or best thing to ever happen to humanity"</em>. With AI, in the near future, it may be possible to repair some of the damage done by humans, be it environmental or economic.
						</p>
						<p>
							Sophia, the first humanoid robot to obtain Saudi citizenship in 2017, is an example of an impressive AI. She looks, thinks and speaks like a human. She knows how to recognize someone, maintain a conversation and learn, thanks to the famous <em>"deep learning"</em> system. It is a learning technique that allows an artificial intelligence to recognize the content of an image and to understand spoken language. The AI ​​is thus nurtured with images and develops its own visual recognition system from this process. Ben Goertzel, the creator of this humanoid also thinks that robots will one day become citizens like humans.
						</p>
						<p>
							On the Western side, opinions are more split: the French who for a long time saw robots as adversaries seem to consider them as an industrial opportunity that would allow them to do several things at once. Somehow this could be done only if man is at the center of the process. However unlike the Japanese, they do not think that robots have souls, and share little empathy for them. Brigitte Munier, the author of Robots: The myth of the Golem and the fear of machines explains that:
						</p>
						<p>
							<em>"The contemporary Western fear of intelligent machines threatening to rule humanity conceals an old and growing anxiety, that of no longer finding meaning in the nature and life of man".</em>
						</p>
						<p>
							This fear is especially fuelled by the myth that creation turns against its creator. For example, in 2014, 74% of French people thought robots "steal people's work". For his part, Stephen Hawking imagined a worrying scenario for the future of humanity. Indeed, he told the BBC in 2014 that with the progression of AI, humans would be quickly overwhelmed, because of their slow biological evolution. As a result, robots with full AI could end Humanity. Tesla boss Elon Musk is also concerned about this development. In response to the creation of the robot Sophia, he wondered for example what would happen if this robot was feeding intellectually, violent films like The Godfather. The same opponent signed with Stephen Hawking an open letter for the banning of "killer robots". These robots could fight targets without human intervention and mark the beginning of an AI-equipped weapon race.
						In the Anglo-Saxon countries there have been several media campaigns to ban sex robots which they say is an emotional disruptor. The "sexbots" would confirm women as an object in the view of  men. Meanwhile, in Japan, the Lovedolls, life-size dolls designed to serve as sexual objects, have been an integral part of the culture since the 1980s even though they are equipped with a rudimentary robotic system.
						</p>
						<p>
							Scientists all over the world aim to innovate through their scientific experiments, we have seen that robots are one of their concerns. However, they are also trying to innovate through animal experimentation.
						</p>
						<h2>{{'Medical research on animals: a necessity?'.toUpperCase()}}</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>In France, a decree imposes many methods of anaesthesia which must be applied in case of animal experiments <em>"to eliminate as far as possible the lasting damage, the pains, the sufferings or the anxiety”</em>. If animal usage in research is sometimes blamed in France, in other countries such as  Australia, scientists raise the fact that abiding by the rules is essential.
						</p>
						<p>
							<em>"Animal usage in research and teaching is subject to strict ethical guidelines all over the developed world."</em>
						</p>
						<p>
							They even go beyond, in 2017 they publish an article in Pharmacology Research & Perspectives, where they would consider alternatives.
						</p>
						<p>
							<em> "With the advancement of technology in medical research, we are now at a stage to consider manifold alternatives to using animals in research and teaching".</em>
						</p>
						<p>
							They then expose possibilities of research on organs, cells, human tissues, and other techniques still unknown. Many researchers see these alternatives as less effective, or even impossible. Australian scientists explain that this impossibility exists despite several ethical, political, and financial “incentives” to persevere in this direction. The extant alternatives serve to complement animal experimentation in current research.
							<br/>
							On January 25, 2018, the New York Times reported that Volkswagen, Daimler and BMW had forced monkeys to inhale car exhaust fumes. On 29 January 2018, the German newspaper Stuttgarter Zeitung states that humans were used as guinea pigs. The daily paper explains that this choice is not understood by the majority of the population:
						</p>
						<p>
							<em>"The idea of ​​proving the safety of exhaust gases by making them inhale by apes is already strange enough. The case becomes even more problematic when a group of manufacturers push the experiment to the point of having human guinea pigs inhale nitrogen dioxide, a toxic gas. "</em>
						</p>
						<p>
							In order to meet human needs, xenograft experiments are underway. It is a graft transplant where the donor is of a biological species different from that of the recipient. Pork seems to be the best candidate at this level because its organs are similar in size to those of humans. Organ transplants from animals to men are still prone to failure: too much rejection, risks of virus transmission, ethical issues. Yet, according to Futurism, Chinese institutions are doing everything to obtain the necessary permissions for two reasons. First of all, the lack of organs in China means that more than 300 000 patients are waiting for a transplant each year. In France, 12 000 grafts are needed. Then, according to L’Express, Chinese researchers are also trying to have a scientific breakthrough before other countries. In the United States, researchers are trying to create mixed human and animal embryos called "chimeras". They hope to create animals carrying human organs to transplant them into sick men and women. Pablo Ross, a reproductive biologist at the University of California in Davis, explains:
						</p>
						<p>
							<em>"We do not try to create chimeras because we want to see a kind of monstrous creature, we do it for a biomedical purpose."</em>
						</p>
						<p>
							Stuart Newman, professor of cell biology and anatomy at New York Medical College, highlights some of the limitations of these experiments:
						</p>
						<p>
							<em>
								"If you had pigs with a partially human brain, you could get animals that would develop a consciousness, like humans"
							</em>
						</p>
						<p>
							Man is therefore divided between his habit of using experiments on animals, also for sociological, political and financial reasons and between turning to new alternatives which, when they require more time and more means while raising ethical issues. Technological progress plays therefore a strong point in our society, thanks to it we can imagine a future where experiments on animals would become a callback solution. But would this technological progress be equally effective?
						</p>
					</div>

					<div class="dragger-back"></div>
				</div>



			<button @click="quitPlanet()">NEXT UNIVERSE <span>►</span></button>
			</div>
			<div v-else-if="character === 'FourthCharacter'">
			<img :src="assetPath('Universes', 'TitreHayawan')" alt="Planet name">
				<div v-bar>
					<div>
						<p>
							The relationship between men and animals has evolved for thousands of years. In certain areas of the world, animals are complete social partners, and in others, you see them as part of the cultural beliefs and traditions. Prehistoric men started the taming process, multiplying interactions between men and animals. From there begins a segregation between the species: wild animals, livestock and pets. Some animals are also turned into divinities by some civilizations, they are used to represent the gods to whom they are related. For instance, in Ancient Egypt, Anubis who is the god of the afterlife is depicted as man with a canine head. In fact, animal representations are drawn into cultural and ritual practices since antiquity the world over. For about twenty years now, the animal welfare has seen a boost of interest and is now becoming a true societal challenge.
						</p>
						<h2>{{"Animals and cultural traditions".toUpperCase()}}</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>
							Animals are in the middle of various cultural traditions around the world still alive today. Corrida or bull-fighting for instance is a duel in an arena between a man and a bull. It has been going for centuries in Spain, Portugal, the South of France and in many Latin American countries such as Mexico, Colombia and Venezuela. The bull’s foe, the torero, has to draw the animal towards him with his cape and manipulates the bull until he kills the animal at close range. This bout will assess the animal’s character: brave, slow, hot-headed… The corrida’s partisans see a southern tradition which needs to be respected as a cultural ritual. It represents the fight between men and the animal power, symbolized by a bull. In the daily paper El Pais, the tauromachy critic Antonio Lorca reckons that bullfighting is more a “dance” than a fight where both the man and the animal bravery is recognized. He writes:
						</p>
						<p>
							<em>“the bull is a way of understanding beauty, the audience observe the bravery, the brilliance, the stroke of genius, the harmonious triviality, the grandeur of an heroic artist and of mighty enigmatic animal”</em>
						</p>
						<p>
							By drawing the animal to him with his cape, the torero is looking to weaken the animal, wounding it until he finishes it. This fatality is made with all the due respect to the animal since there is a true traditional ritual preceding the final blow with a commune silence. Moreover, the animal cannot be killed if the torero has not risked his own life. The expected outcome being the death of the bull, anti-bullfighting protesters assert the animal sufferings. Bull-fighting has been prohibited in Chile, Argentina, Cuba, and Uruguay as well. Quoting the anti-corrida alliance from France, the practice renders violence common:
						</p>
						<p>
							<em>“Corrida is playing in the field of seduction with the bright colors, the shining clothing, the change of scene, the brass band. Everything is meant to eclipse the bloody reality”</em>
						</p>
						<p>
							The alliance puts forward the decrease in attendance of the bullfighting arenas. In 2015, it went down 15%, and 25% in 2016.
						</p>
						<p>
							In a few Asian countries, eating dogs is a traditional custom. It is thought that dog meat holds medicinal properties and can cure kidney and spleen diseases. Dogs are also seen as protective animals and thus, ingesting dog meat would allow to borrow its powers such as strength. For instance, in Korea, dog meat is considered a body temperature controller. In Southern China takes place the festival of canine meat in Yulin during the Summer solstice. The consumption of dog meat is a debated custom by Westerners. In a BBC news article, despite the controversy emanating from the international community, many people have answered that the Yulin festival should be considered as a tradition and therefore be respected as such. It is said that the consumption of dog meat during the festival period will bring good fortune and good health for the rest of the year.
						</p>
						<p>
							Animals still have an important position in many religious practices. Historically, rites giving as sacrifice an animal are known from antiquity. As of today, some religious holidays still call for an animal sacrifice. Judaism and Islam reckon all living creatures have souls. The blood symbolizes the soul that shall not be consumed. It would be sinful to eat both the soul and the body of the animal. Eating an animal is only allowed if the blood is shed in order to free its soul. Muslims distinguish two different types of sacrifice, <em>Ad-Dhakah</em> is the sacrifice meant for meat consumption and the sacrifice made during an adoration ceremony on the day of <em>Aïd el-Adha</em> for example. These sacrifices have to be made abiding strict rules such as the certification of the person doing the throat-cutting, the sharpness of the knife, the parts meant to be slit, namely the oesophagus and the trachea, the head of the animal has to be directed towards Mecca and most importantly, the act of sacrifice must be done by a Muslim. Jews use sacrificial slaughter as well, and this must be done by a shohet, a sacrificial executioner certified by the rabbinical intercommunity commission and the agriculture department. The sacrificial protocol must be followed to the letter or the meat would be rendered impure. In both cases, animal meat can only be consumed if the animal has been drained from all its blood. In some countries, animals are considered sacred and untouchable as per tradition. In India, cows are symbols of fertility. They foster procreation and boost the crops. It is forbidden to kill and eat cows. Crocodiles are totem animals in Burkina Faso. This comes from the legend of the town of Bazoulé which is said to have been founded by benevolent crocodiles. It saved a thirsty hunter who found a water source thanks to the reptiles. The festival of Koomlakré celebrate the crocodiles which are considered guardians of the village.
						</p>
						<p>
							Animals possess through popular beliefs symbolic properties and a cultural significance. They also feed the human curiosity with men looking to learn more about wildlife. The realization of the animal studies brought into creation the zoological parks.
						</p>
						<h2>{{'Animals in captivity: preservation or enslavement'.toUpperCase()}}</h2>
						<img :src="assetPath('Universes', 'barre')" alt="Line">
						<p>
							Previous to modern zoological parks were menageries. They used to belong to aristocrats and other noblemen and would gather different species of rare animals in the purpose of studying them or showing them to a public audience. In the end of the 18th century, there was a rise of the scientific interest in the animal kingdom. Menageries could not the possibility to observe and study animals as their condition of captivity was inappropriate. To respond to the need of studying animals, new infrastructures have been built. The transition from menageries, as private collections, to public institutions marked the launch of zoological parks. Opposite to the concept of entertainment conveyed by menageries, zoos are focused on observation and scientific study. We account for more than 10,000 zoos worldwide as of today. From Eric Domb, delegate manager of Pairi Daiza, a Belgian zoo whom explains that the number one goal of zoos is to preserve wildlife:
						</p>
						<p>
							<em>“A great number of species have been protected thanks to zoological parks, without them, they would have been extinct.”</em>
						</p>
						<p>
							Actually, zoological parks’ main objective is to protect endangered species and wildlife in general. They especially maintain genetic diversity of the species through artificial insemination or assisted reproduction. They are also designed to be educational: better understanding of the fauna which surrounds us. Some species do not even have any living area left. In brief, the partisans of zoological parks stress the fact that zoos act as refuge for the species which no more natural habitat and may be endangered in the wild as elephants are due to poaching. For instance, the zoo of Beauval has succeeded in preserving rare species such as the Indian rhino, the okapi or the gorilla. They also started the world first semen bank for elephants.
							<br/>
							For those opposed to zoos, they see them as a prison for animals. According to them, an animal should not be caged but rather live in its natural habitat. They put forth the numerous cases of animal cruelty, and the living conditions not always fit for animals. They also criticize the fact that the public is not well informed and made aware of the fragility of the biodiversity. Costa Rica was the first country to close its zoos in 2013 and transformed them into botanical gardens and city parks. However, the newspaper Le Monde reveals that still in 2015 the government has not completed its objective since the Fundación Pro Zoológicos which manages the last two remaining zoos contests the turn.
							<br/>
							Many countries have now forbidden marine mammals shows. Since 1993, the United Kingdom has banned the captivity of sea mammals. In 2008, Chile forbade the capture and transport of cetaceans. In India, dolphins shows are illegal since 2013. Around thirty countries do not allow the presence of animals in circus shows, some of them being Costa Rica, India, Guatemala, Bolivia, along with European countries such as Belgium, Denmark or Greece. Other countries in Europe are anticipating in regards to circus since European laws do not guarantee the welfare of animals against any cruelty or abuse, may it be physical or psychological. In Japan, their will to protect wildlife is taken into consideration very seriously by preserving pure breeds. Thus, the Japanese macaque is kept off from cross-breeding. In fact, a Japanese zoo even euthanized around fifty apes which where born from the cross-breeding of Japanese macaques and rhesus macaques. The latter has been considered an alien invading species by Japanese law and therefore illegal.
							<br/>
							Taking into account animals into society depends on the customs and cultural practices of a country and its history. May they be feared, eaten or deified, animals have through ages kept an important role in the world of men.
						</p>
					</div>

					<div class="dragger-back"></div>
				</div>



<button @click="quitPlanet()">NEXT UNIVERSE <span>►</span></button>
			</div>
		</article>
		</transition>


	  <!-- <img v-if="shouldShow" class="character" :src="assetPath('Characters', character)" alt="The guard of that planet"> -->
  </section>
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

export default {
	name: "Planet",
	data() {
		return {
			charactersTalking: false,
			dialogAvancement: -1,
			inProgress: [],
			currentChoice: 0,
			shouldShow: false,
			currentTextPos: {},
			idle: false,
			timeRemaining: 0,
			timerRunning: false,
			intervalID: 0,
			gameOver: false,
			showArticles: false
		};
	},
	watch: {
		charactersTalking(newValue) {
			if (newValue) return;
			this.startTimer(25);
		}
	},
	computed: {
		playerName() {
			return this.$store.state.player.name;
		},
		currentSpeaker() {
			return this.plot.dialog[this.dialogAvancement] === undefined
				? ""
				: this.plot.dialog[this.dialogAvancement].speaker === "player"
					? "Ulysse"
					: "guard";
		},
		currentText() {
			return this.plot.dialog[this.dialogAvancement] !== undefined
				? this.plot.dialog[this.dialogAvancement].text
				: "";
		},
		newText() {
			return this.inProgress.join("");
		},
		choices() {
			return this.plot.choices;
		}
	},
	methods: {
		avanceDialog() {
			this.dialogAvancement++;
			if (this.plot.dialog[this.dialogAvancement] === undefined)
				return (this.charactersTalking = false);
			this.inProgress = [];
			let speed = 0;
			this.$nextTick().then(() => {
				let sentencesList = this.plot.dialog[
					this.dialogAvancement
				].text.split(/[.!?] /);
				let currentLength = 0;
				sentencesList = sentencesList.map((sentence, index) => {
					sentence = sentence.split("");
					if (
						sentence.length !== 0 &&
						index !== sentencesList.length - 1
					)
						sentence.push(
							`${
								this.plot.dialog[this.dialogAvancement].text[
									currentLength === 0
										? sentence.length
										: currentLength + sentence.length
								]
							} `
						);
					currentLength += sentence.length + 1;
					return sentence;
				});
				function pushNewLetter() {
					return new Promise(resolve =>
						setTimeout(() => {
							resolve(true);
						}, 30)
					);
				}
				let vm = this;
				async function pushNewSentence(sentence) {
					let length = sentence.length;
					let promiseList = [true];
					for (let i = 0; i < length; i++) {
						await promiseList[i];
						let letter = sentence[i];
						vm.inProgress.push(letter);
						let currentPromise = pushNewLetter();
						promiseList.push(currentPromise);
					}
					return new Promise(resolve => {
						Promise.all(promiseList).then(() => {
							resolve(true);
						});
					});
				}
				async function pushText(list, index) {
					let sentencePromises = pushNewSentence(list[index]);
					sentencePromises.then(() => {
						if (list[index + 1] !== undefined)
							setTimeout(() => {
								pushText(list, index + 1);
							}, 75);
					});
				}
				pushText(sentencesList, 0);
			});
		},
		playerHasAnswered(answer) {
			this.$emit("playerAnswered", answer);
			this.stopTimer();
			if (this.currentChoice === 1) this.showArticles = true;
			else {
				// this.$store.dispatch("changingScene", "Map");
				this.currentChoice = 1;
				this.startTimer(35);
			}
		},
		updateTextPosition() {
			let currentVideo = this.idle ? "video2" : "video1";
			if (this.$refs[currentVideo] === undefined) return;
			let positionInfo = getObjectFitSize(
				false,
				this.$refs[currentVideo].clientWidth * 29.4 / 100,
				this.$refs[currentVideo].clientHeight * 14.3 / 100,
				1920 * 36.4 / 100,
				1080 * 17.8 / 100
			);
			this.currentTextPos = {
				width: `${positionInfo.width}px`,
				height: `${positionInfo.height}px`,
				bottom: `calc( 7vh - ${positionInfo.y}px)`,
				right: `calc(36vw + ${positionInfo.x}px)`
			};
		},
		startTimer(duration) {
			this.timeRemaining = duration;
			this.intervalID = setInterval(() => {
				this.timeRemaining = this.timeRemaining - 1;
				this.$nextTick().then(() => {
					if (this.timeRemaining === 0) this.stopTimer(true);
				});
			}, 1000);
		},
		stopTimer(playerLost = false) {
			clearInterval(this.intervalID);
			if (playerLost) this.gameOver = true;
		},
		quitPlanet() {
			this.$emit("playerLeft");
			this.$store.dispatch("changingScene", "Map");
		},
		initDialog() {
			new Promise(resolve =>
				setTimeout(() => {
					resolve(true);
				}, 2000)
			).then(() => {
				this.shouldShow = true;
				this.charactersTalking = true;
				this.avanceDialog();
			});
		}
	},
	mounted() {
		this.updateTextPosition();
		window.addEventListener("resize", this.updateTextPosition);
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.updateTextPosition);
	},
	props: [
		"background",
		"backgroundMusic",
		"firstAnim",
		"secondAnim",
		"articleBackground",
		"character",
		"plot"
	]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.planet {
	height: 100%;
	display: flex;
	justify-content: center;
	position: relative;

	& > img:first-of-type {
		height: 100vh;
		width: 100vw;
		object-fit: cover;
		object-position: center;
		position: absolute;
		left: 0;
	}

	& > video {
		height: 100vh;
		width: 100vw;
		object-fit: cover;
		object-position: center bottom;
		position: absolute;
		left: 0;
	}

	.character {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		height: 45vh;
		width: 25vw;
		object-fit: contain;
		object-position: center;
	}

	& > img:nth-of-type(2) {
		left: 5vw;
		z-index: 1;
	}

	& > img:nth-of-type(3) {
		right: 5vw;
	}

	article {
		// position: relative;
		position: absolute;
		margin: auto 0;
		display: flex;
		cursor: pointer;
		font-family: Roboto;
		// width: 60%;
		text-align: left;
		color: lighten(#7b328c, 35%);
		// background-color: rgba(white, 0.9);
		// border-radius: 25px;
		// height: 20vh;
		// padding: 2%;
		font-size: 1.05vw;
		// width: 30vw;
		// right: 36vw;
		// bottom: 6vh;
		// height: 18vh;

		& > span {
			display: inline-block;
			width: 100%;
			margin: 2.5% auto;
			// line-height: 1.25;
			font-size: 1.3vw;
			color: lighten(#7b328c, 55%);
		}
	}

	.choice {
		display: grid;
		grid-template-areas:
			"a a a a a"
			". b . c .";
		cursor: initial;
		grid-template-rows: 60% 35%;

		& > * {
			margin: auto;
		}

		strong {
			grid-area: a;
			color: rgba(white, 0.9);
			font-weight: normal;
			font-size: 1.4vw;
			line-height: 1.2;
			display: inline-block;
			width: 90%;
			text-align: center;
		}
		button {
			// width: 75%;
			width: 100%;
			display: flex;
			padding: 0;
			align-items: center;
			justify-content: center;
			height: 50%;
			font-size: 1.5vw;
			outline: none;

			img {
				width: 15vw;
				height: 150%;
				object-fit: contain;
				object-position: center;
			}

			span {
				position: relative;
				bottom: 0.04vw;
			}
		}

		button:first-of-type {
			grid-area: b;
		}
		button:last-of-type {
			grid-area: c;
		}

		aside {
			position: absolute;
			right: -10%;
			top: 55%;
			display: flex;
			justify-content: center;
			width: 13%;
			height: 45%;
			align-items: center;
			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				object-position: center;
				opacity: 0.8;
			}
			em {
				font-style: normal;
				position: absolute;
				margin: auto;
				font-size: 1.25vw;
				color: lighten(#7b328c, 55%);
				color: #53d7fd;
			}
		}
	}

	.article {
		position: relative;
		cursor: initial;
		height: 100%;
		width: 70%;
		// color: #7b328c;
		color: rgba(225, 225, 225, 0.95);
		margin: auto 0 auto auto;

		// img:first-of-type {
		// 	height: 100vh;
		// 	width: 100vw;
		// 	object-fit: cover;
		// 	object-position: center;
		// 	position: absolute;
		// 	left: 0;
		// }

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
		}

		.dragger-back {
			margin: 0.5% 1.5% 0.5% 5%;
			position: absolute;
			width: 1.5%;
			right: -5px;
			height: 100%;
			top: 0;
			padding: 0;
			background-color: rgba(darkgrey, 0.8);
		}

		& > div {
			width: 50%;
			right: 0;
			padding: 0.5% 5%;
			height: 75%;
			margin: auto 0 auto auto;

			> div {
				height: 90%;

				div {
					padding: 0 0.15%;

					img {
						width: 12.5%;
						height: 0.5%;
						object-fit: contain;
						object-position: left center;
					}
				}

				div > * {
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

	.player {
		color: #f35793;
	}

	.guard {
		color: #53affa;
	}
}
</style>
