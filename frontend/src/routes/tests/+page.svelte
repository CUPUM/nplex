<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import TextArea from '$components/TextArea.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import type { ComponentProps } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let a = 10;
	let b = 40;
	let c = 50;

	let v = 'ceci est une valeur initiale';
	let bool = false;

	let open = false;

	let variant: ComponentProps<TextArea>['variant'] = 'outlined';
</script>

<article>
	<fieldset>
		{#each ['default', 'cta', 'outlined'] as v}
			<Tooltip message="Tooltip: {v}">
				<label>{v} <input type="radio" value={v} bind:group={variant} /></label>
			</Tooltip>
		{/each}
	</fieldset>
	<TextArea {variant}>
		<svelte:fragment slot="label">Slotted label</svelte:fragment>
	</TextArea>
	<TextArea {variant}>
		<svelte:fragment slot="leading"><Button>Leading!</Button></svelte:fragment>
		<svelte:fragment slot="trailing"
			><Button><Icon name="settings" slot="leading" />Test</Button></svelte:fragment
		>
		<svelte:fragment slot="label">Slotted label</svelte:fragment>
	</TextArea>
	<Field {variant}>
		<svelte:fragment slot="label">Label yay <Icon name="pen" /></svelte:fragment>
	</Field>
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
