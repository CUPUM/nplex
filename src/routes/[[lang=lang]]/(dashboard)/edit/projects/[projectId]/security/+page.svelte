<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';

	export let data;
</script>

<form use:enhance class="dashboard-section" method="POST">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2>Security</h2>
		</hgroup>
	</header>
	<fieldset class="dashboard-subsection">
		<legend class="dashboard-subsection-header">
			<h3 class="h5">Transfer</h3>
		</legend>
		<div class="dashboard-subsection-content">
			<p class="dim">Transfer project authorship</p>
		</div>
	</fieldset>
	<fieldset class="dashboard-subsection">
		<legend class="dashboard-subsection-header h5">
			<LangKey>{m.del()}</LangKey>
		</legend>
		<div class="dashboard-subsection-content">
			<div>
				<button
					class="button cta danger"
					type="submit"
					formaction="?/delete"
					on:click={(e) => {
						const ok = confirm(m.project_delete_confirm());
						if (!ok) {
							e.preventDefault();
						}
						return ok;
					}}
				>
					<LangKey>{m.project_delete()}</LangKey>
				</button>
			</div>
		</div>
	</fieldset>
</form>

<style lang="postcss">
	@import '$styles/scoped/dashboard';
</style>
