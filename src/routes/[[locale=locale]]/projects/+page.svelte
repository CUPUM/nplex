<script lang="ts">
	import { link } from '$lib/i18n/link';

	export let data;
</script>

<div>
	<menu>Des filtres and shits</menu>
	<section>
		<ul>
			{#each data.qProjects as p}
				<li>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a {...$link(`/projects/${p.id}`)}>{p.title}</a>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style lang="postcss">
	div {
	}
</style>
