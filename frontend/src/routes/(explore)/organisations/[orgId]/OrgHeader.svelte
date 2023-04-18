<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { THEMES } from '$utils/themes';
	import { getOrgContext } from './common';

	const org = getOrgContext();
</script>

<header>
	<h1 class="heading-lg">
		{org.name}
	</h1>
	{#if org.url}
		<menu data-theme={THEMES.dark}>
			<Button href={org.url}><Icon name="link" slot="leading" />Visiter le site</Button>
		</menu>
	{/if}
</header>

<style lang="scss">
	header {
		align-self: center;
		width: 100%;
		max-width: var(--ui-width-main);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		margin: var(--ui-gutter-sm);
		padding: var(--ui-gutter-md);
		background: col(fg, 500);
		color: col(bg, 500);
		border-radius: var(--ui-radius-xl);
	}
</style>
