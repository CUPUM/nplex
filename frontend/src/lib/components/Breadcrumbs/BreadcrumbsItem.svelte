<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let current: boolean | undefined = undefined;

	$: current = $page.url.pathname === new URL(href, $page.url.origin).pathname || undefined;
</script>

<a
	class="breadcrumbs-item"
	{href}
	data-sveltekit-preload-code
	data-sveltekit-preload-data
	data-current={current}
>
	<span class="breadcrumb-item-inner ">
		<slot />
	</span>
</a>

<style lang="scss">
	@use './BreadcrumbsItem.scss';
</style>
