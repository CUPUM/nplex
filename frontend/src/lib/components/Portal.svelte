<!--
	@component
	# Portal
	Credits to Roman Rodych (https://github.com/romkor): https://github.com/romkor/svelte-portal/blob/master/src/Portal.svelte
-->
<script lang="ts" context="module">
	import { tick } from 'svelte';

	export function portal(element: HTMLElement, target: HTMLElement | string) {
		let targetRef: HTMLElement | null;

		async function update(newTarget: HTMLElement | string) {
			target = newTarget;
			if (typeof target === 'string') {
				targetRef = document.querySelector(target);
				if (targetRef === null) {
					await tick();
					targetRef = document.querySelector(target);
				}
				if (targetRef === null) {
					throw new Error(`No element found matching css selector: "${target}"`);
				}
			} else if (target instanceof HTMLElement) {
				targetRef = target;
			} else {
				throw new TypeError(
					`Unknown portal target type: ${
						target === null ? 'null' : typeof target
					}. Allowed types: string (CSS selector) or HTMLElement.`
				);
			}
			targetRef.appendChild(element);
			element.hidden = false;
		}

		function destroy() {
			if (element.parentNode) {
				element.parentNode.removeChild(element);
			}
		}

		update(target);

		return {
			update,
			destroy,
		};
	}
</script>

<script lang="ts">
	export let target: HTMLElement | string;
</script>

<div use:portal={target} hidden>
	<slot />
</div>

<style lang="scss">
	div {
		display: contents;
	}
</style>
