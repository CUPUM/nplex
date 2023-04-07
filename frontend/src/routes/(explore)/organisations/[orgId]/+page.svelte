<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import RenderMarkdown from '$components/RenderMarkdown.svelte';

	export let data;
</script>

<header>
	<h1 class="heading-lg">
		{data.organisation.name}
	</h1>
	{#if data.organisation.url}
		<Button href={data.organisation.url}><Icon name="link" slot="leading" />Visiter le site</Button>
	{/if}
</header>
<section>
	<h2>À propos</h2>
	<RenderMarkdown source={data.organisation.about ?? 'Présentation à venir.'} />
</section>
<section>
	<h2>Projets</h2>
	<p class="subtle">À venir</p>
</section>

<style lang="scss">
</style>
