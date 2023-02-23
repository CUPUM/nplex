<script lang="ts">
	import Breadcrumbs from '$components/Breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbsItem from '$components/Breadcrumbs/BreadcrumbsItem.svelte';
	import BreadcrumbsSeparator from '$components/Breadcrumbs/BreadcrumbsSeparator.svelte';
	import OverflowEffect from '$components/OverflowEffect.svelte';
</script>

<article>
	<Breadcrumbs>
		<BreadcrumbsItem href="/tests">Test</BreadcrumbsItem>
		<BreadcrumbsSeparator />
		<BreadcrumbsItem href="/tests">Test</BreadcrumbsItem>
		<BreadcrumbsSeparator />
		<BreadcrumbsItem href="/tests">Test</BreadcrumbsItem>
		<BreadcrumbsSeparator />
		<BreadcrumbsItem href="/tsests">Test</BreadcrumbsItem>
		<BreadcrumbsSeparator />
		<BreadcrumbsItem href="/tests">Test</BreadcrumbsItem>
		<BreadcrumbsSeparator />
		<BreadcrumbsItem href="/tests">Test</BreadcrumbsItem>
		<BreadcrumbsSeparator />
		<BreadcrumbsItem href="/tests">Test</BreadcrumbsItem>
		<BreadcrumbsSeparator />
		<BreadcrumbsItem href="/tests">Test</BreadcrumbsItem>
		<BreadcrumbsSeparator />
		<BreadcrumbsItem href="/tests">Test</BreadcrumbsItem>
	</Breadcrumbs>
</article>
<article>
	<nav>
		<OverflowEffect x>
			<div class="inner">
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
				<a href="/">Test</a>
			</div>
		</OverflowEffect>
	</nav>
</article>

<style lang="scss">
	article {
		padding: 5rem;
	}

	nav {
		flex: none;
		display: block;
		border-radius: 1em;
		background: wheat;
		position: relative;
		width: 300px;

		.inner {
			position: relative;
			height: var(--ui-height);
			padding: 3px 1em;
			display: inline-flex;
			flex-wrap: nowrap;
			gap: 1em;
			align-items: center;
		}

		a {
			display: block;
			flex: none;
		}
	}
</style>
