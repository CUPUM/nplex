<script lang="ts">
	import { link } from '$lib/i18n/link';

	export let data;
</script>

<slot />
<aside>
	<section>
		<h2>My projects</h2>
		{#await data.streamed.editableProjects then ep}
			<ul>
				{#each ep as p}
					<li>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a {...$link(`/edit/projects/${p.id}`)}>
							{p.id}
						</a>
					</li>
				{/each}
			</ul>
		{/await}
	</section>
	<section>
		<h2>My organizaations</h2>
		{#await data.streamed.editableOrganizations then eo}
			<ul>
				{#each eo as o}
					<li>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a {...$link(`/edit/organizations/${o.id}`)}>
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
		padding: 1rem;
	}
</style>
