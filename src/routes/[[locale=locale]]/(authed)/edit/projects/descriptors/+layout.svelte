<script lang="ts">
	import Dashboard from '$lib/components/Dashboard.svelte';
	import DashboardNav, { type DashboardNavLink } from '$lib/components/DashboardNav.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	const t = createTranslations({
		fr: {
			heading: 'Descripteurs',
			nav: {
				types: 'Types de projet',
				interventions: 'Interventions',
				images: 'Images',
			},
		},
		en: {
			heading: 'Descripteurs',
			nav: {
				types: 'Project types',
				interventions: 'Interventions',
				images: 'Images',
			},
		},
	});

	const links = [
		{ key: 'types', path: '/edit/projects/descriptors/types' },
		{ key: 'interventions', path: '/edit/projects/descriptors/interventions' },
		{ key: 'images', path: '/edit/projects/descriptors/images' },
	] as const satisfies Readonly<(DashboardNavLink & { icon?: ComponentType<Icon> })[]>;
</script>

<Dashboard>
	<DashboardNav slot="nav" {links}>
		<svelte:fragment slot="heading">
			{$t.heading}
		</svelte:fragment>
		<svelte:fragment slot="link" let:link let:i>
			{$t.nav[link.key]}
		</svelte:fragment>
	</DashboardNav>
	<slot />
</Dashboard>

<style lang="scss">
</style>
