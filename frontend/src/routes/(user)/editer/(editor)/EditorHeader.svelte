<script lang="ts">
	import Breadcrumbs from '$components/Breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbsItem from '$components/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeparator from '$components/Breadcrumbs/BreadcrumbsSeparator.svelte';

	// export let crumbs: ComponentProps<Breadcrum>
</script>

<header>
	<div>
		<Breadcrumbs>
			<BreadcrumbsItem href="/">Bonjour</BreadcrumbsItem>
			<BreadcrumbsSeparator />
			<BreadcrumbsItem href="/">Bonjour</BreadcrumbsItem>
			<BreadcrumbsSeparator />
			<BreadcrumbsItem href="/">Bonjour</BreadcrumbsItem>
			<BreadcrumbsSeparator />
		</Breadcrumbs>
	</div>
	<!-- <nav in:fly={{ y: -6, delay: 500 }} class="no-scrollbar">
		<OverflowEffect>
			{#each [baseCrumb, baseCrumb, baseCrumb, baseCrumb, baseCrumb, baseCrumb, baseCrumb, baseCrumb, baseCrumb] as crumb, i (i)}
				<span class="sep">/</span>
				<a href={crumb.pathname}>
					<span>
						{crumb.label}
					</span>
				</a>
			{/each}
		</OverflowEffect>
	</nav> -->
</header>

<style lang="scss">
	header {
		--inset: var(--ui-inset);
		position: sticky;
		top: 0;
		width: 100%;
		padding-top: calc(1rem - var(--inset));
		padding-bottom: 1.5rem;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		z-index: 5;
		// background: var(--editor-bg);
		// border-bottom: 1px solid col(fg, 500, 0.05);
	}

	div {
		max-width: var(--ui-nav-center-w);
		width: 100%;
		display: flex;
	}
</style>
