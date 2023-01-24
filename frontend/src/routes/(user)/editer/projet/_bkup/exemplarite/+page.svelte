<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import { FORMID } from '../common';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form
	id={FORMID}
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<fieldset class="formgroup">
		<legend class="formgroup-legend">
			Indicateurs d'exemplarité
			<fieldset id="search-indicators">
				<Field variant="outlined" type="search" placeholder="Chercher un indicateur">
					<FieldIcon name="search" slot="leading" />
				</Field>
			</fieldset>
		</legend>
		<section class="formgroup-fields">
			<ul>
				{#each data.descriptors.exemplarityIndicators as i}
					<li>
						<label>
							{i.title}
						</label>
					</li>
				{/each}
			</ul>
		</section>
	</fieldset>
</form>

<style lang="scss">
	#search-indicators {
		font-size: 1rem;
		margin-top: 1.5rem;
	}
</style>
