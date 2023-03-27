<script lang="ts">
	import { writable } from 'svelte/store';
	import { EDITOR_FORM_ID } from '../../common';

	export let data;

	const submitting = writable(false); // pass readonly(submitting) as context? Idem for data to avoid bugs with $page.data on nav?

	function base(subpath: string, formHash: boolean = true) {
		return `/editer/organisation/${data.organization.id}${subpath}${
			formHash ? '#' + EDITOR_FORM_ID : ''
		}`;
	}

	const orgEditorRoutes = [
		{
			pathname: base('', false),
			title: 'Général',
		},
		{
			pathname: base('/membres'),
			title: 'Membres',
		},
		{
			pathname: base('/parametres'),
			title: 'Paramètres',
		},
	] satisfies { pathname: string; title: string }[];
</script>

<slot />

<style lang="scss">
</style>
