// See: https://stackoverflow.com/questions/64131176/svelte-custom-event-on-svelte-typescript

declare namespace svelte.JSX {
	interface HTMLProps<T> {
		onclickoutside?: (e?: CustomEvent) => any
	}
}