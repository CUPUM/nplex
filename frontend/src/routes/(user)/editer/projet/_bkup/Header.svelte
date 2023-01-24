<script lang="ts">
	import { enhance } from '$app/forms';
	import { ICON_CLASS } from '$components/Icon.svelte';
	import { overlapNavbarStyle } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { maybeSingle } from '$types/utils';
	import { col } from '$utils/css';
	import { KEY } from '$utils/enums';
	import { debounce } from '$utils/modifiers';
	import { THEME_PALETTES } from '$utils/themes';
	import { fade, fly } from 'svelte/transition';
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
	}

	const handleChange = debounce((e) => {}, 500);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<header
	class={ICON_CLASS.hover}
	use:overlapNavbarStyle={{ background: col('bg', '300') }}
	use:setRootBackground={{ overscroll: THEME_PALETTES.light.bg[300] }}
>
	<hgroup>
		<dl>
			<dt in:fade={{}}>Céation&thinsp;:</dt>
			<dd in:fly={{ y: -10, delay: 50 }}>
				<em class="date">{new Date(data.project.created_at).toLocaleString()}</em> par
				<em>{maybeSingle(data.project.created_by)?.first_name}</em>
			</dd>
			<dt in:fade={{ delay: 100 }}>Modification&thinsp;:</dt>
			<dd in:fly={{ y: -10, delay: 150 }}>
				<em class="date">{new Date(data.project.updated_at).toLocaleString()}</em> par
				<em>{maybeSingle(data.project.updated_by)?.first_name}</em>
			</dd>
		</dl>
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
			in:fly={{ y: -10, opacity: 0, delay: 200 }}
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
		position: relative;
		align-self: stretch;
		background: col(bg, 300);
		// border-radius: max(0px, calc(var(--ui-radius-xl) - 0.1 * var(--ui-scroll-px)));
		border-radius: var(--ui-radius-xl);
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		margin-top: calc(-1 * var(--ui-nav-px));
		// margin-bottom: 1px;
		box-shadow: 0 5rem 0 0 col(bg, 900);
		transform-origin: top center;
		transition: scale 0.25s ease-out;
	}

	hgroup {
		margin: 0 auto;
		width: 100%;
		padding-top: var(--ui-nav-px);
		padding-bottom: 1.5rem;
		max-width: var(--ui-width-main);
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr 3fr;
		padding-inline: 1.5rem;
	}

	dl {
		// position: sticky;
		// align-self: flex-start;
		align-self: center;
		// top: var(--ui-nav-px);
		padding-block: 2rem;
		font-weight: 300;
		color: col(fg, 000);
		line-height: 1.5;
	}

	dt {
		opacity: 0.35;
	}

	dt:not(:first-of-type) {
		margin-top: 1rem;
	}

	dd {
		em {
			font-style: normal;
			font-weight: 550;
		}
		.date {
			font-variant-numeric: tabular-nums;
		}
	}

	form {
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
		color: col(fg, 100);
		caret-color: col(primary, 500);
		caret-shape: block;
		padding-left: 1rem;
		transition: all 0.1s ease-out;

		&:hover {
			color: col(fg, 900);
		}

		&:focus {
			color: col(primary, 500);
		}
	}
</style>
