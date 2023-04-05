<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section>
	<h2 class="project-section-title">Calendrier</h2>
	<figure class="timeline-container">
		<menu>
			<Tooltip message="Ouvrir en mode plein-écran" place="left">
				<Button equi compact variant="ghost">
					<Icon name="expand" />
				</Button>
			</Tooltip>
		</menu>
		<legend>À venir prochainement</legend>
	</figure>
</section>

<style lang="scss">
	section {
	}

	menu {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	.timeline-container {
		--pattern-size: 1rem;
		--pattern-color: #{col(fg, 100, 0.2)};
		cursor: grab;
		background: radial-gradient(var(--pattern-color) 8%, transparent 8%);
		background-repeat: repeat;
		background-size: var(--pattern-size) var(--pattern-size);
		background-color: col(fg, 100, 0.05);
		border-radius: var(--ui-radius-xl);
		position: relative;
		height: calc(100vh - 2 * var(--ui-gap-sm) - var(--ui-nav-h));
		height: calc(100svh - 2 * var(--ui-gap-sm) - var(--ui-nav-h));
	}

	legend {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding-inline: var(--ui-pad-md);
		height: var(--ui-block-md);
		background-color: col(fg, 100, 0.1);
		display: flex;
		align-items: center;
		padding-bottom: 0.2em;
		border-radius: 99px;
		backdrop-filter: blur(8px);
	}
</style>
