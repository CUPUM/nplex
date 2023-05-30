<script lang="ts">
  import { page } from "$app/stores";
  import { EXPLORE_ROUTES } from "$utils/routes";

	const routes = [
		{
			
		}
	]
</script>

<nav class="category" hidden={!$page.data.showCategoryNavbar}>
	{#each EXPLORE_ROUTES as r}
		<NavbarButton
			category
			href={r.pathname}
			current={$page.url.pathname.startsWith(r.pathname) || undefined}
		>
			{r.title}
		</NavbarButton>
	{/each}
</nav>

<style lang="scss">
	nav {

	}
</style>