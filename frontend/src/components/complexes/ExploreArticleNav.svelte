<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/primitives/Button.svelte';
	import { crossfadeExploreArticleBackButton } from '$transitions/crossfades';
	import { exploreRoutes } from '$utils/routes';

	const [send, receive] = crossfadeExploreArticleBackButton;

	let projectId;
	$: if ($page.params.projectId) {
		projectId = $page.params.projectId;
	}
</script>

<nav>
	<div in:receive={{ key: projectId }} out:send={{ key: projectId }}>
		<Button href={exploreRoutes.find((r) => r.category === $page.stuff.category).pathname} variant="secondary">
			Go back :)
		</Button>
	</div>
</nav>

<style>
	nav {
		z-index: 100;
		position: absolute;
		top: 1rem;
		margin: 0 2rem;
		left: 0;
	}
</style>
