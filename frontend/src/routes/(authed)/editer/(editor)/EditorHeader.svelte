<script lang="ts">
	import { locale } from '$components/I18n.svelte';

	export let updatedAt: Date = new Date();
	export let updatedBy: string = 'Utilisateur';
	export let createdAt: Date = new Date();
	export let createdBy: string = 'Utilisateur';

	const dateFormatter = new Intl.DateTimeFormat($locale);
</script>

<header>
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
		border: var(--ui-border-thickness) dashed col(primary, 700, 0.25);
		color: col(primary, 700);
		border-radius: var(--ui-radius-xl);
	}

	hgroup {
		font-size: var(--ui-text-2xl);
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
