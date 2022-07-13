<script lang="ts" context="module">
</script>

<script lang="ts">
	import Field from '$components/primitives/Field.svelte';
</script>

<div class="layout">
	<aside>
		<Field type="search" placeholder="Rechercher un article" />
		<h4>Articles</h4>
		<ul>
			<li>Article 1</li>
			<li>Article 2</li>
			<li>Article 3</li>
			<li>Article 4</li>
		</ul>
	</aside>
	<article>
		<slot />
	</article>
</div>

<style lang="scss">
	.layout {
		display: flex;
		padding-top: var(--navbar-height);
	}

	aside {
		display: flex;
		flex-direction: column;
	}
</style>
