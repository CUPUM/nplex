<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { langKey } from '$lib/i18n/translate';
	import { FilePlus, Search } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
</script>

<form method="GET">
	<header>
		<h1 class="heading xxl">
			<LangKey>{m.project_edit()}</LangKey>
		</h1>
	</header>
	<section id="projects-actions">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			{...$link(`/new/project`)}
			class="button cta"
			in:fly|global={{ x: 8, easing: cubicOut, duration: 450, delay: 250 }}
		>
			<LangKey>{@html m.project_create()}</LangKey>
			<FilePlus class="button-icon" />
		</a>
		<span class="prose dimmer" in:fade|global={{ delay: 500, duration: 1000 }}>
			<LangKey>{m.or()}</LangKey>
		</span>
		<fieldset
			class="input-group"
			in:fly|global={{ x: -8, easing: cubicOut, duration: 450, delay: 250 }}
			disabled
		>
			<input type="search" name="q" placeholder={$langKey(m.project_find())} class="input" />
			<div class="input-peer">
				<button class="button cta square">
					<Search class="button-icon" />
				</button>
			</div>
		</fieldset>
	</section>
</form>

<style lang="postcss">
	form {
		--pattern-color: var(--color-neutral-400);
		grid-column: 1 / -1;
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-self: stretch;
		min-height: calc(100vh - var(--navbar-height) - var(--base-gutter));
		min-height: calc(100svh - var(--navbar-height) - var(--base-gutter));
		min-height: calc(100dvh - var(--navbar-height) - var(--base-gutter));
		padding-bottom: var(--navbar-height);
		gap: 5rem;
		border-radius: inherit;
		background: radial-gradient(circle, var(--pattern-color) 1px, transparent 1.1px);
		background-position: center;
		background-size: var(--size-xl) var(--size-xl);
		background-repeat: repeat;
		:global(:--dark) & {
			--pattern-color: var(--color-neutral-700);
		}
	}

	#projects-actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
</style>
