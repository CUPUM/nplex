<script lang="ts">
	import { locale } from '$components/I18n.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let isPublic: boolean | undefined = undefined;
	export let updatedAt: Date = new Date();
	export let updatedBy: string = 'Utilisateur';
	export let createdAt: Date = new Date();
	export let createdBy: string = 'Utilisateur';

	const dateFormatter = new Intl.DateTimeFormat($locale);
</script>

<header in:fly={{ y: 6, duration: 250, easing: cubicOut }}>
	{#if isPublic != null}
		<Tooltip
			message={isPublic
				? 'Ce projet est présentement visible publiquement.'
				: "Ce projet n'est pas présentement visible publiquement."}
			place="bottom"
			align="start"
		>
			<section>
				<Token equi readonly variant="outlined" active={isPublic}>
					<Icon name={isPublic ? 'eye-open' : 'eye-close'} />
				</Token>
				<span class="info">
					{isPublic ? 'Publiée' : 'Brouillon (privée)'}
				</span>
			</section>
		</Tooltip>
	{/if}
	<hgroup class="heading">
		<h1 class="heading-xl">
			<slot name="heading" />
		</h1>
	</hgroup>
	<section>
		{#if $$slots.nav}
			<nav>
				<slot name="nav" />
			</nav>
		{/if}
		<dl>
			<dt>Créé le</dt>
			<dd>{dateFormatter.format(createdAt)}</dd>
			<dt>par</dt>
			<dd>{createdBy}</dd>
		</dl>
		<dl>
			<dt>Modifié le</dt>
			<dd>{dateFormatter.format(updatedAt)}</dd>
			<dt>par</dt>
			<dd>{updatedBy}</dd>
		</dl>
	</section>
</header>

<style lang="scss">
	header {
		width: 100%;
		min-height: calc(100vh - var(--ui-gutter) - var(--ui-nav-h));
		min-height: calc(100svh - var(--ui-gutter) - var(--ui-nav-h));
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: var(--ui-pad-outer);
		gap: var(--ui-pad-outer);
		border: var(--ui-border-thickness) dashed col(primary, 500, 0.75);
		// background-color: col(fg, 000, 0.05);
		border-radius: var(--ui-radius-lg);
		margin-bottom: var(--ui-gutter);
		opacity: max(0, calc(1 - var(--ui-scroll) * 0.002));
		transition: opacity 0.25s ease;
	}

	hgroup {
		flex: 1;
		display: flex;
		align-items: center;
	}

	section {
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	dl {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
		color: col(primary, 700);
		padding: 0 1.5em;
		height: var(--ui-block-size-lg);
		border-radius: var(--ui-radius-md);
		// background-color: col(primary, 100, 0.1);
		border: var(--ui-border-thickness) solid col(primary, 500, 0.2);
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
