<!--
	@component
	Singleton component acting as a toast-like messages outlet.
	Also holds the ongoing messages stack store.

-->
<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import type { Newable } from 'ts-essentials';

	type Message<T = string | SvelteComponentTyped> = {
		content: T extends string
			? T
			: T extends SvelteComponentTyped
			? {
					component: Newable<T>;
					props?: ComponentProps<T>;
			  }
			: unknown;
		timer?: number;
		type?: 'error' | 'success' | 'default';
	};

	export function isUrlMessage(arg: any): arg is Message<string> {
		return (
			typeof arg === 'object' && typeof arg.content === 'string' && (!arg.timer || typeof arg.timer === 'number')
		);
	}

	const defaultMessage: Message<string> = {
		content: '',
		timer: 4000,
		type: 'default',
	};

	/**
	 * Singleton store containing stack of messages dispatched from anywhere in the app. This store's contents are
	 * displayed in the app's root layout.
	 */
	export const messages = (function () {
		const { subscribe, set, update } = writable<Message[]>([]);
		const timeouts: Map<Message, ReturnType<typeof setTimeout>> = new Map();
		function clear(message: Message) {
			update((curr) => {
				timeouts.delete(message);
				return curr.filter((m) => m !== message);
			});
		}
		function clearLast() {
			update((curr) => {
				const last = curr.pop();
				if (last) timeouts.delete(last);
				return curr;
			});
		}
		function clearAll() {
			timeouts.clear();
			set([]);
		}
		function dispatch(...messages: Message[]) {
			const defaulted = messages.map((m) => {
				m = { ...defaultMessage, ...m };
				if (m.timer) {
					timeouts.set(
						m,
						setTimeout(() => clear(m), m.timer)
					);
				}
				console.log(m);
				return m;
			});
			update((curr) => [...curr, ...defaulted]);
		}
		function cancelTimer(message: Message) {
			if (message.timer) {
				update((curr) => {
					if (timeouts.has(message)) {
						clearTimeout(timeouts.get(message));
						const index = curr.indexOf(message);
						if (index > -1) {
							curr[index].timer = 0;
						}
					}
					return curr;
				});
			}
		}
		return {
			subscribe,
			dispatch,
			clear,
			clearAll,
			cancelTimer,
			clearLast,
		};
	})();

	export function appendMessageParam(url: string, ...messages: Message[]): string;
	export function appendMessageParam(url: URL, ...messages: Message[]): URL;
	export function appendMessageParam(url: RelativeURL, ...messages: Message[]): RelativeURL;
	export function appendMessageParam(
		url: string | URL | RelativeURL,
		...messages: Message[]
	): string | URL | RelativeURL {
		const newURL = url instanceof URL && !(url instanceof RelativeURL) ? new URL(url) : new RelativeURL(url);
		messages.forEach((m) => {
			newURL.searchParams.append(SearchParam.Message, JSON.stringify(m));
		});
		return typeof url === 'string' ? newURL.toString() : url;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import { SearchParam } from '$utils/enums';
	import { RelativeURL } from '$utils/url';
	import { onMount, type ComponentProps, type SvelteComponentTyped } from 'svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	function closeMessage(e: MouseEvent, message: Message) {
		e.stopPropagation();
		messages.clear(message);
	}

	function cancelTimer(e: MouseEvent, message: Message) {
		e.stopPropagation();
		messages.cancelTimer(message);
	}

	$: urlMessages = $page.url.searchParams.getAll(SearchParam.Message).reduce((acc, m) => {
		const parsed = JSON.parse(m);
		return isUrlMessage(parsed) ? [...acc, parsed] : acc;
	}, [] as Message[]);

	onMount(() => {
		if (urlMessages.length) {
			messages.dispatch(...urlMessages);
			const clearedUrl = new RelativeURL($page.url);
			clearedUrl.searchParams.delete(SearchParam.Message);
			goto(clearedUrl.toString(), { replaceState: true });
		}
	});
</script>

<div class="outlet">
	{#each $messages as message (message)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<dialog
			in:scale|local={{ start: 0.75, opacity: 0, duration: 500, easing: expoOut }}
			out:scale|local={{ start: 0.9, opacity: 0, duration: 350, easing: expoOut }}
			animate:flip={{ duration: 350, easing: expoOut }}
			class={message.type}
			on:click|once={(e) => cancelTimer(e, message)}
		>
			{#if message.timer}
				<div class="progress-container">
					<div class="progress" style:--timer="{message.timer}ms" />
				</div>
			{/if}
			<div class="content">
				{#if typeof message.content === 'string'}
					{#if message.type === 'error'}
						<div class="icon">
							<Icon name="warn" />
						</div>
					{/if}
					<span class="text">
						{@html message.content}
					</span>
				{:else}
					<svelte:component this={message.content.component} {...message.content.props || {}} />
				{/if}
			</div>
			<button on:click={(e) => closeMessage(e, message)}>
				<Icon name="cross" style="font-size: 1.25em" />
			</button>
		</dialog>
	{/each}
</div>

<style lang="scss">
	.outlet {
		pointer-events: none;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 0%;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		z-index: 1000;
	}

	dialog {
		--inset: var(--default-inset);
		font-size: var(--size-medium);
		pointer-events: all;
		position: relative;
		max-width: 50ch;
		flex: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: var(--inset);
		border: none;
		border-radius: var(--default-radius);
		box-shadow: 0 1.5em 2em -0.5em rgba(0, 0, 40, 0.15);
		background-color: white;
	}

	button {
		cursor: pointer;
		width: 3em;
		padding: 0;
		padding-bottom: 0.2em;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		border: none;
		aspect-ratio: 1 / 1;
		position: absolute;
		left: calc(100% + 0.5em);
		background-color: var(--color-base-300);
		transition: all 0.1s;

		&:hover {
			background-color: var(--color-base-900);
		}
	}

	.content {
		position: relative;
		padding: 1em;
	}

	.icon {
		position: relative;
		display: inline-flex;
		// margin-right: 0.25em;
	}

	.text {
		position: relative;
		top: -0.1em;
		padding-inline: 0.25em;
	}

	.progress-container {
		flex: none;
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		left: 0;
		top: 0;
		width: 100%;
		padding: 0 1.5em;
	}

	.progress {
		width: 100%;
		height: 3px;
		border-radius: 0 0 3px 3px;
		animation: timer forwards var(--timer) linear;
		background-color: var(--color-primary-300);
	}

	.error {
		background-color: var(--color-error-500);
		color: var(--color-base-100);

		& .progress {
			background-color: var(--color-error-900);
		}
	}

	@keyframes timer {
		0% {
			width: 100%;
		}
		100% {
			width: 0%;
		}
	}
</style>
