<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button/Button.svelte';
	import Dirty from '$components/Dirty.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import Token from '$components/Token/Token.svelte';
	import TokenButton from '$components/Token/TokenButton.svelte';
	import { messages } from '$routes/MessagesOutlet.svelte';
	import { getFailureMessages } from '$utils/validation';
	import { dirtyValues } from '../../../common';
	import { project } from '../common';

	export let data;

	let creating = false;
</script>

<Dirty
	sample={data.project.indicators}
	specimen={$project.indicators}
	bind:dirty={$dirtyValues.indicators}
/>
<header class="editor-form-header">
	<h2 class="heading-xl">Indicateurs d'exemplarité</h2>
	<p>
		L’exemplarité d’un projet, en matière de design, est complexe à évaluer en raison du
		chevauchement de plusieurs enjeux, problématiques et besoins dans les villes comme Montréal.
		Plusieurs guides, comme le Système Davos de qualité pour la culture du bâti et l’Agenda
		Montréalais 2030 pour la qualité et l’exemplarité en design et en architecture, ont été produits
		afin de guider professionnels, citoyens et élus vers des projets plus positifs pour la
		communauté, et ont inspiré la rédaction du Guide d’exemplarité des projets de Nplex, qui vise à
		fournir au lecteur des balises spécifiques au territoire montréalais et au type de projet visé
		par la plateforme. Le présent guide explore l’exemplarité des projets en huit volets&nbsp;:
	</p>
	<ol>
		<li>la durabilité;</li>
		<li>la résilience;</li>
		<li>la modération de la consommation énergétique;</li>
		<li>l'optimisation économique;</li>
		<li>l’attractivité et la valorisation culturelle;</li>
		<li>l’innovation;</li>
		<li>l’équité et l’inclusivité;</li>
		<li>le bien-être.</li>
	</ol>
</header>
{#each data.descriptors.exemplarityCategories as category}
	{@const createFormId = `create-indicator-${category.id}`}
	<fieldset class="editor-form-group">
		<h3 class="editor-form-group-title">{category.title}</h3>
		<!-- <AnimateHeight> -->
		<ul>
			{#each category.indicators as indicator}
				<Token name="indicator" value={indicator.id} bind:group={$project.indicators}>
					{indicator.title}
					<TokenButton slot="trailing"><Icon name="question" /></TokenButton>
				</Token>
			{/each}
		</ul>
		<Modal let:close>
			<svelte:fragment slot="control" let:open>
				<Button class="text-sm" variant="dashed" on:click={open}>
					<Icon name="plus" slot="leading" />Crééer un indicateur
				</Button>
			</svelte:fragment>
			<svelte:fragment slot="header">Créer un nouvel indicateur d’exemplarité</svelte:fragment>
			<form
				method="POST"
				use:enhance={(a) => {
					creating = true;
					return async (f) => {
						await f.update({ reset: false });
						creating = false;
						if (f.result.type === 'success') {
							close();
						} else if (f.result.type === 'failure') {
							messages.error(...getFailureMessages(f.result));
						}
					};
				}}
				id={createFormId}
				class="flex flex-c gap-md"
				action="/editer/descripteurs/projets/indicateurs?/create"
			>
				<input type="hidden" name="new.category" value={category.id} />
				<Field required name="new.title">
					<svelte:fragment slot="label">Titre</svelte:fragment>
				</Field>
				<Field required name="new.short_title">
					<svelte:fragment slot="label">Titre court</svelte:fragment>
				</Field>
				<TextArea name="new.description">
					<svelte:fragment slot="label">Description</svelte:fragment>
				</TextArea>
			</form>
			<svelte:fragment slot="footer">
				<Button variant="cta" type="submit" loading={creating} form={createFormId}>
					Confirmer
				</Button>
			</svelte:fragment>
		</Modal>
		<!-- </AnimateHeight> -->
	</fieldset>
{/each}

<!-- {/each} -->
<style lang="scss">
	ul {
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
		margin-bottom: 1.5rem;
	}
</style>
