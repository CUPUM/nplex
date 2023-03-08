<script lang="ts">
	import { enhance } from '$app/forms';
	import { EDITOR_FORM_ID } from '../../../common';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);
</script>

<form action={EDITOR_FORM_ID} method="POST" use:enhance>
	{#each data.indicators as metaIndicator}
		<section>
			<h3>{metaIndicator.title}</h3>
			{#each metaIndicator.indicators as indicator}
				<fieldset>{indicator.title}</fieldset>
			{/each}
		</section>
	{/each}
</form>

<style lang="scss">
</style>
