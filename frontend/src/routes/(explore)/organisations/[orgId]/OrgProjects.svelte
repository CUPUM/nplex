<script lang="ts">
	import { getOrgContext } from './common';

	const org = getOrgContext();
</script>

<section>
	<h2 class="heading-lg">Projets</h2>
	<ul>
		<li class="subtle">À venir</li>
	</ul>
</section>

<style lang="scss">
	section {
		align-self: center;
		width: 100%;
		max-width: var(--ui-width-main);
		margin: var(--ui-gutter-sm);
		padding: var(--ui-gutter-md);
	}

	ul {
		display: flex;
		flex-direction: row;
		gap: var(--ui-gutter-xs);
	}

	li {
		padding: 1.5rem;
		border-radius: var(--ui-radius-md);
		background: col(bg, 500);
	}
</style>
