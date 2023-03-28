<script lang="ts">
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { userHasRole } from '$utils/validation';
	import { fly } from 'svelte/transition';
	import { DECRIPTORS_ALLOWED_ROLES, EDITOR_ROUTES } from './constants';

	export let data;

	$: canEditDescriptors = userHasRole(data, ...DECRIPTORS_ALLOWED_ROLES);
</script>

<div id="editor-splash">
	<ul>
		<li class="group" in:fly={{ delay: 0, y: 12 }}>
			<div class="block {ICON_CLASS.hover}">
				<Ripple />
				<a href={EDITOR_ROUTES.project.pathname} class="fill" aria-hidden="true">
					<Icon animationSpeed={0.3} name="pen" strokeWidth={2} strokeLinecap="round" />
				</a>
				<a href={EDITOR_ROUTES.project.pathname} class="main-link">Créer un nouveau projet</a>
				<a href={EDITOR_ROUTES.project.edit.pathname} class="modify">
					<Ripple />
					Modifier un projet existant
				</a>
			</div>
			<a
				class="block main-link descriptors {ICON_CLASS.hover}"
				href={EDITOR_ROUTES.project.descriptors.pathname}
				aria-disabled={!canEditDescriptors}
			>
				<Ripple />
				<div class="fill" aria-hidden="true">
					<Icon animationSpeed={0.3} name="parameters" strokeWidth={2} strokeLinecap="round" />
				</div>
				<span style="z-index: 1">Éditer les descripteurs de projet</span>
				{#if !canEditDescriptors}
					<div class="notice">
						<Icon name="warn" /> Section réservée
					</div>
				{/if}
			</a>
		</li>
		<li class="block {ICON_CLASS.hover}" in:fly={{ delay: 100, y: 12 }}>
			<Ripple />
			<a href={EDITOR_ROUTES.organization.pathname} class="fill" aria-hidden="true">
				<Icon animationSpeed={0.3} name="pen" strokeWidth={2} strokeLinecap="round" />
			</a>
			<a href={EDITOR_ROUTES.organization.pathname} class="main-link">
				Créer une nouvelle organisation
			</a>
			<a href={EDITOR_ROUTES.organization.edit.pathname} class="modify">
				<Ripple />
				Modifier une organisation
			</a>
		</li>
		<li class="block {ICON_CLASS.hover}" in:fly={{ delay: 200, y: 12 }}>
			<Ripple />
			<a href={EDITOR_ROUTES.actor.pathname} class="fill" aria-hidden="true">
				<Icon animationSpeed={0.3} name="pen" strokeWidth={2} strokeLinecap="round" />
			</a>
			<a href={EDITOR_ROUTES.actor.pathname} class="main-link">Créer un nouveau profil d'acteur</a>
			<a href={EDITOR_ROUTES.actor.edit.pathname} class="modify">
				<Ripple />
				Modifier un profil d'acteur
			</a>
		</li>
	</ul>
</div>

<style lang="scss">
	#editor-splash {
		width: 100%;
		min-height: calc(100vh - var(--ui-nav-h));
		display: flex;
		align-items: center;
		justify-content: center;
		padding-inline: 1.5rem;
		padding-bottom: var(--ui-nav-h);
	}

	ul {
		width: 100%;
		max-width: var(--ui-width-md);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: stretch;
		justify-content: flex-start;
		gap: var(--ui-gap-md);
		font-weight: 500;
	}

	.notice {
		z-index: 1;
		font-size: var(--ui-text-sm);
		padding: 1.2em 1.5em 1.4em;
		background-color: col(bg, 900);
		color: col(fg, 100, 0.8);
		border-radius: 99px;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-weight: 300;
		gap: 1em;
	}

	[aria-disabled='true'] {
		pointer-events: none;
		user-select: none;
		background-color: col(bg, 700) !important;
		// border: 1.5px dashed col(bg, 900);
		box-shadow: none !important;

		.fill,
		span {
			opacity: 0.2;
			filter: blur(2px);
		}
	}

	.group {
		width: 100%;
		display: flex;
		flex-direction: row;

		& .block:not(:last-child) {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		& .block:not(:first-child) {
			border-left-width: 0px;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	.block {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		gap: 2rem;
		padding: 3rem 3.5rem;
		line-height: 1.2;
		background: col(bg, 900);
		border-radius: var(--ui-radius-xl);
		// box-shadow: 0 1em 3em -2em rgb(0, 0, 0.2);
		font-size: var(--ui-text-xl);
		overflow: hidden;
		color: col(fg, 100);
		transition: all 0.1s;

		&:hover {
			// overflow: visible;
			z-index: 1;
			background: col(primary, 300);
			color: col(fg, 500);
			box-shadow: 0 1rem 7rem -3rem col(primary, 100, 0.2);

			& .fill {
				color: col(primary, 500);
			}
		}
	}

	.fill {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: clamp(200px, 40vw, 500px);
		color: col(bg, 700);
		border-radius: inherit;
		transition: all 0.1s;

		& :global(*) {
			pointer-events: none;
		}
	}

	.main-link {
		position: relative;
		z-index: 1;
	}

	.modify {
		position: relative;
		z-index: 1;
		display: inline-block;
		font-size: var(--ui-text-md);
		padding: 1em 1.5em 1.25em;
		border-radius: var(--ui-radius-md);
		font-weight: 500;
		transition: background 0.25s ease-out;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			border: 1px solid col(fg, 500);
			opacity: 0.1;
			transition: opacity 0.1s;
		}

		&:hover {
			background: col(fg, 500);
			color: col(primary, 500);
			box-shadow: 0 1rem 4rem -1rem col(bg, 900, 0.5);

			&::before {
				opacity: 0;
			}
		}
	}
</style>
