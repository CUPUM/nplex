<script lang="ts">
	import Loading from '$components/primitives/Loading.svelte';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let legend: string;
	export let expand = false;

	function toggle() {
		expand = !expand;
	}
</script>

<fieldset>
	<div>
		<legend on:click={toggle}>
			<span>{legend}</span>
		</legend>
	</div>
	{#if expand}
		<section transition:slide|local={{ duration: 200, easing: expoOut }}>
			<slot />
		</section>
	{/if}
</fieldset>

<style lang="postcss">
	fieldset {
		display: block;
		flex: none;
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		border: 1px solid var(--color-light-500);
		border-radius: 1.2em;
		overflow: hidden;
		transition: all 0.15s ease-out;

		&:hover {
			background-color: var(--color-light-100);
		}
	}

	legend {
		position: relative;
		user-select: none;
		top: 0;
		display: flex;
		width: 100%;
		cursor: pointer;
		padding: 1.25em 1em;
		margin: 0;
		transition: all 0.15s ease-out;
		font-weight: 600;
		color: var(--color-dark-100);

		&:hover {
			background-color: white;
		}
	}

	section {
		position: relative;
		padding-inline: 1em;
		padding-block: 1px 1em;
		margin: 0;
		display: block;
		width: 100%;
	}
</style>
