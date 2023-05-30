<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { DECRIPTORS_ALLOWED_ROLES, EDITOR_ROUTES } from '$routes/(authed)/editer/constants';
	import { userHasRole } from '$utils/validation';
</script>

{#each Object.values(EDITOR_ROUTES) as group, i}
	<legend>{group.title}</legend>
	<Button
		variant="ghost"
		contentAlign="start"
		href={group.pathname}
		active={$page.url.pathname.startsWith(group.pathname)}
	>
		<Icon name="plus" slot="leading" />
		{group.create.title}
	</Button>
	<Button
		variant="ghost"
		contentAlign="start"
		href="{group.pathname}#{group.edit.hash}"
		active={$page.url.pathname.startsWith(`${group.pathname}#${group.edit.hash}`)}
	>
		<Icon name="pen" slot="leading" />
		{group.edit.title}
	</Button>
	{#if 'descriptors' in group}
		<Button
			variant="ghost"
			contentAlign="start"
			href={group.descriptors.pathname}
			active={$page.url.pathname.startsWith(group.descriptors.pathname)}
			disabled={!userHasRole($page.data, ...DECRIPTORS_ALLOWED_ROLES)}
		>
			<Icon name="graph" slot="leading" />
			{group.descriptors.title}
		</Button>
	{/if}
	<hr class="rule" />
{/each}

<style lang="scss">
	legend {
		padding: 1em 1.5em;
		padding-bottom: 0.5em;
		font-size: var(--ui-text-xs);
		opacity: 0.35;
		font-weight: 500;
		letter-spacing: 0.2px;
	}

	hr:last-of-type {
		display: none;
	}
</style>
