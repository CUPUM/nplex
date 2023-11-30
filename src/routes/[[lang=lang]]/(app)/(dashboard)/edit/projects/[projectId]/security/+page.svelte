<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$i18n/messages';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	export let data;
</script>

<DashboardForm {enhance}>
	<svelte:fragment slot="header">
		<h2>Security</h2>
	</svelte:fragment>
	<DashboardFormSection title="Transfer">
		<p class="note">Transfer project authorship</p>
	</DashboardFormSection>
	<DashboardFormSection title={$langKey(m.del())}>
		<div>
			<button
				class="button cta danger"
				type="submit"
				formaction="?/delete"
				on:submit={(e) => {
					if (confirm(m.project_delete_confirm())) {
						e.stopImmediatePropagation();
						return false;
					}
				}}
			>
				<LangKey>{m.project_delete()}</LangKey>
			</button>
		</div>
	</DashboardFormSection>
</DashboardForm>

<style lang="postcss">
</style>
