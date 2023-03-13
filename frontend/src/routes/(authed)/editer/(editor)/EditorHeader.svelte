<script lang="ts">
	import { locale } from '$components/I18n.svelte';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let updatedAt: Date = new Date();
	export let updatedBy: string = 'Utilisateur';
	export let createdAt: Date = new Date();
	export let createdBy: string = 'Utilisateur';

	const dateFormatter = new Intl.DateTimeFormat($locale);
</script>

<header transition:slide|local={{ duration: 250, easing: cubicOut }}>
	<hgroup class="main">
		<slot />
	</hgroup>
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
</header>

<style lang="scss">
	header {
		width: 100%;
		min-height: 50vh;
		min-height: 50svh;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 3rem;
		gap: 1.5rem;
		border: var(--ui-border-thickness) dashed col(primary, 700, 0.5);
		// background-color: col(primary, 100, 0.2);
		color: col(primary, 700);
		border-radius: var(--ui-radius-lg);
		margin-bottom: var(--ui-nav-h);
		opacity: max(0, calc(1 - var(--ui-scroll) * 0.002));
		transition: opacity 0.25s ease;
	}

	hgroup {
		// color: transparent;
		// -webkit-text-stroke: 1px col(primary, 700);
		font-size: var(--ui-text-3xl);
		font-weight: 500;
		line-height: 1.2;

		@include mobile {
			font-size: var(--ui-text-xl);
		}
	}

	dl {
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		gap: 1rem;
		color: col(fg, 100);
	}

	dt {
		opacity: 0.35;
		&::after {
			content: '\00A0:';
		}
	}
</style>
