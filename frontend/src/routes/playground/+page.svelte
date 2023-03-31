<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Option from '$components/Options/Option.svelte';
	import OptionsList from '$components/Options/OptionsList.svelte';
	import Toggle from '$components/Toggle/Toggle.svelte';
	import ValueMask from '$components/ValueMask.svelte';
	import { browserDb } from '$utils/database/client';
	import { STATES, VARIANTS } from '$utils/enums';
	import { queryStore } from '$utils/store';
	import { onMount } from 'svelte';

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

	onMount(async () => {
		const u = await browserDb
			.from('users')
			.select(
				`
				*,
				role:users_roles_extended!users_roles_user_id_fkey (role, title, description)
			`
			)
			.limit(1)
			.single();

		if (u.error) {
			console.log(u.error.hint);
		} else {
			console.log(u.data);
		}
	});

	$: console.log($q.res);

	let value = 'bonjour';
</script>

<article>
	<ValueMask bind:value mask={[/A-Z/, /A-Z/, /0-9/, /0-9/, '-', /a-zA-Z/]} let:masked>
		<input type="text" name="textinput" value={masked} id="mask" />
	</ValueMask>
	<textarea name="textarea" id="mask">Bonjour<i>asdasd</i></textarea>
</article>
<article>
	<Toggle>
		<svelte:fragment slot="on">Gros label</svelte:fragment>
		<svelte:fragment slot="off">moyen</svelte:fragment>
	</Toggle>
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
		align-items: flex-start;
		gap: 3rem;
		width: 100%;
		padding: var(--ui-gutter-md);
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
