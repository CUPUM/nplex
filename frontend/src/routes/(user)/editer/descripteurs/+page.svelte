<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Gestion des descripteurs de projet</h1>
<form action="">
	<h2>Type de travaux</h2>
	<ul>
		{#each data.descriptors.works as work}
			<li>
				<div>
					<input type="checkbox" name="" id="" />
				</div>
				<div>
					{work.title}
				</div>
			</li>
		{/each}
	</ul>
</form>

<style lang="scss">
	h1 {
		@include h1;
	}

	li {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
