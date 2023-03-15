<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import { STATES, VARIANTS } from '$utils/enums';
	import { fetchStore } from '$utils/store';

	const h = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
	const t = ['xl', 'lg', 'md', 'sm', 'xs'];

	const q = fetchStore('Hello', async (v) => {
		return fetch('/playground/data.json', { method: 'GET' }).then((res) => res.json());
	});

	// const sq = fetchStore('I donno', (v) => {
	// 	return browserDb.from('projects_images').select('*', { count: 'exact' }).then(res => {
	// 		if (res.error) throw new Error('');
	// 	});
	// 	// .then((res) => {
	// 	// 	if (res.error) throw res.error;
	// 	// 	return res.data;
	// 	// });
	// });
</script>

<article>
	<Field bind:value={$q.query}>
		<svelte:fragment slot="trailing">
			<!-- <Button on:click={$q.fetch}>Fetch</Button> -->
		</svelte:fragment>
	</Field>
	<code>
		error: {$q.error}; loading: {$q.loading};
		{JSON.stringify($q.data, null, 2)}
	</code>
</article>
<article>
	<h1>Typography system</h1>
	<section>
		<h2>Headings</h2>
		{#each h as size}
			<h3 class="heading-{size}">
				Heading {size}
			</h3>
		{/each}
	</section>
	<section>
		<h2>Text</h2>
		{#each t as size}
			<p class="text-{size}">
				Text {size} Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, officia. Voluptatibus
				doloremque aperiam beatae mollitia dolorum sit optio ut consequatur.
			</p>
		{/each}
	</section>
</article>
<article>
	<h1>Button variants and states</h1>
	<div>
		{#each Object.values(VARIANTS) as variant}
			{#each Object.values(STATES) as state}
				<Button {variant} {state}>{variant}{state ? ': ' + state : ''}</Button>
			{/each}
		{/each}
	</div>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		width: 100%;
		padding: var(--ui-pad-outer);
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		padding: 3rem;
	}

	div {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
		flex-wrap: wrap;
	}
</style>
