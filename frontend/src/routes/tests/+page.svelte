<script lang="ts">
	import Select from '$components/Select.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let a = 10;
	let b = 40;
	let c = 50;

	let v = 'ceci est une valeur initiale';
	let bool = false;

	let open = false;
</script>

<article use:setRootBackground={{ color: 'red' }}>
	<Select options={data.roles.map((r) => r.label)} let:option>
		<p>{option}</p>
	</Select>
</article>
<article>Some article</article>
<article>Another</article>

<style lang="scss">
	article {
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1200px;
		border: 1px solid blue;
	}
</style>
