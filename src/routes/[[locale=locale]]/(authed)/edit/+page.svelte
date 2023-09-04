<script lang="ts">
	import { enhance } from '$app/forms';
	import { createLoading } from '$lib/actions/loading';
	import { ripple } from '$lib/actions/ripple';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			createProject: 'Créer un nouveau projet',
			createOrganization: 'Créer un nouvel organisme',
		},
		en: {
			createProject: 'Create a new project',
			createOrganization: 'Create a new organization',
		},
	});

	const { element: projectElement, action: projectAction, state: projectState } = createLoading();

	const { element: orgElement, action: orgAction, state: orgState } = createLoading();
</script>

<article>
	<form use:enhance method="POST" action="?/createProject">
		<button class="button" use:ripple use:projectAction {...$projectElement}>
			{$t.createProject}
		</button>
	</form>
	<form use:enhance method="POST" action="?/createOrganization">
		<button class="button" use:ripple use:orgAction {...$orgElement}>
			{$t.createOrganization}
		</button>
	</form>
</article>

<style lang="scss">
</style>
