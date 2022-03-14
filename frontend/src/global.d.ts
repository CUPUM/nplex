/// <reference types="@sveltejs/kit" />

/**
 * For clickoutside directive
 * See: https://stackoverflow.com/questions/64131176/svelte-custom-event-on-svelte-typescript
 */
declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclickoutside?: (event?: CustomEvent) => any
	}
}
