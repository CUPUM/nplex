<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import FieldMultiline from '$components/primitives/FieldMultiline.svelte';

	import FieldV2 from '$components/primitives/Field_v2.svelte';
	import Icon from '$components/primitives/Icon.svelte';

	let textValue = 'Text value!';
	let fieldSize = 16;
</script>

<section>
	<h2>Field</h2>
	<input type="range" name="" id="" min="10" max="72" step="1" bind:value={fieldSize} />
	<FieldV2 placeholder="Placeholder" beforeValue="before" afterValue="after" bind:size={fieldSize}>
		<!-- <svelte:fragment slot="leading">Leading</svelte:fragment> -->
		<svelte:fragment slot="label"><span>Placeholder label</span> <Icon name="trash" /></svelte:fragment>
		<svelte:fragment slot="trailing"><Button icon="home">Do this do that</Button></svelte:fragment>
	</FieldV2>
	<FieldV2 beforeValue="before" afterValue="after" bind:size={fieldSize}>
		<svelte:fragment slot="leading">Leading</svelte:fragment>
		<svelte:fragment slot="label">Label without placeholder prop <Icon name="settings" /></svelte:fragment>
		<svelte:fragment slot="trailing">trailing!</svelte:fragment>
	</FieldV2>
	<FieldV2 bind:value={textValue} beforeValue="before" afterValue="after">
		<!-- <svelte:fragment slot="leading">Leading</svelte:fragment> -->
		<svelte:fragment slot="label">Label without placeholder prop <Icon name="trash" /></svelte:fragment>
		<!-- <svelte:fragment slot="trailing">trailing!</svelte:fragment> -->
	</FieldV2>
	<FieldMultiline>
		<!-- <svelte:fragment slot="label">Label without placeholder prop <Icon name="trash" /></svelte:fragment> -->
		<svelte:fragment slot="trailing">trailing! <Button>Submit!</Button></svelte:fragment>
	</FieldMultiline>
</section>

<style lang="scss">
	section {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: 2rem;
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
	}
</style>
