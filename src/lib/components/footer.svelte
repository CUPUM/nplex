<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES } from '$lib/i18n/constants';
	import CupumUdem from './partners-logos/CupumUdem.svelte';
	import Montreal from './partners-logos/Montreal.svelte';
</script>

<footer>
	<div class="inner">
		<ul class="logos">
			<li>
				<a href="https://www.unesco-paysage.umontreal.ca/{$page.data.locale}/" class="footer-link">
					<CupumUdem style="width: 10em; height: auto" />
				</a>
			</li>
			<hr class="hr" />
			<li>
				<a
					href="https://montreal.ca/unites/bureau-du-design{$page.data.locale === LOCALES.ENGLISH
						? '/en'
						: ''}"
					class="footer-link"
				>
					<Montreal style="width: 10em; height: auto" />
				</a>
			</li>
		</ul>
		<ul class="links"></ul>
	</div>
</footer>

<style lang="postcss">
	footer {
		position: relative;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		:global(:--dark) & {
			background-color: var(--color-neutral-950);
		}
	}

	.inner {
		font-size: var(--size-sm);
		padding: 2rem;
		width: 100%;
		max-width: var(--width-lg);
		align-self: center;
	}

	.logos {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 3rem;
		font-size: var(--size-xs);

		hr {
			all: unset;
			width: 1px;
			flex: none;
			align-self: stretch;
			background-color: var(--color-neutral-500);
			opacity: 0.2;
		}
	}

	.footer-link {
		transition: all var(--duration-medium) ease-out;
		&:hover {
			color: var(--color-primary-700);
			:global(:--dark) & {
				color: var(--color-primary-500);
			}
		}
	}
</style>
