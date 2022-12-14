<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { EDITOR_ROUTES } from '$utils/routes';

	let loading: string | null = null;

	beforeNavigate(({ to }) => {
		// if (to && editRoutes.map((r) => r.pathname).includes(to.url.pathname)) {
		// 	loading = to.url.pathname;
		// }
	});

	afterNavigate(() => {
		loading = null;
	});
</script>

<ul class="meta">
	<li>
		<a href={EDITOR_ROUTES.project.pathname}>Projets</a>
		<ul class="projects">
			<li>
				<a href={EDITOR_ROUTES.project.pathname}>Créer un nouveau projet</a>
			</li>
			<li>
				<a href={EDITOR_ROUTES.project.pathname}>Éditer un projet</a>
			</li>
		</ul>
	</li>
	<li>
		<span>Organisations</span>
	</li>
	<li>
		<span>Acteurs</span>
	</li>
	<!-- {#each editRoutes as r, i}
		<li>
			<Button
				style="width: 100%;"
				variant="ghost"
				href={r.pathname}
				active={$page.url.pathname.startsWith(r.pathname)}
				loading={!!loading && loading.startsWith(r.pathname)}
				disabled={r.disabled}
			>
				{r.title}
			</Button>
		</li>
	{/each} -->
</ul>

<style lang="scss">
	.meta {
		display: flex;
		flex-direction: column;
	}
</style>
