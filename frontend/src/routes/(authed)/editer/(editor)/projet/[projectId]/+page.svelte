<script lang="ts">
	import CostRange from './CostRange.svelte';
	import Description from './Description.svelte';
	import Title from './Title.svelte';
	import Type from './Type.svelte';
	import Works from './Works.svelte';

	export let data;
	export let form;
</script>

<header class="editor-tab-header">
	<h1 class="heading-lg">Général</h1>
	<p class="info">
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde aspernatur minima enim
		praesentium blanditiis. Est culpa quia qui incidunt sequi.
	</p>
</header>
<Title />
<Description />
<Type />
<Works />
<CostRange />

<style lang="scss">
</style>
