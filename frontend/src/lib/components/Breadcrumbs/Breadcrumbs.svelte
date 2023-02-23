<!--
	@component
	# Breadcrumbs
-->
<script lang="ts">
	import OverflowEffect from '$components/OverflowEffect.svelte';

	export let variant: 'default' | 'ghost' | 'outlined' = 'default';
</script>

<nav class="ui-breadcrumbs {variant} no-scrollbar">
	<OverflowEffect>
		<div class="inner">
			<slot />
		</div>
	</OverflowEffect>
</nav>

<style lang="scss">
	.ui-breadcrumbs {
		--inset: var(--ui-inset);
		--height: var(--ui-height);
		--radius: var(--ui-radius-md);
		position: relative;
		font-weight: 500;
		border-radius: var(--radius);
		background: var(--overflow-color);
		border: 1px solid black;
		max-width: 200px;
	}

	.inner {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
		padding: var(--inset);
		height: var(--height);
		gap: 0;
	}

	.default {
		--overflow-color: #{col(bg, 700)};
		background: col(bg, 700, 0.5);
	}

	.outlined {
		--overflow-color: transparent;
		border: 1px solid col(fg, 100, 0.1);
	}

	.ghost {
	}
</style>
