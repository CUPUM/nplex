<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import { createRoutes } from '$utils/routes';

	let loading: string | null = null;

	beforeNavigate(({ to }) => {
		if (to && createRoutes.map((r) => r.pathname).includes(to.url.pathname)) {
			loading = to.url.pathname;
		}
	});

	afterNavigate(() => {
		loading = null;
	});
</script>

<ul class="nest">
	{#each createRoutes as r, i}
		<li>
			<Button
				style="width: 100%;"
				variant="ghost"
				href={r.pathname}
				active={$page.url.pathname.startsWith(r.pathname)}
				loading={!!loading && loading.startsWith(r.pathname)}
				disabled={r.disabled}
			>
				<!-- <Icon name="pen" slot="leading" delay={i * 50} /> -->
				{r.title}
			</Button>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		--inset: var(--ui-inset);
		padding: var(--inset);
		display: flex;
		flex-direction: column;
	}
</style>
