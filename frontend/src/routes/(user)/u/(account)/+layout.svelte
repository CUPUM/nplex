<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { LayoutData } from './$types';
	import AccountMenu from './AccountMenu.svelte';

	export let data: LayoutData;
</script>

<div class="account">
	<AccountMenu />
	<article in:fly={{ y: 10 }}>
		<slot />
	</article>
</div>

<style lang="scss">
	.account {
		position: relative;
		display: grid;
		grid-template-columns: minmax(max-content, 1fr) minmax(auto, var(--ui-width-md)) minmax(0, 1fr);
		margin: 0 auto;
		gap: 0;
		align-items: flex-start;
		width: 100%;
		max-width: var(--ui-width-main);
	}

	article {
		padding-inline: 1.5rem;
		position: relative;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
	}
</style>
