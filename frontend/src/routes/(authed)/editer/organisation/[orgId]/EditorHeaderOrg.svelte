<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { organisation } from './common';
</script>

<header>
	<h1 class="heading-2xl">
		{$organisation?.name}
	</h1>
	<Button variant="default" href="/projets/{$page.data.organisation?.id}">
		Visualiser la fiche <Icon name="preview" slot="trailing" />
	</Button>
</header>

<style lang="scss">
	header {
		position: relative;
		min-height: 50vh;
		padding: var(--ui-gutter-lg);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		border-radius: var(--ui-radius-xl);
		background-color: col(bg, 100);
		gap: 1.5rem;
	}

	h1 {
	}
</style>
