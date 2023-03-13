<!--
	@component
	# Modal Outlet
	Use this component as a singleton to situate where in the DOM modals should be instanciated, through a portal.
-->
<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	const ref = writable<HTMLElement | undefined>();

	export const modalOutletRef = { subscribe: ref.subscribe };
</script>

<script lang="ts">
</script>

<div class="outlet noscrollbar" bind:this={$ref} />

<style lang="scss">
	.outlet {
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		padding: 12rem;
		overflow-y: scroll;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 1000;

		@include tablet {
			// padding: 6rem;
		}

		@include mobile {
			// padding: 3rem;
		}
	}
</style>
