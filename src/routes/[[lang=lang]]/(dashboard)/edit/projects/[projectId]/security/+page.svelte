<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';

	export let data;
</script>

<form use:enhance class="gap-inherit flex flex-col" method="POST">
	<DashboardSubHeader class="dashboard-header">
		<h2>{m.project_settings_security()}</h2>
	</DashboardSubHeader>
	<DashboardSubSection>
		{#snippet header()}
			<h3>{m.transfer()}</h3>
		{/snippet}
		<p class="dim">Transfer project authorship</p>
	</DashboardSubSection>
	<DashboardSubSection>
		{#snippet header()}
			<h3>
				{m.del()}
			</h3>
		{/snippet}
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
			{m.project_delete()}
		</button>
	</DashboardSubSection>
</form>

<style>
	@import '$styles/scoped/dashboard';
</style>
