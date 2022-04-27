<script lang="ts">
	// your script goes here

	import Button from '$components/primitives/Button.svelte';

	let w = 300;
</script>

<input type="range" name="w" min="0" max="500" bind:value={w} id="" />

<div id="test" style="width: {w}px">
	<Button style="display: block; width: 100%" variant="cta" icon="home">Center</Button>
	<Button style="display: block; width: 100%" variant="cta">Should also be center</Button>
	<Button style="display: block;" variant="cta" icon="search" />
	<Button style="display: block; width: 100%" variant="cta" contentAlign="left" icon="home"
		>This should be left-aligned</Button
	>
	<Button style="display: block; width: 100%" variant="cta" contentAlign="left">Left</Button>
	<Button style="display: block;" variant="cta" contentAlign="left" icon="search" />
	<Button style="display: block; width: 100%" variant="cta" contentAlign="right" icon="home">Right</Button>
	<Button style="display: block; width: 100%" variant="cta" contentAlign="right">Right</Button>
	<Button style="display: block; width: 100%" variant="cta" contentAlign="right" icon="search" />
	<Button style="display: block;" variant="cta" iconPosition="right" icon="home">Center</Button>
	<Button style="display: block; width: 100%" variant="cta" iconPosition="right">Should also be center</Button>
	<Button style="display: block; width: 100%" variant="cta" iconPosition="right" icon="search" />
	<Button style="display: block; width: 100%" variant="cta" iconPosition="right" contentAlign="left" icon="home"
		>This should be left-aligned</Button
	>
	<Button style="display: block; width: 100%" variant="cta" iconPosition="right" contentAlign="left">Left</Button>
	<Button style="display: block;" variant="cta" iconPosition="right" contentAlign="left" icon="search" />
	<Button style="display: block; width: 100%" variant="cta" iconPosition="right" contentAlign="right" icon="home"
		>Right</Button
	>
	<Button style="display: block; width: 100%" variant="cta" iconPosition="right" contentAlign="right">Right</Button>
	<Button style="display: block; width: 100%" variant="cta" iconPosition="right" contentAlign="right" icon="search" />
</div>

<style>
	#test {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin: 0 auto;
		resize: both;
	}
</style>
