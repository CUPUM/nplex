<script lang="ts">
	export let data;
</script>

<header>
	<h1 class="heading-xl">Organisations</h1>
	<p>
		Les fiches d'organisation font référence à un éventail d'institutions publiques, de bureaux
		d'architectes, d'entreprises oeuvrant au sein de diverses industries, d'organismes
		communautaires, et plus encore.
	</p>
</header>
<div id="orgs-browse">
	<menu>
		<span class="subtle">Filtres de recherche (à venir).</span>
	</menu>
	<ul>
		{#each data.organisations as org}
			<li>
				<a href="/organisations/{org.id}">
					<div class="org-name">
						{org.name}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	header {
		width: 100%;
		padding: var(--ui-gutter-lg);
		align-self: center;
		width: 100%;
		max-width: var(--ui-width-main);
	}

	#orgs-browse {
		display: flex;
		flex-direction: row;
		padding: var(--ui-gutter-md);
		gap: var(--ui-gutter-lg);
		align-items: flex-start;
		align-self: center;
		width: 100%;
		max-width: var(--ui-width-main);
	}

	menu {
		position: sticky;
		top: var(--ui-sticky-top);
		padding: var(--ui-pad-lg);
		background-color: col(bg, 300);
		border-radius: var(--ui-radius-xl);
	}

	ul {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--ui-gutter-xs);
	}
	li {
		position: relative;
		flex: none;
	}

	a {
		position: relative;
		display: block;
		background-color: col(bg, 000);
		border-radius: var(--ui-radius-lg);
		padding: var(--ui-gutter-md);
	}

	.org-name {
		font-size: var(--ui-text-lg);
		font-weight: 450;
		color: col(fg, 100);
	}
</style>
