<script lang="ts">
	import { page } from '$app/stores';
	import { ripple } from '$lib/actions/ripple';
	import { LOCALES_ARR, LOCALES_DETAILS, type Locale } from '$lib/i18n/constants';
	import { switchCrossfade } from '$lib/transitions/presets';
	import { createTabs, melt } from '@melt-ui/svelte';

	export let defaultValue: Locale = $page.data.locale;

	const {
		elements: { root, trigger, list, content },
		states: { value },
	} = createTabs({ defaultValue, loop: true, activateOnFocus: true });

	const [send, receive] = switchCrossfade;

	const key = {};
</script>

<div class="input-group" use:melt={$root}>
	{#each LOCALES_ARR as locale}
		<div class="locale-content" lang={locale} use:melt={$content(locale)}>
			<slot {locale} {value} current={$value === locale} />
		</div>
	{/each}
	<div class="input-peer">
		<menu use:melt={$list} class="switch compact rounded" use:ripple>
			{#each LOCALES_ARR as locale}
				<button class="switch-item" use:melt={$trigger(locale)} lang={locale} type="button">
					{LOCALES_DETAILS[locale].label}
					{#if $value === locale}
						<div in:send={{ key }} out:receive={{ key }} class="switch-thumb" />
					{/if}
				</button>
			{/each}
		</menu>
	</div>
</div>

<style lang="postcss">
	.input-group {
		align-self: stretch;
	}

	.locale-content {
		display: flex;
		flex-direction: row;
		flex: 1;
		flex-direction: row;
		transform: translateX(0);
		opacity: 1;
		transition:
			all var(--duration-slow) var(--ease-out-expo),
			flex 0s,
			width 0s,
			margin 0s;
	}

	.locale-content[hidden] {
		flex: none;
		pointer-events: none;
		visibility: collapse;
		transform: translateX(0.5em);
		opacity: 0;
		height: 0;
		width: 0;
		margin: 0;
		transition: none;
	}

	.input-peer {
		height: var(--base-block-size);
		align-items: center;
		padding-right: 0.35em;
		flex: none;
	}

	.switch {
		font-size: var(--size-xs);
	}
</style>
