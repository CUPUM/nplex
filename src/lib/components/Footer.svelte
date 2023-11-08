<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES } from '$lib/i18n/constants';
	import { createTranslations } from '$lib/i18n/translate';
	import { SETOUTS } from '$lib/setout/constants';
	import { slide } from 'svelte/transition';
	import Logo from './Logo.svelte';
	import CupumUdem from './partners-logos/CupumUdem.svelte';
	import MontrealQuebec from './partners-logos/MontrealQuebec.svelte';
	import UnescoUnitwin from './partners-logos/UnescoUnitwin.svelte';

	const t = createTranslations({
		fr: {
			cc: 'Chaire UNESCO en paysage urbain',
		},
		en: {
			cc: 'UNESCO Chaire in Urban Landscape',
		},
	});
</script>

{#if $page.data.setout !== SETOUTS.FULL_SCREEN}
	<footer transition:slide>
		<div id="footer-inner">
			<ul id="footer-logos">
				<li>
					<a
						href="https://montreal.ca{$page.data.locale === LOCALES.ENGLISH
							? '/en'
							: ''}/unites/bureau-du-design"
						rel="external"
						target="_blank"
						class="footer-logo"
					>
						<MontrealQuebec preserveAspectRatio="xMidYMid" width="100%" height="4.5rem" />
					</a>
				</li>
				<li>
					<a
						href="https://www.unesco.org/{$page.data.locale}/unitwin"
						rel="external"
						target="_blank"
						class="footer-logo"
					>
						<UnescoUnitwin preserveAspectRatio="xMidYMid" width="100%" height="5rem" />
					</a>
				</li>
				<li>
					<a
						href="https://www.unesco-paysage.umontreal.ca/{$page.data.locale}/"
						class="footer-logo"
					>
						<CupumUdem preserveAspectRatio="xMidYMid" width="100%" height="5rem" />
					</a>
				</li>
			</ul>
			<ul class="links"></ul>
			<!-- <ul id="footer-links">
				[sitemap]
			</ul> -->
		</div>
		<section id="footer-cc">
			<Logo size="2em" />
			<a
				href="https://www.unesco-paysage.umontreal.ca/{$page.data.locale}/"
				rel="external"
				target="_blank"
			>
				© {$t.cc}
			</a>
		</section>
	</footer>
{/if}

<style lang="postcss">
	footer {
		position: relative;
		padding: 0.75rem;
		margin-top: var(--base-gutter);
		display: flex;
		flex-direction: column;
		align-items: center;
		border-top: var(--base-border-size) solid
			color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
	}

	#footer-inner {
		font-size: var(--size-sm);
		padding: var(--base-gutter);
		width: 100%;
		max-width: var(--width-lg);
		display: flex;
		flex-direction: column;
		gap: var(--base-gap);
	}

	#footer-logos {
		grid-column: 1 / 2;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 6rem;
		margin: 2rem;
	}

	.footer-logo {
		position: relative;
		transition: all var(--duration-medium) ease-out;
		width: 100%;
		opacity: 0.5;
		footer:hover & {
			opacity: 1;
		}
		&:hover {
			color: var(--color-primary-700);
			:global(:--dark) & {
				color: var(--color-primary-500);
			}
		}
	}

	#footer-links {
		display: flex;
		flex: 1;
		grid-column: 2 / -1;
		grid-row: 1;
		border-radius: var(--radius-md);
		background-color: color-mix(in srgb, var(--color-neutral-500) 5%, transparent);
		padding: 2rem;
	}

	#footer-cc {
		font-size: var(--size-xs);
		opacity: 0.35;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		margin-block: 2rem 1rem;
	}
</style>
