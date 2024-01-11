<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
</script>

<section class="dashboard-section">
	<hgroup>
		<h1 class="h2">
			<LangKey>{m.project_descriptors()}</LangKey>
		</h1>
	</hgroup>
</section>

<style lang="postcss">
	@import '$styles/scoped/dashboard';

	section {
		flex: 1;
	}

	hgroup {
		padding: 2rem;
	}
</style>
