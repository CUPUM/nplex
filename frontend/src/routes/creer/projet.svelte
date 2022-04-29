<script lang="ts">
	export let dbproject;

	interface ProjectData {
		ownership: string;
		usage_category: string;
		usage: string;
		secondary_usages: {
			usage_category: string;
			usage: string;
		}[];
	}

	// To do for project storage / retention:
	// Assign temporary local ids (or actual dbproject id if editing an already existing project)
	// in a map akin to: {[id: string]: [project: ProjectData]}

	// export let project: ProjectData = {};
</script>

{#if dbproject}
	<h1>Éditer le projet intitulé {dbproject.title}</h1>
{:else}
	<h1>Soumettre un nouveau projet</h1>
{/if}
<h2>Type de propriétaire</h2>
<h2>Usage principal</h2>
<h3>Catégorie</h3>
<h3>Usage</h3>
<!-- {#each  as }
	
{/each} -->
<h2>Usage secondaire</h2>
<h3>Catégorie</h3>
<h3>Usage</h3>
