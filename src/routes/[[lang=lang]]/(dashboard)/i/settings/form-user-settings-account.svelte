<script lang="ts">
	import * as m from '$i18n/messages';
	import { extendSuperForm } from '$lib/crud/form/client';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { form, enhance, tainted, submitting, submitter } = extendSuperForm(
		superForm(data.accountForm)
	);
</script>

<form method="POST" use:enhance action="?/delete" class="dashboard-section">
	<div class="dashboard-section-content">
		<button
			class="button button-cta"
			data-danger
			onclick={(e) => {
				if (!confirm(m.account_delete_confirm())) {
					e.preventDefault();
					e.stopImmediatePropagation();
				}
			}}
		>
			{m.account_delete_permanently()}
		</button>
	</div>
</form>
