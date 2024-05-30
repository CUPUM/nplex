<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { SuperFormData } from '$lib/crud/validation/forms/types';
	import { switchCrossfade } from '$lib/motion/presets';
	import type { PageData } from './$types';

	const [send, receive] = switchCrossfade;

	export let form: SuperFormData<PageData['form']>['form'];
	export let types: PageData['types'];
</script>

<fieldset class="dashboard-subsection">
	<legend class="dashboard-subsection-header h5">
		{m.project_type()}
	</legend>
	<div class="dashboard-subsection-content">
		<menu class="switch" use:ripple>
			{#each types as pt}
				<label class="switch-item">
					<input
						type="radio"
						name="typeId"
						bind:group={$form.typeId}
						value={pt.id}
						class="visually-hidden"
					/>
					{#if $form.typeId === pt.id}
						<div class="switch-thumb" in:receive={{ key: 'type' }} out:send={{ key: 'type' }} />
					{/if}
					{pt.title}
				</label>
			{/each}
		</menu>
	</div>
</fieldset>

<style>
	@import '$styles/scoped/dashboard';

	.switch {
		align-self: center;
	}
</style>
