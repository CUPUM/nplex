<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon, { ICON_CLASSES } from '$components/Icon.svelte';
	import { KEY } from '$utils/enums';
	import { debounce } from '$utils/function';
	import { THEMES } from '$utils/themes';
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
<header data-theme={THEMES.dark} class={ICON_CLASSES.HOVER} on:click={() => titleRef.focus()}>
	<hgroup>
		<h1>Éditeur de projet</h1>
		<hr />
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
			<Icon name="pen" class="icon" />
			<h2
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
		margin-inline: var(--ui-gutter);
		background: col(bg, 300);
		border-radius: var(--ui-radius-xl);
		font-size: var(--ui-text-2xl);
		color: col(fg, 100);
	}

	hgroup {
		margin: 0 auto;
		min-height: 50vh;
		width: 100%;
		max-width: var(--ui-width-main);
		display: grid;
		grid-template-columns: 1fr 0px 2fr;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: flex-end;
		border-radius: inherit;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		padding: 2rem;
		transition: all 0.25s var(--ui-ease-out);

		&:hover {
			color: col(primary, 700);
		}

		&:focus-within {
			color: col(primary, 500);
		}

		:global(.icon) {
			align-self: flex-end;
			opacity: 0.2;
			font-size: 0.5em;
		}
	}

	h1 {
		align-self: flex-start;
		font-size: var(--ui-text-lg);
		padding: 3rem;
		font-weight: 400;
		flex: 1;
		line-height: 1.25;
	}

	h2 {
		outline: none;
		word-break: keep-all;
		hyphens: auto;
		padding: 1rem;
	}
</style>
