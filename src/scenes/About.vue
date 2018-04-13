<template>
  <div class="about">
    <h1>This is an about page</h1>
	<character
		:characterName="'Jhin'"
		:isStill="true"
		:currentImg="'Four'"
	>
	</character>
  </div>
</template>

<script>
import Character from "@/components/Character";
export default {
	components: { Character }
};
</script>
