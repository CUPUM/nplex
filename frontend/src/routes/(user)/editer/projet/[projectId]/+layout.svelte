<script lang="ts">
	import RootBackground from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import type { ActionData, PageData } from './$types';
	import { topid } from './common';
	import Header from './Header.svelte';
	import Toolbar from './Toolbar.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<!-- <RootTheme theme="dark" /> -->
<RootBackground color={col('bg', '300')} />
<Header {data} />
<article id={topid}>
	<slot />
	<Toolbar />
</article>

<style lang="scss">
	article {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
