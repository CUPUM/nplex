<script lang="ts">
	import { availableLanguageTags } from '$i18n/runtime';
	import type { SuperForm } from '$lib/forms/super-form';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import type { HTMLFormAttributes } from 'svelte/elements';

	type $$Props = HTMLFormAttributes & {
		enhance: SuperForm['enhance'];
	};

	export let enhance: $$Props['enhance'];
</script>

<form {...$$restProps} use:enhance method="POST">
	<slot />
	{#each availableLanguageTags as lang}
		<fieldset>
			<legend class="h6">{LANG_DETAILS[lang].name}</legend>
			<slot name="translation" {lang} />
		</fieldset>
	{/each}
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		gap: var(--base-gutter);
		font-size: var(--size-sm);
		width: var(--width-sm);
		max-width: 100%;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		gap: var(--base-gutter);
	}

	legend {
		margin-block: 1em;
	}
</style>
