<script lang="ts">
	import CostRange from './CostRange.svelte';
	import Description from './Description.svelte';
	import Title from './Title.svelte';
	import Type from './Type.svelte';
	import Works from './Works.svelte';

	export let data;
	export let form;
</script>

<Title />
<Description />
<Type />
<Works />
<CostRange />

<style lang="scss" module>
</style>
