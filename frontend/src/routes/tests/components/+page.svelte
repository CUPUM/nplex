<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import Ripple from '$components/Ripple.svelte';

	let toggled = false;
</script>

<article>
	<h2>Button</h2>
	<button class="ui-button" on:click={() => (toggled = !toggled)}>
		<Ripple />
		<Icon name={toggled ? 'letter' : 'settings'} />
		<span class="ui-text">Me connecter</span>
	</button>
	<button class="ui-button outlined">
		<Icon name={toggled ? 'letter' : 'settings'} />
		<Ripple />
		<span class="ui-text">Test</span>
	</button>
	<button class="button cta">
		<Ripple />
		<span class="text">Test</span>
	</button>
</article>
<article>
	<h2>Field</h2>
	<fieldset class="ui-field">
		<button class="ui-button"><span class="ui-text">Test</span></button>
		<input type="text" name="" id="" placeholder="Placeholder" />
		<button class="ui-button">Test</button>
	</fieldset>
	<fieldset class="ui-field">
		<button class="ui-button"><span class="ui-text">Test</span></button>
		<div class="ui-label-input">
			<legend>Test</legend>
			<input type="number" min="10" max="100" name="" id="" placeholder="Placeholder" />
		</div>
	</fieldset>
</article>
<article>
	<h2>Skeleton</h2>
	<section>
		<div class="ui-skeleton" />
	</section>
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

	.ui-skeleton {
		width: 500px;
		height: 2rem;
	}
</style>
