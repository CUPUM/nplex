<script lang="ts">
	import RootBackground from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import { fly } from 'svelte/transition';
	import type { LayoutData } from './$types';
	import Menu from './Menu.svelte';

	export let data: LayoutData;
</script>

<RootBackground body={col('bg', '000')} />
<div class="account">
	<Menu profile={data.profile} />
	<article in:fly={{ y: 10 }}>
		<slot />
	</article>
</div>

<style lang="scss">
	.account {
		--aside-width: 180px;
		position: relative;
		display: grid;
		// grid-template-columns: var(--aside-width) 1fr var(--aside-width);
		grid-template-columns: var(--aside-width) 1fr;
		margin: 0 auto;
		gap: var(--ui-gutter);
		align-items: flex-start;
		width: 100%;
		max-width: var(--ui-width-main);
		padding: 0 var(--ui-gutter);
		// border-top: 1px solid col(fg, 100, 0.1);
	}

	article {
		position: relative;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: var(--ui-gutter);
		width: 100%;
	}
</style>
