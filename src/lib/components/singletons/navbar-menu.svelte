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
		<menu
			class="menu-content"
			use:melt={$content}
			transition:fly={{ x: '100%', opacity: 0, easing: expoOut, duration: 400 }}
		>
			<slot name="content" close={$close} title={$title} description={$description} />
		</menu>
	{/if}
</div>

<style>
	.menu-overlay {
		position: fixed;
		inset: 0;
		z-index: 99;
		background: var(--overlay-bg);
	}

	.menu-content {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		pointer-events: none;
	}
</style>
