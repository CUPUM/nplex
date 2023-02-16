<script lang="ts">
	import { page } from '$app/stores';
	import Field from '$components/Field/Field.svelte';
	import { KEY } from '$utils/enums';
	import type { PageData } from './$types';
	import { dirty } from './common';

	$: ({ title } = ($page.data as PageData).project);

	$: _title = title;

	$: $dirty.title = _title !== title;

	function handleKey(e: KeyboardEvent) {
		if (e.key === KEY.Enter) {
			e.preventDefault();
		}
	}
</script>

<header class="editor-section">
	<h3 class="legend">Titre du projet</h3>
	<Field bind:value={title} variant="default" name="title">
		<!-- <svelte:fragment slot="label">Titre du projet</svelte:fragment> -->
	</Field>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-positive-tabindex -->
	<!-- <h1
		class:dirty={$dirty.title}
		class="title"
		contenteditable="true"
		bind:textContent={_title}
		on:keydown={handleKey}
	/>
	<input type="text" name="title" hidden readonly value={_title} /> -->
</header>

<style lang="scss">
	header {
		// font-size: var(--ui-text-lg);
	}

	.title {
		display: inline !important;
		align-self: flex-start;
		pointer-events: all;
		font-weight: 350;
		border: none;
		outline: none;
		box-decoration-break: clone;
		border-radius: var(--ui-radius-md);
		line-height: 1.2;
		transition: all 0.1s ease-out;

		&:hover {
			background: col(fg, 100, 0.05);
			// box-shadow: 0 0 0 6px col(bg, 900);
		}

		&:focus {
			color: col(primary, 500);
			background: col(primary, 100, 0.1);
			// box-shadow: 0 0 0 6px col(primary, 100, 0.1);
		}
	}
</style>
