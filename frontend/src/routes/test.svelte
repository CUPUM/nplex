<script lang="ts">
	// your script goes here

	import Button from '$components/primitives/Button.svelte';
	import type { SvelteProps } from '$utils/helpers/types';

	const icon: SvelteProps<Button>['iconPosition'][] = ['before', 'after'];
	const align: SvelteProps<Button>['contentAlign'][] = ['left', 'center', 'right'];

	let w = 300;

	let iconPosition: SvelteProps<Button>['iconPosition'] = icon[0];
	let contentAlign: SvelteProps<Button>['contentAlign'] = align[1];
</script>

<form>
	<h2>Icon position</h2>
	<fieldset>
		{#each icon as p}
			<div>
				<label for="icon-{p}">{p}</label>
				<input type="radio" id="icon-{p}" value={p} bind:group={iconPosition} />
			</div>
		{/each}
	</fieldset>
	<h2>Content alignment</h2>
	<fieldset>
		{#each align as p}
			<div>
				<label for="align-{p}">{p}</label>
				<input type="radio" id="align-{p}" value={p} bind:group={contentAlign} />
			</div>
		{/each}
	</fieldset>
	<h2>Container width</h2>
	<input type="range" name="w" min="0" max="500" bind:value={w} id="" />
</form>

<div id="test" style="width: {w}px">
	<Button style="display: block; width: 100%" {iconPosition} {contentAlign} variant="cta" icon="home"
		>This is some text</Button
	>
	<Button style="display: block; width: 100%" {iconPosition} {contentAlign} variant="cta"
		>This button has no icon</Button
	>
	<Button style="display: block" {iconPosition} {contentAlign} variant="cta" icon="search" />
	<Button style="display: block" {iconPosition} {contentAlign} variant="cta" icon="home">This is some text</Button>
	<Button style="display: block" {iconPosition} {contentAlign} variant="cta">This button has no icon</Button>
	<Button style="display: block" {iconPosition} {contentAlign} variant="cta" icon="search" />
</div>

<style>
	#test {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: 6px;
		margin: 0 auto;
		resize: both;
	}

	h2 {
		font-size: 2rem;
		padding: 0;
		margin: 0;
	}

	form {
		width: 500px;
		margin: 0 auto;
		padding: 1rem;
	}

	fieldset {
		display: flex;
		flex-direction: column;
	}
</style>
