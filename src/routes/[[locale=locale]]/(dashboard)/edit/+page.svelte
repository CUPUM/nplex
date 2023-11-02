<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { createLoadableLink } from '$lib/builders/loading';
	import { createTranslations } from '$lib/i18n/translate';
	import { melt } from '@melt-ui/svelte';

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

	const {
		elements: { link },
	} = createLoadableLink();
</script>

<article>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button cta big" use:melt={$link('/new/project')} use:ripple>
		{$t.createProject}
	</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button cta big" use:melt={$link('/new/project')} use:ripple>
		{$t.createOrganization}
	</a>
</article>

<style lang="postcss">
	.create {
		padding: 3rem;
	}
</style>
