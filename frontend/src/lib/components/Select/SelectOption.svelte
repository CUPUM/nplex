<script lang="ts">
	import { getSelectContext } from './Select.svelte';

	export let id: string | undefined = undefined;
	export let term: string;
	export let value: any;

	const {} = getSelectContext();
</script>

<option {id} {value} />
<div>
	<dt>
		<slot name="term">
			{value}
		</slot>
	</dt>
	{#if $$slots.detail}
		<slot name="detail" />
	{/if}
</div>

<style lang="scss">
	div {
		padding: 1rem;
		border: 1px solid blue;
	}
</style>
