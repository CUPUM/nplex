<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Option from '$components/Options/Option.svelte';
	import OptionsList from '$components/Options/OptionsList.svelte';
	import { STATES, VARIANTS } from '$utils/enums';
	import { queryStore } from '$utils/store';

	const h = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
	const t = ['xl', 'lg', 'md', 'sm', 'xs'];

	const q = queryStore('Hello', async (v) => {
		return fetch('/playground/data.json', { method: 'GET' }).then(async (res) => res.json());
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

	$: console.log($q.res);
</script>

<article>
	<Field>
		<OptionsList slot="options">
			<Option value="test">Test</Option>
		</OptionsList>
	</Field>
</article>
<article>
	<Field bind:value={$q.input}>
		<svelte:fragment slot="trailing">
			<!-- <Button on:click={$q.fetch}>Fetch</Button> -->
		</svelte:fragment>
	</Field>
	<code>
		error: {$q.error}; loading: {$q.loading};
		{JSON.stringify($q.res, null, 2)}
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
