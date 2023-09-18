<script lang="ts">
</script>

<div class="dashboard">
	<nav>
		<slot name="nav" />
	</nav>
	<article>
		<slot />
	</article>
</div>

<style lang="scss">
	.dashboard {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 0.5rem;
		@include md {
			flex-direction: row;
			padding: 0.75rem;
		}
	}

	nav {
		display: flex;
		flex-direction: row;
		align-self: stretch;
		overflow-x: auto;
		@include md {
			overflow-x: hidden;
			overflow-y: auto;
			width: 150px;
			padding: 1.5rem 0;
			flex-direction: column;
		}
	}

	article {
		flex: 1;
		border-radius: var(--radius-lg);
		padding: 2rem;
		background-color: var(--color-neutral-50);
		@include dark {
			background-color: var(--color-neutral-700);
		}
	}
</style>
