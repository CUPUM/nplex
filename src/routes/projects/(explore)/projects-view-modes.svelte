<script lang="ts" context="module">
	export const PROJECTS_EXPLORE_MODES = {
		MASONRY: 'masonry',
		LIST: 'list',
		MAP: 'map',
	} as const;

	export type ProjectsExploreMode = ValueOf<typeof PROJECTS_EXPLORE_MODES>;

	export const PROJECTS_EXPLORE_MODES_ARR = Object.values(PROJECTS_EXPLORE_MODES);

	export const PROJECTS_EXPLORE_MODES_DETAILS = {
		[PROJECTS_EXPLORE_MODES.MASONRY]: {
			href: '/projects',
			Icon: LayoutDashboard,
		},
		[PROJECTS_EXPLORE_MODES.LIST]: {
			href: '/projects/list',
			Icon: StretchHorizontal,
		},
		[PROJECTS_EXPLORE_MODES.MAP]: {
			href: '/projects/map',
			Icon: Map,
		},
	} satisfies Record<ProjectsExploreMode, { href: string; Icon: ComponentType }>;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import SwitchThumb from '$lib/components/primitives/switch-thumb.svelte';
	import { LayoutDashboard, Map, StretchHorizontal } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { ValueOf } from 'type-fest';

	const key = {};
</script>

<menu class="switch self-start rounded-full backdrop-blur-md">
	{#each PROJECTS_EXPLORE_MODES_ARR as mode}
		{@const { href, Icon } = PROJECTS_EXPLORE_MODES_DETAILS[mode]}
		{@const attr = linkAttributes(`${href}${$page.url.search}`)}
		<a class="switch-item aspect-square" use:ripple {...attr}>
			<SwitchThumb {key} current={attr['aria-current']} />
			<Icon />
		</a>
	{/each}
</menu>
