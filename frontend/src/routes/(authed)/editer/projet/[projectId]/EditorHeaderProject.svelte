<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import MeshGradient from '$components/MeshGradient.svelte';
	import Token from '$components/Token/Token.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { col } from '$utils/css';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { LayoutData } from './$types';
	import { project } from './common';

	let isPublic = ($page.data as LayoutData).project?.publication_status.status === 'published';

	console.log($page.data.project.updated_at);

	const dateFormatter = new Intl.DateTimeFormat('fr-CA');
</script>

<header in:fly={{ y: 6, duration: 250, easing: cubicOut }}>
	<MeshGradient
		color={[
			col('primary', 500),
			col('secondary', 100),
			col('primary', 900),
			col('primary', 100),
			col('secondary', 500),
		]}
		style="z-index: -1;"
	/>
	{#if isPublic != null}
		<section>
			<Tooltip
				message={isPublic
					? 'Ce projet est présentement visible publiquement.'
					: "Ce projet n'est pas présentement visible publiquement."}
				place="bottom"
				align="start"
			>
				<Token equi readonly variant="outlined" active={isPublic}>
					<Icon name={isPublic ? 'eye-open' : 'eye-close'} />
				</Token>
			</Tooltip>
			<span class="subtle">
				{isPublic ? 'Fiche publiée' : 'Fiche brouillon (privée)'}
			</span>
		</section>
	{/if}
	<hgroup class="heading">
		<h1 class="heading-2xl">
			{#if $project?.title != null}
				{$project.title}
			{:else}
				<i style="opacity: .5">Titre non défini</i>
			{/if}
		</h1>
	</hgroup>
	<section class="footer">
		<Button variant="default" href="/projets/{$page.data.project?.id}">
			Visualiser la fiche du projet <Icon name="preview" slot="trailing" />
		</Button>
		<nobr>
			<dl>
				<dt>Créée le</dt>
				<dd>{dateFormatter.format(new Date($page.data.project?.created_at))}</dd>
				<dt>par</dt>
				<dd>{$page.data.project?.created_by?.first_name}</dd>
			</dl>
			<dl>
				<dt>Modifiée le</dt>
				<dd>{dateFormatter.format(new Date($page.data.project?.updated_at))}</dd>
				<dt>par</dt>
				<dd>{$page.data.project?.updated_by?.first_name}</dd>
			</dl>
		</nobr>
	</section>
</header>

<style lang="scss">
	header {
		position: relative; // Avoids positioning problem with nested tooltip due to offsetParent changing during transition...
		width: 100%;
		min-height: calc(100vh - var(--ui-gap-sm) - var(--ui-nav-h));
		min-height: calc(100svh - var(--ui-gap-sm) - var(--ui-nav-h));
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: var(--ui-gutter-md);
		gap: var(--ui-gutter-md);
		// border: var(--ui-border-size) dashed col(primary, 500, 0.75);
		background-color: col(primary, 300);
		isolation: isolate;
		border-radius: var(--ui-radius-xl);
		margin-bottom: var(--ui-gap-sm);
		opacity: max(0, calc(1.25 - var(--ui-scroll) * 0.0015));
		transition: opacity 0.25s;
	}

	hgroup {
		flex: 1;
		display: flex;
		align-items: center;
		color: col(fg, 900);
	}

	section {
		position: relative;
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		bottom: min(1rem, calc(0.2 * var(--ui-scroll-px)));
		opacity: max(0, calc(1.5 - var(--ui-scroll) * 0.025));
		transition: all 0.25s;
	}

	dl {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
		color: col(fg, 500);
		padding: 0 1.5em;
		height: var(--ui-block-lg);
		border-radius: var(--ui-radius-md);
		// background-color: col(primary, 100, 0.1);
		border: var(--ui-border-size) solid col(primary, 900, 0.2);
	}

	nobr {
		display: inherit;
		gap: inherit;
	}

	dt {
		position: relative;
		top: -0.1em;
		opacity: 0.35;
		&::after {
			content: '\00A0:';
		}
	}

	dd {
		position: relative;
		top: -0.1em;
	}
</style>
