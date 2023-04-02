<script lang="ts">
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section>
	<h2 class="project-section-title">Calendrier</h2>
	<legend>À venir prochainement</legend>
</section>

<style lang="scss">
	section {
		--pattern-size: 1rem;
		--pattern-color: #{col(fg, 100, 0.2)};
		position: relative;
		margin: var(--ui-gap-sm);
		height: calc(100vh - 2 * var(--ui-gap-sm));
		height: calc(100svh - 2 * var(--ui-gap-sm));
		background: radial-gradient(var(--pattern-color) 8%, transparent 8%);
		background-repeat: repeat;
		background-size: var(--pattern-size) var(--pattern-size);
		background-color: col(fg, 100, 0.05);
		border-radius: var(--ui-radius-xl);
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
