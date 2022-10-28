<!-- 
    @component
	Adds small notification indicator or other customized badge to parent.
    Useful to add warnings or notifications to buttons and tokens.
	Note that hidden overflow on parent elements will affect this component's visibility.
-->
<script lang="ts">
	import { cssSize } from '$utils/css';
	import { elasticOut, expoIn } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let state: 'default' | 'success' | 'notification' | 'warning' = 'default';
	export let place: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' = 'end';
	export let square: boolean = false;
	export let size: string | number = '.75em';
	export let dx: string | number = '.5em';
	export let dy: string | number = '.5em';
</script>

<div
	style:font-size={cssSize(size)}
	style:--dx={cssSize(dx)}
	style:--dy={cssSize(dy)}
	class:square
	class="{state} {place} {align}"
	in:scale={{ easing: elasticOut, duration: 250 }}
	out:scale={{ easing: expoIn, duration: 200 }}
>
	<slot />
</div>

<style lang="scss">
	div {
		position: absolute;
		margin: 0;
		flex: none;
		padding: 0.5em 1em;
		border-radius: 2em;
		overflow: hidden;
		text-overflow: ellipsis;
		box-shadow: 0 0.5em 1.5em -0.75em rgba(0, 0, 0, 0.25);
		letter-spacing: 0.25px;
		background-color: white;
	}

	.success {
	}

	.notification {
	}

	.warning {
	}

	.top {
		top: var(--dy);
		transform: translate(-50%, -50%);

		&.start {
			left: var(--dx);
		}

		&.center {
			left: 50%;
		}

		&.end {
			right: var(--dx);
			transform: translate(50%, -50%);
		}
	}

	.bottom {
		bottom: var(--dy);
		transform: translate(-50%, 50%);

		&.start {
			left: var(--dx);
		}

		&.center {
			left: 50%;
		}

		&.end {
			right: var(--dx);
			transform: translate(50%, 50%);
		}
	}

	.right {
		top: 50%;
		transform: translate(-50%, -50%);

		&.start {
			left: var(--dx);
		}

		&.center {
			left: 50%;
		}

		&.end {
			right: var(--dx);
			transform: translate(50%, -50%);
		}
	}

	.left {
		top: 50%;
		transform: translate(-50%, -50%);

		&.start {
			left: var(--dx);
		}

		&.center {
			left: 50%;
		}

		&.end {
			right: var(--dx);
			transform: translate(50%, -50%);
		}
	}
</style>
