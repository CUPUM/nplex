<script lang="ts">
	import Icon from '$components/primitives/Icon.svelte';

	export let href: string = null;
	export let iconName: string = null;
	export let hoverIconName: string = null;
	export let iconPosition: 'left' | 'right' = 'left';
	export let type: 'primary' | 'secondary' = 'primary';
	export let text: string = null;
	export let tooltip: string = null;
	export let highlight: boolean = false;
</script>

{#if href}
	<a {href} class:square={text === null} class:highlight sveltekit:prefetch on:click>
		{#if iconName}
			<Icon name={iconName} hoverName={hoverIconName} />
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
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		gap: 0.25em;
		--size: 2.8em;
		height: var(--size);
		padding-inline: 1em;
		background-color: transparent;
		border-radius: 1em;
		box-shadow: 0 0 1em -1em rgb(0, 0, 0, 0);
		text-decoration: none;
		color: var(--color-dark-500);
		font-family: var(--font-misc);
		font-weight: 600;
		letter-spacing: 0.02em;
		overflow: hidden;
		transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
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
		background-color: rgb(0, 0, 0, 0.05);
	}

	.highlight {
		color: var(--color-primary-900);
		background-color: var(--color-primary-300);
		box-shadow: 0 1.3em 1em -0.7em hsl(var(--rgb-primary-700), 0.35);
	}

	a > :global svg,
	button > :global svg {
		position: relative;
		width: 1.5em;
		height: 1.5em;
	}

	a > :global svg *,
	button > :global svg * {
		fill: var(--color-dark-500);
		stroke-width: 2px;
	}
</style>
