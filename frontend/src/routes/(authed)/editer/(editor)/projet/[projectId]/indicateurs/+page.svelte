<script lang="ts">
	import EditorFormgroup from '../../../EditorFormgroup.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- {#each items as item} -->
<EditorFormgroup legend="Indicateurs d'exemplarité" />

<!-- {/each} -->
<style lang="scss">
</style>
