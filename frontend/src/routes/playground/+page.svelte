<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldDropdown from '$components/Field/FieldDropdown.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import { writableQuery } from '$utils/store';

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

	function getBox(e: Event) {
		if (e.target instanceof HTMLElement) {
			// console.log(e.target.offsetLeft);
			if (e.target.parentElement instanceof HTMLElement) {
				const parent = e.target.parentElement;
				// console.log(parent.getBoundingClientRect());
				console.dir(parent);
				// console.log(e.target.parentElement.offsetLeft);
			}
		}
	}
</script>

<article>
	<div class="wrapper">
		<button on:click={getBox}>Click me</button>
		<button>Some useless button</button>
	</div>
</article>
<article>
	<Token --token-color="red">Test</Token>
	<Button --button-side-color="red"><Icon name="settings" slot="leading" />Test</Button>
	<FieldDropdown>
		<Field variant="outlined" slot="field">
			<svelte:fragment slot="label">Test label</svelte:fragment>
			<svelte:fragment slot="leading"><Button>Test</Button></svelte:fragment>
		</Field>
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

	.wrapper {
		display: contents;
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
