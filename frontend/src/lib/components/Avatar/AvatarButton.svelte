<script lang="ts">
	import { page } from '$app/stores';
	import { cssSize } from '$utils/css';
	import type { ComponentProps } from 'svelte';
	import Ripple from '../Ripple.svelte';
	import Avatar from './Avatar.svelte';

	export let size: string | number = '1em';
	export let warning: boolean | undefined = undefined;
	export let href: string | undefined = undefined;
	export let active: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let loading: boolean | undefined = undefined;
	export let data: ComponentProps<Avatar>['data'] | null = $page.data?.session?.user ?? null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	on:click
	on:focus
	class="avatar-button"
	class:active
	class:warning
	class:disabled={disabled || loading}
	style:--size={cssSize(size)}
>
	<Ripple />
	<div class="inner">
		<Avatar {data} {loading} />
	</div>
	<slot name="badge" />
</svelte:element>

<style lang="scss">
	.avatar-button {
		--height-ratio: 3;
		--computed-height: calc((var(--height-ratio) * var(--size)) - (2 * var(--inset, 0px)));
		display: inline-block;
		position: relative;
		height: var(--computed-height);
		width: var(--computed-height);
		border-radius: 50%;
		border: none;
		text-decoration: none;
		background: transparent;
		padding: 0;
		margin: 0;
		cursor: pointer;
		transition: all 0.12s;

		&:hover,
		&:global([popover]) {
			.inner {
				transform: scale(1);

				&::after {
					box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1);
				}
			}
		}
	}

	.inner {
		position: relative;
		font-size: var(--computed-height);
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		top: 0;
		left: 0;
		border-radius: 50%;
		transform: scale(0.92);
		transition: transform 0.12s ease-out;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			transition: all 0.2s ease-out;
		}
	}
</style>
