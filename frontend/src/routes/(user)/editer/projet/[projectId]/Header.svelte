<script lang="ts">
	import type { PageData } from './$types';
	import { dirty } from './common';

	export let title: PageData['project']['title'];

	$: _title = title;

	$: $dirty.title = _title !== title;
</script>

<header>
	<hgroup>
		<h1 class:dirty={$dirty.title} contenteditable="true" bind:textContent={_title} />
		<input type="text" name="title" hidden value={_title} />
	</hgroup>
</header>

<style lang="scss">
	header {
		border: 1px solid red;
	}

	.dirty {
		color: red;
	}
</style>
