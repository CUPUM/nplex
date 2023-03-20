<!--
	@component
	Singleton component acting as a toast-like messages outlet.
	Also holds the ongoing messages stack store.
-->
<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import type { Newable, ValueOf } from 'ts-essentials';
	import { z } from 'zod';

	export const MESSAGE_TYPES = {
		Error: 'error',
		Success: 'success',
		Normal: 'normal',
	} as const;

	export type MessageType = ValueOf<typeof MESSAGE_TYPES>;

	type Message<C = string | SvelteComponentTyped> = {
		content: C extends string
			? C
			: C extends SvelteComponentTyped
			? {
					component: Newable<C>;
					props?: ComponentProps<C>;
			  }
			: unknown;
		timer?: number;
		type?: MessageType;
	};

	const queryMessageSchema: z.ZodType<Message<string>> = z.object({
		content: z.string(),
		timer: z.number().optional(),
		type: z
			.union([
				z.literal(MESSAGE_TYPES.Error),
				z.literal(MESSAGE_TYPES.Success),
				z.literal(MESSAGE_TYPES.Normal),
			])
			.optional(),
	});

	const defaultMessage: Message<string> = {
		content: '',
		timer: 5000,
		type: MESSAGE_TYPES.Normal,
	};

	/**
	 * Singleton store containing stack of messages dispatched from anywhere in the app. This store's
	 * contents are displayed in the app's root layout.
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
		function dispatch(...messages: Message[] | string[]) {
			const defaulted = messages.map((m) => {
				let mObj: Message;
				if (typeof m === 'string') {
					mObj = { content: m };
				} else {
					mObj = { ...defaultMessage, ...m };
				}
				if (mObj.timer) {
					timeouts.set(
						mObj,
						setTimeout(() => clear(mObj), mObj.timer)
					);
				}
				return mObj;
			});
			update((curr) => [...curr, ...defaulted]);
		}
		function error(...messages: Omit<Message, 'type'>[] | string[]) {
			dispatch(
				...messages.map((m) => {
					if (typeof m === 'string') {
						return {
							content: m,
							type: MESSAGE_TYPES.Error,
						};
					}
					(m as Message).type = MESSAGE_TYPES.Error;
					return m;
				})
			);
		}
		function success(...messages: Omit<Message, 'type'>[] | string[]) {
			dispatch(
				...messages.map((m) => {
					if (typeof m === 'string') {
						return {
							content: m,
							type: MESSAGE_TYPES.Success,
						};
					}
					(m as Message).type = MESSAGE_TYPES.Success;
					return m;
				})
			);
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
			success,
			error,
			clear,
			clearAll,
			cancelTimer,
			clearLast,
		};
	})();

	export function queryMessage(url: string, ...messages: Message[]): string;
	export function queryMessage(url: URL, ...messages: Message[]): URL;
	export function queryMessage(url: UnbasedURL, ...messages: Message[]): UnbasedURL;
	export function queryMessage(
		url: string | URL | UnbasedURL,
		...messages: Message[]
	): string | URL | UnbasedURL {
		const newURL =
			url instanceof URL && !(url instanceof UnbasedURL) ? new URL(url) : new UnbasedURL(url);
		messages.forEach((m) => {
			newURL.searchParams.append(SEARCH_PARAMS.MESSAGE, JSON.stringify(m));
		});
		return typeof url === 'string' ? newURL.toString() : url;
	}
</script>

<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import { transform } from '$transitions/transform';
	import { SEARCH_PARAMS } from '$utils/enums';
	import { UnbasedURL } from '$utils/url';
	import type { ComponentProps, SvelteComponentTyped } from 'svelte';
	import { flip } from 'svelte/animate';
	import { cubicIn, cubicOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	function closeMessage(e: MouseEvent, message: Message) {
		e.stopPropagation();
		messages.clear(message);
	}

	function cancelTimer(e: MouseEvent, message: Message) {
		e.stopPropagation();
		messages.cancelTimer(message);
	}

	afterNavigate(({ from, to }) => {
		if (!to || !to.url.searchParams.has(SEARCH_PARAMS.MESSAGE)) return;
		const q = to.url.searchParams.getAll(SEARCH_PARAMS.MESSAGE).reduce((acc, m) => {
			const json = JSON.parse(m);
			const parsed = queryMessageSchema.safeParse(json);
			if (parsed.success) acc.push(parsed.data);
			return acc;
		}, [] as Message[]);
		if (q.length) {
			messages.dispatch(...q);
			const o = $page.url.searchParams;
			o.delete(SEARCH_PARAMS.MESSAGE);
			goto('?' + o.toString(), { replaceState: true });
		}
	});
</script>

<div class="outlet">
	{#each $messages as message (message)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<dialog
			in:transform|local={{
				translateY: 8,
				scale: 0.95,
				opacity: 0,
				duration: 250,
				easing: cubicOut,
			}}
			out:scale|local={{ start: 0.9, opacity: 0, duration: 100, easing: cubicIn }}
			animate:flip={{ duration: 250, easing: expoOut }}
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
					{#if message.type === 'error' || message.type === 'success'}
						<div class="icon">
							<Icon name={message.type === 'error' ? 'warn' : 'check-circle'} />
						</div>
					{/if}
					<span class="text">
						{@html message.content}
					</span>
				{:else}
					<svelte:component this={message.content.component} {...message.content.props || {}} />
				{/if}
			</div>
			<button
				in:fly={{ x: -10, delay: 200, easing: cubicOut, duration: 250 }}
				on:click={(e) => closeMessage(e, message)}
			>
				<Icon name="cross" style="font-size: 1.25em;" />
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
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		z-index: 1000;
	}

	dialog {
		--inset: var(--ui-inset);
		font-size: var(--ui-text-sm);
		pointer-events: all;
		position: relative;
		font-weight: 400;
		max-width: 50ch;
		flex: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: var(--inset);
		border: none;
		border-radius: var(--ui-radius-md);
		box-shadow: 0 1em 2em -0.75em rgba(0, 20, 40, 0.25);
		background: white;
	}

	button {
		cursor: pointer;
		width: 2.75em;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		border: none;
		aspect-ratio: 1 / 1;
		position: absolute;
		left: calc(100% + 0.5em);
		color: col(fg, 700);
		background: col(bg, 100);
		opacity: 0.8;
		transform: scale(0.95);
		transition: all 0.1s ease-out;

		&:hover {
			opacity: 1;
			background: col(bg, 000);
			transform: scale(1);
		}
	}

	.content {
		position: relative;
		padding: 1em 1.2em;
	}

	.icon {
		position: relative;
		display: inline-flex;
		height: 1em;
		margin-right: 0.25em;
	}

	.text {
		position: relative;
		top: -0.1em;
	}

	.progress-container {
		flex: none;
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 0 1.5em;
	}

	.progress {
		width: 100%;
		height: 5px;
		border-radius: 2px 2px 0 0;
		animation: timer forwards var(--timer) linear;
		background: col(fg, 100, 0.2);
	}

	.error {
		background: col(error, 700);
		color: col(bg, 700);

		.progress {
			background: col(error, 900);
		}
	}

	.success {
		background: col(success, 500);
		color: col(bg, 500);

		.progress {
			background: col(success, 900);
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
