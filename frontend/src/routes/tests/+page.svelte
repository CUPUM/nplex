<script lang="ts">
	import Field from '$components/Field.svelte';
	import Select from '$components/Select.svelte';
	import TextArea from '$components/TextArea.svelte';
	import type { ComponentProps } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let a = 10;
	let b = 40;
	let c = 50;
	const roles = data.roles.map((r) => ({ ...r, value: r, text: r.label }));
	let v = 'ceci est une valeur initiale';
	let bool = false;

	let value = roles[0];

	let variant: ComponentProps<TextArea>['variant'] = 'outlined';
</script>

<article>
	<TextArea />
	{#each ['default', 'outlined', 'cta'] as v}
		<label><input type="radio" value={v} bind:group={variant} /> {v}</label>
	{/each}
</article>
<article>
	<Select {variant} options={roles} bind:value>
		<svelte:fragment slot="label">Label</svelte:fragment>
	</Select>
	<Field placeholder="Placeholder" {variant}>
		<svelte:fragment slot="label">Label</svelte:fragment>
	</Field>
	<Select {variant} placeholder="test">
		<svelte:fragment slot="options" />
	</Select>
</article>

<!-- <article use:setRootBackground={{ color: 'red' }}>
	<Select options={data.roles.map((r) => r.label)} let:option>
		<p>{option}</p>
	</Select>
</article>
<article>Some article</article>
<article>Another</article> -->
<style lang="scss">
	article {
		width: 100%;
		padding: 3rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		border: 1px solid blue;
	}

	label {
		padding: 1em;
		background: col(bg, 500);
		margin: 3px;
		border-radius: 1em;
	}
</style>
