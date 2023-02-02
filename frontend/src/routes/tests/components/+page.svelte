<script lang="ts">
	import Ripple from '$components/Ripple.svelte';
</script>

<article>
	<h2>Button</h2>
	<button class="button">
		<Ripple />
		<span class="text">Test</span>
	</button>
	<button class="button outlined">
		<Ripple />
		<span class="text">Test</span>
	</button>
	<button class="button cta">
		<Ripple />
		<span class="text">Test</span>
	</button>
</article>
<article>
	<h2>Field</h2>
	<fieldset class="field" />
</article>

<style lang="scss">
	article {
		padding: 5rem;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	h2 {
		width: 100%;
	}
</style>
