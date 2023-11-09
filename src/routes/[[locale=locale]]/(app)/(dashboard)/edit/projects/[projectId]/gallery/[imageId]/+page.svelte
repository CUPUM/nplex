<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			save: 'Sauvegarder',
			close: (tainted: unknown) => `Fermer${tainted ? ' sans sauvegarder' : ''}`,
			description: 'Description',
			dialog: {
				title: 'Détails de l’image',
			},
		},
		en: {
			save: 'Save',
			close: (tainted: unknown) => `Close${tainted ? ' without saving' : ''}`,
			description: 'Description',
			dialog: {
				title: 'Image details',
			},
		},
	});

	export let data;
</script>

<form action=""></form>

<style lang="postcss">
</style>
