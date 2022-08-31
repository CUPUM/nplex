<script lang="ts">
	import { reveal } from '$actions/reveal';
	import Avatar from '$components/primitives/Avatar.svelte';
	import { flyRotate } from '$utils/presets/reveal';
	import type { PageData } from './$types';

	export let data: PageData;

	let heading = `Bonjour${data.profile.firstname ? ' ' + data.profile.firstname : ''}!`;
</script>

<header class="core-grid">
	{#key heading}
		<h1 use:reveal={{ ...flyRotate, rootMargin: '0px 0px' }}>{heading}</h1>
	{/key}
</header>
<article id="profile">
	<section class="card">
		<Avatar data={data.session.user} size="150px" />
		<section class="name">
			<div class="firstname">{data.profile.firstname}</div>
			<div class="middlename">{data.profile.middlename}</div>
			<div class="lastname">{data.profile.lastname}</div>
		</section>
	</section>
	<section class="bio">
		<div>À propos de moi</div>
	</section>
</article>
<article id="entries">
	<h2>Fiches éditables</h2>
	<section>
		<h3>Mes fiches de projet</h3>
	</section>
	<section>
		<h3>Projets partagés avec moi</h3>
	</section>
	<section>
		<h3>Mes fiches d'organisation</h3>
	</section>
	<section>
		<h3>Organisations partagées avec moi</h3>
	</section>
	<section>
		<h3>Mes fiches d'acteur</h3>
	</section>
	<section>
		<h3>Acteurs partagés avec moi</h3>
	</section>
</article>
<article>
	<h2>Mes collections</h2>
</article>
<article>
	<h2>Mes votes</h2>
</article>

<style lang="scss">
	header {
		grid-column: full;
		min-height: 50vh;
		padding: 4rem 0;
		flex-direction: column;
		align-items: center;

		h1 {
			grid-column: col1 / col2;
		}
	}

	h2 {
		padding: 0;
		margin: 0;
		font-size: 2.5rem;
		font-weight: 500;
	}

	#profile {
		position: relative;
		grid-column: fullpad;
		gap: 1px;
		display: flex;
		padding-bottom: 4rem;
		flex-direction: row;
		flex-wrap: wrap;
		@include mixins.border(bottom);
	}

	.card {
		position: relative;
		min-width: 500px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		z-index: 1;
		grid-column: col1;
		border-radius: 2rem;
		background-color: var(--color-light-100);
	}

	.bio {
	}
</style>
