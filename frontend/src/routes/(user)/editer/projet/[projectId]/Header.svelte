<script lang="ts">
	import { enhance } from '$app/forms';
	import { ICON_CLASS } from '$components/Icon.svelte';
	import { KEY } from '$utils/enums';
	import { debounce } from '$utils/modifiers';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import { formProject } from './common';

	export let data: PageData;

	let titleRef: HTMLElement;

	function handleKey(e: KeyboardEvent) {
		if (e.key === KEY.Enter) {
			e.preventDefault();
		}
	}

	function handleBlur() {
		if (!$formProject.title) {
			$formProject.title = data.project.title;
		}
		console.log(data.project.title);
	}

	const handleChange = debounce((e) => {}, 500);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<header class={ICON_CLASS.hover} in:fly={{ y: -10 }}>
	<hgroup>
		<form
			method="POST"
			action="?/title"
			use:enhance={() => {
				return ({ update }) => {
					update({ reset: false });
				};
			}}
			on:input={handleChange}
			on:click|self={() => titleRef.focus()}
		>
			<span
				class="title"
				bind:this={titleRef}
				contenteditable="true"
				bind:textContent={$formProject.title}
				on:keydown={handleKey}
				on:blur={handleBlur}
			/>
			<input type="text" name="title" hidden value={$formProject.title} on:input={handleChange} />
		</form>
	</hgroup>
</header>

<style lang="scss">
	header {
		user-select: none;
		position: relative;
		align-self: stretch;
		border-bottom: 1px solid col(fg, 100, 0.05);
		padding-bottom: var(--ui-gutter);
	}

	hgroup {
		margin: 0 auto;
		width: 100%;
		max-width: var(--ui-width-main);
		display: grid;
		gap: var(--ui-gutter);
		grid-template-columns: 1fr 3fr;
		padding-inline: var(--ui-gutter);
	}

	form {
		grid-column: 2;
		width: 100%;
		padding-top: 20vh;
		padding-bottom: 20vh;
		cursor: text;
	}

	.title {
		display: inline;
		line-height: 1.1em;
		outline: none;
		word-break: keep-all;
		hyphens: auto;
		font-weight: 600;
		font-size: var(--ui-text-3xl);
		max-width: var(--ui-width-md);
		border-radius: var(--ui-radius-md);
		box-decoration-break: clone;
		color: col(fg, 500);
		caret-color: col(primary, 500);
		caret-shape: block;
		transition: all 0.1s ease-out;

		&:hover {
			color: col(fg, 900);
		}

		&:focus {
			color: col(primary, 000);
		}
	}
</style>
