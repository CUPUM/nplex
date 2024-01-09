<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
</script>

<article>
	<h1 class="h2"><LangKey>{m.coming_soon()}</LangKey></h1>
</article>

<style lang="postcss">
	article {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
	}
</style>
