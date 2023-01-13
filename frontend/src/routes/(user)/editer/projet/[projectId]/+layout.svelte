<script lang="ts">
	import RootBackground from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import type { ActionData, PageData } from './$types';
	import { topid } from './common';
	import Header from './Header.svelte';
	import Menu from './Menu.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<!-- <RootTheme theme="dark" /> -->
<RootBackground body={col('bg', '300')} />
<Header {data} />
<article id={topid}>
	<slot />
	<Menu />
</article>

<style lang="scss">
	article {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
