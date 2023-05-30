<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Link from '$components/Link.svelte';
</script>

<article id="intro">
	<h2>Bienvenue sur Nplex!</h2>
	<p>
		Une plateforme conçue dans le cadre de l’appel à projets <Link href="/">
			Développer ensemble une plus forte culture du design
		</Link>
		lancé par le <Link href="/">Bureau du design Ville de Montréal</Link>.
	</p>
	<p>
		Diffuser et promouvoir de bonnes pratiques en design d'environnement (architecture, design
		d'intérieur, design urbain, design communautaire, et plus) tant auprès des citoyens qu’auprès
		d'une diversité d'intervenant.e.s du milieu du design et de ses industries connexes.
	</p>
	<Button variant="cta" href="/projets" rounded>
		<Icon slot="leading" name="map" />
		Explorer la carte
		<!-- <Icon slot="trailing" name="arrow-right" /> -->
	</Button>
	<p>
		Un canal de valorisation et de documentation alternatif aux concours existants dans les
		disciplines du design en misant sur l’exemplarité de projets à petite-moyenne échelle – i.e. des
		projets modestes sur le plan des ressources, du processus, et des coûts – qui trouvent plus
		difficilement tribune dans les canaux de communication et de valorisation actuels.
	</p>
	<p>
		D'autre part, au delà d'une plateforme conçue et proposée comme une vitrine pour explorer des
		exemples phares, vous trouverez ici un outil qui cherche à vous accompagner dans la
		documentation et la planification de vos propre projets résidentiels ou communautaires à travers
		divers volets de vos démarches.
	</p>
	{#if !$page.data.session}
		<p>Commencez à construire vos propres fiches!</p>
		<Button href="/projets" rounded>
			<Icon slot="leading" name="login" />
			Me connecter
		</Button>
		<Button variant="cta" href="/projets" rounded>
			<Icon slot="leading" name="user-add" />
			Me créer un compte
		</Button>
	{/if}
</article>

<style lang="scss">
</style>
