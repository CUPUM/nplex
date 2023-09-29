<script lang="ts">
	const headings = ['xl', 'lg', 'md', 'sm', 'xs'];
	const proses = ['xl', 'lg', 'md', 'sm', 'xs'];
	const inputs = [''];
	const buttons = ['', 'outlined', 'ghost', 'cta', 'link'];

	let buttonSize = 0.75;
	let buttonDisabled = false;
	let buttonLoading = false;
	let buttonDanger = false;

	let inputSize = 0.75;
	let inputReadonly = false;
	let inputDisabled = false;
	let inputLoading = false;
	let inputError = false;
	let inputSuccess = false;
</script>

<h1 class="heading xl">Style variants</h1>
<section>
	<h2 class="heading lg">Button</h2>
	<menu>
		<label>
			Size: {buttonSize}rem
			<input type="range" min=".5" max="3" step=".1" bind:value={buttonSize} />
		</label>
		<label>
			Disabled
			<input type="checkbox" bind:checked={buttonDisabled} />
		</label>
		<label>
			Loading
			<input type="checkbox" bind:checked={buttonLoading} />
		</label>
		<label>
			Danger
			<input type="checkbox" bind:checked={buttonDanger} />
		</label>
	</menu>
	<ul class="variant-list" style:font-size="{buttonSize}rem">
		{#each buttons as variant}
			<li class="variant">
				<button
					class="button {variant}"
					class:danger={buttonDanger}
					disabled={buttonDisabled}
					data-loading={buttonLoading || undefined}
				>
					{variant ? variant : 'default'} button
				</button>
				<a
					href="/"
					class="button {variant}"
					class:danger={buttonDanger}
					data-disabled={buttonDisabled || undefined}
					data-loading={buttonLoading || undefined}
				>
					{variant ? variant : 'default'} anchor
				</a>
			</li>
		{/each}
	</ul>
</section>
<section>
	<h2 class="heading lg">Input</h2>
	<menu>
		<label>
			Size: {inputSize}rem
			<input type="range" min=".5" max="3" step=".1" bind:value={inputSize} />
		</label>
		<label>
			Disabled
			<input type="checkbox" bind:checked={inputDisabled} />
		</label>
		<label>
			Readonly
			<input type="checkbox" bind:checked={inputReadonly} />
		</label>
		<label>
			Loading
			<input type="checkbox" bind:checked={inputLoading} />
		</label>
		<label>
			Error
			<input type="checkbox" bind:checked={inputError} />
		</label>
		<label>
			Success
			<input type="checkbox" bind:checked={inputSuccess} />
		</label>
	</menu>
	<ul class="variant-list" style:font-size="{inputSize}rem">
		{#each inputs as variant}
			<li class="variant">
				<input type="text" class="input {variant}" />
				<textarea class="input {variant}" rows="20" />
				<fieldset class="input-group {variant}">
					<input type="text" class="input" />
					<div class="group">
						<button class="button cta square"></button>
					</div>
				</fieldset>
				<label class="input-group">
					<select class="input">
						<option value="a">Some option</option>
						<option value="b">Some option</option>
					</select>
				</label>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}

	menu {
		padding: 1rem;
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.variant-list {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: 1em;
		padding: 1rem;
	}

	.variant {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}

	.button {
		text-transform: capitalize;
	}
</style>
