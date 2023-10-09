<script lang="ts">
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			editables: {
				projects: 'Mes projets',
				organizations: 'Mes organisations',
			},
		},
		en: {
			editables: {
				projects: 'My projects',
				organizations: 'My organizations',
			},
		},
	});

	export let data;
</script>

<slot />
<aside>
	<section>
		<h2 class="heading md">{$t.editables.projects}</h2>
		{#await data.streamed.editableProjects then ep}
			<ul>
				{#each ep as p}
					<li>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a {...$link(`/edit/projects/${p.id}`)} class="button outlined">
							{p.id}
						</a>
					</li>
				{/each}
			</ul>
		{/await}
	</section>
	<section>
		<h2 class="heading md">{$t.editables.organizations}</h2>
		{#await data.streamed.editableOrganizations then eo}
			<ul>
				{#each eo as o}
					<li>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a {...$link(`/edit/organizations/${o.id}`)} class="button outlined">
							{o.id}
						</a>
					</li>
				{/each}
			</ul>
		{/await}
	</section>
</aside>

<style lang="postcss">
	aside {
		border-top: var(--base-border);
		padding: 1rem 2rem;
		overflow: hidden;
	}

	ul {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		overflow-x: scroll;
		gap: 1em;
		max-width: 100%;
	}
</style>
