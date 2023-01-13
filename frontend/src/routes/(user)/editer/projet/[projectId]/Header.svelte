<script lang="ts">
	import { enhance } from '$app/forms';
	import { ICON_CLASSES } from '$components/Icon.svelte';
	import { KEY } from '$utils/enums';
	import { debounce } from '$utils/function';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	let titleRef: HTMLElement;

	function handleKey(e: KeyboardEvent) {
		if (e.key === KEY.Enter) {
			e.preventDefault();
		}
	}

	const handleChange = debounce((e) => {}, 500);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<header class={ICON_CLASSES.hover} on:click={() => titleRef.focus()} in:fly={{ y: -10 }}>
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
		>
			<!-- <Icon name="pen" class="icon" /> -->
			<span
				class="title"
				bind:this={titleRef}
				contenteditable="true"
				bind:textContent={data.project.title}
				on:keydown={handleKey}
			/>
			<input
				type="text"
				name="title"
				hidden
				value={data.project.title}
				id=""
				on:input={handleChange}
			/>
		</form>
	</hgroup>
</header>

<style lang="scss">
	header {
		position: relative;
		align-self: stretch;
		border-bottom: 1px solid col(fg, 100, 0.05);
		padding-bottom: var(--ui-nav-px);
	}

	hgroup {
		margin: 0 auto;
		width: 100%;
		max-width: var(--ui-width-main);
		display: grid;
		grid-template-columns: 1fr 2fr;
	}

	form {
		grid-column: 2;
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: flex-end;
		padding: 1rem;
		gap: 3rem;
		transition: all 0.25s var(--ui-ease-out);

		&:hover {
			color: col(primary, 500);
		}

		&:focus-within {
			color: col(primary, 700);

			:global(.icon) {
				opacity: 0.5;
			}
		}

		:global(.icon) {
			align-self: flex-start;
			opacity: 0.25;
			font-size: 0.5em;
		}
	}

	.title {
		line-height: 1.2;
		outline: none;
		word-break: keep-all;
		hyphens: auto;
		// font-family: var(--ui-font-misc);
		font-weight: 600;
		// font-style: italic;
		font-size: var(--ui-text-2xl);
		// padding-top: 2em;
	}
</style>
