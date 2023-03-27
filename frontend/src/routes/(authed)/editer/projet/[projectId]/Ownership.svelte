<script lang="ts">
	import Ripple from '$components/Ripple.svelte';
	import { descriptors, project } from './common';
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Propriété du site</h3>
	<p class="subtle">
		Quel statut correspond avec le plus de précision au propriétaire du site où se trouve le projet?
	</p>
	<section class="fields">
		{#each $descriptors.siteOwnerships as o}
			{@const inputid = `radio-ownership-${o.id}`}
			<input
				type="radio"
				name="site_ownership"
				id={inputid}
				value={o.id}
				bind:group={$project.site_ownership}
				hidden
			/>
			<label class="ownership-card" for={inputid}>
				<Ripple />
				<div class="text-lg ownership-title">{o.title}</div>
				<div class="subtle ownership-description">{o.description || 'Description à venir...'}</div>
			</label>
		{/each}
		<!-- <Switch
			orientation="column"
			variant="outlined"
			bind:value={$project.site_ownership}
			name="site_ownership_id"
		>
			{#each $descriptors.siteOwnerships as o}
				<SwitchItem value={o.id}>{o.title}</SwitchItem>
			{/each}
		</Switch> -->
	</section>
</fieldset>

<style lang="scss">
	.fields {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: var(--ui-gap-sm);
	}

	.ownership-card {
		position: relative;
		cursor: pointer;
		display: inline-flex;
		gap: 0.5em;
		flex-direction: column;
		border-radius: var(--ui-radius-lg);
		background-color: col(fg, 100, 0.05);
		border: var(--ui-border-size) solid col(fg, 300, 0);
		padding: 1.5em 2em 2em;
		transition: all 0.1s ease-out;

		&:hover {
			border-color: col(fg, 500, 0.2);
		}

		:checked + & {
			color: col(bg, 700);
			background-color: col(fg, 300);
		}
	}

	.ownership-title {
		font-weight: 400;
	}
</style>
