<script lang="ts">
	import type { LayoutData } from './$types';
	import type { EDITABLES_NEW } from './EditablesList.svelte';

	export let datum: LayoutData['organisations'][number] | typeof EDITABLES_NEW;
</script>

{#if 'title' in datum}
	<a>
		{datum.title}
	</a>
{:else}
	<a href=""> Nouveau projet :D </a>
{/if}

<style lang="scss">
	a {
		display: grid;
		height: 350px;
		aspect-ratio: 2 /3;
		background: red;
	}
</style>
