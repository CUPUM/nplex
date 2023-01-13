<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Loading from '$components/Loading.svelte';
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

	async function getAvatar(name: string = 'fallback') {
		image = await fetch('/api/generate-avatar/' + name);
	}

	let image: any;
	$: console.log(image);
</script>

<article>
	<Field type="text" value="test">
		<svelte:fragment slot="trailing" let:value>
			<Button
				on:click={() => {
					getAvatar(String(value));
				}}>Fetch avatar!</Button
			>
		</svelte:fragment>
	</Field>
	<div>
		{#await image}
			Loading image
			<Loading />
		{:then value}
			{image}
		{:catch error}
			Erreur :/
		{/await}
	</div>
</article>
<article>
	{#each data.roles as role}
		<input type="radio" value={role} />
	{/each}
</article>
<article>
	<TextArea />
	{#each ['default', 'outlined', 'cta'] as v}
		<label><input type="radio" value={v} bind:group={variant} /> {v}</label>
	{/each}
</article>
<article>
	<Select placeholder="test" {variant} options={roles} bind:value let:datum>
		<option value={datum}>{datum.text}</option>
	</Select>
</article>
<section />

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

	section {
		width: 100%;
		height: 500px;
		background: linear-gradient(121.28deg, #a4006c 0%, #ffeca8 100%),
			linear-gradient(121.28deg, #69003f 0%, #fff8f8 100%),
			linear-gradient(238.72deg, #00ffff 0%, #0212a4 100%),
			radial-gradient(67.16% 100% at 50% 0%, #ff00b8 0%, #ffffff 100%),
			linear-gradient(140.54deg, #7000ff 0%, #001aff 72.37%),
			linear-gradient(307.43deg, #ffe927 0%, #00114d 100%),
			radial-gradient(107% 142.8% at 15.71% 104.5%, #ffffff 0%, #a7aa00 100%), #ffffff;
		background-blend-mode: overlay, difference, difference, overlay, difference, difference,
			difference, normal;
	}
</style>
