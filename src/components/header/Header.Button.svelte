<script context="module" lang="ts">
	export type ButtonType = 'primary' | 'secondary';
	export type ButtonIconPosition = 'left' | 'right';
</script>

<script lang="ts">
	import type { IconName } from '$components/primitives/Icon.svelte';
	import Icon from '$components/primitives/Icon.svelte';

	export let href: string = null;
	export let iconName: IconName = null;
	export let highlightIconName: IconName = null;
	export let text: string = null;
	export let tooltip: string = null;
	export let highlight: boolean = false;
</script>

{#if href}
	<a {href} class:square={text === null} class:highlight sveltekit:prefetch on:click>
		{#if iconName}
			<Icon
				name={iconName}
				highlightName={highlightIconName}
				size="1.5em"
				color="var(--color)"
			/>
		{/if}
		{#if text}
			<span>{text}</span>
		{/if}
	</a>
{:else}
	<button on:click>
		<span>{text}</span>
	</button>
{/if}

<style>
	a,
	button {
		--size: 2.5em;
		--color: var(--color-dark-300);
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: var(--size-medium);
		gap: 0.25em;
		height: var(--size);
		padding-inline: 1em;
		background-color: transparent;
		border-radius: 0.8em;
		box-shadow: 0 0 1em -1em rgb(0, 0, 0, 0);
		text-decoration: none;
		color: var(--color);
		font-family: var(--font-misc);
		font-weight: 600;
		letter-spacing: 0.02em;
		overflow: hidden;
		transition: all 0.2s cubic-bezier(0.3, 0, 0.2, 1);
	}

	span {
		position: relative;
		top: -1px;
	}

	.square {
		width: var(--size);
		padding: 0;
	}

	a:hover:not(.highlight),
	button:hover:not(.highlight) {
		--color: var(--color-dark-500);
		background-color: rgba(0, 0, 0, 0.05);
	}

	.highlight {
		--color: var(--color-secondary-700);
	}
</style>
