<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldDropdown from '$components/Field/FieldDropdown.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import { browserDb } from '$utils/database/client';
	import { writableQuery } from '$utils/store';
	import { onMount } from 'svelte';

	const h = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
	const t = ['xl', 'lg', 'md', 'sm', 'xs'];

	const q = writableQuery('Hello', async (v) => {
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
	<Token --token-color="red">Test</Token>
	<Button --button-side-color="red"><Icon name="settings" slot="leading" />Test</Button>
	<FieldDropdown>
		<Field slot="field" />
		<li>Test</li>
		<li>Test</li>
		<li>Test</li>
		<li>Test</li>
	</FieldDropdown>
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
