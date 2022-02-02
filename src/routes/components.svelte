<script lang="ts">
	import type { ButtonKind, ButtonSize, ButtonTheme } from '$components/primitives/Button.svelte';
	import Button from '$components/primitives/Button.svelte';
	import Checkbox from '$components/primitives/Checkbox.svelte';
	import Icon from '$components/primitives/Icon.svelte';

	const buttons = {
		themes: ['primary', 'secondary'] as ButtonTheme[],
		kinds: ['normal', 'misc'] as ButtonKind[],
		sizes: ['small', 'medium', 'large'] as ButtonSize[],
		disabled: [false, true]
	};

	const checkboxes = {
		themes: ['primary', 'secondary'],
		kinds: ['normal', 'misc'],
		sizes: ['small', 'medium', 'large'],
		checked: [true, false]
	};

	function click() {
		console.log('clicked!')
	}
</script>

<article>
	<h1>Components</h1>
	<section>
		<h2>Button</h2>
		<h3>Without href</h3>
		{#each buttons.kinds as kind}
			<div>
				{#each buttons.themes as theme}
					<div>
						{#each buttons.disabled as disabled}
							<div>
								{#each buttons.sizes as size}
									<Button {disabled} {theme} {kind} {size}>Bouton</Button>
									<Button {disabled} {theme} {kind} {size} icon="home" />
								{/each}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
		<h3>With href</h3>
		{#each buttons.kinds as kind}
			<div>
				{#each buttons.themes as theme}
					<div>
						{#each buttons.disabled as disabled}
							<div>
								{#each buttons.sizes as size}
									<Button {disabled} href="/" {theme} {kind} {size}>Bouton</Button>
									<Button {disabled} href="/" {theme} {kind} {size} icon="home" />
								{/each}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</section>
	<section>
		<h2>Checkbox</h2>
		<!-- {#each checkboxes.kinds as variant}
			<section>
				{#each checkboxes.themes as theme}
					{#each checkboxes.sizes as size}
						<Checkbox {theme} kind{variant} {size}>Bouton</Checkbox>
						<Checkbox {theme} kind{variant} {size} icon="home" />
					{/each}
				{/each}
			</section>
		{/each} -->
	</section>
	<section>
		<h2>Radio</h2>
	</section>
	<section>
		<h2>Dropdown</h2>
	</section>
	<section>
		<h2>Range</h2>
	</section>
	<section>
		<h2>Icon</h2>
	</section>
</article>

<style>
	article {
		margin-block: 0;
		margin-inline: auto;
		width: 100%;
		max-width: 1000px;
		padding-inline: 2rem;
	}

	h1 {
		font-family: var(--font-misc);
		font-size: var(--size-xxlarge);
	}

	h2 {
		font-family: var(--font-misc);
		margin: 0 0 2rem 0;
	}

	section {
		margin-inline: 0;
		margin-block: 1rem;
		background-color: var(--color-light-300);
		padding: 1rem 2rem;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		width: 100%;
		flex-wrap: wrap;
	}

	div > div {

	}
</style>
