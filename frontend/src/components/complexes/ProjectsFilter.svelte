<script lang="ts">
	import Icon from '$components/primitives/Icon.svelte';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let label: string;
	export let expand = true;

	function toggle() {
		expand = !expand;
	}
</script>

<fieldset transition:slide|local={{ duration: 350, easing: expoOut }}>
	<div>
		<legend on:click={toggle}>
			<span class="label">{label}</span>
			<div class="line" />
			<span class="chevron" style:transform="rotateX({expand ? 0 : 180}deg)"
				><Icon name="chevron-up" size=".5em" strokeWidth={2} /></span
			>
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
		justify-content: flex-start;
		align-items: flex-start;
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		border: none;
		overflow: hidden;
		transition: all 0.1s ease-out;
	}

	legend {
		position: relative;
		user-select: none;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: var(--size-large);
		width: 100%;
		cursor: pointer;
		padding: 1em 1em;
		margin: 0;
		transition: all 0.15s ease-out;
		font-weight: 550;
		color: var(--color-dark-100);

		&:hover {
			color: var(--color-primary-500);
			/* background-color: var(--color-light-100); */

			& .line::after {
				width: 100%;
			}

			& .chevron {
				/* background-color: var(--color-light-100); */
				box-shadow: 0 0 0 1px var(--color-light-700);
			}
		}
	}

	section {
		position: relative;
		padding-inline: 1em;
		padding-block: 1px 2em;
		margin: 0;
		display: block;
		width: 100%;
	}

	.label {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.line {
		position: relative;
		height: 100%;
		flex: 1;
		text-align: left;
		margin-inline: 1em;

		&::after {
			content: '';
			position: absolute;
			height: 2px;
			border-radius: 1px;
			width: 0;
			background-color: var(--color-primary-300);
			transition: all 0.2s cubic-bezier(0.2, 0, 0.2, 1);
		}
	}

	.chevron {
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.5s cubic-bezier(0.1, 0, 0.1, 1);
		height: 1.5em;
		width: 1.5em;
		border-radius: 50%;
	}
</style>
