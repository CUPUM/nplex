<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
</script>

<DashboardSubSection>
	{#snippet header()}
		<h3>
			{m.del()}
		</h3>
	{/snippet}
	<button
		class="button button-cta"
		data-danger
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
