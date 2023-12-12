<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { melt } from '@melt-ui/svelte';
	import { AlertTriangle } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData['manageForm'];

	let delRef: HTMLButtonElement;

	const {
		tainted,
		form,
		enhance,
		loadable: {
			submitter: { root: submitter },
		},
	} = superForm(data);
</script>

<DashboardForm {enhance}>
	<DashboardFormSection title={$langKey(m.account_manage())}>
		<div>
			<button
				class="button danger cta space-between"
				type="submit"
				formaction="?/delete"
				bind:this={delRef}
				use:melt={$submitter(delRef)}
				on:click={(e) => {
					const ok = confirm('Really really though?');
					if (!ok) {
						e.preventDefault();
					}
					return ok;
				}}
			>
				<LangKey>{m.del()}</LangKey><AlertTriangle />
			</button>
		</div>
	</DashboardFormSection>
</DashboardForm>
