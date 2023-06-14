<script lang="ts">
	import Access from './Access.svelte';
	import Delete from './Delete.svelte';
	import Publishing from './Publishing.svelte';

	export let data;
</script>

<header class="editor-form-header">
	<h1 class="heading-lg">Paramètres</h1>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde aspernatur minima enim
		praesentium blanditiis. Est culpa quia qui incidunt sequi.
	</p>
</header>
<Publishing status={data.project.published} />
<Access collaborators={data.collaborators} />
<Delete confirm={data.project.title.split(' ').slice(0, 3).join(' ')} />

<style lang="scss">
	.delete {
		font-size: var(--ui-text-sm);
	}
</style>
