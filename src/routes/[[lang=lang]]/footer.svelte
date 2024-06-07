<script lang="ts">
	import { page } from '$app/stores';
	import { PRESENTATIONS } from '$lib/presentation/constants';
</script>

{#if $page.data.setout !== PRESENTATIONS.FULL_SCREEN && !$page.data.footer?.hidden}
	<footer>Footer goes here</footer>
{/if}

<!-- {#if $page.data.setout !== ARRANGEMENTS.FULL_SCREEN && !$page.data.footer?.hide}
	<footer transition:slide>
		<div id="footer-inner">
			<ul id="footer-logos">
				<li>
					<a
						href="https://montreal.ca{$page.data.lang === 'en'
							? '/en'
							: ''}/unites/bureau-du-design"
						rel="external"
						target="_blank"
						class="footer-logo"
					>
						<LogoMontrealQuebec preserveAspectRatio="xMidYMid" width="100%" height="4rem" />
					</a>
				</li>
				<li>
					<a
						href="https://www.unesco.org/{$page.data.lang}/unitwin"
						rel="external"
						target="_blank"
						class="footer-logo"
					>
						<LogoUnescoUnitwin preserveAspectRatio="xMidYMid" width="100%" height="4rem" />
					</a>
				</li>
				<li>
					<a href="https://www.unesco-paysage.umontreal.ca/{$page.data.lang}/" class="footer-logo">
						<LogoCupumUmontreal preserveAspectRatio="xMidYMid" width="100%" height="4rem" />
					</a>
				</li>
			</ul>
			<ul class="links"></ul>
			<ul id="footer-links">
				[sitemap]
			</ul>
		</div>
		<section id="footer-cc">
			<Logo size="2em" />
			<a
				href="https://www.unesco-paysage.umontreal.ca/{$page.data.lang}/"
				rel="external"
				target="_blank"
			>
				© {m.unesco_chair_long()}
			</a>
		</section>
	</footer>
{/if} -->
