<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	let options = [
		{ name: 'a', age: 2 },
		{ name: 'c', age: 4 },
		{ name: 'b', age: 3 },
	];

	const sources = [
		{
			name: 'Montreal districts',
			url: '/api/geo/montreal/districts.json',
		},
	] satisfies { name: string; url: string }[];

	async function get(url: string) {
		const res = await fetch(url, { method: 'GET' });
		if (!res.ok) {
			console.error(res);
		}
		const json = await res.json();
		console.log(json);
	}
</script>

<article>
	<form method="POST" use:enhance>
		<select name="test" id="">
			{#each options as option}
				<option value={option}>{option.name}</option>
			{/each}
		</select>
		<button type="submit">Submit!</button>
	</form>
</article>
<article>
	{#each sources as source}
		<button
			on:pointerdown={() => {
				get(source.url);
			}}>Fetch {source.name}</button
		>
	{/each}
</article>

<style lang="scss">
	article {
		padding: 5rem;
	}

	button {
		padding: 0.5rem;
		background: lightgrey;
	}
</style>
