<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { FORM_ID } from './common';
	import CostRange from './CostRange.svelte';
	import Description from './Description.svelte';
	import Title from './Title.svelte';
	import Type from './Type.svelte';
	import Works from './Works.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: if (form) {
		console.log(form);
	}
</script>

<form
	id={FORM_ID}
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<Title />
	<hr />
	<Description />
	<hr />
	<Type />
	<hr />
	<Works />
	<hr />
	<CostRange />
</form>

<style lang="scss" module>
	form {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>
