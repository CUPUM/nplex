<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			createProject: 'Créer un nouveau projet',
			createOrganization: 'Créer une nouvelle organisation',
		},
		en: {
			createProject: 'Create a new project',
			createOrganization: 'Create a new organization',
		},
	});
</script>

<article>
	<a class="create" {...$link('/new/project')} use:ripple>
		{$t.createProject}
	</a>
	<a class="create" {...$link('/new/organization')} use:ripple>
		{$t.createOrganization}
	</a>
</article>

<style lang="postcss">
	.create {
		padding: 3rem;
	}
</style>
