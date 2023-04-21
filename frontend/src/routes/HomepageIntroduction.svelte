<script lang="ts">
</script>

<article id="intro">
	<section id="intro-welcome">
		<h2 class="heading-xl">Bienvenue sur Nplex!</h2>
		<p class="text-lg">
			Conçue dans le cadre de l’appel à projets <a href="/">
				Développer ensemble une plus forte culture du
			</a>
			design du Bureau du design Ville de Montréal, l'application Nplex vise à diffuser et promouvoir
			de bonnes pratiques en architecture, en design d'intérieur, et en design urbain, tant auprès des
			citoyens qu’auprès d'une diversité d'intervenant.e.s&nbsp;: fonctionnaires, concepteurs, professionnels
			de l’aménagement, et plus.
		</p>
	</section>
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
		--intro-radius: var(--ui-radius-xl);
		position: relative;
		padding: var(--ui-gutter-lg) var(--ui-gutter-sm);
		// line-height: 2;
		text-align: center;
		// background: col(bg, 900);
		align-self: stretch;
		border-bottom-left-radius: var(--intro-radius);
		border-bottom-right-radius: var(--intro-radius);
		// position: sticky;
		// bottom: 0;
		z-index: -1;
		display: flex;
		flex-direction: column;
		align-items: center;

		&::before {
			--h: var(--ui-radius-2xl);
			content: '';
			align-self: stretch;
			position: absolute;
			height: var(--h);
			width: 100%;
			left: 0;
			background: inherit;
			top: calc(-1 * var(--h));
		}
	}

	#intro-welcome {
		// display: flex;
		// flex-direction: column;
		// justify-content: center;
		// align-items: center;
		// min-height: 75vh;
		// min-height: 75svh;
		padding-block: var(--ui-gutter-lg);
	}
</style>
