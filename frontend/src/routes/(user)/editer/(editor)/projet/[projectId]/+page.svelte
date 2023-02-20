<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import CostRange from './CostRange.svelte';
	import Description from './Description.svelte';
	import Title from './Title.svelte';
	import Type from './Type.svelte';
	import Works from './Works.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<Title />
<!-- <hr /> -->
<Description />
<!-- <hr /> -->
<Type />
<!-- <hr /> -->
<Works />
<!-- <hr /> -->
<CostRange />

<style lang="scss" module>
</style>
