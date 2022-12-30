<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Header from './Header.svelte';
	import Toolbar from './Toolbar.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<Header {data} />
<slot />
<Toolbar />

<style lang="scss">
</style>
