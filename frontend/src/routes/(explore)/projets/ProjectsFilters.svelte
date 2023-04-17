<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { projectsFiltersOpened } from './common';

	function search(e: Event) {
		e.preventDefault();
	}
</script>

{#if $projectsFiltersOpened}
	<section transition:fly={{ x: -24, duration: 200, easing: expoOut }}>
		<div class="inner">
			<p class="text-lg subtle">À venir</p>
			<!-- <form on:submit={search}>
				<fieldset>Test 1</fieldset>
				<fieldset>Test 2</fieldset>
				<fieldset>Test 3</fieldset>
			</form> -->
		</div>
	</section>
{/if}

<style lang="scss">
	section {
		z-index: 1;
		position: relative;
		grid-column: filters;
		grid-row: 1;
		padding-top: var(--projects-top-overlay-h);
		padding-bottom: var(--ui-gutter-sm);
		align-self: stretch;
	}

	p {
		width: 100%;
		padding-block: 2rem;
		text-align: center;
	}

	.inner {
		background: col(bg, 500);
		border-radius: var(--ui-radius-lg);
		width: var(--projects-filters-w);
		height: 100%;
	}

	form {
	}
</style>
