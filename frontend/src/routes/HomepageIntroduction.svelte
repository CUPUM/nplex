<script lang="ts">
	import Link from '$components/Link.svelte';
</script>

<article id="intro">
	<h2>Bienvenue sur Nplex!</h2>
	<p id="intro-main">
		Conçue dans le cadre de l’appel à projets <Link href="/">
			Développer ensemble une plus forte culture du
		</Link>
		design du Bureau du design Ville de Montréal, l'application Nplex vise à diffuser et promouvoir de
		bonnes pratiques en architecture, en design d'intérieur, et en design urbain, tant auprès des citoyens
		qu’auprès d'une diversité d'intervenant.e.s&nbsp;: fonctionnaires, concepteurs, professionnels de
		l’aménagement, et plus.
	</p>
	<p>
		D'une part, Nplex propose un canal de valorisation et de documentation alternatif aux concours
		existants dans les disciplines de l’aménagement en misant sur l’exemplarité de projets de
		petite-moyenne échelle – i.e. des projets modestes sur le plan des ressources, du processus, et
		des coûts – qui trouvent plus difficilement tribune dans les canaux de communication et de
		valorisation actuels.
	</p>
	<p>
		D'autre part, au delà d'une plateforme conçue et proposée comme une vitrine pour explorer des
		exemples phares, vous trouverez ici un outil qui cherche à vous accompagner dans la
		documentation et la planification de vos propre projets résidentiels ou communautaires à travers
		divers volets de vos démarches.
	</p>
</article>

<style lang="scss">
	#intro {
		position: relative;
		padding: var(--ui-gutter-md);
		max-width: var(--ui-width-md);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--ui-gap-lg);
	}

	h2 {
		font-weight: 500;
		font-size: var(--ui-text-2xl);
	}

	#intro-main {
		grid-column: 1 / -1;
		line-height: 1.2;
		font-weight: 300;
		font-size: var(--ui-text-xl);
	}
</style>
