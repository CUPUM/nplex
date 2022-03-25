<script lang="ts">
	import Icon from '$components/primitives/Icon.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let label: string;
	export let expand = true;

	function toggle() {
		expand = !expand;
	}
</script>

<fieldset>
	<div>
		<legend on:click={toggle}>
			<span id="label">{label}</span>
			<span id="chevron" style:transform="rotate({expand ? 0 : 180}deg)"><Icon name="chevron-up" /></span>
		</legend>
	</div>
	{#if expand}
		<section transition:slide|local={{ duration: 250, easing: expoOut }}>
			<slot />
		</section>
	{/if}
</fieldset>

<style lang="postcss">
	fieldset {
		display: block;
		flex: none;
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		border: none;
		/* border-radius: 1.2em; */
		overflow: hidden;
		transition: all 0.15s ease-out;
	}

	legend {
		position: relative;
		user-select: none;
		top: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		cursor: pointer;
		padding: 1.25em 1em;
		margin: 0;
		transition: all 0.15s ease-out;
		font-weight: 600;
		color: var(--color-dark-100);

		&:hover {
			color: var(--color-primary-500);
			/* background-color: var(--color-light-500); */

			& #chevron {
				background-color: var(--color-light-100);
				box-shadow: 0 0 0 1px var(--color-light-500);
			}
		}
	}

	section {
		position: relative;
		padding-inline: 1em;
		padding-block: 1px 1em;
		margin: 0;
		display: block;
		width: 100%;
	}

	#chevron {
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s cubic-bezier(0.1, 0, 0.1, 1);
		height: 2em;
		width: 2em;
		border-radius: 50%;
	}
</style>
