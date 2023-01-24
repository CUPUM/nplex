<script lang="ts">
	import Button from '$components/Button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<fieldset class="site-formgroup">
	<legend class="site-formgroup-legend">Localisez votre projet</legend>
	<section class="site-formgroup-fields">
		Sur la carte, <Button variant="outlined">tracez une zone approximative</Button> dans laquelle se
		trouve votre projet.
		<input type="hidden" />
	</section>
</fieldset>

<style lang="scss">
</style>
