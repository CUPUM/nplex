<script lang="ts">
	import { reveal } from '$actions/reveal';

	import Icon from '$components/primitives/Icon.svelte';

	import { transform } from '$transitions/transform';
	import { icons } from '$utils/icons/icons';
	import { slipMask } from '$utils/presets/reveal';

	let show = false;
	let currentIcon;
</script>

<article class="core-grid">
	<section>
		<label for="">
			<p>Montrer</p>
			<input type="checkbox" bind:checked={show} />
		</label>
		<h2 use:reveal={{ ...slipMask, show }}>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas odio consequatur dicta, corrupti officiis
			accusamus nemo tempore iusto sint iste.
		</h2>
		{#if show}
			<button
				transition:transform={{
					scale: 0.75,
					translateY: 10,
					rotateX: 90,
					duration: 1400,
					delay: 50,
				}}>Bouton transitionné :D</button
			>
		{/if}
	</section>
	<section>
		<select name="" id="" bind:value={currentIcon}>
			{#each Object.keys(icons) as icon}
				<option value={icon}>{icon}</option>
			{/each}
		</select>
		{#if currentIcon}
			<Icon name={currentIcon} size="50" />
		{/if}
	</section>
</article>

<style lang="scss">
	article {
		padding-top: var(--navbar-height);
	}
	section {
		grid-column: main;
		padding: 4rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		perspective: 100px;
	}
</style>
