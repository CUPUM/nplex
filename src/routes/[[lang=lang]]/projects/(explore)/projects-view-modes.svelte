<script lang="ts" context="module">
	export const PROJECTS_VIEW_MODES = {
		MASONRY: 'masonry',
		LIST: 'list',
	} as const;

	export type ProjectsViewMode = ValueOf<typeof PROJECTS_VIEW_MODES>;

	const COMPUTED_PROJECTS_VIEW_MODES = {
		...PROJECTS_VIEW_MODES,
		MAP: 'map',
	} as const;

	type ComputedProjectsViewMode = ValueOf<typeof COMPUTED_PROJECTS_VIEW_MODES>;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import SwitchThumb from '$lib/components/primitives/switch-thumb.svelte';
	import { LayoutDashboard, Map, StretchHorizontal } from 'lucide-svelte';
	import type { ValueOf } from 'type-fest';

	let { mode = $bindable() }: { mode: ProjectsViewMode } = $props();

	const key = {};

	let computedMode = $derived<ComputedProjectsViewMode>(
		$page.route.id?.split('(explore)')[1]?.startsWith('/map')
			? COMPUTED_PROJECTS_VIEW_MODES.MAP
			: mode
	);
</script>

<menu class="switch self-start rounded-full backdrop-blur-md" use:ripple>
	<button
		role="radio"
		tabindex="0"
		class="switch-item aspect-square"
		aria-checked={computedMode === PROJECTS_VIEW_MODES.MASONRY ? true : undefined}
		onclick={(e) => {
			mode = PROJECTS_VIEW_MODES.MASONRY;
		}}
	>
		<LayoutDashboard />
		<SwitchThumb {key} current={computedMode === PROJECTS_VIEW_MODES.MASONRY} />
	</button>
	<button
		role="radio"
		tabindex="0"
		class="switch-item aspect-square"
		aria-checked={computedMode === PROJECTS_VIEW_MODES.LIST ? true : undefined}
		onclick={(e) => {
			mode = PROJECTS_VIEW_MODES.LIST;
		}}
	>
		<StretchHorizontal />
		<SwitchThumb {key} current={computedMode === PROJECTS_VIEW_MODES.LIST} />
	</button>
	<a
		role="radio"
		tabindex="0"
		aria-disabled={true}
		class="switch-item aspect-square"
		{...linkAttributes(`/projects/map${$page.url.search}`)}
		aria-checked={computedMode === COMPUTED_PROJECTS_VIEW_MODES.MAP ? true : undefined}
	>
		<SwitchThumb {key} current={computedMode === COMPUTED_PROJECTS_VIEW_MODES.MAP} />
		<Map />
	</a>
</menu>
