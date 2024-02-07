<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open },
	} = createDialog({});
</script>

<slot trigger={$trigger} />
<div use:melt={$portalled}>
	{#if $open}
		<div
			class="menu-overlay"
			use:melt={$overlay}
			transition:fade={{ duration: 250, easing: cubicOut }}
		/>
		<div
			class="menu-content"
			use:melt={$content}
			transition:fly={{ y: '-25%', opacity: 0, easing: expoOut, duration: 350 }}
		>
			<slot name="content" />
		</div>
	{/if}
</div>

<style lang="postcss">
	.menu-overlay {
		position: fixed;
		inset: 0;
		z-index: 99;
		background: var(--overlay-bg);
	}

	.menu-content {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: var(--floating-bg);
		z-index: 99;
		/* border-radius: var(--radius); */
		border-radius: 0 0 var(--radius) var(--radius);
		border: var(--border);

		@media (--md) {
		}
	}
</style>
