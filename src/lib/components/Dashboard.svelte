<script lang="ts">
</script>

<div class="dashboard">
	{#if $$slots.header}
		<header>
			<slot name="header" />
		</header>
	{/if}
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
		min-height: 200vh;
		@include md {
			flex-direction: row;
			padding-top: 0;
		}
	}

	nav {
		display: flex;
		flex-direction: row;
		align-self: stretch;
		overflow-x: auto;
		@include md {
			align-self: flex-start;
			position: sticky;
			top: var(--navbar-height);
			overflow-x: hidden;
			overflow-y: auto;
			width: var(--dashboard-sidebar-width);
			// padding: 1.5rem 0;
			flex-direction: column;
		}
	}

	article {
		flex: 1;
		border-radius: var(--radius-lg) 0 0 var(--radius-lg);
		background: radial-gradient(at left top, var(--color-neutral-50), transparent);
		@include dark {
			// background-color: var(--color-neutral-800);
			background: radial-gradient(at left top, var(--color-neutral-800), transparent);
		}
	}
</style>
