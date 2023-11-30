<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
</script>

<section>
	<h1 class="h2">
		<LangKey>{m.project_descriptors()}</LangKey>
	</h1>
</section>

<style lang="postcss">
	section {
		padding: 2rem;
	}
</style>
