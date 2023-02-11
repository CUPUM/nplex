<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
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

<header>
	<hgroup>
		<div class="icon">
			<Icon name="pen" />
		</div>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-positive-tabindex -->
		<h1
			class:dirty={$dirty.title}
			contenteditable="true"
			bind:textContent={_title}
			on:keydown={handleKey}
		/>
		<input type="text" name="title" hidden readonly value={_title} />
	</hgroup>
</header>

<style lang="scss">
	header {
		padding-block: 2rem;
		// margin-top: var(--ui-nav-h);
		margin-inline: 1.5rem;
		align-self: stretch;
		background: col(bg, 500);
		min-height: 50vh;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		border-radius: var(--ui-radius-xl);

		@include laptop {
			border-radius: 0 0 var(--ui-text-xl) var(--ui-text-xl);
			margin-top: 0;
			margin-inline: 0;
			padding-top: var(--ui-nav-h);
		}
	}

	hgroup {
		width: 100%;
		max-width: var(--ui-width-main);
		padding-inline: 1.5rem;
	}

	h1 {
		display: inline !important;
		pointer-events: all;
		border: none;
		outline: none;
		box-decoration-break: clone;
		font-size: var(--ui-text-3xl);
		font-weight: 550;
		border-radius: var(--ui-radius-lg);
		line-height: 1.2;
		padding-inline: 1.5rem;
		padding-bottom: 0.5rem;
		transition: all 0.1s ease-out;

		&:hover {
			background: col(bg, 700);
			// box-shadow: 0 0 0 6px col(bg, 900);
		}

		&:focus {
			color: col(primary, 500);
			background: col(primary, 100, 0.1);
			// box-shadow: 0 0 0 6px col(primary, 100, 0.1);
		}
	}

	.dirty {
		color: col(primary, 700);
	}

	.icon {
		opacity: 0.2;
		font-size: var(--ui-text-lg);
		padding: 1.5rem;
		transition: all 0.2s ease-out;

		header:hover & {
			opacity: 1;
			color: col(primary, 500);
		}
	}
</style>
