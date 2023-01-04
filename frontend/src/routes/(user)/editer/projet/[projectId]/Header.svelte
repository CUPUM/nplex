<script lang="ts">
	import { enhance } from '$app/forms';
	import { debounce } from '$utils/function';
	import { THEME_NAMES } from '$utils/themes';

	import type { PageData } from './$types';

	export let data: PageData;

	const handleChange = debounce((e) => {
		console.log('change!', e);
	}, 500);
</script>

<header data-theme={THEME_NAMES.dark}>
	<hgroup>
		<h1>Éditeur de projet</h1>
	</hgroup>
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
		<h2 contenteditable="true" name="title" bind:textContent={data.project.title} />
		<input
			type="text"
			name="title"
			hidden
			value={data.project.title}
			id=""
			on:input={handleChange}
		/>
	</form>
</header>

<style lang="scss">
	header {
		position: relative;
		align-self: stretch;
		margin-inline: var(--ui-gutter);
		display: grid;
		grid-template-columns: 1fr 0px 2fr;
		min-height: 50vh;
		background: col(bg, 300);
		border-radius: var(--ui-radius-xl);
		padding: 0;
		font-size: var(--ui-text-2xl);
		color: col(fg, 100);
		margin-top: var(--ui-nav-px);
	}

	hr {
		padding: 0.5px;
		background: col(fg, 500, 0.1);
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: flex-end;
		border-radius: inherit;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		transition: all 0.25s var(--ui-ease-out);

		&:hover {
			box-shadow: 0 2rem 7rem -3rem rgb(0, 10, 20, 0.5);
		}
	}

	h1 {
		align-self: center;
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
		padding: 2rem;
	}
</style>
