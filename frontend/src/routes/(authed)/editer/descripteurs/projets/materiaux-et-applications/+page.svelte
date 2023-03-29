<script lang="ts">
	import { enhance } from '$app/forms';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '$routes/(authed)/editer/constants';

	export let data;
</script>

<form class="editor-form" use:enhance method="POST" action={EDITOR_FORM_ACTION} id={EDITOR_FORM_ID}>
	<header class="editor-form-header">
		<h1 class="heading-xl">Matériaux</h1>
		<p class="text-lg">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus iure hic nobis modi
			nostrum dolorem voluptas blanditiis nesciunt ex ipsam!
		</p>
		<p class="subtle">Information supplémentaire</p>
	</header>
	<!-- <dl>
		{#each data.interventions as intervention, i (intervention.id)}
			<div>
				<InterventionCard bind:intervention />
			</div>
		{/each}
	</dl> -->
</form>

<style lang="scss">
</style>
